import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, rtdb } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiAward, FiBook, FiMessageSquare, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';
import { format } from 'date-fns';

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [userData, setUserData] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState('questions');

  // Load user profile data
  useEffect(() => {
    if (user) {
      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });

      // Load user's questions
      const qQuestions = query(
        collection(db, 'questions'),
        where('userId', '==', user.uid)
      );
      const unsubscribeQuestions = onSnapshot(qQuestions, (snapshot) => {
        setUserQuestions(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });

      // Load user's answers (assuming answers collection exists)
      const qAnswers = query(
        collection(db, 'answers'),
        where('userId', '==', user.uid)
      );
      const unsubscribeAnswers = onSnapshot(qAnswers, (snapshot) => {
        setUserAnswers(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });

      return () => {
        unsubscribeQuestions();
        unsubscribeAnswers();
      };
    }
  }, [user]);

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
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
          <Link to="/login" className="text-teal-600 hover:underline">Go to login page</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            StudiQ
          </Link>
          <nav className="flex items-center space-x-4">
            <Link to="/settings" className={`flex items-center ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}>
              <FiSettings className="mr-1" /> Settings
            </Link>
            <button
              onClick={handleLogout}
              className={`flex items-center ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-800'}`}
            >
              <FiLogOut className="mr-1" /> Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className={`p-6 rounded-xl shadow-lg mb-6 ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'} backdrop-blur-sm`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl ${
                darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
              }`}>
                {user.displayName?.charAt(0) || 'U'}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                  {user.displayName || 'User'}
                </h1>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.email}
                </p>
                <div className={`flex flex-wrap justify-center md:justify-start gap-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <div className="flex items-center">
                    <FiAward className="mr-2 text-teal-500" />
                    <span>{userData?.points || 0} Points</span>
                  </div>
                  <div className="flex items-center">
                    <FiBook className="mr-2 text-teal-500" />
                    <span>{userQuestions.length} Questions</span>
                  </div>
                  <div className="flex items-center">
                    <FiMessageSquare className="mr-2 text-teal-500" />
                    <span>{userAnswers.length} Answers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-semibold flex items-center">
                <FiAward className="mr-2 text-yellow-500" /> Best Answers
              </h3>
              <p className="text-2xl font-bold">{userData?.bestAnswers || 0}</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-semibold flex items-center">
                <FiClock className="mr-2 text-blue-500" /> Active Days
              </h3>
              <p className="text-2xl font-bold">{userData?.activeDays || 1}</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-semibold flex items-center">
                <FiUser className="mr-2 text-green-500" /> Member Since
              </h3>
              <p className="text-xl">
                {user?.metadata?.creationTime ? 
                  format(new Date(user.metadata.creationTime), 'MMM yyyy') : 
                  'Recently'}
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <h3 className="font-semibold flex items-center">
                <FiMessageSquare className="mr-2 text-purple-500" /> Answer Rate
              </h3>
              <p className="text-2xl font-bold">
  {userQuestions.length > 0 ?
    `${Math.round((userQuestions.filter(q => q.answered).length / userQuestions.length) * 100)}%` :
    '0%'}
</p>

            </div>
          </div>

          {/* Activity Tabs */}
         <div className={`mb-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
  <nav className="flex space-x-4">
    <button
      onClick={() => setActiveTab('questions')}
      className={`py-2 px-4 font-medium ${
        activeTab === 'questions'
          ? darkMode
            ? 'text-teal-400 border-b-2 border-teal-400'
            : 'text-teal-600 border-b-2 border-teal-600'
          : darkMode
            ? 'text-gray-400 hover:text-gray-300'
            : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      My Questions ({userQuestions.length})
    </button>

    <button
      onClick={() => setActiveTab('answers')}
      className={`py-2 px-4 font-medium ${
        activeTab === 'answers'
          ? darkMode
            ? 'text-teal-400 border-b-2 border-teal-400'
            : 'text-teal-600 border-b-2 border-teal-600'
          : darkMode
            ? 'text-gray-400 hover:text-gray-300'
            : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      My Answers ({userAnswers.length})
    </button>

    <button
      onClick={() => setActiveTab('bookmarks')}
      className={`py-2 px-4 font-medium ${
        activeTab === 'bookmarks'
          ? darkMode
            ? 'text-teal-400 border-b-2 border-teal-400'
            : 'text-teal-600 border-b-2 border-teal-600'
          : darkMode
            ? 'text-gray-400 hover:text-gray-300'
            : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      Bookmarks ({userData?.bookmarks ? Object.keys(userData.bookmarks).length : 0})
    </button>
  </nav>
</div>


          {/* Activity Content */}
          <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white/80'} backdrop-blur-sm`}>
            {activeTab === 'questions' && (
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FiBook className="inline mr-2" /> My Questions
                </h2>
                {userQuestions.length > 0 ? (
                  userQuestions.map(question => (
                    <div key={question.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Link 
                        to={`/question/${question.id}`} 
                        className={`font-medium block mb-1 ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`}
                      >
                        {question.title}
                      </Link>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <span className="capitalize">{question.subject}</span> • 
                        {question.createdAt?.toDate ? format(question.createdAt.toDate(), 'MMM d, yyyy') : 'Recent'} • 
                        {question.answered ? (
                          <span className="text-green-500 ml-1">Answered</span>
                        ) : (
                          <span className="text-yellow-500 ml-1">Pending</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No questions yet</p>
                )}
              </div>
            )}

            {activeTab === 'answers' && (
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FiMessageSquare className="inline mr-2" /> My Answers
                </h2>
                {userAnswers.length > 0 ? (
                  userAnswers.map(answer => (
                    <div key={answer.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      <Link 
                        to={`/question/${answer.questionId}`} 
                        className={`font-medium block mb-1 ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`}
                      >
                        {answer.content.substring(0, 100)}...
                      </Link>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {answer.createdAt?.toDate ? format(answer.createdAt.toDate(), 'MMM d, yyyy') : 'Recent'} • 
                        {answer.bestAnswer ? (
                          <span className="text-green-500 ml-1">Marked as Best</span>
                        ) : (
                          <span className="text-gray-500 ml-1">Regular answer</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No answers yet</p>
                )}
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div className="space-y-4">
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FiBookmark className="inline mr-2" /> My Bookmarks
                </h2>
                {userData?.bookmarks ? (
                  Object.keys(userData.bookmarks).length > 0 ? (
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Bookmarked questions will appear here</p>
                  ) : (
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No bookmarks yet</p>
                  )
                ) : (
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>No bookmarks yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}