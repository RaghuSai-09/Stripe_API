import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);

  const login = () => {
    setIsSigned(true);
  };

  const logout = () => {
    setIsSigned(false);
  };

  return (
    <AuthContext.Provider value={{ isSigned, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
