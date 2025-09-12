import { NextResponse } from 'next/server';

// Simple test endpoint for development
export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();
    
    // Mock test users for development
    const mockUsers = {
      'admin@test.com': { role: 'admin', id: '1' },
      'client@test.com': { role: 'client', id: '2' },  
      'influencer@test.com': { role: 'influencer', id: '3' }
    };
    
    const userEmail = email as keyof typeof mockUsers;
    const mockUser = mockUsers[userEmail];
    
    if (!mockUser) {
      return NextResponse.json(
        { error: 'Invalid test user' },
        { status: 401 }
      );
    }
    
    return NextResponse.json({
      message: 'Test login successful',
      user: {
        id: mockUser.id,
        email: email
      },
      role: role || mockUser.role,
      session: { test: true }
    });
  } catch (error) {
    console.error('Test login error:', error);
    return NextResponse.json(
      { error: 'Test login failed' },
      { status: 500 }
    );
  }
}