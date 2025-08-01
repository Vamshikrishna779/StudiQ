import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

export default function VerifyEmail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-xl bg-white shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
            <FiMail className="w-8 h-8 text-teal-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        
        <div className="text-sm text-gray-500 mb-6">
          Didn't receive the email? <button className="text-teal-600 hover:text-teal-500 font-medium">Resend</button>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center text-teal-600 hover:text-teal-500 font-medium"
        >
          <FiArrowLeft className="mr-1" /> Back to home
        </Link>
      </div>
    </div>
  );
}