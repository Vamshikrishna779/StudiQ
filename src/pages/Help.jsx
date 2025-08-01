import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiHelpCircle, FiMail, FiMessageSquare, FiFileText, FiGlobe, FiUsers } from 'react-icons/fi';

export default function HelpPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('faq');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Contact form submitted:', contactForm);
    setIsSubmitted(true);
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const faqs = [
    {
      question: "How do I post a question?",
      answer: "Navigate to the home page and click on the 'Ask your question' box. Type your question, select a subject, and click 'Post Question'."
    },
    {
      question: "How do I earn points?",
      answer: "You earn points by asking questions, providing helpful answers, and receiving upvotes on your contributions."
    },
    {
      question: "Can I change my display name?",
      answer: "Yes, you can change your display name in the Account Settings page under Profile Information."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Click on the three dots next to any question or answer and select 'Report'. Our moderation team will review it."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Currently we're web-only, but our site is fully responsive and works great on mobile browsers."
    }
  ];

  const guides = [
    {
      title: "Getting Started",
      content: "Learn how to create an account, set up your profile, and make your first post."
    },
    {
      title: "Community Guidelines",
      content: "Understand our rules and expectations for participation in the StudiQ community."
    },
    {
      title: "Answering Questions",
      content: "Tips for providing helpful, high-quality answers that earn you points and reputation."
    },
    {
      title: "Privacy & Security",
      content: "How we protect your data and what you can do to keep your account secure."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 backdrop-blur-md ${darkMode ? 'bg-black/80' : 'bg-white/80'} shadow-sm`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={user ? "/" : "/login"} className="flex items-center text-teal-600 hover:text-teal-700">
            <FiArrowLeft className="mr-1" /> {user ? "Back to Home" : "Back to Login"}
          </Link>
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Help Center
          </h1>
          <div></div> {/* Spacer */}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className={`p-6 rounded-xl shadow-lg mb-8 backdrop-blur-sm ${
            darkMode ? 'bg-gray-800/70 border border-gray-700' : 'bg-white/80 border border-gray-200'
          }`}>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className={`p-4 rounded-lg sticky top-4 ${
                  darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                }`}>
                  <h2 className={`text-lg font-semibold mb-4 flex items-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    <FiHelpCircle className="mr-2 text-teal-500" />
                    Help Topics
                  </h2>
                  <nav className="space-y-2">
                    <button
                      onClick={() => setActiveTab('faq')}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        activeTab === 'faq'
                          ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30'
                          : darkMode
                            ? 'hover:bg-gray-600 text-gray-300'
                            : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      FAQs
                    </button>
                    <button
                      onClick={() => setActiveTab('guides')}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        activeTab === 'guides'
                          ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30'
                          : darkMode
                            ? 'hover:bg-gray-600 text-gray-300'
                            : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Guides
                    </button>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        activeTab === 'contact'
                          ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30'
                          : darkMode
                            ? 'hover:bg-gray-600 text-gray-300'
                            : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Contact Us
                    </button>
                    <button
                      onClick={() => setActiveTab('community')}
                      className={`w-full text-left px-3 py-2 rounded transition-all ${
                        activeTab === 'community'
                          ? 'bg-teal-500/10 text-teal-500 border border-teal-500/30'
                          : darkMode
                            ? 'hover:bg-gray-600 text-gray-300'
                            : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Community
                    </button>
                  </nav>
                </div>
              </div>

              {/* Content */}
              <div className="md:w-2/3">
                {activeTab === 'faq' && (
                  <div>
                    <h2 className={`text-xl font-semibold mb-6 flex items-center ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <FiHelpCircle className="mr-2 text-teal-500" />
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg ${
                            darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-white border border-gray-200'
                          }`}
                        >
                          <h3 className={`font-medium mb-2 ${
                            darkMode ? 'text-teal-400' : 'text-teal-600'
                          }`}>
                            {faq.question}
                          </h3>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'guides' && (
                  <div>
                    <h2 className={`text-xl font-semibold mb-6 flex items-center ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <FiFileText className="mr-2 text-teal-500" />
                      Helpful Guides
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {guides.map((guide, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg ${
                            darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-white border border-gray-200'
                          }`}
                        >
                          <h3 className={`font-medium mb-2 ${
                            darkMode ? 'text-teal-400' : 'text-teal-600'
                          }`}>
                            {guide.title}
                          </h3>
                          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {guide.content}
                          </p>
                          <button className={`mt-3 text-sm ${
                            darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'
                          }`}>
                            Read more →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div>
                    <h2 className={`text-xl font-semibold mb-6 flex items-center ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <FiMail className="mr-2 text-teal-500" />
                      Contact Support
                    </h2>
                    
                    {isSubmitted ? (
                      <div className={`p-4 rounded-lg ${
                        darkMode ? 'bg-teal-900/30 text-teal-200' : 'bg-teal-100 text-teal-800'
                      }`}>
                        Thank you for contacting us! We'll get back to you within 24 hours.
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={contactForm.name}
                            onChange={handleContactChange}
                            required
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
                            value={contactForm.email}
                            onChange={handleContactChange}
                            required
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="subject" className={`block text-sm font-medium mb-1 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Subject
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={contactForm.subject}
                            onChange={handleContactChange}
                            required
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          >
                            <option value="">Select a topic</option>
                            <option value="account">Account Issues</option>
                            <option value="technical">Technical Problems</option>
                            <option value="billing">Billing Questions</option>
                            <option value="feedback">Feedback</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className={`block text-sm font-medium mb-1 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={contactForm.message}
                            onChange={handleContactChange}
                            required
                            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                            }`}
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                            darkMode ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'
                          }`}
                        >
                          Send Message
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'community' && (
                  <div>
                    <h2 className={`text-xl font-semibold mb-6 flex items-center ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      <FiUsers className="mr-2 text-teal-500" />
                      Community Resources
                    </h2>
                    
                    <div className={`p-6 rounded-lg mb-6 ${
                      darkMode ? 'bg-gray-700/50 border border-gray-600' : 'bg-white border border-gray-200'
                    }`}>
                      <h3 className={`text-lg font-medium mb-3 ${
                        darkMode ? 'text-teal-400' : 'text-teal-600'
                      }`}>
                        Join Our Community
                      </h3>
                      <p className={`mb-4 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Connect with other learners, ask questions, and share knowledge in our active community forums.
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-gray-600/30' : 'bg-gray-100'
                        }`}>
                          <h4 className={`font-medium mb-2 ${
                            darkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            <FiMessageSquare className="inline mr-2 text-teal-500" />
                            Discussion Forums
                          </h4>
                          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Participate in topic-specific discussions with students and educators.
                          </p>
                          <button className={`mt-3 text-sm ${
                            darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'
                          }`}>
                            Visit Forums →
                          </button>
                        </div>
                        
                        <div className={`p-4 rounded-lg ${
                          darkMode ? 'bg-gray-600/30' : 'bg-gray-100'
                        }`}>
                          <h4 className={`font-medium mb-2 ${
                            darkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            <FiGlobe className="inline mr-2 text-teal-500" />
                            Local Study Groups
                          </h4>
                          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Find or create study groups in your area or language.
                          </p>
                          <button className={`mt-3 text-sm ${
                            darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-800'
                          }`}>
                            Find Groups →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}