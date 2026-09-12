import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cartnest_token') || null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('cartnest_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const isLoggedIn = Boolean(token && currentUser);

  const login = async (email, password) => {
    const data = await apiService.login(email, password);
    if (data.success && data.token) {
      setToken(data.token);
      setCurrentUser(data.user);
      localStorage.setItem('cartnest_token', data.token);
      localStorage.setItem('cartnest_user', JSON.stringify(data.user));
      return data;
    }
    throw new Error(data.message || 'Login failed');
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('cartnest_token');
    localStorage.removeItem('cartnest_user');
  };

  return (
    <AuthContext.Provider value={{ token, currentUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
