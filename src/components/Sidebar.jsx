import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Content Library', to: '/library' },
  { label: 'Quiz Zone', to: '/quiz' },
  { label: 'AI Tutor', to: '/tutor' },
  { label: 'Progress', to: '/progress' },
  { label: 'Offline Help', to: '/offline' },
  { label: 'Settings', to: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg hidden sm:block">
      <div className="p-4 text-xl font-bold text-center border-b dark:border-gray-700">
        TutorAI
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
