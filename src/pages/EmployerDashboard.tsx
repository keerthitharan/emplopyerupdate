import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Building, UserCheck, Plus, Search, Filter, BarChart3, Eye, X, Calendar, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem('recentActivities');
    return saved ? JSON.parse(saved) : [];
  });

  // Get real-time stats from localStorage
  const getUserCount = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users).length : 0;
  };

  const getCompanyCount = () => {
    const companies = localStorage.getItem('companies');
    return companies ? JSON.parse(companies).length : 0;
  };

  const getCandidateCount = () => {
    const candidates = localStorage.getItem('candidates');
    return candidates ? JSON.parse(candidates).length : 0;
  };

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: 'Total Users',
      count: getUserCount().toString(),
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Building className="h-8 w-8 text-green-600" />,
      title: 'Companies',
      count: getCompanyCount().toString(),
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <UserCheck className="h-8 w-8 text-purple-600" />,
      title: 'Candidates',
      count: getCandidateCount().toString(),
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  const quickActions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts',
      icon: <Users className="h-6 w-6 text-blue-600" />,
      link: '/employer-dashboard/users',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      title: 'Company Management',
      description: 'Manage company profiles and information',
      icon: <Building className="h-6 w-6 text-green-600" />,
      link: '/employer-dashboard/companies',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      title: 'Candidate Database',
      description: 'View and manage candidate profiles',
      icon: <UserCheck className="h-6 w-6 text-purple-600" />,
      link: '/employer-dashboard/candidates',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    }
  ];

  // Get recent activities from localStorage
  const getRecentActivities = () => {
    const activities = localStorage.getItem('recentActivities');
    return activities ? JSON.parse(activities).slice(0, 5) : [];
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const handleActivityClick = (activity: any) => {
    // Get detailed data based on activity type
    let detailedData = null;
    
    if (activity.module === 'Users') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      detailedData = users.find((user: any) => 
        activity.message.includes(user.name)
      );
    } else if (activity.module === 'Companies') {
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      detailedData = companies.find((company: any) => 
        activity.message.includes(company.name)
      );
    } else if (activity.module === 'Candidates') {
      const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
      detailedData = candidates.find((candidate: any) => 
        activity.message.includes(candidate.name)
      );
    }
    
    setSelectedActivity({ ...activity, detailedData });
    setShowActivityModal(true);
  };

  const renderDetailedView = () => {
    if (!selectedActivity?.detailedData) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No detailed information available</p>
          <p className="text-sm text-gray-400">This item may have been deleted</p>
        </div>
      );
    }

    const data = selectedActivity.detailedData;
    const module = selectedActivity.module;

    if (module === 'Users') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {data.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {data.phone}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {data.joinDate}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  data.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (module === 'Companies') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.industry}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {data.location}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">
                  <a href={data.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    {data.website}
                  </a>
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {data.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {data.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employees</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.employees?.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Founded</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {data.founded}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  data.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  data.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (module === 'Candidates') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {data.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {data.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {data.location}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {data.position}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.experience}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Education</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.education}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
                <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{data.salary}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  data.status === 'Available' ? 'bg-green-100 text-green-800' : 
                  data.status === 'Interviewing' ? 'bg-blue-100 text-blue-800' :
                  data.status === 'Placed' ? 'bg-purple-100 text-purple-800' : 'bg-red-100 text-red-800'
                }`}>
                  {data.status}
                </span>
              </div>
            </div>
          </div>
          {data.skills && data.skills.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, idx: number) => (
                  <span key={idx} className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employer Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Manage your recruitment operations from here.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className={`border-2 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group ${stat.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                  {stat.count}
                </p>
              </div>
              <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`block border-2 rounded-xl p-6 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group ${action.color}`}
            >
              <div className="flex items-start space-x-4">
                <div className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
          <BarChart3 className="h-6 w-6 text-gray-400" />
        </div>
        <div className="space-y-4">
          {getRecentActivities().length > 0 ? (
            getRecentActivities().map((activity: any, index: number) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
                onClick={() => handleActivityClick(activity)}
              >
                <div className="flex items-center space-x-4">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'create' ? 'bg-green-500' : 
                  activity.type === 'update' ? 'bg-blue-500' : 
                  activity.type === 'delete' ? 'bg-red-500' : 'bg-gray-500'
                }`}></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                      <span>•</span>
                      <span>{activity.module}</span>
                    </div>
                  </div>
                </div>
                <Eye className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400">Start managing users, companies, or candidates to see activity here</p>
            </div>
          )}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Activity Details</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      selectedActivity?.type === 'create' ? 'bg-green-500' : 
                      selectedActivity?.type === 'update' ? 'bg-blue-500' : 
                      selectedActivity?.type === 'delete' ? 'bg-red-500' : 'bg-gray-500'
                    }`}></span>
                    <span>{selectedActivity?.message}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{selectedActivity && formatTimeAgo(selectedActivity.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {renderDetailedView()}

              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;