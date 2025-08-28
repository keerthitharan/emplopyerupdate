import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: string;
  department?: string;
  join_date?: Date;
  status: 'active' | 'inactive';
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel {
  static async create(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    
    const query = `
      INSERT INTO users (name, email, password, phone, role, department, join_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, name, email, phone, role, department, join_date, status, created_at, updated_at
    `;
    
    const values = [
      userData.name,
      userData.email,
      hashedPassword,
      userData.phone,
      userData.role,
      userData.department,
      userData.join_date,
      userData.status
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<User[]> {
    const query = `
      SELECT id, name, email, phone, role, department, join_date, status, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<User | null> {
    const query = `
      SELECT id, name, email, phone, role, department, join_date, status, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, name, email, password, phone, role, department, join_date, status, created_at, updated_at
      FROM users
      WHERE email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async update(id: number, userData: Partial<User>): Promise<User | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(userData)) {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        if (key === 'password') {
          fields.push(`${key} = $${paramCount}`);
          values.push(await bcrypt.hash(value as string, 10));
        } else {
          fields.push(`${key} = $${paramCount}`);
          values.push(value);
        }
        paramCount++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, name, email, phone, role, department, join_date, status, created_at, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}