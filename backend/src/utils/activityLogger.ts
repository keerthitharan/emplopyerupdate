import pool from '../config/database';

export const logActivity = async (
  userId: number,
  action: string,
  entityType: string,
  entityId: number,
  description: string
) => {
  try {
    const query = `
      INSERT INTO activity_logs (user_id, action, entity_type, entity_id, description)
      VALUES ($1, $2, $3, $4, $5)
    `;
    
    await pool.query(query, [userId, action, entityType, entityId, description]);
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

export const getRecentActivities = async (limit: number = 10) => {
  try {
    const query = `
      SELECT 
        al.*,
        u.name as user_name
      FROM activity_logs al
      LEFT JOIN users u ON al.user_id = u.id
      ORDER BY al.created_at DESC
      LIMIT $1
    `;
    
    const result = await pool.query(query, [limit]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};