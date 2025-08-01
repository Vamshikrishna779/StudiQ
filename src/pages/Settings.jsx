// import React, { useState } from 'react';
// import { useTheme } from '../context/ThemeContext';

// export default function Settings() {
//   const { isDark, toggleTheme } = useTheme();
//   const [language, setLanguage] = useState('en');

//   return (
//     <div className="max-w-3xl mx-auto px-6 py-10">
//       <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md p-8 rounded-xl shadow-md border border-white/20">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>

//         {/* Theme Toggle */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//             Theme
//           </label>
//           <button
//             onClick={toggleTheme}
//             className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
//           >
//             {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//           </button>
//         </div>

//         {/* Language Selector */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//             Language
//           </label>
//           <select
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//             className="w-full p-2 bg-white/70 dark:bg-gray-800 text-gray-900 dark:text-white border rounded-lg"
//           >
//             <option value="en">English</option>
//             <option value="hi">Hindi</option>
//             <option value="te">Telugu</option>
//             <option value="ta">Tamil</option>
//             <option value="bn">Bengali</option>
//           </select>
//         </div>

//         {/* Storage management / Future features */}
//         <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">
//           More settings coming soon: offline storage, backup & sync...
//         </div>
//       </div>
//     </div>
//   );
// }import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, rtdb } from '../firebase';
import { ref, update, onValue } from 'firebase/database';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiUser, FiMail, FiLock, 
  FiGlobe, FiBell, FiMoon, FiSun, FiLogOut,
  FiCheck, FiX, FiSave
} from 'react-icons/fi';

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'en',
    notifications: true
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false
  });

  // Load user data
  useEffect(() => {
    if (user) {
      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
        setFormData(prev => ({
          ...prev,
          displayName: user.displayName || '',
          email: user.email || '',
          language: data?.language || 'en',
          notifications: data?.notifications ?? true
        }));
      });
    }
  }, [user]);

  // Check password requirements
  useEffect(() => {
    if (formData.newPassword) {
      setPasswordRequirements({
        length: formData.newPassword.length >= 8,
        uppercase: /[A-Z]/.test(formData.newPassword),
        number: /\d/.test(formData.newPassword),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword)
      });
    }
  }, [formData.newPassword]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess('');

    try {
      // Validate passwords match if changing
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      // Prepare updates
      const updates = {};
      
      // Update display name if changed
      if (formData.displayName !== user.displayName) {
        updates['displayName'] = formData.displayName;
      }

      // Update preferences
      updates['language'] = formData.language;
      updates['notifications'] = formData.notifications;
      updates['darkMode'] = darkMode;

      // Save to database
      await update(ref(rtdb, `users/${user.uid}`), updates);

      setSuccess('Settings updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      setErrors({
        general: error.message || 'Failed to update settings'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (user) {
      update(ref(rtdb, `users/${user.uid}`), {
        darkMode: newMode
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 rounded-xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Please sign in to access settings</h2>
          <Link 
            to="/login" 
            className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
          >
            Go to login page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/profile" className="flex items-center text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
            <FiArrowLeft className="mr-1" /> Back to Profile
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <div></div> {/* Spacer */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className={`p-6 rounded-xl shadow-lg mb-8 backdrop-blur-sm ${
            darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
          }`}>
            <form onSubmit={handleSubmit}>
              {errors.general && (
                <div className={`mb-4 p-3 rounded-lg ${
                  darkMode ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'
                }`}>
                  {errors.general}
                </div>
              )}
              
              {success && (
                <div className={`mb-4 p-3 rounded-lg ${
                  darkMode ? 'bg-teal-900/50 text-teal-200' : 'bg-teal-100 text-teal-800'
                }`}>
                  {success}
                </div>
              )}

              <div className="space-y-8">
                {/* Profile Section */}
                <div>
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <FiUser className="mr-2 text-teal-500" />
                    Profile Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="displayName" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700/50 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'
                        }`}
                      />
                      <p className={`mt-1 text-xs ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        Contact support to change your email address
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Section */}
                <div>
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <FiLock className="mr-2 text-teal-500" />
                    Security
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                        placeholder="Required for password changes"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    
                    {formData.newPassword && (
                      <div className={`p-3 rounded-lg ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                      }`}>
                        <h4 className={`text-sm font-medium mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Password Requirements:
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li className={`flex items-center ${
                            passwordRequirements.length ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {passwordRequirements.length ? <FiCheck className="mr-1" /> : <FiX className="mr-1" />}
                            At least 8 characters
                          </li>
                          <li className={`flex items-center ${
                            passwordRequirements.uppercase ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {passwordRequirements.uppercase ? <FiCheck className="mr-1" /> : <FiX className="mr-1" />}
                            At least one uppercase letter
                          </li>
                          <li className={`flex items-center ${
                            passwordRequirements.number ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {passwordRequirements.number ? <FiCheck className="mr-1" /> : <FiX className="mr-1" />}
                            At least one number
                          </li>
                          <li className={`flex items-center ${
                            passwordRequirements.specialChar ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {passwordRequirements.specialChar ? <FiCheck className="mr-1" /> : <FiX className="mr-1" />}
                            At least one special character
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div>
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <FiGlobe className="mr-2 text-teal-500" />
                    Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-medium ${
                          darkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          Theme
                        </h3>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {darkMode ? 'Dark mode' : 'Light mode'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full ${
                          darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-200 text-gray-700'
                        }`}
                        aria-label="Toggle dark mode"
                      >
                        {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div>
                      <label htmlFor="language" className={`block text-sm font-medium mb-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Language
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                          darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                        }`}
                      >
                        <option value="en">English</option>
                        <option value="hi">हिंदी (Hindi)</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="te">తెలుగు (Telugu)</option>
                        <option value="bn">বাংলা (Bengali)</option>
                        <option value="mr">मराठी (Marathi)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notifications"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleChange}
                        className={`h-4 w-4 rounded focus:ring-teal-500 ${
                          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                      <label htmlFor="notifications" className={`ml-2 block text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Email Notifications
                      </label>
                    </div>
                  </div>
                </div>

                {/* Actions Section */}
                <div className="pt-4 flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center justify-center ${
                      darkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                    }`}
                  >
                    <FiSave className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                      darkMode 
                        ? 'bg-red-600/90 text-white hover:bg-red-700 border border-red-700' 
                        : 'bg-red-500 text-white hover:bg-red-600 border border-red-600'
                    }`}
                  >
                    <FiLogOut className="mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}