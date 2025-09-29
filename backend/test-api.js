const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test helper functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const testEndpoint = async (name, testFn) => {
  try {
    console.log(`\n🧪 Testing: ${name}`);
    await testFn();
    console.log(`✅ ${name} - PASSED`);
  } catch (error) {
    console.log(`❌ ${name} - FAILED: ${error.message}`);
  }
};

// Test functions
const testHealthCheck = async () => {
  const response = await axios.get(`${BASE_URL}/health`);
  if (response.data.success !== true) {
    throw new Error('Health check failed');
  }
  console.log('   📊 Server status:', response.data.message);
};

const testGetCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  if (response.data.success !== true) {
    throw new Error('Failed to get categories');
  }
  console.log('   📂 Categories found:', response.data.data.length);
};

const testGetProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  if (response.data.success !== true) {
    throw new Error('Failed to get products');
  }
  console.log('   🛍️ Products found:', response.data.data.length);
};

const testCreateCategory = async () => {
  const categoryData = {
    name: 'Test Category',
    description: 'This is a test category'
  };
  
  const response = await axios.post(`${BASE_URL}/categories`, categoryData, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (response.data.success !== true) {
    throw new Error('Failed to create category');
  }
  
  console.log('   📝 Created category ID:', response.data.data.id);
  return response.data.data.id;
};

const testCreateProduct = async (categoryId) => {
  const productData = {
    category_id: categoryId,
    name: 'Test Product',
    description: 'This is a test product',
    price: 25000
  };
  
  const response = await axios.post(`${BASE_URL}/products`, productData, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (response.data.success !== true) {
    throw new Error('Failed to create product');
  }
  
  console.log('   🛒 Created product ID:', response.data.data.id);
  return response.data.data.id;
};

const testUpdateCategory = async (categoryId) => {
  const updateData = {
    name: 'Updated Test Category',
    description: 'This is an updated test category'
  };
  
  const response = await axios.put(`${BASE_URL}/categories/${categoryId}`, updateData, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (response.data.success !== true) {
    throw new Error('Failed to update category');
  }
  
  console.log('   ✏️ Updated category successfully');
};

const testUpdateProduct = async (productId) => {
  const updateData = {
    name: 'Updated Test Product',
    description: 'This is an updated test product',
    price: 30000
  };
  
  const response = await axios.put(`${BASE_URL}/products/${productId}`, updateData, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (response.data.success !== true) {
    throw new Error('Failed to update product');
  }
  
  console.log('   ✏️ Updated product successfully');
};

const testDeleteProduct = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/products/${productId}`);
  
  if (response.data.success !== true) {
    throw new Error('Failed to delete product');
  }
  
  console.log('   🗑️ Deleted product successfully');
};

const testDeleteCategory = async (categoryId) => {
  const response = await axios.delete(`${BASE_URL}/categories/${categoryId}`);
  
  if (response.data.success !== true) {
    throw new Error('Failed to delete category');
  }
  
  console.log('   🗑️ Deleted category successfully');
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting Pawon Bufatim API Tests...\n');
  
  try {
    // Basic connectivity tests
    await testEndpoint('Health Check', testHealthCheck);
    await testEndpoint('Get Categories', testGetCategories);
    await testEndpoint('Get Products', testGetProducts);
    
    // CRUD tests
    const categoryId = await testEndpoint('Create Category', testCreateCategory);
    const productId = await testEndpoint('Create Product', () => testCreateProduct(categoryId));
    
    await testEndpoint('Update Category', () => testUpdateCategory(categoryId));
    await testEndpoint('Update Product', () => testUpdateProduct(productId));
    
    // Cleanup
    await testEndpoint('Delete Product', () => testDeleteProduct(productId));
    await testEndpoint('Delete Category', () => testDeleteCategory(categoryId));
    
    console.log('\n🎉 All tests completed!');
    
  } catch (error) {
    console.error('\n💥 Test suite failed:', error.message);
    process.exit(1);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { runTests };
