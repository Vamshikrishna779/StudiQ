import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export const ProtectedRoute = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div className="p-4 text-center">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
