# Admin Dashboard - Pawon Bufatim

Sistem admin dashboard untuk mengelola kategori dan produk Pawon Bufatim.

## Fitur

- **Authentication**: Login admin dengan JWT token
- **Dashboard**: Overview statistik kategori dan produk
- **Manajemen Kategori**: CRUD operations untuk kategori produk
- **Manajemen Produk**: CRUD operations untuk produk
- **Upload Gambar**: Upload gambar untuk kategori dan produk
- **Responsive Design**: Interface yang responsive untuk desktop dan mobile

## Akses Admin

### URL Admin
- Login: `http://localhost:3000/admin/login`
- Dashboard: `http://localhost:3000/admin/dashboard`
- Kategori: `http://localhost:3000/admin/categories`
- Produk: `http://localhost:3000/admin/products`

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Teknologi

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- Axios (HTTP Client)
- React Hot Toast (Notifications)

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt (Password Hashing)
- Multer (File Upload)

## Setup

### 1. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 2. Environment Variables
Buat file `.env` di folder backend:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pawon_bufatim_db
DB_PORT=3306
JWT_SECRET=your-secret-key
MAX_FILE_SIZE=5242880
```

### 3. Database Setup
```bash
cd backend
npm run setup
```

### 4. Start Development Servers
```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify admin token

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Security Features

- JWT Token Authentication
- Password Hashing dengan bcrypt
- Rate Limiting
- CORS Protection
- Helmet Security Headers
- File Upload Validation
- Input Validation

## File Upload

- Format yang didukung: JPEG, PNG, GIF, WebP
- Ukuran maksimal: 5MB
- File disimpan di folder `backend/uploads-pawon-bufatim/`
- URL akses: `http://localhost:5000/uploads/filename`

## Database Schema

### Admins Table
```sql
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

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

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Pastikan MySQL server berjalan
   - Periksa konfigurasi database di `.env`

2. **File Upload Error**
   - Pastikan folder `uploads-pawon-bufatim` ada
   - Periksa permission folder upload

3. **Authentication Error**
   - Pastikan JWT_SECRET sudah di-set
   - Periksa token expiration

4. **CORS Error**
   - Pastikan frontend URL sudah di-configure di backend
   - Periksa CORS settings di server.js

## Development Notes

- Admin routes dilindungi dengan authentication middleware
- Soft delete untuk kategori dan produk
- Pagination untuk daftar produk
- Real-time feedback dengan toast notifications
- Responsive design untuk mobile dan desktop
