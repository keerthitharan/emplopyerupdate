import express from 'express';
import { CandidateModel } from '../models/Candidate';
import { auth } from '../middleware/auth';
import { logActivity } from '../utils/activityLogger';

const router = express.Router();

// Get all candidates
router.get('/', auth, async (req, res) => {
  try {
    const candidates = await CandidateModel.findAll();
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get candidate by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const candidate = await CandidateModel.findById(id);
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    res.json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new candidate
router.post('/', auth, async (req, res) => {
  try {
    const candidateData = req.body;
    const candidate = await CandidateModel.create(candidateData);
    
    // Log activity
    await logActivity(req.user.id, 'create', 'candidates', candidate.id!, `Created candidate: ${candidate.name}`);
    
    res.status(201).json(candidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Update candidate
router.put('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const candidateData = req.body;
    const candidate = await CandidateModel.update(id, candidateData);
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    // Log activity
    await logActivity(req.user.id, 'update', 'candidates', candidate.id!, `Updated candidate: ${candidate.name}`);
    
    res.json(candidate);
  } catch (error) {
    console.error('Error updating candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete candidate
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const candidate = await CandidateModel.findById(id);
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    
    const deleted = await CandidateModel.delete(id);
    
    if (deleted) {
      // Log activity
      await logActivity(req.user.id, 'delete', 'candidates', id, `Deleted candidate: ${candidate.name}`);
      res.json({ message: 'Candidate deleted successfully' });
    } else {
      res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search candidates
router.get('/search/:term', auth, async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const candidates = await CandidateModel.search(searchTerm);
    res.json(candidates);
  } catch (error) {
    console.error('Error searching candidates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get candidates by status
router.get('/status/:status', auth, async (req, res) => {
  try {
    const status = req.params.status;
    const candidates = await CandidateModel.findByStatus(status);
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates by status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;