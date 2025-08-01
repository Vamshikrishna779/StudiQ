// src/features/auth/AuthProvider.jsx
import { createContext, useEffect, useState } from 'react';
import { supabase } from '../../utils/apiClient';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // ✅ Define the signup function here
  const signup = async (email, password) => {
    return await supabase.auth.signUp({ email, password });
  };

  const login = async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const logout = async () => {
    return await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
