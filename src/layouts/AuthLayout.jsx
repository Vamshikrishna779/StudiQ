import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Tutor Platform</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Empowering offline-first education
          </p>
        </div>
        {children}
        <div className="mt-4 text-center text-xs text-gray-400">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
