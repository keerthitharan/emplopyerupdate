import pool from '../config/database';

export interface Candidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  salary?: string;
  status: 'available' | 'interviewing' | 'placed' | 'unavailable';
  resume_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export class CandidateModel {
  static async create(candidateData: Omit<Candidate, 'id' | 'created_at' | 'updated_at'>): Promise<Candidate> {
    const query = `
      INSERT INTO candidates (name, email, phone, location, position, experience, education, skills, salary, status, resume_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const values = [
      candidateData.name,
      candidateData.email,
      candidateData.phone,
      candidateData.location,
      candidateData.position,
      candidateData.experience,
      candidateData.education,
      candidateData.skills,
      candidateData.salary,
      candidateData.status,
      candidateData.resume_url
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<Candidate[]> {
    const query = 'SELECT * FROM candidates ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Candidate | null> {
    const query = 'SELECT * FROM candidates WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<Candidate | null> {
    const query = 'SELECT * FROM candidates WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findByStatus(status: string): Promise<Candidate[]> {
    const query = 'SELECT * FROM candidates WHERE status = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [status]);
    return result.rows;
  }

  static async update(id: number, candidateData: Partial<Candidate>): Promise<Candidate | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(candidateData)) {
      if (key !== 'id' && key !== 'created_at' && key !== 'updated_at' && value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE candidates
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const query = 'DELETE FROM candidates WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  static async search(searchTerm: string): Promise<Candidate[]> {
    const query = `
      SELECT * FROM candidates
      WHERE name ILIKE $1 OR email ILIKE $1 OR position ILIKE $1 OR $2 = ANY(skills)
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [`%${searchTerm}%`, searchTerm]);
    return result.rows;
  }

  static async findBySkills(skills: string[]): Promise<Candidate[]> {
    const query = `
      SELECT * FROM candidates
      WHERE skills && $1
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [skills]);
    return result.rows;
  }
}