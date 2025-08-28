import pool from '../config/database';
import { UserModel } from '../models/User';
import { CompanyModel } from '../models/Company';
import { CandidateModel } from '../models/Candidate';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminUser = await UserModel.create({
      name: 'Admin User',
      email: 'admin@hardskello.com',
      password: 'admin123',
      phone: '+1 (555) 000-0001',
      role: 'admin',
      department: 'Administration',
      join_date: new Date('2023-01-01'),
      status: 'active'
    });
    console.log('✅ Admin user created');

    // Create sample users
    const users = [
      {
        name: 'John Smith',
        email: 'john.smith@hardskello.com',
        password: 'password123',
        phone: '+1 (555) 123-4567',
        role: 'hr_manager',
        department: 'Human Resources',
        join_date: new Date('2023-01-15'),
        status: 'active' as const
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@hardskello.com',
        password: 'password123',
        phone: '+1 (555) 234-5678',
        role: 'recruiter',
        department: 'Human Resources',
        join_date: new Date('2022-08-20'),
        status: 'active' as const
      }
    ];

    for (const userData of users) {
      await UserModel.create(userData);
    }
    console.log('✅ Sample users created');

    // Create sample companies
    const companies = [
      {
        name: 'TechCorp Solutions',
        industry: 'Technology',
        location: 'San Francisco, CA',
        website: 'https://techcorp.com',
        email: 'contact@techcorp.com',
        phone: '+1 (555) 123-4567',
        employees: 250,
        founded: '2015',
        status: 'active' as const
      },
      {
        name: 'HealthFirst Medical',
        industry: 'Healthcare',
        location: 'Boston, MA',
        website: 'https://healthfirst.com',
        email: 'info@healthfirst.com',
        phone: '+1 (555) 234-5678',
        employees: 500,
        founded: '2010',
        status: 'active' as const
      },
      {
        name: 'FinanceMax Inc',
        industry: 'Finance',
        location: 'New York, NY',
        website: 'https://financemax.com',
        email: 'contact@financemax.com',
        phone: '+1 (555) 345-6789',
        employees: 150,
        founded: '2018',
        status: 'active' as const
      }
    ];

    for (const companyData of companies) {
      await CompanyModel.create(companyData);
    }
    console.log('✅ Sample companies created');

    // Create sample candidates
    const candidates = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        position: 'Software Engineer',
        experience: 'Mid Level (3-5 years)',
        education: "Bachelor's Degree",
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        salary: '$85,000',
        status: 'available' as const
      },
      {
        name: 'Robert Chen',
        email: 'robert.chen@email.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
        position: 'Data Scientist',
        experience: 'Senior Level (6-10 years)',
        education: "Master's Degree",
        skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        salary: '$120,000',
        status: 'interviewing' as const
      },
      {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@email.com',
        phone: '+1 (555) 345-6789',
        location: 'Chicago, IL',
        position: 'Marketing Manager',
        experience: 'Mid Level (3-5 years)',
        education: "Bachelor's Degree",
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
        salary: '$75,000',
        status: 'available' as const
      }
    ];

    for (const candidateData of candidates) {
      await CandidateModel.create(candidateData);
    }
    console.log('✅ Sample candidates created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('📧 Admin login: admin@hardskello.com / admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();