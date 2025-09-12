import { NextRequest, NextResponse } from 'next/server';

// Mock data generator untuk Instagram
const generateInstagramMockData = (instagramHandle: string) => {
  const baseFollowers = Math.floor(Math.random() * 500000) + 10000; // 10K - 510K followers
  const engagementRate = (Math.random() * 8 + 2).toFixed(1); // 2% - 10%
  const avgLikes = Math.floor(baseFollowers * (parseFloat(engagementRate) / 100));
  const avgComments = Math.floor(avgLikes * (Math.random() * 0.1 + 0.02)); // 2-12% of likes

  return {
    followers: `${(baseFollowers / 1000).toFixed(1)}K`,
    engagement_rate: `${engagementRate}%`,
    avg_likes: `${(avgLikes / 1000).toFixed(1)}K`,
    avg_comments: avgComments.toString()
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
      const instagramData = generateInstagramMockData(influencerData.instagram);
      
      // Mock influencer record creation - replace dengan actual Supabase query
      const influencerRecord = {
        id: Math.floor(Math.random() * 1000),
        name: influencerData.name,
        content_type: influencerData.content_type,
        instagram: influencerData.instagram,
        followers: instagramData.followers,
        city: influencerData.city,
        avatar: influencerData.avatar,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // Additional mock data for profile display
        instagram_data: {
          followers: instagramData.followers,
          engagement_rate: instagramData.engagement_rate,
          avg_likes: instagramData.avg_likes,
          avg_comments: instagramData.avg_comments
        },
        tiktok: {
          handle: `@${influencerData.instagram}`,
          followers: `${(Math.floor(Math.random() * 200000) + 5000 / 1000).toFixed(1)}K`,
          engagement_rate: `${(Math.random() * 12 + 5).toFixed(1)}%`,
          avg_likes: `${(Math.floor(Math.random() * 5000) + 500 / 1000).toFixed(1)}K`,
          avg_views: `${(Math.floor(Math.random() * 50000) + 10000 / 1000).toFixed(1)}K`
        }
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