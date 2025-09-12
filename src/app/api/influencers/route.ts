import { NextResponse } from 'next/server';

// Sample influencer data for development
const sampleInfluencers = [
  {
    id: 1,
    name: "Sarah Johnson",
    content_type: "Lifestyle & Fashion",
    instagram: "@sarahjohnson",
    followers: "85.2K",
    city: "Jakarta",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=400&h=400&fit=crop",
    engagement_rate: "6.8%"
  },
  {
    id: 2,
    name: "Michael Chen",
    content_type: "Tech & Gaming",
    instagram: "@michaelchen",
    followers: "120.5K",
    city: "Bandung",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    engagement_rate: "5.4%"
  },
  {
    id: 3,
    name: "Jessica Liu",
    content_type: "Beauty & Skincare",
    instagram: "@jessicaliu",
    followers: "95.8K",
    city: "Surabaya",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    engagement_rate: "7.2%"
  },
  {
    id: 4,
    name: "David Rodriguez",
    content_type: "Food & Travel",
    instagram: "@davidfoodtravel",
    followers: "156.3K",
    city: "Bali",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    engagement_rate: "8.1%"
  },
  {
    id: 5,
    name: "Amanda Wright",
    content_type: "Fitness & Health",
    instagram: "@amandafit",
    followers: "78.4K",
    city: "Yogyakarta",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    engagement_rate: "6.3%"
  },
  {
    id: 6,
    name: "Ryan Thompson",
    content_type: "Music & Entertainment",
    instagram: "@ryanmusic",
    followers: "203.7K",
    city: "Jakarta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    engagement_rate: "9.4%"
  }
];

export async function GET() {
  try {
    // In a real app, this would fetch from Supabase database
    // For now, return sample data to make everything work
    return NextResponse.json(sampleInfluencers);
  } catch (error) {
    console.error('Error fetching influencers:', error);
    // Return sample data even if there's an error to prevent UI breaks
    return NextResponse.json(sampleInfluencers);
  }
}