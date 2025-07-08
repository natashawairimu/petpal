import { createContext, useState, useContext } from 'react';
import { loginUser, registerUser } from '../services/Api';

export const AuthContext = createContext();

// Custom hook to use the AuthContext in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Ensures useAuth is only called inside a provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Store the logged-in user and token in local state
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (credentials) => {
    try {
      
      const response = await loginUser(credentials);

      // Store the token in localStorage and update state
      localStorage.setItem('token', response.access_token);
      setToken(response.access_token);
      setUser(response.user); 

      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Send user registration data to backend
      const response = await registerUser(userData);
      return response;
    } catch (error) {

      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);   
    setUser(null);   
  };

  const value = {
    user,     
    token,    
    login,    
    register, 
    logout    
  };

  // Provide the auth context value to all child components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
