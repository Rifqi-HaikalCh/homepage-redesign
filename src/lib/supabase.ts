import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Warning: Check if environment variables are properly set
if (typeof window !== 'undefined' && (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key')) {
  console.warn('⚠️ Supabase environment variables not set. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface Influencer {
  id: number;
  name: string;
  content_type: string;
  instagram: string;
  followers: string;
  city: string;
  avatar: string;
  created_at?: string;
  updated_at?: string;
}

export interface Package {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserRole {
  user_id: string;
  role: 'admin' | 'client' | 'influencer' | 'guest';
}

// Auth helper functions
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserRole = async (userId: string) => {
  const { data, error } = await supabase
    .from('users_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
    
  if (error) return null;
  return data?.role || 'guest';
};

export const signUp = async (email: string, password: string, role: 'admin' | 'client' | 'influencer' = 'client') => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || 'Registration failed');
  }

  // Insert user role
  const { error: roleError } = await supabase
    .from('users_roles')
    .insert({ user_id: authData.user.id, role });

  if (roleError) {
    throw new Error(roleError.message);
  }

  return { user: authData.user, role };
};

export const signIn = async (email: string, password: string) => {
  // Hanya lakukan proses sign in, jangan ambil role di sini.
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Hapus panggilan getUserRole dari sini.
  // const role = await getUserRole(data.user.id); // <--- HAPUS ATAU KOMENTARI BARIS INI

  // Kembalikan hanya data session dan user. AuthProvider akan mengurus sisanya.
  return { session: data.session, user: data.user };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};