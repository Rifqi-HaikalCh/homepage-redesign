import { NextRequest, NextResponse } from 'next/server';

// Interface sesuai dengan schema database
interface InfluencerProfile {
  id: number;
  name: string;
  content_type: string;
  instagram: string;
  followers: string;
  city: string;
  avatar: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Mock data untuk Instagram & TikTok
  instagram_data?: {
    engagement_rate: string;
    avg_likes: string;
    avg_comments: string;
  };
  tiktok?: {
    handle: string;
    followers: string;
    engagement_rate: string;
    avg_likes: string;
    avg_views: string;
  };
}

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

// Mock data generator untuk TikTok
const generateTikTokMockData = (tiktokHandle: string) => {
  const baseFollowers = Math.floor(Math.random() * 200000) + 5000; // 5K - 205K followers
  const engagementRate = (Math.random() * 12 + 5).toFixed(1); // 5% - 17%
  const avgLikes = Math.floor(baseFollowers * (parseFloat(engagementRate) / 100));
  const avgViews = avgLikes * (Math.floor(Math.random() * 10) + 15); // 15-25x likes

  return {
    handle: tiktokHandle.startsWith('@') ? tiktokHandle : `@${tiktokHandle}`,
    followers: `${(baseFollowers / 1000).toFixed(1)}K`,
    engagement_rate: `${engagementRate}%`,
    avg_likes: `${(avgLikes / 1000).toFixed(1)}K`,
    avg_views: `${(avgViews / 1000).toFixed(1)}K`
  };
};

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

    // Mock data untuk development - replace dengan Supabase query
    const mockInfluencerProfile: InfluencerProfile = {
      id: 1,
      name: 'Default Influencer',
      content_type: 'Lifestyle & Tech',
      instagram: 'defaultinfluencer',
      followers: '25.4K',
      city: 'Jakarta',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      instagram_data: {
        engagement_rate: '6.4%',
        avg_likes: '1.6K',
        avg_comments: '89'
      },
      tiktok: {
        handle: '@defaultinfluencer',
        followers: '12.3K',
        engagement_rate: '8.7%',
        avg_likes: '1.1K',
        avg_views: '18.5K'
      }
    };

    return NextResponse.json(mockInfluencerProfile);
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
    const { user_id, name, city, instagram, tiktok } = body;

    if (!user_id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Generate mock data saat user mengupdate instagram/tiktok handle
    const instagramData = instagram ? generateInstagramMockData(instagram) : undefined;
    const tiktokData = tiktok ? generateTikTokMockData(tiktok) : undefined;

    // Mock response - replace dengan Supabase update query
    const updatedProfile: InfluencerProfile = {
      id: 1,
      name: name || 'Default Influencer',
      content_type: 'Lifestyle & Tech',
      instagram: instagram || 'defaultinfluencer',
      followers: instagramData?.followers || '25.4K',
      city: city || 'Jakarta',
      avatar: body.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
      user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      instagram_data: instagramData ? {
        engagement_rate: instagramData.engagement_rate,
        avg_likes: instagramData.avg_likes,
        avg_comments: instagramData.avg_comments
      } : undefined,
      tiktok: tiktokData
    };

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Error updating influencer profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}