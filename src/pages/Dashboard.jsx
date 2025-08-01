import React, { useState, useEffect } from 'react';
import { FiAward, FiMessageSquare, FiWifi, FiWifiOff, FiClock, FiBook, FiBarChart2, FiHelpCircle } from 'react-icons/fi';
import { ProgressBar, Badge } from 'react-bootstrap';

const StudentDashboard = () => {
  // State for various dashboard features
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState(isOnline ? 'All data synced' : 'Offline - changes will sync when back online');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeTab, setActiveTab] = useState('progress');

  // Mock user data - replace with actual API calls
  const [userData, setUserData] = useState({
    name: 'Rahul',
    xp: 1250,
    level: 3,
    streak: 7,
    badges: ['Fast Learner', 'Math Whiz', 'Consistent'],
    weeklyProgress: {
      math: 20,
      science: 15,
      language: 10
    },
    leaderboardPosition: 42,
    pendingSync: false
  });

  // Check online status and sync
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('Syncing your progress...');
      // Simulate sync
      setTimeout(() => {
        setSyncStatus('All data synced');
        setUserData(prev => ({ ...prev, pendingSync: false }));
      }, 2000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('Offline - changes will sync when back online');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // AI-generated weekly report
  const weeklyReport = `Great job this week, ${userData.name}! You've improved ${userData.weeklyProgress.math}% in Math, 
  ${userData.weeklyProgress.science}% in Science, and ${userData.weeklyProgress.language}% in Language. 
  Keep focusing on Algebra - you're making great progress!`;

  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, name: 'Priya', xp: 2450, avatar: '👩‍🎓' },
    { id: 2, name: 'Amit', xp: 2100, avatar: '👨‍🎓' },
    { id: 3, name: 'Neha', xp: 1950, avatar: '👩‍💻' },
    { id: userData.leaderboardPosition, name: userData.name, xp: userData.xp, avatar: '😊', isCurrentUser: true },
    { id: 44, name: 'Ravi', xp: 1100, avatar: '👨‍💻' },
    { id: 45, name: 'Sanya', xp: 1050, avatar: '👩‍🔬' }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="student-dashboard bg-gray-50 min-h-screen p-4 md:p-8">
      {/* Header with user profile and status */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {userData.name}!</h1>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            {isOnline ? <FiWifi className="mr-1 text-green-500" /> : <FiWifiOff className="mr-1 text-red-500" />}
            <span>{syncStatus}</span>
            {userData.pendingSync && <span className="ml-2 text-yellow-600">(Pending sync)</span>}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">Level</div>
            <div className="text-xl font-bold">{userData.level}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">XP</div>
            <div className="text-xl font-bold">{userData.xp}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">Streak</div>
            <div className="text-xl font-bold flex items-center">
              {userData.streak} <FiClock className="ml-1 text-yellow-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowHelpModal(true)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-full shadow-lg transition-all"
        >
          <FiHelpCircle className="mr-2" />
          Struggling? Chat with AI Tutor
        </button>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">AI Tutor Assistance</h3>
            <p className="mb-4">What subject are you having trouble with?</p>
            
            <div className="space-y-3">
              <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded flex items-center">
                <FiBook className="mr-2" /> Math Help
              </button>
              <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded flex items-center">
                <FiBook className="mr-2" /> Science Help
              </button>
              <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded flex items-center">
                <FiBook className="mr-2" /> Language Help
              </button>
            </div>
            
            <button 
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <nav className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'progress' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('progress')}
        >
          <FiBarChart2 className="inline mr-2" />
          My Progress
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'leaderboard' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <FiAward className="inline mr-2" />
          Leaderboard
        </button>
      </nav>

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div>
          {/* Weekly Report Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiAward className="text-yellow-500 mr-2" />
              Weekly Report
            </h2>
            <p className="text-gray-700 mb-4">{weeklyReport}</p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Math</span>
                  <span>{userData.weeklyProgress.math}% improvement</span>
                </div>
                <ProgressBar now={userData.weeklyProgress.math} variant="success" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Science</span>
                  <span>{userData.weeklyProgress.science}% improvement</span>
                </div>
                <ProgressBar now={userData.weeklyProgress.science} variant="info" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Language</span>
                  <span>{userData.weeklyProgress.language}% improvement</span>
                </div>
                <ProgressBar now={userData.weeklyProgress.language} variant="warning" />
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Badges</h2>
            <div className="flex flex-wrap gap-3">
              {userData.badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  pill 
                  bg="light" 
                  className="border border-gray-300 text-gray-800 py-2 px-4 flex items-center"
                >
                  <FiAward className="text-yellow-500 mr-2" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recommended Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Algebra Basics', subject: 'Math', progress: 65 },
                { title: 'Photosynthesis', subject: 'Science', progress: 30 },
                { title: 'Essay Writing', subject: 'Language', progress: 10 }
              ].map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="text-sm text-gray-500 mb-2">{item.subject}</div>
                  <ProgressBar now={item.progress} label={`${item.progress}%`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Class Leaderboard</h2>
          <div className="space-y-4">
            {leaderboardData.slice(0, 10).map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-lg ${user.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
              >
                <div className="text-2xl mr-4">{user.avatar}</div>
                <div className="flex-grow">
                  <div className="font-medium">
                    {user.isCurrentUser ? 'You' : user.name}
                    {index < 3 && <span className="ml-2 text-yellow-500">🏆</span>}
                  </div>
                  <div className="text-sm text-gray-500">Level {Math.floor(user.xp / 500) + 1}</div>
                </div>
                <div className="font-bold">{user.xp} XP</div>
              </div>
            ))}
          </div>
          {userData.leaderboardPosition > 10 && (
            <div className="mt-4 text-center text-gray-500">
              You're at position #{userData.leaderboardPosition} on the full leaderboard
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;