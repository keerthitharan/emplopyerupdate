import express from 'express';
import { UserModel } from '../models/User';
import { auth } from '../middleware/auth';
import { logActivity } from '../utils/activityLogger';

const router = express.Router();

// Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
router.post('/', auth, async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserModel.create(userData);
    
    // Log activity
    await logActivity(req.user.id, 'create', 'users', user.id!, `Created user: ${user.name}`);
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;
    const user = await UserModel.update(id, userData);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Log activity
    await logActivity(req.user.id, 'update', 'users', user.id!, `Updated user: ${user.name}`);
    
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await UserModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const deleted = await UserModel.delete(id);
    
    if (deleted) {
      // Log activity
      await logActivity(req.user.id, 'delete', 'users', id, `Deleted user: ${user.name}`);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;