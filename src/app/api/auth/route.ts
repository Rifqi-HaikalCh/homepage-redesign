import { supabase, signUp, signIn } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// Register new user
export async function POST(request: Request) {
  try {
    const { email, password, role = 'client' } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    const result = await signUp(email, password, role);
    
    return NextResponse.json({
      message: 'Registrasi berhasil',
      user: result.user,
      role: result.role
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal mendaftar' },
      { status: 400 }
    );
  }
}

// Login user
export async function PUT(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    const result = await signIn(email, password);

    return NextResponse.json({
      message: 'Login berhasil',
      session: result.session,
      user: result.user,
      role: result.role
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal login' },
      { status: 401 }
    );
  }
}

// Logout user
export async function DELETE() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Logout berhasil' });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal logout' },
      { status: 500 }
    );
  }
}