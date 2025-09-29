# Pawon Bufatim Backend API

Backend API untuk Pawon Bufatim - Specialist Pempek dan Tekwan

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- MySQL (v8.0 atau lebih tinggi)
- npm atau yarn

### Installation Steps

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Database**
   - Buat database MySQL baru dengan nama `pawon_bufatim_db`
   - Atau ubah nama database di file `config.js`

3. **Environment Variables**
   Buat file `.env` di folder backend dengan konfigurasi berikut:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=pawon_bufatim_db
   DB_PORT=3306

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # File Upload Configuration
   MAX_FILE_SIZE=5242880
   ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,webp
   ```

4. **Start Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📋 API Endpoints

### Categories Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all active categories |
| GET | `/api/categories/:id` | Get category by ID |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category (soft delete) |

### Products Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products with pagination |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product (soft delete) |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |

## 📁 File Upload

- Upload directory: `uploads-pawon-bufatim/`
- Supported formats: JPG, JPEG, PNG, GIF, WebP
- Maximum file size: 5MB
- Access uploaded files via: `http://localhost:5000/uploads/filename`

## 🗄️ Database Schema

### Categories Table
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
```

## 🔧 Features

- ✅ CRUD operations for categories and products
- ✅ File upload with image validation
- ✅ Soft delete functionality
- ✅ Pagination for products
- ✅ Database connection pooling
- ✅ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Error handling and validation
- ✅ Automatic database initialization
- ✅ Default categories seeding

## 📝 Example Requests

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: multipart/form-data" \
  -F "name=Pempek Premium" \
  -F "description=Kategori pempek berkualitas tinggi" \
  -F "image=@/path/to/image.jpg"
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: multipart/form-data" \
  -F "category_id=1" \
  -F "name=Pempek Kapal Selam" \
  -F "description=Pempek dengan telur di dalamnya" \
  -F "price=15000" \
  -F "image=@/path/to/product.jpg"
```

### Get Products with Pagination
```bash
curl "http://localhost:5000/api/products?page=1&limit=10&category_id=1"
```

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: API request limiting (100 requests per 15 minutes)
- **File Validation**: Image type and size validation
- **SQL Injection Protection**: Parameterized queries
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

1. Set `NODE_ENV=production` in environment variables
2. Configure production database credentials
3. Update CORS origins for production domain
4. Use PM2 or similar process manager for production
5. Configure reverse proxy (Nginx) if needed

## 📞 Support

Untuk bantuan atau pertanyaan, hubungi tim development Pawon Bufatim.
