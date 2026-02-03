import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';

// Dashboard Components
import JuniorDashboard from './components/dashboard/JuniorDashboard';
import SeniorDashboard from './components/dashboard/SeniorDashboard';
import DashboardLayout from './components/dashboard/DashboardLayout';

// Profile Components
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';

// Doubt Components
import PostDoubt from './components/doubts/PostDoubt';
import DoubtsList from './components/doubts/DoubtsList';
import DoubtDetail from './components/doubts/DoubtDetail';

// Team Components
import CreateTeam from './components/teams/CreateTeam';
import TeamList from './components/teams/TeamList';

// AI Components
import AISuggestions from './components/ai/AISuggestions';

// Layout Components
import MainLayout from './components/layout/MainLayout';

// Styles
import './styles/App.css';
import './styles/Auth.css';
import './styles/Dashboard.css';
import './styles/Profile.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner">
          <div></div><div></div><div></div><div></div>
        </div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Dashboard Router - redirects to appropriate dashboard based on role
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return user.role === 'junior' ? <JuniorDashboard /> : <SeniorDashboard />;
};

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            
            {/* Protected Routes with Layout */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardRouter />} />
              
              {/* Profile */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              
              {/* Doubts */}
              <Route path="/doubts" element={<DoubtsList />} />
              <Route path="/doubts/:id" element={<DoubtDetail />} />
              <Route path="/doubts/post" element={<PostDoubt />} />
              
              {/* Teams */}
              <Route path="/teams" element={<TeamList />} />
              <Route path="/teams/create" element={<CreateTeam />} />
              
              {/* AI Suggestions */}
              <Route path="/ai-suggestions" element={<AISuggestions />} />
            </Route>
            
            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;