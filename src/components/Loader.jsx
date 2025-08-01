import React from 'react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
      <p className="text-gray-600 dark:text-gray-300">{message}</p>
    </div>
  );
}
