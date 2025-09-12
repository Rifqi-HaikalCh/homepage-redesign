import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock data sesuai schema yang diberikan
    const mockPackages = [
      {
        id: 1,
        title: 'Basic Social Media Package',
        description: 'Perfect starter package for small businesses looking to establish social media presence',
        price: 'Rp 2,500,000',
        icon: '📱',
        category: 'social-media',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        title: 'Premium Influencer Campaign',
        description: 'Comprehensive influencer marketing campaign with top-tier creators',
        price: 'Rp 15,000,000',
        icon: '⭐',
        category: 'influencer-marketing',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z'
      },
      {
        id: 3,
        title: 'Content Creation Bundle',
        description: 'Professional content creation including photography and videography',
        price: 'Rp 8,500,000',
        icon: '📸',
        category: 'content-creation',
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z'
      },
      {
        id: 4,
        title: 'Brand Strategy Consultation',
        description: 'Strategic brand positioning and marketing consultation services',
        price: 'Rp 5,000,000',
        icon: '🎯',
        category: 'consultation',
        created_at: '2024-01-04T00:00:00Z',
        updated_at: '2024-01-04T00:00:00Z'
      },
      {
        id: 5,
        title: 'Enterprise Digital Marketing',
        description: 'Complete digital marketing solution for large enterprises',
        price: 'Rp 25,000,000',
        icon: '🏢',
        category: 'enterprise',
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-05T00:00:00Z'
      }
    ];

    return NextResponse.json(mockPackages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}