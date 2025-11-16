import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  // checa flag explícita de autenticação
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  const userName = sessionStorage.getItem('userName');

  if (!isAuthenticated || !userName) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin) {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) return <Navigate to="/VisaoGeral" replace />;
  }

  return children;
};

export default ProtectedRoute;