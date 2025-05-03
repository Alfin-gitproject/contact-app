import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (formData) => {
    try {
      console.log('Registering user with data:', formData);
      const res = await fetch('http://localhost:5000/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('Response status:', res.status, 'Response data:', data);
      
      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
      
      return { success: true, data }; // Explicitly return success and data
    } catch (error) {
      console.error('Fetch error:', error.message);
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      return { success: false, error: error.message }; // Explicit return structure
    }
  };
  const loginUser = async (formData) => {
    try {
      const res = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      localStorage.setItem('token', data.token);
      setUser(data.user);
      
      toast.success(`Welcome back, ${data.user.name}!`, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'colored',
      });
  
      // Return consistent object with success flag
      return { 
        success: true,
        user: data.user,
        token: data.token
      };
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      
      // Return consistent error format
      return { 
        success: false,
        error: error.message 
      };
    }
  };
  
  const logoutUser = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully', {
      position: 'top-right',
      autoClose: 2000,
      theme: 'colored',
    });
    return { success: true };
  };

  const authCheck = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');
      const res = await fetch('http://localhost:5000/api/user/me', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      // ... rest of the code
    } catch (error) {
      // ... error handling
    }
  };

  useEffect(() => {
    authCheck();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, logoutUser, authCheck }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;