import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import ContentLibrary from '../pages/ContentLibrary';
import QuizZone from '../pages/QuizZone';
import AITutor from '../pages/AITutor';
import Progress from '../pages/Progress';
import OfflineHelp from '../pages/OfflineHelp';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Help from '../pages/Help';
import { ThemeProvider } from '../context/ThemeContext';


import MainLayout from '../layouts/MainLayout';

import AdminDashboard from '../admin/AdminDashboard';
import StudentManager from '../admin/StudentManager';
import ContentUploader from '../admin/ContentUploader';
import QuizManager from '../admin/QuizManager';

export default function AppRouter() {
  return (
     <ThemeProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/help" element={<Help />} />
                      <Route path="/settings" element={<Settings />} />



<Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/library" element={<ContentLibrary />} />
          <Route path="/quiz" element={<QuizZone />} />
          <Route path="/tutor" element={<AITutor />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/offline" element={<OfflineHelp />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentManager />} />
          <Route path="/admin/upload-content" element={<ContentUploader />} />
          <Route path="/admin/quiz-manager" element={<QuizManager />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </ThemeProvider>
  );
}
