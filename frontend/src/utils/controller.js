import React from 'react';
import { useAuth } from './auth'; 
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const { isSigned } = useAuth();

  if (!isSigned) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Auth;
