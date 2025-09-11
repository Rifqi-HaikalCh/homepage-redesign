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

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mendaftar';
    return NextResponse.json(
      { error: message },
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

    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are not set');
      return NextResponse.json(
        { error: 'Server configuration error. Please check Supabase settings.' },
        { status: 500 }
      );
    }

    if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your_supabase_anon_key_here') {
      console.error('Supabase anon key is not configured properly');
      return NextResponse.json(
        { error: 'Server configuration error. Supabase key not configured.' },
        { status: 500 }
      );
    }

    const result = await signIn(email, password);

    return NextResponse.json({
      message: 'Login berhasil',
      session: result.session,
      user: result.user,
      role: result.role
    });

  } catch (error: unknown) {
    console.error('Auth error:', error);
    const message = error instanceof Error ? error.message : 'Gagal login';
    
    // Check for specific Supabase errors
    if (message.includes('Invalid login credentials')) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }
    
    if (message.includes('Invalid API key')) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: message },
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

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal logout';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}