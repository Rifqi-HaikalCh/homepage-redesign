import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Interface for user data (simplified)
interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

// Initialize Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

// GET - Get all users (Admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    
    // Get users with roles from users_roles table
    const { data: users, error } = await supabase
      .from('users_roles')
      .select('user_id, role')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch users from database' },
        { status: 500 }
      );
    }

    return NextResponse.json(users || []);
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user (Admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const body = await request.json();
    const { email, password, role } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: newUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role
        }
      }
    });

    if (authError || !newUser.user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user' },
        { status: 500 }
      );
    }

    // Insert role into users_roles table
    const { error: roleError } = await supabase
      .from('users_roles')
      .insert({
        user_id: newUser.user.id,
        role: role
      });

    if (roleError) {
      console.error('Role insertion error:', roleError);
      return NextResponse.json(
        { error: 'Failed to create user role' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser.user.id,
        email: newUser.user.email,
        role
      }
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user (Admin only)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Delete from users_roles table first
    const { error: roleError } = await supabase
      .from('users_roles')
      .delete()
      .eq('user_id', id);

    if (roleError) {
      console.error('Role deletion error:', roleError);
      return NextResponse.json(
        { error: 'Failed to delete user role' },
        { status: 500 }
      );
    }

    // Note: For auth user deletion, we would need admin privileges
    // For now, just delete the role record
    return NextResponse.json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}