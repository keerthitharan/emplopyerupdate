import pool from '../config/database';

export interface Company {
  id?: number;
  name: string;
  industry: string;
  location: string;
  website?: string;
  email: string;
  phone: string;
  employees?: number;
  founded?: string;
  status: 'active' | 'inactive' | 'pending';
  created_at?: Date;
  updated_at?: Date;
}

export class CompanyModel {
  static async create(companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> {
    const query = `
      INSERT INTO companies (name, industry, location, website, email, phone, employees, founded, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    
    const values = [
      companyData.name,
      companyData.industry,
      companyData.location,
      companyData.website,
      companyData.email,
      companyData.phone,
      companyData.employees || 0,
      companyData.founded,
      companyData.status
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<Company[]> {
    const query = 'SELECT * FROM companies ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Company | null> {
    const query = 'SELECT * FROM companies WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByIndustry(industry: string): Promise<Company[]> {
    const query = 'SELECT * FROM companies WHERE industry = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [industry]);
    return result.rows;
  }

  static async update(id: number, companyData: Partial<Company>): Promise<Company | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(companyData)) {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE companies
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM companies WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async search(searchTerm: string): Promise<Company[]> {
    const query = `
      SELECT * FROM companies
      WHERE name ILIKE $1 OR industry ILIKE $1 OR location ILIKE $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }
}