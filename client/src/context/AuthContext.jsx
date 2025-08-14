import React, { createContext, useEffect, useState } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize state from localStorage to keep the user logged in on refresh
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(false); // Add a loading state

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await API.post('/api/auth/login', credentials);
      setUser(data.user); // Assuming the API returns { user: {...}, token: '...' }
      setToken(data.token);
      setLoading(false);
      return data; // Return data for successful navigation
    } catch (error) {
      setLoading(false);
      throw error; // Throw error to be caught in the component
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // Clear localStorage completely on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const authContextValue = { user, token, login, logout, loading };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
