import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // TODO: Replace with actual Supabase query
    // const { data: influencers, error } = await supabase
    //   .from('influencers')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    // Return empty array until database connection is established
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching influencers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch influencers' },
      { status: 500 }
    );
  }
}