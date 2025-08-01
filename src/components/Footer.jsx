import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm p-3 mt-auto">
      © {new Date().getFullYear()} AI Tutor Platform. All rights reserved.
    </footer>
  );
}
