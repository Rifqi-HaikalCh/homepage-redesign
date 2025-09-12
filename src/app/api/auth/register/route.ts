import { NextRequest, NextResponse } from 'next/server';

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

    // Generate user ID mock (dalam implementasi nyata ini akan datang dari Supabase)
    const userId = `user_${Math.random().toString(36).substr(2, 9)}`;

    // Mock user creation - replace dengan Supabase auth.signUp
    const newUser = {
      id: userId,
      email,
      user_metadata: {
        full_name: fullName,
        username,
        role
      },
      created_at: new Date().toISOString()
    };

    // Jika role influencer, buat record di influencers table
    if (role === 'influencer' && influencerData) {
      // Generate mock Instagram data
      const instagramData = generateInstagramMockData(influencerData.instagram_handle);
      
      // Generate mock TikTok data jika ada TikTok handle
      const tiktokData = influencerData.tiktok_handle 
        ? generateTikTokMockData(influencerData.tiktok_handle)
        : null;
      
      // Mock influencer record creation - replace dengan actual Supabase query
      const influencerRecord = {
        id: Math.floor(Math.random() * 1000),
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
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Created influencer record:', influencerRecord);
    }

    return NextResponse.json({
      message: 'User registered successfully',
      user: newUser,
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