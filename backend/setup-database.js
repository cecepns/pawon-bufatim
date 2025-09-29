const mysql = require('mysql2/promise');
require('dotenv').config();

const setupDatabase = async () => {
  let connection;
  
  try {
    console.log('🔧 Setting up database...');
    
    // Connect to MySQL server (without specific database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });
    
    const dbName = process.env.DB_NAME || 'pawon_bufatim_db';
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created/verified`);
    
    // Switch to the database
    await connection.execute(`USE \`${dbName}\``);
    
    // Create tables
    console.log('📋 Creating tables...');
    
    // Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Categories table created');
    
    // Products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
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
      )
    `);
    console.log('✅ Products table created');
    
    // Check if default categories exist
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM categories');
    
    if (categories[0].count === 0) {
      console.log('🌱 Inserting default categories...');
      
      await connection.execute(`
        INSERT INTO categories (name, description) VALUES 
        ('Pempek', 'Berbagai jenis pempek berkualitas tinggi dengan cita rasa tradisional'),
        ('Tekwan', 'Tekwan segar dengan kuah gurih dan isian yang melimpah'),
        ('Tepung Ikan', 'Tepung ikan berkualitas tinggi untuk bahan baku pempek')
      `);
      
      console.log('✅ Default categories inserted');
    } else {
      console.log('📂 Categories already exist, skipping default insertion');
    }
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy env.example to .env and configure your database credentials');
    console.log('2. Run: npm start (or npm run dev for development)');
    console.log('3. Test the API at: http://localhost:5000/api/health');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;
