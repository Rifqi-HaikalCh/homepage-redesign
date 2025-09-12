import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data untuk development - replace dengan actual Supabase query
    const mockUsers = [
      {
        id: '1',
        email: 'admin@test.com',
        role: 'admin',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        email: 'client@test.com',
        role: 'client',
        created_at: '2024-01-02T00:00:00Z'
      },
      {
        id: '3',
        email: 'influencer@test.com',
        role: 'influencer',
        created_at: '2024-01-03T00:00:00Z'
      },
      {
        id: '4',
        email: 'user1@example.com',
        role: 'client',
        created_at: '2024-01-04T00:00:00Z'
      },
      {
        id: '5',
        email: 'influencer2@example.com',
        role: 'influencer',
        created_at: '2024-01-05T00:00:00Z'
      }
    ];

    return NextResponse.json(mockUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}