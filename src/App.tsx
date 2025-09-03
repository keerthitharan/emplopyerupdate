import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import StaffingExpertises from './pages/StaffingExpertises';
import Contact from './pages/Contact';
import Employee from './pages/Employee';
import Employer from './pages/Employer';
import EmployerLogin from './pages/EmployerLogin';
import EmployerDashboard from './pages/EmployerDashboard';
import UserManagement from './pages/UserManagement';
import CompanyManagement from './pages/CompanyManagement';
import CandidateManagement from './pages/CandidateManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/staffing-expertises" element={<StaffingExpertises />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/employer" element={<Employer />} />
            <Route path="/employer-login" element={<EmployerLogin />} />
            <Route 
              path="/employer-dashboard" 
              element={
                <ProtectedRoute>
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-management" 
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/company-management" 
              element={
                <ProtectedRoute>
                  <CompanyManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/candidate-management" 
              element={
                <ProtectedRoute>
                  <CandidateManagement />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;