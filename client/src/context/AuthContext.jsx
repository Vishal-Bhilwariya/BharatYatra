import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/user/profile');
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('userToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data } = await api.post('/user/login', { email, password });
    localStorage.setItem('userToken', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/user/register', { name, email, password });
    localStorage.setItem('userToken', data.token);
    setUser(data.user);
    return data;
  };

  const googleLogin = async (googleData) => {
    const { data } = await api.post('/user/google', googleData);
    localStorage.setItem('userToken', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
