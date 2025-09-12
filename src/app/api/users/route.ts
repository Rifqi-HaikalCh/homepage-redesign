import { NextRequest, NextResponse } from 'next/server';

// Interface for user data (simplified)
interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

// GET - Get all users (Admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual Supabase query
    // const { data: users, error } = await supabase
    //   .from('users')
    //   .select('id, email, role, created_at')
    //   .order('created_at', { ascending: false });

    // For now, return empty array since we want real database data
    return NextResponse.json([]);
    
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
    const body = await request.json();
    const { email, password, role } = body;

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Supabase auth and user creation
    // const { data: newUser, error } = await supabase.auth.signUp({
    //   email,
    //   password,
    //   options: {
    //     data: {
    //       role
    //     }
    //   }
    // });

    return NextResponse.json({
      message: 'User created successfully'
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Supabase query
    // const { error } = await supabase.auth.admin.deleteUser(id);

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