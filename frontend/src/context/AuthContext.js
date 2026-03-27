import React, { createContext, useState, useEffect } from 'react';
import { getMe } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    async function loadMe() {
      if (token && !user) {
        try {
          const u = await getMe(token);
          setUser(u);
          localStorage.setItem('user', JSON.stringify(u));
        } catch { /* ignore */ }
      }
    }
    loadMe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  function login(tok, u = null) {
    localStorage.setItem('token', tok);
    setToken(tok);
    if (u) {
      setUser(u);
      localStorage.setItem('user', JSON.stringify(u));
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
