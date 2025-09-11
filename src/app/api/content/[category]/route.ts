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
  ]
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const resolvedParams = await params;
    const category = resolvedParams.category as keyof typeof contentData;
    
    if (!contentData[category]) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(contentData[category]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch content';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}