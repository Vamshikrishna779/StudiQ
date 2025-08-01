import React from 'react';
import { useAuth } from '../features/auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 px-4 py-3 border-b dark:border-gray-700 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">AI Tutor Platform</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
      >
        Logout
      </button>
    </header>
  );
}
