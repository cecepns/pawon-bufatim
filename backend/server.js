const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { pool, testConnection, initializeDatabase } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? ['https://yourdomain.com'] : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded images with CORS headers
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}, express.static(path.join(__dirname, 'uploads-pawon-bufatim')));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads-pawon-bufatim');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 // 5MB default
  },
  fileFilter: fileFilter
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
    }
  }
  if (error.message === 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

// ==================== AUTHENTICATION MIDDLEWARE ====================

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ==================== ADMIN AUTHENTICATION ROUTES ====================

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Username and password are required' 
      });
    }

    // Check if admin exists
    const [admins] = await pool.execute(
      'SELECT * FROM admins WHERE username = ? AND is_active = TRUE',
      [username]
    );

    if (admins.length === 0) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    const admin = admins[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: 'admin'
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email
        }
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Verify admin token
app.get('/api/admin/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      username: req.user.username,
      role: req.user.role
    }
  });
});

// ==================== CATEGORY ROUTES ====================

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM categories WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// Get category by ID
app.get('/api/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM categories WHERE id = ? AND is_active = TRUE',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch category' });
  }
});

// Create new category
app.post('/api/categories', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    // Check if category name already exists
    const [existing] = await pool.execute(
      'SELECT id FROM categories WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, error: 'Category name already exists' });
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
      [name, description, imageUrl]
    );

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { id: result.insertId, name, description, image_url: imageUrl }
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ success: false, error: 'Failed to create category' });
  }
});

// Update category
app.put('/api/categories/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    // Check if category exists
    const [existing] = await pool.execute(
      'SELECT * FROM categories WHERE id = ? AND is_active = TRUE',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    // Check if new name conflicts with existing categories (excluding current one)
    const [nameConflict] = await pool.execute(
      'SELECT id FROM categories WHERE name = ? AND id != ?',
      [name, id]
    );

    if (nameConflict.length > 0) {
      return res.status(400).json({ success: false, error: 'Category name already exists' });
    }

    // Build update query dynamically
    let updateQuery = 'UPDATE categories SET name = ?, description = ?';
    let queryParams = [name, description];

    if (imageUrl) {
      // Delete old image if it exists
      const oldImagePath = path.join(__dirname, existing[0].image_url);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateQuery += ', image_url = ?';
      queryParams.push(imageUrl);
    }

    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    await pool.execute(updateQuery, queryParams);

    res.json({
      success: true,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, error: 'Failed to update category' });
  }
});

// Delete category (soft delete)
app.delete('/api/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category exists
    const [existing] = await pool.execute(
      'SELECT * FROM categories WHERE id = ? AND is_active = TRUE',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    // Check if category has products
    const [products] = await pool.execute(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ? AND is_active = TRUE',
      [id]
    );

    if (products[0].count > 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Cannot delete category with active products' 
      });
    }

    // Soft delete
    await pool.execute(
      'UPDATE categories SET is_active = FALSE WHERE id = ?',
      [id]
    );

    // Delete associated image file
    if (existing[0].image_url) {
      const imagePath = path.join(__dirname, existing[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, error: 'Failed to delete category' });
  }
});

// ==================== PRODUCT ROUTES ====================

// Get all products with category info
app.get('/api/products', async (req, res) => {
  try {
    const { category_id, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_active = TRUE
    `;
    let queryParams = [];

    if (category_id) {
      query += ' AND p.category_id = ?';
      queryParams.push(category_id);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(parseInt(limit), parseInt(offset));

    const [rows] = await pool.execute(query, queryParams);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE is_active = TRUE';
    let countParams = [];

    if (category_id) {
      countQuery += ' AND category_id = ?';
      countParams.push(category_id);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = countResult[0].total;

    res.json({
      success: true,
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ? AND p.is_active = TRUE
    `, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

// Create new product
app.post('/api/products', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { category_id, name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price) {
      return res.status(400).json({ 
        success: false, 
        error: 'Product name and price are required' 
      });
    }

    // Validate category_id if provided
    if (category_id) {
      const [categoryExists] = await pool.execute(
        'SELECT id FROM categories WHERE id = ? AND is_active = TRUE',
        [category_id]
      );
      
      if (categoryExists.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid category ID' 
        });
      }
    }

    const [result] = await pool.execute(
      'INSERT INTO products (category_id, name, description, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [category_id || null, name, description, price, imageUrl]
    );

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { 
        id: result.insertId, 
        category_id, 
        name, 
        description, 
        price, 
        image_url: imageUrl 
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Failed to create product' });
  }
});

// Update product
app.put('/api/products/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, description, price } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !price) {
      return res.status(400).json({ 
        success: false, 
        error: 'Product name and price are required' 
      });
    }

    // Check if product exists
    const [existing] = await pool.execute(
      'SELECT * FROM products WHERE id = ? AND is_active = TRUE',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Validate category_id if provided
    if (category_id) {
      const [categoryExists] = await pool.execute(
        'SELECT id FROM categories WHERE id = ? AND is_active = TRUE',
        [category_id]
      );
      
      if (categoryExists.length === 0) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid category ID' 
        });
      }
    }

    // Build update query dynamically
    let updateQuery = 'UPDATE products SET category_id = ?, name = ?, description = ?, price = ?';
    let queryParams = [category_id || null, name, description, price];

    if (imageUrl) {
      // Delete old image if it exists
      if (existing[0].image_url) {
        const oldImagePath = path.join(__dirname, existing[0].image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateQuery += ', image_url = ?';
      queryParams.push(imageUrl);
    }

    updateQuery += ' WHERE id = ?';
    queryParams.push(id);

    await pool.execute(updateQuery, queryParams);

    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
});

// Delete product (soft delete)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const [existing] = await pool.execute(
      'SELECT * FROM products WHERE id = ? AND is_active = TRUE',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Soft delete
    await pool.execute(
      'UPDATE products SET is_active = FALSE WHERE id = ?',
      [id]
    );

    // Delete associated image file
    if (existing[0].image_url) {
      const imagePath = path.join(__dirname, existing[0].image_url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Pawon Bufatim API is running!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'API endpoint not found' 
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
const startServer = async () => {
  try {
    await testConnection();
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Pawon Bufatim API Server running on port ${PORT}`);
      console.log(`📁 Upload directory: ${uploadsDir}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
