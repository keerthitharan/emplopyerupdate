import React, { useState, useEffect } from 'react';
import { Building, Plus, Edit, Trash2, Search, Filter, MapPin, Phone, Mail, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  employees: number;
  founded: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

const CompanyManagement: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    location: '',
    website: '',
    email: '',
    phone: '',
    employees: '',
    founded: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Pending'
  });

  const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Consulting'];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCompanies = localStorage.getItem('companies');
    if (savedCompanies) {
      setCompanies(JSON.parse(savedCompanies));
    } else {
      // Initialize with sample data
      const initialCompanies: Company[] = [
        {
          id: 1,
          name: 'TechCorp Solutions',
          industry: 'Technology',
          location: 'San Francisco, CA',
          website: 'https://techcorp.com',
          email: 'contact@techcorp.com',
          phone: '+1 (555) 123-4567',
          employees: 250,
          founded: '2015',
          status: 'Active'
        },
        {
          id: 2,
          name: 'HealthFirst Medical',
          industry: 'Healthcare',
          location: 'Boston, MA',
          website: 'https://healthfirst.com',
          email: 'info@healthfirst.com',
          phone: '+1 (555) 234-5678',
          employees: 500,
          founded: '2010',
          status: 'Active'
        }
      ];
      setCompanies(initialCompanies);
      localStorage.setItem('companies', JSON.stringify(initialCompanies));
    }
  }, []);

  // Save to localStorage whenever companies change
  useEffect(() => {
    localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let activityMessage = '';
    
    if (editingCompany) {
      setCompanies(companies.map(company => 
        company.id === editingCompany.id 
          ? { ...formData, id: editingCompany.id, employees: parseInt(formData.employees) }
          : company
      ));
      activityMessage = `Updated company: ${formData.name}`;
    } else {
      const newCompany: Company = {
        ...formData,
        id: Math.max(...companies.map(c => c.id), 0) + 1,
        employees: parseInt(formData.employees)
      };
      setCompanies([...companies, newCompany]);
      activityMessage = `Added new company: ${formData.name}`;
    }
    
    // Add to recent activities
    const activity = {
      type: editingCompany ? 'update' : 'create',
      message: activityMessage,
      timestamp: new Date().toISOString(),
      module: 'Companies'
    };
    
    const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    const updatedActivities = [activity, ...existingActivities].slice(0, 10);
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
    
    resetForm();
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      ...company,
      employees: company.employees.toString()
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      const companyToDelete = companies.find(c => c.id === id);
      setCompanies(companies.filter(company => company.id !== id));
      
      // Add to recent activities
      const activity = {
        type: 'delete',
        message: `Deleted company: ${companyToDelete?.name}`,
        timestamp: new Date().toISOString(),
        module: 'Companies'
      };
      
      const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
      const updatedActivities = [activity, ...existingActivities].slice(0, 10);
      localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      industry: '',
      location: '',
      website: '',
      email: '',
      phone: '',
      employees: '',
      founded: '',
      status: 'Active'
    });
    setEditingCompany(null);
    setShowModal(false);
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === '' || company.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Management</h1>
            <p className="text-gray-600">Manage client companies and their information</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Companies</p>
                  <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {companies.filter(c => c.status === 'Active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {companies.filter(c => c.status === 'Pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Industries</p>
                  <p className="text-2xl font-bold text-gray-900">{industries.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={filterIndustry}
                    onChange={(e) => setFilterIndustry(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">All Industries</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Add Company</span>
              </button>
            </div>
          </div>

          {/* Companies Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCompanies.map((company) => (
                    <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {company.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {company.phone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Globe className="h-3 w-3 mr-1" />
                            {company.website}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{company.industry}</div>
                        <div className="text-sm text-gray-500">Founded: {company.founded}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {company.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {company.employees.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(company)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(company.id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCompany ? 'Edit Company' : 'Add New Company'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
                    <input
                      type="number"
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                    <input
                      type="text"
                      name="founded"
                      value={formData.founded}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {editingCompany ? 'Update Company' : 'Add Company'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;