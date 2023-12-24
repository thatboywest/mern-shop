import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in from browser storage
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
    setIsLoading(false);
  }, []);

  const login = () => {
    // Implement your login logic here
    // For example, make an API call or use a state management library like Redux
    // ...

    // Simulate a successful login
    setIsLoggedIn(true);
    // Store the login status in browser storage
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    // Clear the login status from browser storage
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
