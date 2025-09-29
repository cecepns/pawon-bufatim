# Pawon Bufatim API Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Error Handling](#error-handling)
- [File Upload](#file-upload)

## Overview

Pawon Bufatim API menyediakan endpoints untuk mengelola kategori dan produk pempek serta tekwan. API ini menggunakan Express.js dengan MySQL sebagai database.

**Base URL**: `http://localhost:5000/api`

## Authentication

Saat ini API tidak menggunakan authentication. Untuk production, disarankan menambahkan JWT atau sistem authentication lainnya.

## Endpoints

### 🏷️ Categories Management

#### GET /categories
Mendapatkan semua kategori aktif.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pempek",
      "description": "Berbagai jenis pempek berkualitas tinggi",
      "image_url": "/uploads/category-1.jpg",
      "is_active": true,
      "created_at": "2025-01-27T10:00:00.000Z",
      "updated_at": "2025-01-27T10:00:00.000Z"
    }
  ]
}
```

#### GET /categories/:id
Mendapatkan kategori berdasarkan ID.

**Parameters:**
- `id` (integer, required): ID kategori

#### POST /categories
Membuat kategori baru.

**Request Body (multipart/form-data):**
- `name` (string, required): Nama kategori
- `description` (string, optional): Deskripsi kategori
- `image` (file, optional): Gambar kategori

#### PUT /categories/:id
Mengupdate kategori.

**Request Body (multipart/form-data):**
- `name` (string, required): Nama kategori
- `description` (string, optional): Deskripsi kategori
- `image` (file, optional): Gambar kategori baru

#### DELETE /categories/:id
Menghapus kategori (soft delete).

### 🛍️ Products Management

#### GET /products
Mendapatkan semua produk dengan pagination.

**Query Parameters:**
- `page` (integer, optional): Halaman (default: 1)
- `limit` (integer, optional): Jumlah item per halaman (default: 10)
- `category_id` (integer, optional): Filter berdasarkan kategori

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "name": "Pempek Kapal Selam",
      "description": "Pempek dengan telur di dalamnya",
      "price": 15000.00,
      "image_url": "/uploads/product-1.jpg",
      "category_name": "Pempek",
      "is_active": true,
      "created_at": "2025-01-27T10:00:00.000Z",
      "updated_at": "2025-01-27T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### GET /products/:id
Mendapatkan produk berdasarkan ID.

#### POST /products
Membuat produk baru.

**Request Body (multipart/form-data):**
- `category_id` (integer, optional): ID kategori
- `name` (string, required): Nama produk
- `description` (string, optional): Deskripsi produk (bisa menggunakan HTML untuk React Quill)
- `price` (number, required): Harga produk
- `image` (file, optional): Gambar produk

#### PUT /products/:id
Mengupdate produk.

#### DELETE /products/:id
Menghapus produk (soft delete).

### 🔍 Utility Endpoints

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "success": true,
  "message": "Pawon Bufatim API is running!",
  "timestamp": "2025-01-27T10:00:00.000Z"
}
```

## Request/Response Examples

### Create Category Example

```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: multipart/form-data" \
  -F "name=Pempek Premium" \
  -F "description=Kategori pempek berkualitas tinggi" \
  -F "image=@/path/to/image.jpg"
```

### Create Product Example

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: multipart/form-data" \
  -F "category_id=1" \
  -F "name=Pempek Kapal Selam" \
  -F "description=<p>Pempek dengan telur di dalamnya</p>" \
  -F "price=15000" \
  -F "image=@/path/to/product.jpg"
```

### Get Products with Filters

```bash
curl "http://localhost:5000/api/products?page=1&limit=5&category_id=1"
```

## Error Handling

API menggunakan format error response yang konsisten:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

**Common Error Messages:**
- `"Category name is required"`
- `"Category name already exists"`
- `"Product name and price are required"`
- `"Invalid category ID"`
- `"Category not found"`
- `"Product not found"`
- `"File size too large. Maximum size is 5MB."`
- `"Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."`

## File Upload

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limit
- Maximum: 5MB per file

### Upload Directory
Files diupload ke direktori `uploads-pawon-bufatim/` dan dapat diakses via URL:
```
http://localhost:5000/uploads/filename.jpg
```

### File Naming
Files akan diberi nama unik dengan format:
```
fieldname-timestamp-randomnumber.extension
```

Contoh: `image-1643248800000-123456789.jpg`

## React Quill Integration

Untuk deskripsi produk, API mendukung HTML content dari React Quill. Pastikan untuk:

1. **Sanitize HTML** di frontend sebelum mengirim ke API
2. **Validate content** untuk mencegah XSS attacks
3. **Handle rich text** dengan proper styling di frontend

**Example React Quill Integration:**
```javascript
// Frontend - React Quill component
const [description, setDescription] = useState('');

// API call
const createProduct = async (formData) => {
  formData.append('description', description); // HTML content from Quill
  await fetch('/api/products', {
    method: 'POST',
    body: formData
  });
};
```

## Rate Limiting

API menggunakan rate limiting untuk mencegah abuse:
- **Limit**: 100 requests per 15 minutes per IP
- **Window**: 15 minutes
- **Headers**: Rate limit info tersedia di response headers

## CORS Configuration

API dikonfigurasi untuk menerima requests dari:
- Development: `http://localhost:3000`, `http://localhost:5173`
- Production: Update di konfigurasi server

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request limiting
- **File Validation**: Type dan size validation
- **SQL Injection Protection**: Parameterized queries
- **Error Handling**: Comprehensive error management

## Database Schema

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

## Testing

Gunakan script testing yang tersedia:

```bash
# Setup database
npm run setup

# Start server
npm start

# Run tests (dalam terminal terpisah)
npm test
```

## Support

Untuk bantuan atau pertanyaan mengenai API, hubungi tim development Pawon Bufatim.
