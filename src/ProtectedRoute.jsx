
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userEmail = localStorage.getItem('bot_user_access_token');
  return userEmail ? <Outlet /> : <Navigate to="/loanapp/login" replace />;
};

export default ProtectedRoute;
