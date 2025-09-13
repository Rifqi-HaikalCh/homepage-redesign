'use client';

// React hooks dan context untuk state management
import React, { createContext, useContext, useEffect, useState } from 'react';
// Supabase client dan utility functions
import { supabase, getUserRole } from '@/lib/supabase';
// Supabase types untuk type safety
import { User, Session } from '@supabase/supabase-js';

// Enum untuk user roles - lebih maintainable
type UserRole = 'admin' | 'client' | 'influencer' | 'guest';

// Interface untuk context value - comprehensive auth state management
interface AuthContextType {
  // User state
  user: User | null; // Supabase user object
  session: Session | null; // Current session
  role: UserRole; // User role untuk authorization
  loading: boolean; // Loading state untuk UX
  
  // Auth actions
  signUp: (email: string, password: string, role?: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  // Utility functions
  setGuestMode: () => void; // Mode guest untuk browsing tanpa login
  setUser: (user: User | null) => void; // Manual user setter
  setRole: (role: UserRole) => void; // Manual role setter
}

// Context creation dengan proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider - Central authentication state management
 * 
 * Handles:
 * - User authentication dengan Supabase
 * - Role-based authorization
 * - Session persistence
 * - Loading states untuk better UX
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Authentication state
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>('guest'); // Default guest mode
  const [loading, setLoading] = useState<boolean>(true);

  // Effect untuk initialize authentication state
  useEffect(() => {
    // Fetch initial session dan setup auth state listener
    const initializeAuthState = async (): Promise<void> => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userRole = await getUserRole(session.user.id);
        setRole(userRole || 'guest');
      } else {
        // Check if user has chosen guest mode previously
        if (typeof window !== 'undefined') {
          const guestMode = localStorage.getItem('guest-mode');
          if (guestMode === 'true') {
            setRole('guest');
          }
        }
      }
      
      setLoading(false);
    };

    initializeAuthState();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userRole = await getUserRole(session.user.id);
          setRole(userRole || 'guest');
        } else {
          setRole('guest');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, role: UserRole = 'client') => {
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const response = await fetch('/api/auth', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Immediate state update for successful login
    if (data.user) {
      setUser(data.user);
      setSession(data.session || null);
      setRole(data.role || 'client');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('guest-mode');
      }
    }

    return data;
  };

  const signOut = async () => {
    const response = await fetch('/api/auth', {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Logout failed');
    }

    setUser(null);
    setSession(null);
    setRole('guest');
  };

  const setGuestMode = () => {
    setUser(null);
    setSession(null);
    setRole('guest');
    if (typeof window !== 'undefined') {
      localStorage.setItem('guest-mode', 'true');
    }
  };

  const value = {
    user,
    session,
    role,
    loading,
    signUp,
    signIn,
    signOut,
    setGuestMode,
    setUser,
    setRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}