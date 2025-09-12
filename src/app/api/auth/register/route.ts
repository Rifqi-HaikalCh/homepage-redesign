import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Mock data generator untuk Instagram - Updated format
const generateInstagramMockData = (instagramHandle: string) => {
  const baseFollowers = Math.floor(Math.random() * 500000) + 10000; // 10K - 510K followers
  const engagementRate = (Math.random() * 5 + 1).toFixed(1); // 1% - 6% (more realistic)
  const avgLikes = Math.floor(baseFollowers * (parseFloat(engagementRate) / 100));
  const avgComments = Math.floor(avgLikes * (Math.random() * 0.05 + 0.01)); // 1-6% of likes

  return {
    followers: `${(baseFollowers / 1000).toFixed(1)}K`,
    engagement_rate: `${engagementRate}%`,
    avg_likes: avgLikes.toString(), // Raw number instead of K format
    avg_comments: avgComments.toString()
  };
};

// Mock data generator untuk TikTok - Updated format  
const generateTikTokMockData = (tiktokHandle: string) => {
  const baseFollowers = Math.floor(Math.random() * 1000000) + 50000; // 50K - 1.05M followers
  const engagementRate = (Math.random() * 2 + 0.3).toFixed(1); // 0.3% - 2.3% (TikTok typically lower)
  const avgLikes = Math.floor(baseFollowers * (parseFloat(engagementRate) / 100));
  const avgViews = avgLikes * (Math.floor(Math.random() * 15) + 15); // 15-30x likes

  return {
    handle: tiktokHandle.startsWith('@') ? tiktokHandle : `@${tiktokHandle}`,
    followers: `${(baseFollowers / 1000).toFixed(1)}K`,
    engagement_rate: `${engagementRate}%`,
    avg_likes: avgLikes.toString(), // Raw number
    avg_views: `${(avgViews / 1000).toFixed(1)}K`
  };
};

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// POST - Register user dengan optional influencer data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      password, 
      role, 
      fullName, 
      username,
      influencerData 
    } = body;

    // Validasi input
    if (!email || !password || !role || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username,
          role
        }
      }
    });

    if (authError || !authUser.user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: authError?.message || 'Failed to create user' },
        { status: 400 }
      );
    }

    const userId = authUser.user.id;

    // 2. Insert role into users_roles table
    const { error: roleError } = await supabase
      .from('users_roles')
      .insert({
        user_id: userId,
        role: role
      });

    if (roleError) {
      console.error('Role insertion error:', roleError);
      // Continue despite role error for now
    }

    // 3. Jika role influencer, buat record di influencers table
    if (role === 'influencer' && influencerData) {
      // Generate mock Instagram data
      const instagramData = generateInstagramMockData(influencerData.instagram_handle);
      
      // Generate mock TikTok data jika ada TikTok handle
      const tiktokData = influencerData.tiktok_handle 
        ? generateTikTokMockData(influencerData.tiktok_handle)
        : null;
      
      // Insert influencer record into database
      const influencerRecord = {
        name: influencerData.name,
        content_type: influencerData.content_type,
        city: influencerData.city,
        avatar: influencerData.avatar,
        
        // Instagram data
        instagram_handle: influencerData.instagram_handle,
        instagram_followers: instagramData.followers,
        instagram_engagement_rate: instagramData.engagement_rate,
        instagram_avg_likes: instagramData.avg_likes,
        instagram_avg_comments: instagramData.avg_comments,
        
        // TikTok data (optional)
        ...(tiktokData && {
          tiktok_handle: tiktokData.handle,
          tiktok_followers: tiktokData.followers,
          tiktok_engagement_rate: tiktokData.engagement_rate,
          tiktok_avg_likes: tiktokData.avg_likes,
          tiktok_avg_views: tiktokData.avg_views,
        }),
        
        // Services and Portfolio
        services: influencerData.services || [],
        portfolio: [],
        
        // Metadata
        user_id: userId
      };

      const { error: influencerError } = await supabase
        .from('influencers')
        .insert(influencerRecord);

      if (influencerError) {
        console.error('Influencer insertion error:', influencerError);
        return NextResponse.json(
          { error: 'Failed to create influencer profile' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: userId,
        email: authUser.user.email,
        role
      },
      role,
      ...(role === 'influencer' && { profileCreated: true })
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}