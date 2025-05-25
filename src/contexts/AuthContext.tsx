
"use client";

import type { User, AuthError } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider, // Added
  signInWithPopup     // Added
} from 'firebase/auth';
import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { LoginFormData, SignupFormData } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (data: SignupFormData) => Promise<User | null>;
  login: (data: LoginFormData) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>; // Added
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const googleProvider = new GoogleAuthProvider(); // Added

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const signup = async (data: SignupFormData): Promise<User | null> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Signup Successful", description: "Welcome! You are now logged in." });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Signup error:", authError);
      toast({ title: "Signup Failed", description: authError.message || "An unknown error occurred.", variant: "destructive" });
      return null;
    }
  };

  const login = async (data: LoginFormData): Promise<User | null> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError);
      toast({ title: "Login Failed", description: authError.message || "Invalid email or password.", variant: "destructive" });
      return null;
    }
  };

  const signInWithGoogle = async (): Promise<User | null> => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      toast({ title: "Signed In with Google", description: "Welcome! You are now logged in." });
      return userCredential.user;
    } catch (error) {
      const authError = error as AuthError;
      console.error("Google Sign-In error:", authError);
      // Handle specific errors like popup closed by user, account exists with different credential, etc.
      if (authError.code === 'auth/popup-closed-by-user') {
        toast({ title: "Sign-In Cancelled", description: "The Google Sign-In popup was closed.", variant: "default" });
      } else if (authError.code === 'auth/account-exists-with-different-credential') {
         toast({ title: "Sign-In Failed", description: "An account already exists with this email address using a different sign-in method.", variant: "destructive" });
      }
      else {
        toast({ title: "Google Sign-In Failed", description: authError.message || "An unknown error occurred.", variant: "destructive" });
      }
      return null;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
    } catch (error) {
      const authError = error as AuthError;
      console.error("Logout error:", authError);
      toast({ title: "Logout Failed", description: authError.message, variant: "destructive" });
    }
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    signInWithGoogle, // Added
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
