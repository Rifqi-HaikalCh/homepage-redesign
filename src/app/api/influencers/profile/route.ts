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
    const instagramData = generateInstagramMockData('defaultinfluencer');
    const tiktokData = generateTikTokMockData('@defaultinfluencer');
    
    const mockInfluencerProfile: InfluencerProfile = {
      id: 1,
      name: 'Default Influencer',
      content_type: 'Beauty & Fashion',
      city: 'Jakarta',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
      
      // Instagram data
      instagram_handle: 'defaultinfluencer',
      instagram_followers: instagramData.followers,
      instagram_engagement_rate: instagramData.engagement_rate,
      instagram_avg_likes: instagramData.avg_likes,
      instagram_avg_comments: instagramData.avg_comments,
      
      // TikTok data
      tiktok_handle: tiktokData.handle,
      tiktok_followers: tiktokData.followers,
      tiktok_engagement_rate: tiktokData.engagement_rate,
      tiktok_avg_likes: tiktokData.avg_likes,
      tiktok_avg_views: tiktokData.avg_views,
      
      // Services and Portfolio
      services: ['Endorse', 'Foto Katalog'],
      portfolio: [],
      
      // Metadata
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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

    // Generate mock data saat user mengupdate instagram/tiktok handle
    const instagramData = instagram_handle ? generateInstagramMockData(instagram_handle) : null;
    const tiktokData = tiktok_handle ? generateTikTokMockData(tiktok_handle) : null;

    // Mock response - replace dengan Supabase update query
    const updatedProfile: InfluencerProfile = {
      id: 1,
      name: name || 'Default Influencer',
      content_type: content_type || 'Beauty & Fashion',
      city: city || 'Jakarta',
      avatar: avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
      
      // Instagram data
      instagram_handle: instagram_handle || 'defaultinfluencer',
      instagram_followers: instagramData?.followers || '15.4K',
      instagram_engagement_rate: instagramData?.engagement_rate || '3.5%',
      instagram_avg_likes: instagramData?.avg_likes || '1200',
      instagram_avg_comments: instagramData?.avg_comments || '32',
      
      // TikTok data (optional)
      tiktok_handle: tiktok_handle || undefined,
      tiktok_followers: tiktokData?.followers || undefined,
      tiktok_engagement_rate: tiktokData?.engagement_rate || undefined,
      tiktok_avg_likes: tiktokData?.avg_likes || undefined,
      tiktok_avg_views: tiktokData?.avg_views || undefined,
      
      // Services and Portfolio
      services: services || ['Endorse', 'Foto Katalog'],
      portfolio: [],
      
      // Metadata
      user_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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