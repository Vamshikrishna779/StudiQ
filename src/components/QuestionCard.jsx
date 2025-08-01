import React from 'react';
import { Link } from 'react-router-dom';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { ref, update } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, rtdb } from '../firebase';
import { FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

export default function QuestionCard({ question }) {
  const [user] = useAuthState(auth);

  const handleVote = async (direction) => {
    if (!user) return;
    
    // Update Firestore
    const questionRef = doc(db, 'questions', question.id);
    await updateDoc(questionRef, {
      votes: increment(direction === 'up' ? 1 : -1)
    });

    // Update Realtime DB user points
    if (direction === 'up') {
      const userRef = ref(rtdb, `users/${user.uid}/points`);
      await update(userRef, {
        points: increment(1)
      });
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-200 hover:shadow-md transition-all">
      <div className="flex items-start">
        <div className="flex flex-col items-center mr-4">
          <button 
            onClick={() => handleVote('up')}
            className="text-gray-400 hover:text-teal-600"
            disabled={!user}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="font-medium text-gray-800 my-1">{question.votes}</span>
          <button 
            onClick={() => handleVote('down')}
            className="text-gray-400 hover:text-teal-600"
            disabled={!user}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <Link to={`/question/${question.id}`} className="text-lg font-medium text-gray-800 hover:text-teal-600">
            {question.title}
          </Link>
          <div className="flex items-center mt-2 space-x-4">
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
              {question.subject}
            </span>
            <span className="text-xs text-gray-500">
              {question.answers || 0} {question.answers === 1 ? 'answer' : 'answers'}
            </span>
            {question.answered && (
              <span className="text-xs flex items-center text-green-600">
                <FiCheckCircle className="mr-1" /> Answered
              </span>
            )}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
                {question.userDisplayName?.charAt(0) || 'A'}
              </div>
              <span className="text-sm text-gray-600">{question.userDisplayName}</span>
            </div>
            <Link 
              to={`/question/${question.id}`}
              className="text-sm text-teal-600 hover:text-teal-800 flex items-center"
            >
              <FiMessageSquare className="mr-1" /> Answer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}