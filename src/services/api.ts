const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create headers with auth token
const createHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: createHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  register: async (userData: any) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  }
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/users'),
  getById: (id: number) => apiRequest(`/users/${id}`),
  create: (userData: any) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  update: (id: number, userData: any) => apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),
  delete: (id: number) => apiRequest(`/users/${id}`, {
    method: 'DELETE'
  })
};

// Companies API
export const companiesAPI = {
  getAll: () => apiRequest('/companies'),
  getById: (id: number) => apiRequest(`/companies/${id}`),
  create: (companyData: any) => apiRequest('/companies', {
    method: 'POST',
    body: JSON.stringify(companyData)
  }),
  update: (id: number, companyData: any) => apiRequest(`/companies/${id}`, {
    method: 'PUT',
    body: JSON.stringify(companyData)
  }),
  delete: (id: number) => apiRequest(`/companies/${id}`, {
    method: 'DELETE'
  }),
  search: (term: string) => apiRequest(`/companies/search/${encodeURIComponent(term)}`)
};

// Candidates API
export const candidatesAPI = {
  getAll: () => apiRequest('/candidates'),
  getById: (id: number) => apiRequest(`/candidates/${id}`),
  create: (candidateData: any) => apiRequest('/candidates', {
    method: 'POST',
    body: JSON.stringify(candidateData)
  }),
  update: (id: number, candidateData: any) => apiRequest(`/candidates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(candidateData)
  }),
  delete: (id: number) => apiRequest(`/candidates/${id}`, {
    method: 'DELETE'
  }),
  search: (term: string) => apiRequest(`/candidates/search/${encodeURIComponent(term)}`),
  getByStatus: (status: string) => apiRequest(`/candidates/status/${status}`)
};

// Stats API
export const statsAPI = {
  getStats: () => apiRequest('/stats'),
  getActivities: (limit: number = 10) => apiRequest(`/activities?limit=${limit}`)
};

// Health check
export const healthAPI = {
  check: () => apiRequest('/health', { method: 'GET' })
};