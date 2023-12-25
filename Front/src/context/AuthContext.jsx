import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in from browser storage
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
    setIsLoading(false);
  }, []);

  const login = () => {




    setIsLoggedIn(true);
   
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    
    setIsLoggedIn(false);
  
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
