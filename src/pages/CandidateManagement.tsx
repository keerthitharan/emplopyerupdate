import React, { useState, useEffect } from 'react';
import { UserCheck, Plus, Edit, Trash2, Search, Filter, Mail, Phone, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  experience: string;
  education: string;
  skills: string[];
  salary: string;
  status: 'Available' | 'Interviewing' | 'Placed' | 'Unavailable';
}

const CandidateManagement: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    position: '',
    experience: '',
    education: '',
    skills: '',
    salary: '',
    status: 'Available' as 'Available' | 'Interviewing' | 'Placed' | 'Unavailable'
  });

  const experienceLevels = ['Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6-10 years)', 'Executive Level (10+ years)'];
  const educationLevels = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD', 'Professional Certification'];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCandidates = localStorage.getItem('candidates');
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    } else {
      // Initialize with sample data
      const initialCandidates: Candidate[] = [
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice.johnson@email.com',
          phone: '+1 (555) 123-4567',
          location: 'New York, NY',
          position: 'Software Engineer',
          experience: 'Mid Level (3-5 years)',
          education: 'Bachelor\'s Degree',
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          salary: '$85,000',
          status: 'Available'
        },
        {
          id: 2,
          name: 'Robert Chen',
          email: 'robert.chen@email.com',
          phone: '+1 (555) 234-5678',
          location: 'San Francisco, CA',
          position: 'Data Scientist',
          experience: 'Senior Level (6-10 years)',
          education: 'Master\'s Degree',
          skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
          salary: '$120,000',
          status: 'Interviewing'
        }
      ];
      setCandidates(initialCandidates);
      localStorage.setItem('candidates', JSON.stringify(initialCandidates));
    }
  }, []);

  // Save to localStorage whenever candidates change
  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    let activityMessage = '';
    
    if (editingCandidate) {
      setCandidates(candidates.map(candidate => 
        candidate.id === editingCandidate.id 
          ? { ...formData, id: editingCandidate.id, skills: skillsArray }
          : candidate
      ));
      activityMessage = `Updated candidate: ${formData.name}`;
    } else {
      const newCandidate: Candidate = {
        ...formData,
        id: Math.max(...candidates.map(c => c.id), 0) + 1,
        skills: skillsArray
      };
      setCandidates([...candidates, newCandidate]);
      activityMessage = `Added new candidate: ${formData.name}`;
    }
    
    // Add to recent activities
    const activity = {
      type: editingCandidate ? 'update' : 'create',
      message: activityMessage,
      timestamp: new Date().toISOString(),
      module: 'Candidates'
    };
    
    const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    const updatedActivities = [activity, ...existingActivities].slice(0, 10);
    localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
    
    resetForm();
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setFormData({
      ...candidate,
      skills: candidate.skills.join(', ')
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      const candidateToDelete = candidates.find(c => c.id === id);
      setCandidates(candidates.filter(candidate => candidate.id !== id));
      
      // Add to recent activities
      const activity = {
        type: 'delete',
        message: `Deleted candidate: ${candidateToDelete?.name}`,
        timestamp: new Date().toISOString(),
        module: 'Candidates'
      };
      
      const existingActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
      const updatedActivities = [activity, ...existingActivities].slice(0, 10);
      localStorage.setItem('recentActivities', JSON.stringify(updatedActivities));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      position: '',
      experience: '',
      education: '',
      skills: '',
      salary: '',
      status: 'Available'
    });
    setEditingCandidate(null);
    setShowModal(false);
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === '' || candidate.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Interviewing': return 'bg-blue-100 text-blue-800';
      case 'Placed': return 'bg-purple-100 text-purple-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Management</h1>
            <p className="text-gray-600">Manage candidate profiles and track their status</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Candidates</p>
                  <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {candidates.filter(c => c.status === 'Available').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviewing</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {candidates.filter(c => c.status === 'Interviewing').length}
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
                  <p className="text-sm font-medium text-gray-600">Placed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {candidates.filter(c => c.status === 'Placed').length}
                  </p>
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
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                  >
                    <option value="">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Placed">Placed</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Add Candidate</span>
              </button>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidates.map((candidate) => (
                    <tr key={candidate.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {candidate.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {candidate.phone}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {candidate.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" />
                          {candidate.position}
                        </div>
                        <div className="text-sm text-gray-500">{candidate.salary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.experience}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {candidate.education}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span key={idx} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              +{candidate.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(candidate)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 p-1 hover:bg-blue-50 rounded"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(candidate.id)}
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
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Experience</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Education</option>
                      {educationLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., $75,000"
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
                      <option value="Available">Available</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Placed">Placed</option>
                      <option value="Unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    placeholder="e.g., JavaScript, React, Node.js, Python"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
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
                    {editingCandidate ? 'Update Candidate' : 'Add Candidate'}
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

export default CandidateManagement;