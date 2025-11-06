import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getMockInfluencers } from '@/lib/mockInfluencers';

// Initialize Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey ||
      supabaseUrl === 'https://placeholder.supabase.co' ||
      supabaseKey === 'placeholder-key') {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType') || undefined;
    const city = searchParams.get('city') || undefined;
    const followerRange = searchParams.get('followerRange') || undefined;
    const searchTerm = searchParams.get('searchTerm') || undefined;

    const supabase = getSupabaseClient();

    // If Supabase is not configured, return mock data
    if (!supabase) {
      console.log('🎭 Using mock data (Supabase not configured)');
      const filtered = getMockInfluencers({ contentType, city, followerRange, searchTerm });
      return NextResponse.json(filtered);
    }

    // Try to fetch from Supabase
    const { data: influencers, error } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase error, falling back to mock data:', error);
      const filtered = getMockInfluencers({ contentType, city, followerRange, searchTerm });
      return NextResponse.json(filtered);
    }

    // If no data from database, return mock data
    if (!influencers || influencers.length === 0) {
      console.log('🎭 No data in database, using mock data');
      const filtered = getMockInfluencers({ contentType, city, followerRange, searchTerm });
      return NextResponse.json(filtered);
    }

    return NextResponse.json(influencers);
  } catch (error) {
    console.warn('Error fetching influencers, falling back to mock data:', error);
    const filtered = getMockInfluencers();
    return NextResponse.json(filtered);
  }
}