import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'hardskello_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Auto-create database and tables if they don't exist
const initializeDatabase = async () => {
  try {
    // First, connect to postgres database to create our database
    const adminPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: 'postgres', // Connect to default postgres database
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
    });

    // Create database if it doesn't exist
    try {
      await adminPool.query(`CREATE DATABASE ${process.env.DB_NAME || 'hardskello_db'}`);
      console.log('✅ Database created successfully');
    } catch (error: any) {
      if (error.code === '42P04') {
        console.log('📊 Database already exists');
      } else {
        console.error('Error creating database:', error.message);
      }
    }
    
    await adminPool.end();

    // Now connect to our database and create tables
    await pool.query('SELECT 1'); // Test connection
    
    // Check if tables exist
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users'
    `);
    
    if (tablesResult.rows.length === 0) {
      console.log('🔧 Creating database tables...');
      
      // Read and execute migration file
      const migrationPath = path.join(__dirname, '../migrations/001_create_tables.sql');
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      await pool.query(migrationSQL);
      console.log('✅ Database tables created successfully');
      
      // Run seed data
      console.log('🌱 Seeding database with initial data...');
      await seedInitialData();
      console.log('✅ Database seeded successfully');
    } else {
      console.log('📊 Database tables already exist');
    }
    
  } catch (error) {
    console.error('❌ Database initialization error:', error);
  }
};

// Seed initial data
const seedInitialData = async () => {
  try {
    // Create admin user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await pool.query(`
      INSERT INTO users (name, email, password, phone, role, department, join_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (email) DO NOTHING
    `, [
      'Admin User',
      'admin@hardskello.com',
      hashedPassword,
      '+1 (555) 000-0001',
      'admin',
      'Administration',
      new Date('2023-01-01'),
      'active'
    ]);

    // Create sample companies
    await pool.query(`
      INSERT INTO companies (name, industry, location, website, email, phone, employees, founded, status)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9),
        ($10, $11, $12, $13, $14, $15, $16, $17, $18)
      ON CONFLICT DO NOTHING
    `, [
      'TechCorp Solutions', 'Technology', 'San Francisco, CA', 'https://techcorp.com', 'contact@techcorp.com', '+1 (555) 123-4567', 250, '2015', 'active',
      'HealthFirst Medical', 'Healthcare', 'Boston, MA', 'https://healthfirst.com', 'info@healthfirst.com', '+1 (555) 234-5678', 500, '2010', 'active'
    ]);

    // Create sample candidates
    await pool.query(`
      INSERT INTO candidates (name, email, phone, location, position, experience, education, skills, salary, status)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      ON CONFLICT (email) DO NOTHING
    `, [
      'Alice Johnson', 'alice.johnson@email.com', '+1 (555) 123-4567', 'New York, NY', 'Software Engineer', 'Mid Level (3-5 years)', 'Bachelor\'s Degree', ['JavaScript', 'React', 'Node.js', 'Python'], '$85,000', 'available',
      'Robert Chen', 'robert.chen@email.com', '+1 (555) 234-5678', 'San Francisco, CA', 'Data Scientist', 'Senior Level (6-10 years)', 'Master\'s Degree', ['Python', 'Machine Learning', 'SQL', 'TensorFlow'], '$120,000', 'interviewing'
    ]);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Initialize database on startup
initializeDatabase();

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

export default pool;