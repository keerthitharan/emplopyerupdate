import express from 'express';
import { CompanyModel } from '../models/Company';
import { auth } from '../middleware/auth';
import { logActivity } from '../utils/activityLogger';

const router = express.Router();

// Get all companies
router.get('/', auth, async (req, res) => {
  try {
    const companies = await CompanyModel.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await CompanyModel.findById(id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new company
router.post('/', auth, async (req, res) => {
  try {
    const companyData = req.body;
    const company = await CompanyModel.create(companyData);
    
    // Log activity
    await logActivity(req.user.id, 'create', 'companies', company.id!, `Created company: ${company.name}`);
    
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update company
router.put('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const companyData = req.body;
    const company = await CompanyModel.update(id, companyData);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    // Log activity
    await logActivity(req.user.id, 'update', 'companies', company.id!, `Updated company: ${company.name}`);
    
    res.json(company);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete company
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const company = await CompanyModel.findById(id);
    
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    const deleted = await CompanyModel.delete(id);
    
    if (deleted) {
      // Log activity
      await logActivity(req.user.id, 'delete', 'companies', id, `Deleted company: ${company.name}`);
      res.json({ message: 'Company deleted successfully' });
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search companies
router.get('/search/:term', auth, async (req, res) => {
  try {
    const searchTerm = req.params.term;
    const companies = await CompanyModel.search(searchTerm);
    res.json(companies);
  } catch (error) {
    console.error('Error searching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;