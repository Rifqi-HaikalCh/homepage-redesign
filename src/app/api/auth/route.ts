import { supabase, signUp, signIn, getUserRole } from '@/lib/supabase';
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
    console.error('Registration error:', error);
    const message = error instanceof Error ? error.message : 'Gagal mendaftar';
    
    if (message.includes('User already registered')) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar. Silakan gunakan email lain atau login.' },
        { status: 400 }
      );
    }
    
    if (message.includes('Password should be at least 6 characters')) {
      return NextResponse.json(
        { error: 'Password minimal harus 6 karakter.' },
        { status: 400 }
      );
    }
    
    if (message.includes('For security purposes, you can only request this after')) {
      const seconds = message.match(/(\d+) seconds/)?.[1] || '60';
      return NextResponse.json(
        { 
          error: `Terlalu banyak percobaan registrasi. Silakan coba lagi setelah ${seconds} detik.`,
          rateLimited: true,
          retryAfter: parseInt(seconds)
        },
        { status: 429 }
      );
    }
    
    if (message.includes('Invalid email format')) {
      return NextResponse.json(
        { error: 'Format email tidak valid. Gunakan email yang benar.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: `Terjadi kesalahan saat registrasi: ${message}` },
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

    // Get user role separately
    const role = await getUserRole(result.user.id);

    return NextResponse.json({
      message: 'Login berhasil',
      session: result.session,
      user: result.user,
      role: role
    });

  } catch (error: unknown) {
    console.error('Auth error:', error);
    const message = error instanceof Error ? error.message : 'Gagal login';
    
    if (message.includes('Invalid login credentials')) {
      return NextResponse.json(
        { error: 'Email atau password yang Anda masukkan salah.' },
        { status: 401 }
      );
    }
    
    if (message.includes('For security purposes, you can only request this after')) {
      const seconds = message.match(/(\d+) seconds/)?.[1] || '60';
      return NextResponse.json(
        { 
          error: `Terlalu banyak percobaan login. Silakan coba lagi setelah ${seconds} detik.`,
          rateLimited: true,
          retryAfter: parseInt(seconds)
        },
        { status: 429 }
      );
    }
    
    if (message.includes('Invalid API key') || message.includes('Server configuration error')) {
      return NextResponse.json(
        { error: 'Kesalahan konfigurasi server. Pastikan environment variables Supabase sudah benar.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: `Terjadi kesalahan: ${message}` },
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