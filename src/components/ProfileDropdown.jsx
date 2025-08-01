import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function ProfileDropdown({ user, points }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg">
              {user.displayName?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <span className="hidden md:inline text-teal-400">{points} pts</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 border border-gray-700 z-50">
          <div className="py-1">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <FiUser className="mr-2" /> Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <FiSettings className="mr-2" /> Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}