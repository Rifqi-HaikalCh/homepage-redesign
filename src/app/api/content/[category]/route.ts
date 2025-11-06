import { NextResponse } from 'next/server';

// Mock content data for different categories
const contentData = {
  food: [
    { id: 1, title: "Best Food Influencers", description: "Top food content creators" },
    { id: 2, title: "Culinary Trends 2024", description: "Latest food trends" }
  ],
  tech: [
    { id: 1, title: "Tech Reviews", description: "Latest technology reviews" },
    { id: 2, title: "Gaming Content", description: "Gaming influencer content" }
  ],
  entertainment: [
    { id: 1, title: "Entertainment News", description: "Latest entertainment updates" },
    { id: 2, title: "Celebrity Collaborations", description: "Celebrity influencer partnerships" }
  ],
  travel: [
    { id: 1, title: "Travel Vlogs", description: "Amazing travel content" },
    { id: 2, title: "Destination Reviews", description: "Travel destination reviews" }
  ],
  health: [
    { id: 1, title: "Fitness Influencers", description: "Health and fitness content" },
    { id: 2, title: "Wellness Tips", description: "Health and wellness advice" }
  ],
  gaming: [
    { id: 1, title: "Gaming Streamers", description: "Top gaming streamers" },
    { id: 2, title: "Game Reviews", description: "Latest game reviews" }
  ],
  creator: [
    { id: 1, title: "Content Creators", description: "Top content creators" },
    { id: 2, title: "Creative Tips", description: "Content creation tips" }
  ],
  beauty: [
    { id: 1, title: "Beauty Gurus", description: "Top beauty influencers" },
    { id: 2, title: "Fashion Trends", description: "Latest fashion trends" }
  ],
  youtube: [
    { id: 1, title: "YouTubers", description: "Top YouTube content creators" },
    { id: 2, title: "Video Content", description: "Best video content strategies" }
  ],
  'dj-singer': [
    { id: 1, title: "Music Artists", description: "Top DJs and singers" },
    { id: 2, title: "Music Trends", description: "Latest music trends" }
  ],
  tiktok: [
    { id: 1, title: "TikTok Stars", description: "Top TikTok content creators" },
    { id: 2, title: "Viral Trends", description: "Latest viral TikTok trends" }
  ],
  'mom-kids': [
    { id: 1, title: "Parenting Influencers", description: "Top parenting content creators" },
    { id: 2, title: "Family Content", description: "Best family-friendly content" }
  ]
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    // In Next.js 15, params is always a Promise
    const resolvedParams = await params;
    const category = resolvedParams.category as keyof typeof contentData;
    
    console.log('API Content - Category requested:', category);
    console.log('API Content - Available categories:', Object.keys(contentData));
    
    if (!contentData[category]) {
      console.log('API Content - Category not found, returning 404');
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    console.log('API Content - Returning data for category:', category);
    return NextResponse.json(contentData[category]);
  } catch (error: unknown) {
    console.error('API Content - Error occurred:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch content';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}