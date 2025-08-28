import fs from 'fs';
import path from 'path';
import pool from '../config/database';

async function runMigrations() {
  try {
    console.log('Starting database migrations...');
    
    const migrationFile = path.join(__dirname, '001_create_tables.sql');
    const migrationSQL = fs.readFileSync(migrationFile, 'utf8');
    
    await pool.query(migrationSQL);
    
    console.log('✅ Database migrations completed successfully!');
    console.log('📊 Tables created:');
    console.log('   - users');
    console.log('   - companies');
    console.log('   - candidates');
    console.log('   - jobs');
    console.log('   - applications');
    console.log('   - activity_logs');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();