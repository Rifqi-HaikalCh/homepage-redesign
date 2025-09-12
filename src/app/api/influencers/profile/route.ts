import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

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

    const supabase = getSupabaseClient();
    
    const { data: influencer, error } = await supabase
      .from('influencers')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(influencer);
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
      instagram_followers,
      instagram_engagement_rate,
      instagram_avg_likes,
      instagram_avg_comments,
      tiktok_handle,
      tiktok_followers,
      tiktok_engagement_rate,
      tiktok_avg_likes,
      tiktok_avg_views,
      services
    } = body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    // First check if profile exists
    const { data: existingProfile } = await supabase
      .from('influencers')
      .select('id')
      .eq('user_id', user_id)
      .single();

    let result;

    if (existingProfile) {
      // Update existing profile
      const { data: updatedProfile, error } = await supabase
        .from('influencers')
        .update({
          name,
          content_type,
          city,
          avatar,
          instagram_handle,
          instagram_followers,
          instagram_engagement_rate,
          instagram_avg_likes,
          instagram_avg_comments,
          tiktok_handle,
          tiktok_followers,
          tiktok_engagement_rate,
          tiktok_avg_likes,
          tiktok_avg_views,
          services,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user_id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        return NextResponse.json(
          { error: 'Failed to update profile' },
          { status: 500 }
        );
      }

      result = updatedProfile;
    } else {
      // Create new profile
      const { data: newProfile, error } = await supabase
        .from('influencers')
        .insert({
          user_id,
          name,
          content_type,
          city,
          avatar,
          instagram_handle,
          instagram_followers: instagram_followers || '0',
          instagram_engagement_rate: instagram_engagement_rate || '0%',
          instagram_avg_likes: instagram_avg_likes || '0',
          instagram_avg_comments: instagram_avg_comments || '0',
          tiktok_handle,
          tiktok_followers,
          tiktok_engagement_rate,
          tiktok_avg_likes,
          tiktok_avg_views,
          services: services || []
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to create profile' },
          { status: 500 }
        );
      }

      result = newProfile;
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: result
    });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}