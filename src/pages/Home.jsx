// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FiSearch, FiBookOpen, FiAward, FiUsers, FiMessageSquare, FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

// // export default function Home() {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [selectedSubject, setSelectedSubject] = useState('all');
  
// //   const subjects = [
// //     { id: 'math', name: 'Mathematics' },
// //     { id: 'science', name: 'Science' },
// //     { id: 'history', name: 'History' },
// //     { id: 'english', name: 'English' },
// //     { id: 'coding', name: 'Computer Science' }
// //   ];

// //   const trendingQuestions = [
// //     {
// //       id: 1,
// //       title: "How do I solve quadratic equations using the quadratic formula?",
// //       subject: 'math',
// //       answers: 12,
// //       votes: 45,
// //       answered: true,
// //       difficulty: 'medium'
// //     },
// //     {
// //       id: 2,
// //       title: "What's the difference between mitosis and meiosis?",
// //       subject: 'science',
// //       answers: 8,
// //       votes: 32,
// //       answered: true,
// //       difficulty: 'hard'
// //     },
// //     {
// //       id: 3,
// //       title: "Why did World War I start?",
// //       subject: 'history',
// //       answers: 5,
// //       votes: 18,
// //       answered: false,
// //       difficulty: 'easy'
// //     }
// //   ];

// //   const recentQuestions = [
// //     {
// //       id: 4,
// //       title: "Can someone explain Python list comprehensions?",
// //       subject: 'coding',
// //       answers: 3,
// //       votes: 7,
// //       answered: false,
// //       difficulty: 'medium'
// //     },
// //     {
// //       id: 5,
// //       title: "How to calculate the area of a circle?",
// //       subject: 'math',
// //       answers: 0,
// //       votes: 2,
// //       answered: false,
// //       difficulty: 'easy'
// //     }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <Link to="/" className="text-2xl font-bold text-teal-600">Studi</Link>
          
// //           <div className="relative w-full max-w-xl mx-4">
// //             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //               <FiSearch className="text-gray-400" />
// //             </div>
// //             <input
// //               type="text"
// //               placeholder="Search for questions..."
// //               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </div>

// //           <nav className="flex items-center space-x-4">
// //             <Link to="/login" className="text-gray-600 hover:text-teal-600">Log in</Link>
// //             <Link to="/signup" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">Sign up</Link>
// //           </nav>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="container mx-auto px-4 py-8">
// //         <div className="flex flex-col md:flex-row gap-8">
// //           {/* Left Sidebar */}
// //           <div className="w-full md:w-1/4">
// //             <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
// //               <h3 className="font-semibold text-lg mb-4 flex items-center">
// //                 <FiBookOpen className="mr-2 text-teal-600" />
// //                 Subjects
// //               </h3>
// //               <ul className="space-y-2">
// //                 <li>
// //                   <button 
// //                     onClick={() => setSelectedSubject('all')}
// //                     className={`w-full text-left px-3 py-2 rounded ${selectedSubject === 'all' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
// //                   >
// //                     All Subjects
// //                   </button>
// //                 </li>
// //                 {subjects.map((subject) => (
// //                   <li key={subject.id}>
// //                     <button 
// //                       onClick={() => setSelectedSubject(subject.id)}
// //                       className={`w-full text-left px-3 py-2 rounded ${selectedSubject === subject.id ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
// //                     >
// //                       {subject.name}
// //                     </button>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             <div className="bg-white p-4 rounded-lg shadow-sm">
// //               <h3 className="font-semibold text-lg mb-4 flex items-center">
// //                 <FiAward className="mr-2 text-teal-600" />
// //                 Your Stats
// //               </h3>
// //               <div className="space-y-3">
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Points</span>
// //                   <span className="font-medium">1,245</span>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Questions</span>
// //                   <span className="font-medium">28</span>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Answers</span>
// //                   <span className="font-medium">56</span>
// //                 </div>
// //                 <div className="flex justify-between items-center">
// //                   <span className="text-gray-600">Best Answers</span>
// //                   <span className="font-medium">12</span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="w-full md:w-2/4">
// //             <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
// //               <h2 className="text-xl font-semibold mb-4">Ask your question</h2>
// //               <textarea
// //                 placeholder="What do you need help with?"
// //                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
// //                 rows={4}
// //               ></textarea>
// //               <div className="mt-4 flex justify-between items-center">
// //                 <div className="flex space-x-2">
// //                   <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
// //                     Math
// //                   </button>
// //                   <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
// //                     + Add subject
// //                   </button>
// //                 </div>
// //                 <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
// //                   Post Question
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="bg-white p-6 rounded-lg shadow-sm">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h2 className="text-xl font-semibold flex items-center">
// //                   <FiTrendingUp className="mr-2 text-teal-600" />
// //                   Trending Questions
// //                 </h2>
// //                 <div className="flex space-x-2">
// //                   <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
// //                     Today
// //                   </button>
// //                   <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
// //                     This Week
// //                   </button>
// //                 </div>
// //               </div>

// //               <div className="space-y-4">
// //                 {trendingQuestions.map((question) => (
// //                   <QuestionCard key={question.id} question={question} />
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Sidebar */}
// //           <div className="w-full md:w-1/4">
// //             <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
// //               <h3 className="font-semibold text-lg mb-4 flex items-center">
// //                 <FiClock className="mr-2 text-teal-600" />
// //                 Recent Questions
// //               </h3>
// //               <div className="space-y-4">
// //                 {recentQuestions.map((question) => (
// //                   <div key={question.id} className="border-b border-gray-100 pb-4 last:border-0">
// //                     <Link to={`/question/${question.id}`} className="text-sm font-medium text-gray-800 hover:text-teal-600">
// //                       {question.title}
// //                     </Link>
// //                     <div className="flex items-center mt-2 text-xs text-gray-500">
// //                       <span className="mr-2">{question.answers} answers</span>
// //                       <span>{question.votes} votes</span>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="bg-white p-4 rounded-lg shadow-sm">
// //               <h3 className="font-semibold text-lg mb-4 flex items-center">
// //                 <FiUsers className="mr-2 text-teal-600" />
// //                 Top Contributors
// //               </h3>
// //               <div className="space-y-3">
// //                 {[1, 2, 3, 4, 5].map((user) => (
// //                   <div key={user} className="flex items-center">
// //                     <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
// //                     <div className="flex-1">
// //                       <div className="font-medium">User {user}</div>
// //                       <div className="text-xs text-gray-500">{user * 245} points</div>
// //                     </div>
// //                     <button className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200">
// //                       Follow
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // function QuestionCard({ question }) {
// //   return (
// //     <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-200 hover:shadow-md transition-all">
// //       <div className="flex items-start">
// //         <div className="flex flex-col items-center mr-4">
// //           <button className="text-gray-400 hover:text-teal-600">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
// //             </svg>
// //           </button>
// //           <span className="font-medium text-gray-800 my-1">{question.votes}</span>
// //           <button className="text-gray-400 hover:text-teal-600">
// //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
// //             </svg>
// //           </button>
// //         </div>
// //         <div className="flex-1">
// //           <Link to={`/question/${question.id}`} className="text-lg font-medium text-gray-800 hover:text-teal-600">
// //             {question.title}
// //           </Link>
// //           <div className="flex items-center mt-2 space-x-4">
// //             <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{question.subject}</span>
// //             <span className="text-xs text-gray-500">
// //               {question.answers} {question.answers === 1 ? 'answer' : 'answers'}
// //             </span>
// //             {question.answered && (
// //               <span className="text-xs flex items-center text-green-600">
// //                 <FiCheckCircle className="mr-1" /> Answered
// //               </span>
// //             )}
// //           </div>
// //           <div className="mt-3 flex justify-between items-center">
// //             <div className="flex items-center">
// //               <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
// //               <span className="text-sm text-gray-600">User123</span>
// //             </div>
// //             <button className="text-sm text-teal-600 hover:text-teal-800 flex items-center">
// //               <FiMessageSquare className="mr-1" /> Answer
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }// import React, { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { FiBook, FiAward, FiWifi, FiUser, FiCheckCircle, FiGlobe, FiEye, FiX } from 'react-icons/fi';

// // // export default function Home() {
// // //   const [showDemoModal, setShowDemoModal] = useState(false);
// // //   const [language, setLanguage] = useState('en');
// // //   const [highContrast, setHighContrast] = useState(false);
// // //   const [isOnline, setIsOnline] = useState(navigator.onLine);
// // //   const [darkMode, setDarkMode] = useState(false); // Added dark mode state

// // //   // Check online status
// // //   useEffect(() => {
// // //     const handleOnline = () => setIsOnline(true);
// // //     const handleOffline = () => setIsOnline(false);

// // //     window.addEventListener('online', handleOnline);
// // //     window.addEventListener('offline', handleOffline);

// // //     return () => {
// // //       window.removeEventListener('online', handleOnline);
// // //       window.removeEventListener('offline', handleOffline);
// // //     };
// // //   }, []);

// // //   // Toggle dark mode
// // //   const toggleDarkMode = () => {
// // //     setDarkMode(!darkMode);
// // //     document.documentElement.classList.toggle('dark', !darkMode);
// // //   };

// // //   const features = [
// // //     {
// // //       icon: <FiBook className="w-5 h-5" />,
// // //       title: "Personalized Learning",
// // //       description: "AI-powered lessons tailored to your needs"
// // //     },
// // //     {
// // //       icon: <FiAward className="w-5 h-5" />,
// // //       title: "Interactive Quizzes",
// // //       description: "Adaptive assessments with instant feedback"
// // //     },
// // //     {
// // //       icon: <FiWifi className="w-5 h-5" />,
// // //       title: "Offline Access",
// // //       description: "Full functionality without internet"
// // //     },
// // //     {
// // //       icon: <FiUser className="w-5 h-5" />,
// // //       title: "AI Tutor",
// // //       description: "24/7 learning assistance"
// // //     }
// // //   ];

// // //   const testimonials = [
// // //     {
// // //       quote: "This changed how I learn math! Works perfectly in my village with no stable internet.",
// // //       author: "Rahul, Grade 8 Student",
// // //       location: "Rural Maharashtra"
// // //     },
// // //     {
// // //       quote: "My students can continue learning even during power outages. The offline mode is brilliant.",
// // //       author: "Priya M., Teacher",
// // //       location: "Uttar Pradesh"
// // //     },
// // //     {
// // //       quote: "I love how it explains concepts in simple terms. The AI tutor feels like a real teacher!",
// // //       author: "Anjali, Grade 10 Student",
// // //       location: "Rural Karnataka"
// // //     }
// // //   ];

// // //   // Define theme classes
// // //   const themeClasses = {
// // //     background: highContrast ? 'bg-white' : darkMode ? 'bg-gray-900' : 'bg-gray-50',
// // //     text: highContrast ? 'text-black' : darkMode ? 'text-white' : 'text-gray-800',
// // //     card: highContrast ? 'bg-white border-2 border-black' : darkMode ? 'bg-gray-800' : 'bg-white',
// // //     button: highContrast ? 'bg-black text-white' : 'bg-teal-600 text-white',
// // //     border: highContrast ? 'border-black' : darkMode ? 'border-gray-700' : 'border-gray-200'
// // //   };

// // //   return (
// // //     <div className={`min-h-screen transition-colors duration-300 ${themeClasses.background} ${themeClasses.text}`}>

// // //       {/* Accessibility Controls */}
// // //       <div className="fixed bottom-4 right-4 z-50 flex gap-2">
// // //         <button 
// // //           onClick={() => setHighContrast(!highContrast)}
// // //           className="p-2 rounded-full bg-teal-600 text-white shadow-lg"
// // //           aria-label="Toggle high contrast mode"
// // //         >
// // //           <FiEye className="w-5 h-5" />
// // //         </button>
// // //         <button
// // //           onClick={toggleDarkMode}
// // //           className="p-2 rounded-full bg-teal-600 text-white shadow-lg"
// // //           aria-label="Toggle dark mode"
// // //         >
// // //           {darkMode ? '☀️' : '🌙'}
// // //         </button>
// // //         <div className="relative">
// // //           <select 
// // //             value={language}
// // //             onChange={(e) => setLanguage(e.target.value)}
// // //             className="p-2 pr-8 rounded-full bg-teal-600 text-white appearance-none shadow-lg"
// // //           >
// // //             <option value="en">English</option>
// // //             <option value="hi">हिंदी</option>
// // //             <option value="ta">தமிழ்</option>
// // //             <option value="te">తెలుగు</option>
// // //           </select>
// // //           <FiGlobe className="absolute right-2 top-2.5 text-white pointer-events-none" />
// // //         </div>
// // //       </div>

// // //       {/* Demo Modal */}
// // //       {showDemoModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
// // //           <div className={`relative max-w-2xl w-full rounded-lg p-6 ${themeClasses.card}`}>
// // //             <button 
// // //               onClick={() => setShowDemoModal(false)}
// // //               className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
// // //             >
// // //               <FiX className="w-5 h-5" />
// // //             </button>
// // //             <h3 className="text-xl font-bold mb-4">Try a Sample Lesson</h3>
// // //             <div className="aspect-w-16 aspect-h-9 mb-4">
// // //               <video 
// // //                 autoPlay 
// // //                 muted 
// // //                 loop 
// // //                 className="w-full rounded-lg shadow-xl"
// // //                 poster="/demo-poster.jpg"
// // //               >
// // //                 <source src="/demo-video.mp4" type="video/mp4" />
// // //               </video>
// // //             </div>
// // //             <p className="mb-4">Experience how our AI tutor explains a math concept (no signup needed).</p>
// // //             <div className="flex flex-wrap gap-3">
// // //               <button className={`px-4 py-2 ${themeClasses.button} rounded hover:bg-teal-700`}>
// // //                 Math Demo
// // //               </button>
// // //               <button className={`px-4 py-2 border ${themeClasses.border} rounded`}>
// // //                 Science Demo
// // //               </button>
// // //               <button className={`px-4 py-2 border ${themeClasses.border} rounded`}>
// // //                 Language Demo
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       <div className="container mx-auto px-4 py-12">
// // //         {/* Header */}
// // //         <header className="flex justify-between items-center mb-16">
// // //           <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
// // //             AI Tutor
// // //           </h1>
// // //           <nav className="hidden md:flex gap-4">
// // //             <Link to="/login" className={`px-4 py-2 text-sm font-medium hover:text-teal-400 ${themeClasses.text}`}>
// // //               Login
// // //             </Link>
// // //             <Link to="/signup" className={`px-4 py-2 text-sm font-medium hover:text-teal-400 ${themeClasses.text}`}>
// // //               Sign Up
// // //             </Link>
// // //           </nav>
// // //         </header>

// // //         {/* Hero Section */}
// // //         <section className="mb-24 text-center">
// // //           <div className={`max-w-4xl mx-auto p-8 md:p-12 rounded-xl shadow-lg ${themeClasses.card}`}>
// // //             <div className="aspect-w-16 aspect-h-9 mb-8 mx-auto max-w-3xl">
// // //               <video 
// // //                 autoPlay 
// // //                 muted 
// // //                 loop 
// // //                 playsInline
// // //                 className="w-full rounded-lg shadow-xl"
// // //                 poster="/hero-poster.jpg"
// // //               >
// // //                 <source src="/hero-video.mp4" type="video/mp4" />
// // //                 Your browser does not support the video tag.
// // //               </video>
// // //             </div>
// // //             <h2 className="text-4xl font-bold mb-4">
// // //               {language === 'hi' ? 'हर छात्र के लिए बुद्धिमान शिक्षा' : 'Intelligent Learning for Every Student'}
// // //             </h2>
// // //             <p className={`text-lg mb-8 ${highContrast ? 'text-black' : darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
// // //               {language === 'hi' ? 
// // //                 'कम कनेक्टिविटी वाले क्षेत्रों के लिए बनाया गया। कभी भी, कहीं भी सीखें - स्मार्ट, सुरक्षित और ऑफ़लाइन-तैयार।' : 
// // //                 'Built for areas with low connectivity. Learn anytime, anywhere—smart, secure, and offline-ready.'}
// // //             </p>
// // //             <div className="flex justify-center gap-4 flex-wrap">
// // //               <Link to="/signup" className={`px-6 py-3 ${themeClasses.button} font-medium rounded-lg hover:bg-teal-700`}>
// // //                 {language === 'hi' ? 'शुरू करें' : 'Get Started'}
// // //               </Link>
// // //               <button 
// // //                 onClick={() => setShowDemoModal(true)}
// // //                 className={`px-6 py-3 border ${themeClasses.border} rounded-lg hover:border-teal-400`}
// // //               >
// // //                 {language === 'hi' ? 'डेमो देखें' : 'Try Demo'}
// // //               </button>
// // //             </div>
// // //             {!isOnline && (
// // //               <div className="mt-4 text-sm text-teal-600 dark:text-teal-400">
// // //                 ⚡ You're offline - but you can still try our demo lessons!
// // //               </div>
// // //             )}
// // //           </div>
// // //         </section>

// // //         {/* Features */}
// // //         <section className="mb-24">
// // //           <h3 className={`text-xl font-semibold mb-8 text-center ${themeClasses.text}`}>
// // //             {language === 'hi' ? 'मुख्य विशेषताएं' : 'Core Features'}
// // //           </h3>
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {features.map((feature, index) => (
// // //               <div 
// // //                 key={index} 
// // //                 className={`p-6 rounded-xl hover:shadow-lg transition-all ${themeClasses.card}`}
// // //               >
// // //                 <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4">
// // //                   {feature.icon}
// // //                 </div>
// // //                 <h4 className={`font-medium mb-2 ${themeClasses.text}`}>{feature.title}</h4>
// // //                 <p className={`text-sm ${highContrast ? 'text-black' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// // //                   {feature.description}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* Why Choose Us */}
// // //         <section className="mb-24 text-center max-w-3xl mx-auto">
// // //           <h3 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>
// // //             {language === 'hi' ? 'हमें क्यों चुनें?' : 'Why Choose Us'}
// // //           </h3>
// // //           <ul className={`space-y-3 text-left ${highContrast ? 'list-disc pl-5 text-black' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// // //             <li className="flex items-center gap-2"><FiCheckCircle className="text-teal-500" /> 
// // //               {language === 'hi' ? 'ऑफ़लाइन-प्रथम पहुंच' : 'Offline-first accessibility'}
// // //             </li>
// // //             <li className="flex items-center gap-2"><FiCheckCircle className="text-teal-500" /> 
// // //               {language === 'hi' ? 'अनुकूली एआई ट्यूटर' : 'Adaptive AI tutor'}
// // //             </li>
// // //             <li className="flex items-center gap-2"><FiCheckCircle className="text-teal-500" /> 
// // //               {language === 'hi' ? 'बहुभाषी समर्थन' : 'Multilingual support'}
// // //             </li>
// // //             <li className="flex items-center gap-2"><FiCheckCircle className="text-teal-500" /> 
// // //               {language === 'hi' ? 'कम-एंड एंड्रॉइड डिवाइस पर काम करता है' : 'Works on low-end Android devices'}
// // //             </li>
// // //           </ul>
// // //         </section>

// // //         {/* Testimonials */}
// // //         <section className="mb-24">
// // //           <h3 className={`text-xl font-semibold mb-8 text-center ${themeClasses.text}`}>
// // //             {language === 'hi' ? 'छात्र क्या कहते हैं' : 'What Students Say'}
// // //           </h3>
// // //           <div className="grid md:grid-cols-3 gap-6">
// // //             {testimonials.map((testimonial, i) => (
// // //               <div 
// // //                 key={i} 
// // //                 className={`p-6 rounded-lg text-sm ${themeClasses.card}`}
// // //               >
// // //                 <p className={`italic mb-3 ${themeClasses.text}`}>"{testimonial.quote}"</p>
// // //                 <p className={`font-medium ${themeClasses.text}`}>{testimonial.author}</p>
// // //                 <p className={`text-xs opacity-75 ${highContrast ? 'text-black' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
// // //                   {testimonial.location}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </section>

// // //         {/* CTA Footer */}
// // //         <section className={`text-center py-12 ${themeClasses.border}`}>
// // //           <h4 className={`text-xl font-semibold mb-4 ${themeClasses.text}`}>
// // //             {language === 'hi' ? 'आज ही अपनी सीखने की यात्रा शुरू करें।' : 'Start your learning journey today.'}
// // //           </h4>
// // //           <Link to="/signup" className={`px-6 py-3 ${themeClasses.button} rounded hover:bg-teal-700`}>
// // //             {language === 'hi' ? 'अपना खाता बनाएं' : 'Create Your Account'}
// // //           </Link>
// // //         </section>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { 
//   collection, query, orderBy, onSnapshot, 
//   addDoc, serverTimestamp, where, limit
// } from 'firebase/firestore';
// import { ref, onValue } from 'firebase/database';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../firebase';
// import { db, rtdb } from "../firebase";
// import { signOut } from 'firebase/auth';
// import { useTheme } from '../context/ThemeContext';


// import QuestionCard from '../components/QuestionCard';
// import { 
//   FiSearch, FiBookOpen, FiAward, FiUsers, 
//   FiMessageSquare, FiTrendingUp, FiLogOut,
//   FiUser, FiSettings, FiHelpCircle, FiMoon, FiSun
// } from 'react-icons/fi';

// export default function Home() {
//   const [user] = useAuthState(auth);
//   const [questions, setQuestions] = useState([]);
//   const [trendingQuestions, setTrendingQuestions] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [newQuestion, setNewQuestion] = useState('');
//   const [selectedSubject, setSelectedSubject] = useState('all');
//   const [userPoints, setUserPoints] = useState(0);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);
//   const navigate = useNavigate();
//   const { darkMode } = useTheme();


//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark', !darkMode);
//   };

//   // Realtime questions listener
//   useEffect(() => {
//     const q = query(
//       collection(db, 'questions'),
//       orderBy('createdAt', 'desc'),
//       limit(50)
//     );
    
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const questionsData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setQuestions(questionsData);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Realtime trending questions (most voted)
//   useEffect(() => {
//     const q = query(
//       collection(db, 'questions'),
//       orderBy('votes', 'desc'),
//       limit(5)
//     );
    
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const trendingData = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setTrendingQuestions(trendingData);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Realtime user points
//   useEffect(() => {
//     if (user) {
//       const userRef = ref(rtdb, `users/${user.uid}/points`);
//       onValue(userRef, (snapshot) => {
//         setUserPoints(snapshot.val() || 0);
//       });
//     }
//   }, [user]);

//   const handleSubmitQuestion = async (e) => {
//     e.preventDefault();
//     if (!newQuestion.trim()) return;

//     await addDoc(collection(db, 'questions'), {
//       title: newQuestion,
//       subject: selectedSubject,
//       userId: user?.uid,
//       userDisplayName: user?.displayName || 'Anonymous',
//       votes: 0,
//       answers: 0,
//       createdAt: serverTimestamp(),
//       answered: false
//     });

//     setNewQuestion('');
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   const filteredQuestions = questions.filter(q => 
//     (selectedSubject === 'all' || q.subject === selectedSubject) &&
//     q.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
// <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>      {/* Header */}
//       <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
//             StudiQ
//           </Link>
          
//           <div className="relative w-full max-w-xl mx-4">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//             </div>
//             <input
//               type="text"
//               placeholder="Search for questions..."
//               className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
//                 darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
//               }`}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <nav className="flex items-center space-x-4">
//             {/* <button 
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-200 text-gray-700'}`}
//             >
//               {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
//             </button> */}
            
//             {user ? (
//               <div className="relative">
//                 <button 
//                   onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                   className="flex items-center space-x-2 focus:outline-none"
//                 >
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
//                   }`}>
//                     {user.displayName?.charAt(0) || 'U'}
//                   </div>
//                 </button>
                
//                 {showProfileDropdown && (
//                   <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 ${
//                     darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
//                   }`}>
//                     <Link 
//                       to="/profile" 
//                       className={`block px-4 py-2 text-sm flex items-center ${
//                         darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
//                       }`}
//                     >
//                       <FiUser className="mr-2" /> Profile
//                     </Link>
//                     <Link 
//                       to="/settings" 
//                       className={`block px-4 py-2 text-sm flex items-center ${
//                         darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
//                       }`}
//                     >
//                       <FiSettings className="mr-2" /> Settings
//                     </Link>
//                     <Link 
//                       to="/help" 
//                       className={`block px-4 py-2 text-sm flex items-center ${
//                         darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
//                       }`}
//                     >
//                       <FiHelpCircle className="mr-2" /> Help
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className={`w-full text-left px-4 py-2 text-sm flex items-center ${
//                         darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       <FiLogOut className="mr-2" /> Sign out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <>
//                 <Link 
//                   to="/login" 
//                   className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
//                 >
//                   Log in
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 shadow-md"
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Left Sidebar */}
//           <div className="w-full md:w-1/4">
//             <div className={`p-4 rounded-lg shadow-sm mb-6 backdrop-blur-sm ${
//               darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//             }`}>
//               <h3 className="font-semibold text-lg mb-4 flex items-center">
//                 <FiBookOpen className="mr-2 text-teal-500" />
//                 <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Subjects</span>
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <button 
//                     onClick={() => setSelectedSubject('all')}
//                     className={`w-full text-left px-3 py-2 rounded transition-all ${
//                       selectedSubject === 'all' 
//                         ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30' 
//                         : darkMode 
//                           ? 'hover:bg-gray-700/50 text-gray-300' 
//                           : 'hover:bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     All Subjects
//                   </button>
//                 </li>
//                 {['math', 'science', 'history', 'english', 'coding'].map((subject) => (
//                   <li key={subject}>
//                     <button 
//                       onClick={() => setSelectedSubject(subject)}
//                       className={`w-full text-left px-3 py-2 rounded transition-all ${
//                         selectedSubject === subject 
//                           ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30' 
//                           : darkMode 
//                             ? 'hover:bg-gray-700/50 text-gray-300' 
//                             : 'hover:bg-gray-100 text-gray-700'
//                       }`}
//                     >
//                       {subject.charAt(0).toUpperCase() + subject.slice(1)}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {user && (
//               <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
//                 darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//               }`}>
//                 <h3 className="font-semibold text-lg mb-4 flex items-center">
//                   <FiAward className="mr-2 text-teal-500" />
//                   <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Your Stats</span>
//                 </h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center">
//                     <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Points</span>
//                     <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>{userPoints}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Questions</span>
//                     <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                       {questions.filter(q => q.userId === user.uid).length}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Answers</span>
//                     <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>0</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="w-full md:w-2/4">
//             {user && (
//               <div className={`p-6 rounded-lg shadow-sm mb-6 backdrop-blur-sm ${
//                 darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//               }`}>
//                 <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                   Ask your question
//                 </h2>
//                 <form onSubmit={handleSubmitQuestion}>
//                   <textarea
//                     placeholder="What do you need help with?"
//                     className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
//                       darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
//                     }`}
//                     rows={4}
//                     value={newQuestion}
//                     onChange={(e) => setNewQuestion(e.target.value)}
//                     required
//                   ></textarea>
//                   <div className="mt-4 flex justify-between items-center">
//                     <select
//                       value={selectedSubject}
//                       onChange={(e) => setSelectedSubject(e.target.value)}
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         darkMode 
//                           ? 'bg-gray-700 text-gray-200 border-gray-600' 
//                           : 'bg-gray-100 text-gray-700 border-gray-300'
//                       } border`}
//                     >
//                       <option value="math">Math</option>
//                       <option value="science">Science</option>
//                       <option value="history">History</option>
//                       <option value="english">English</option>
//                       <option value="coding">Coding</option>
//                     </select>
//                     <button 
//                       type="submit"
//                       className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 shadow-md"
//                     >
//                       Post Question
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             <div className={`p-6 rounded-lg shadow-sm mb-6 backdrop-blur-sm ${
//               darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//             }`}>
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                   <FiTrendingUp className="mr-2 text-teal-500" />
//                   Trending Questions
//                 </h2>
//               </div>
//               <div className="space-y-4">
//                 {trendingQuestions.map((question) => (
//                   <QuestionCard key={question.id} question={question} darkMode={darkMode} />
//                 ))}
//               </div>
//             </div>

//             <div className={`p-6 rounded-lg shadow-sm backdrop-blur-sm ${
//               darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//             }`}>
//               <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                 Recent Questions
//               </h2>
//               <div className="space-y-4">
//                 {filteredQuestions.map((question) => (
//                   <QuestionCard key={question.id} question={question} darkMode={darkMode} />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar */}
//           <div className="w-full md:w-1/4">
//             <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
//               darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//             }`}>
//               <h3 className="font-semibold text-lg mb-4 flex items-center">
//                 <FiUsers className="mr-2 text-teal-500" />
//                 <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Top Contributors</span>
//               </h3>
//               <TopContributors darkMode={darkMode} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function TopContributors({ darkMode }) {
//   const [contributors, setContributors] = useState([]);

//   useEffect(() => {
//     const contributorsRef = ref(rtdb, 'users');
//     onValue(contributorsRef, (snapshot) => {
//       const usersData = snapshot.val();
//       if (usersData) {
//         const sorted = Object.entries(usersData)
//           .map(([id, user]) => ({ id, ...user }))
//           .sort((a, b) => (b.points || 0) - (a.points || 0))
//           .slice(0, 5);
//         setContributors(sorted);
//       }
//     });
//   }, []);

//   return (
//     <div className="space-y-3">
//       {contributors.map((user) => (
//         <div key={user.id} className="flex items-center">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//             darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
//           }`}>
//             {user.displayName?.charAt(0) || 'U'}
//           </div>
//           <div className="flex-1 ml-3">
//             <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//               {user.displayName || 'User'}
//             </div>
//             <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//               {user.points || 0} points
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // Profile Page Component
// export function ProfilePage() {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (user) {
//       const userRef = ref(rtdb, `users/${user.uid}`);
//       onValue(userRef, (snapshot) => {
//         setUserData(snapshot.val());
//       });
//     }
//   }, [user]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark', !darkMode);
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   if (!user) {
//     return <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
//         <Link to="/login" className="text-teal-600 hover:underline">Go to login page</Link>
//       </div>
//     </div>;
//   }

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header */}
//       <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
//             StudiQ
//           </Link>
          
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-teal-400' : 'bg-gray-200 text-gray-700'}`}
//             >
//               {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
//             </button>
            
//             <Link 
//               to="/" 
//               className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
//             >
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Profile Content */}
//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-3xl mx-auto">
//           <div className={`p-8 rounded-xl shadow-lg mb-8 backdrop-blur-sm ${
//             darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
//           }`}>
//             <div className="flex flex-col items-center mb-6">
//               <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 ${
//                 darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
//               }`}>
//                 {user.displayName?.charAt(0) || 'U'}
//               </div>
//               <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
//                 {user.displayName || 'User'}
//               </h1>
//               <div className={`flex items-center ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                 <FiAward className="mr-1" />
//                 <span className="font-medium">{userData?.points || 0} points</span>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//               <div className={`p-4 rounded-lg ${
//                 darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
//               }`}>
//                 <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                   Account Information
//                 </h3>
//                 <div className="space-y-2">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
//                     <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>{user.email}</p>
//                   </div>
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Member since</p>
//                     <p className={darkMode ? 'text-gray-200' : 'text-gray-800'}>
//                       {new Date(user.metadata.creationTime).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className={`p-4 rounded-lg ${
//                 darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
//               }`}>
//                 <h3 className={`font-semibold mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
//                   Your Stats
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Questions</p>
//                     <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                       {userData?.questions || 0}
//                     </p>
//                   </div>
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Answers</p>
//                     <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                       {userData?.answers || 0}
//                     </p>
//                   </div>
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Upvotes</p>
//                     <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                       {userData?.upvotes || 0}
//                     </p>
//                   </div>
//                   <div>
//                     <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Answers</p>
//                     <p className={`text-xl font-bold ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
//                       {userData?.bestAnswers || 0}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center">
//               <button
//                 onClick={handleLogout}
//                 className={`px-6 py-3 rounded-lg flex items-center ${
//                   darkMode 
//                     ? 'bg-red-600/90 text-white hover:bg-red-700' 
//                     : 'bg-red-500 text-white hover:bg-red-600'
//                 }`}
//               >
//                 <FiLogOut className="mr-2" /> Sign Out
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  collection, query, orderBy, onSnapshot, 
  addDoc, serverTimestamp, where, limit
} from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { db, rtdb } from "../firebase";
import { signOut } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext';

import QuestionCard from '../components/QuestionCard';
import { 
  FiSearch, FiBookOpen, FiAward, FiUsers, 
  FiMessageSquare, FiTrendingUp, FiLogOut,
  FiUser, FiSettings, FiHelpCircle, FiMoon, 
  FiSun, FiClock, FiBarChart2, FiActivity,
  FiStar, FiBookmark, FiEye
} from 'react-icons/fi';

export default function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [questions, setQuestions] = useState([]);
  const [trendingQuestions, setTrendingQuestions] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [topExperts, setTopExperts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Load questions
  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(questionsData);
    });

    return () => unsubscribe();
  }, []);

  // Load trending questions
  useEffect(() => {
    const q = query(
      collection(db, 'questions'),
      orderBy('votes', 'desc'),
      limit(5)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTrendingQuestions(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, []);

  // Load user data and stats
  useEffect(() => {
    if (user) {
      // User stats
      const userRef = ref(rtdb, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserStats(data);
        
        // Load recently viewed
        if (data?.recentlyViewed) {
          const viewedIds = Object.keys(data.recentlyViewed);
          const viewedQuery = query(
            collection(db, 'questions'),
            where('id', 'in', viewedIds)
          );
          onSnapshot(viewedQuery, (snap) => {
            setRecentlyViewed(snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          });
        }
        
        // Load bookmarks
        if (data?.bookmarks) {
          const bookmarkIds = Object.keys(data.bookmarks);
          const bookmarkQuery = query(
            collection(db, 'questions'),
            where('id', 'in', bookmarkIds)
          );
          onSnapshot(bookmarkQuery, (snap) => {
            setBookmarkedQuestions(snap.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })));
          });
        }
      });

      // Load top experts
      const expertsRef = ref(rtdb, 'users');
      onValue(expertsRef, (snapshot) => {
        const usersData = snapshot.val();
        if (usersData) {
          const sorted = Object.entries(usersData)
            .map(([id, user]) => ({ id, ...user }))
            .sort((a, b) => (b.points || 0) - (a.points || 0))
            .slice(0, 5);
          setTopExperts(sorted);
        }
      });
    }
  }, [user]);

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    await addDoc(collection(db, 'questions'), {
      title: newQuestion,
      subject: selectedSubject,
      userId: user?.uid,
      userDisplayName: user?.displayName || 'Anonymous',
      votes: 0,
      answers: 0,
      views: 0,
      createdAt: serverTimestamp(),
      answered: false,
      difficulty: 'medium'
    });

    setNewQuestion('');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const filteredQuestions = questions.filter(q => 
    (selectedSubject === 'all' || q.subject === selectedSubject) &&
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            StudiQ
          </Link>
          
          <div className="relative w-full max-w-xl mx-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              placeholder="Search for questions..."
              className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
                  }`}>
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-20 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <Link 
                      to="/profile" 
                      className={`block px-4 py-2 text-sm flex items-center ${
                        darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <FiUser className="mr-2" /> Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      className={`block px-4 py-2 text-sm flex items-center ${
                        darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <FiSettings className="mr-2" /> Settings
                    </Link>
                    <Link 
                      to="/help" 
                      className={`block px-4 py-2 text-sm flex items-center ${
                        darkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'
                      }`}
                    >
                      <FiHelpCircle className="mr-2" /> Help
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                        darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'
                      }`}
                    >
                      <FiLogOut className="mr-2" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 shadow-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FiBookOpen className="mr-2 text-teal-500" />
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Subjects</span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => setSelectedSubject('all')}
                    className={`w-full text-left px-3 py-2 rounded transition-all ${
                      selectedSubject === 'all' 
                        ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30' 
                        : darkMode 
                          ? 'hover:bg-gray-700/50 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    All Subjects
                  </button>
                </li>
                {['math', 'science', 'history', 'english', 'coding'].map((subject) => (
                  <li key={subject}>
                    <button 
                      onClick={() => setSelectedSubject(subject)}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        selectedSubject === subject 
                          ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30' 
                          : darkMode 
                            ? 'hover:bg-gray-700/50 text-gray-300' 
                            : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {user && (
              <>
                <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
                  darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
                }`}>
                  <h3 className="font-semibold text-lg mb-4 flex items-center">
                    <FiActivity className="mr-2 text-teal-500" />
                    <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Your Stats</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Points</span>
                      <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        {userStats?.points || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Questions</span>
                      <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        {userStats?.questions || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Answers</span>
                      <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        {userStats?.answers || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Best Answers</span>
                      <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        {userStats?.bestAnswers || 0}
                      </span>
                    </div>
                  </div>
                </div>

                {recentlyViewed.length > 0 && (
                  <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
                    darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
                  }`}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <FiClock className="mr-2 text-teal-500" />
                      <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Recently Viewed</span>
                    </h3>
                    <div className="space-y-3">
                      {recentlyViewed.slice(0, 3).map((question) => (
                        <Link 
                          key={question.id} 
                          to={`/question/${question.id}`}
                          className={`block truncate text-sm ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
                        >
                          {question.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {bookmarkedQuestions.length > 0 && (
                  <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
                    darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
                  }`}>
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <FiBookmark className="mr-2 text-teal-500" />
                      <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Your Bookmarks</span>
                    </h3>
                    <div className="space-y-3">
                      {bookmarkedQuestions.slice(0, 3).map((question) => (
                        <Link 
                          key={question.id} 
                          to={`/question/${question.id}`}
                          className={`block truncate text-sm ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
                        >
                          {question.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/4 space-y-6">
            {user && (
              <div className={`p-6 rounded-lg shadow-sm backdrop-blur-sm ${
                darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
              }`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Ask your question
                </h2>
                <form onSubmit={handleSubmitQuestion}>
                  <textarea
                    placeholder="What do you need help with? Be specific..."
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    rows={4}
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    required
                  ></textarea>
                  <div className="mt-4 flex justify-between items-center">
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200 border-gray-600' 
                          : 'bg-gray-100 text-gray-700 border-gray-300'
                      } border`}
                    >
                      <option value="math">Math</option>
                      <option value="science">Science</option>
                      <option value="history">History</option>
                      <option value="english">English</option>
                      <option value="coding">Coding</option>
                    </select>
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 shadow-md"
                    >
                      Post Question
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className={`p-6 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  <FiTrendingUp className="mr-2 text-teal-500" />
                  Trending Questions
                </h2>
                <Link 
                  to="/trending" 
                  className={`text-sm ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`}
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {trendingQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} darkMode={darkMode} />
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Recent Questions
                </h2>
                <Link 
                  to="/questions" 
                  className={`text-sm ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'}`}
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {filteredQuestions.slice(0, 5).map((question) => (
                  <QuestionCard key={question.id} question={question} darkMode={darkMode} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FiUsers className="mr-2 text-teal-500" />
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Top Contributors</span>
              </h3>
              <div className="space-y-3">
                {topExperts.map((expert, index) => (
                  <div key={expert.id} className="flex items-center">
                    <span className={`w-6 text-center mr-2 font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {index + 1}.
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
                    }`}>
                      {expert.displayName?.charAt(0) || 'E'}
                    </div>
                    <div className="flex-1 ml-3">
                      <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {expert.displayName || 'Expert'}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {expert.points || 0} points
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FiBarChart2 className="mr-2 text-teal-500" />
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Community Stats</span>
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Questions</span>
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                    {questions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Active Today</span>
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                    {questions.filter(q => {
                      const today = new Date();
                      const qDate = q.createdAt.toDate();
                      return qDate.getDate() === today.getDate() && 
                             qDate.getMonth() === today.getMonth() && 
                             qDate.getFullYear() === today.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Answered Rate</span>
  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
    {questions.length > 0 
      ? `${Math.round((questions.filter(q => q.answered).length / questions.length) * 100)}%`
      : '0%'}
  </span>
</div>

              </div>
            </div>

            <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FiStar className="mr-2 text-teal-500" />
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Featured Questions</span>
              </h3>
              <div className="space-y-3">
                {questions
                  .filter(q => q.featured)
                  .slice(0, 3)
                  .map(question => (
                    <Link 
                      key={question.id} 
                      to={`/question/${question.id}`}
                      className={`block truncate text-sm ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
                    >
                      {question.title}
                    </Link>
                  ))}
              </div>
            </div>

            <div className={`p-4 rounded-lg shadow-sm backdrop-blur-sm ${
              darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
            }`}>
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <FiEye className="mr-2 text-teal-500" />
                <span className={darkMode ? 'text-gray-200' : 'text-gray-800'}>Most Viewed</span>
              </h3>
              <div className="space-y-3">
                {questions
                  .sort((a, b) => (b.views || 0) - (a.views || 0))
                  .slice(0, 3)
                  .map(question => (
                    <Link 
                      key={question.id} 
                      to={`/question/${question.id}`}
                      className={`block truncate text-sm ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-700 hover:text-teal-600'}`}
                    >
                      {question.title} ({question.views || 0} views)
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TopContributors({ darkMode }) {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const contributorsRef = ref(rtdb, 'users');
    onValue(contributorsRef, (snapshot) => {
      const usersData = snapshot.val();
      if (usersData) {
        const sorted = Object.entries(usersData)
          .map(([id, user]) => ({ id, ...user }))
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .slice(0, 5);
        setContributors(sorted);
      }
    });
  }, []);

  return (
    <div className="space-y-3">
      {contributors.map((user) => (
        <div key={user.id} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-800'
          }`}>
            {user.displayName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 ml-3">
            <div className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {user.displayName || 'User'}
            </div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {user.points || 0} points
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}