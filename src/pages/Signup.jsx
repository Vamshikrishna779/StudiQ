// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiUser, FiMail, FiLock, FiArrowLeft, FiBook } from 'react-icons/fi';
// import { useAuth } from '../features/auth/useAuth';
// import { supabase } from '../utils/apiClient';

// export default function Signup() {
//   const navigate = useNavigate();
//   const { signup } = useAuth();

//   const [form, setForm] = useState({
//     full_name: '',
//     email: '',
//     password: '',
//     role: 'student',
//     grade: '',
//     school: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // 1. Sign up user
//       const { data, error: authError } = await signup(form.email, form.password);
//       if (authError) throw authError;

//       const userId = data.user.id;

//       // 2. Insert user profile
//       const { error: profileError } = await supabase.from('profiles').insert([
//         {
//           id: userId,
//           full_name: form.full_name,
//           email: form.email,
//           role: form.role,
//           grade: form.role === 'student' ? form.grade : null,
//           school: form.school,
//         },
//       ]);

//       if (profileError) throw profileError;

//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError(err.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
//       <div className="glass-container max-w-md w-full p-8 rounded-xl">
//         <div className="flex items-center mb-8">
//           <Link to="/" className="mr-4 text-gray-500 hover:text-teal-500">
//             <FiArrowLeft className="w-5 h-5" />
//           </Link>
//           <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
//             Create Account
//           </h1>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
//             <div className="relative">
//               <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 name="full_name"
//                 type="text"
//                 required
//                 value={form.full_name}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 name="email"
//                 type="email"
//                 required
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Password</label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 name="password"
//                 type="password"
//                 required
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Role */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Role</label>
//             <div className="flex gap-4">
//               {['student', 'teacher'].map((role) => (
//                 <label key={role} className="flex items-center gap-2">
//                   <input
//                     type="radio"
//                     name="role"
//                     value={role}
//                     checked={form.role === role}
//                     onChange={handleChange}
//                     className="text-teal-600"
//                   />
//                   <span className="capitalize text-gray-700 dark:text-gray-300">{role}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Grade (only for student) */}
//             {form.role === 'student' && (
//             <div>
//                 <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Education Level</label>
//                 <select
//                 name="grade"
//                 value={form.grade}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
//                 >
//                 <option value="">Select Level</option>
//                 {['Primary', 'Secondary', 'Intermediate', 'Graduation'].map((level) => (
//                     <option key={level} value={level}>{level}</option>
//                 ))}
//                 </select>
//             </div>
//             )}


//           {/* School (for both) */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">School/Institution</label>
//             <input
//               name="school"
//               type="text"
//               required
//               value={form.school}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Creating...' : 'Create Account'}
//           </button>
//         </form>

//         <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
//           Already have an account?{' '}
//           <Link to="/login" className="text-teal-600 dark:text-teal-400 hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      navigate('/verify-email');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-xl bg-white shadow-lg">
        <div className="flex items-center mb-8">
          <Link to="/" className="mr-4 text-gray-500 hover:text-teal-500">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-300 focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 rounded-lg"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 rounded-lg"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-gray-300 focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 pr-3 py-2 rounded-lg"
                placeholder="••••••••"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Minimum 6 characters
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                alt="Google logo" 
                className="h-5 w-5 mr-2"
              />
              Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}