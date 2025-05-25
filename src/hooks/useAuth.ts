
"use client";
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { User } from 'firebase/auth'; // Ensure User type is available if needed directly by consumers

// Define a more specific return type for useAuth
export interface UseAuthReturn {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  signup: (data: import('@/types').SignupFormData) => Promise<User | null>;
  login: (data: import('@/types').LoginFormData) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
