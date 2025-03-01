import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Home Page
import Home from './pages/Home';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import CompleteProfile from './pages/auth/CompleteProfile';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import UserProfile from './pages/user/Profile';
import DonationHistory from './pages/user/DonationHistory';
import NewDonation from './pages/user/NewDonation';
import EmergencyRequests from './pages/user/EmergencyRequests';
import NewEmergencyRequest from './pages/user/NewEmergencyRequest';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageDonations from './pages/admin/ManageDonations';
import ManageEmergencyRequests from './pages/admin/ManageEmergencyRequests';
import ManageUsers from './pages/admin/ManageUsers';

// Layout
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-center" />
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/complete-profile" element={<CompleteProfile />} />
            
            <Route element={<Layout />}>
              {/* User Routes */}
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/donations" element={<DonationHistory />} />
              <Route path="/donations/new" element={<NewDonation />} />
              <Route path="/emergency-requests" element={<EmergencyRequests />} />
              <Route path="/emergency-requests/new" element={<NewEmergencyRequest />} />
              
              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/donations" element={<ManageDonations />} />
                <Route path="/admin/emergency-requests" element={<ManageEmergencyRequests />} />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>
            </Route>
          </Route>
          
          {/* Redirect to home if no route matches */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;