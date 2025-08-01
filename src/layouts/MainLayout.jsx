// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 w-full">
        <Header />
        <main className="flex-1 p-4 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}
