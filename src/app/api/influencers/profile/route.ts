import { NextRequest, NextResponse } from 'next/server';

// Interface sesuai dengan schema database yang baru
interface InfluencerProfile {
  id: number;
  name: string;
  content_type: string;
  city: string;
  avatar: string;
  
  // Instagram data
  instagram_handle: string;
  instagram_followers: string;
  instagram_engagement_rate: string;
  instagram_avg_likes: string;
  instagram_avg_comments: string;
  
  // TikTok data
  tiktok_handle?: string;
  tiktok_followers?: string;
  tiktok_engagement_rate?: string;
  tiktok_avg_likes?: string;
  tiktok_avg_views?: string;
  
  // Services and Portfolio
  services?: string[];
  portfolio?: Array<{
    id: string;
    title: string;
    image_url: string;
    description?: string;
  }>;
  
  // Metadata
  user_id: string;
  created_at: string;
  updated_at: string;
}

// TODO: Mock data generators removed - using real database data only

// GET - Get influencer profile by user_id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Supabase query
    // const { data: influencer } = await supabase
    //   .from('influencers')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .single()
    
    // For now, return null if no influencer profile exists
    return NextResponse.json(
      { error: 'Profile not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching influencer profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

// PUT - Update influencer profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      user_id, 
      name, 
      content_type,
      city, 
      avatar,
      instagram_handle,
      tiktok_handle,
      services
    } = body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual Supabase update query
    // const { data: updatedProfile, error } = await supabase
    //   .from('influencers')
    //   .update({
    //     name,
    //     content_type,
    //     city,
    //     avatar,
    //     instagram_handle,
    //     tiktok_handle,
    //     services,
    //     updated_at: new Date().toISOString()
    //   })
    //   .eq('user_id', user_id)
    //   .select()
    //   .single();

    return NextResponse.json({
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}