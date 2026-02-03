import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      const response = await mockLoginAPI(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setToken(response.token);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await mockSignupAPI(userData);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        setToken(response.token);
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock APIs
const mockLoginAPI = async (email, password) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email && password) {
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: email,
        name: 'John Doe',
        college: 'MIT',
        role: 'junior',
        year: '3',
        department: 'Computer Science',
        interests: ['Coding', 'ML'],
        skills: ['React', 'JavaScript'],
        bio: 'Passionate developer',
        streak: 5,
        reputation: 45
      }
    };
  }
  
  return { success: false, error: 'Invalid credentials' };
};

const mockSignupAPI = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (userData.email && userData.password) {
    return {
      success: true,
      token: 'mock-jwt-token',
      user: {
        id: '1',
        ...userData,
        interests: [],
        skills: [],
        bio: '',
        streak: 0,
        reputation: 0
      }
    };
  }
  
  return { success: false, error: 'Signup failed' };
};