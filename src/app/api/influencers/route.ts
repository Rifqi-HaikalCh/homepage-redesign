import { supabase, getCurrentUser, getUserRole } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET all influencers
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengambil data influencer';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// POST new influencer (admin only)
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const role = await getUserRole(user.id);
    
    if (role !== 'admin' && role !== 'influencer') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya admin atau influencer yang dapat menambah profil influencer.' },
        { status: 403 }
      );
    }

    const influencerData = await request.json();
    
    // Validate required fields
    const { name, content_type, instagram, followers, city, avatar, engagement_rate } = influencerData;
    
    if (!name || !content_type || !instagram || !followers || !city || !avatar || !engagement_rate) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('influencers')
      .insert([{
        user_id: user.id,
        name,
        content_type,
        instagram,
        followers,
        city,
        avatar,
        engagement_rate
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Influencer berhasil ditambahkan',
      data
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menambah influencer';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// PUT update influencer (admin only)
export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const role = await getUserRole(user.id);
    
    if (role !== 'admin' && role !== 'influencer') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya admin atau influencer yang dapat mengupdate profil influencer.' },
        { status: 403 }
      );
    }

    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID influencer harus disediakan' },
        { status: 400 }
      );
    }

    // If user is influencer (not admin), they can only edit their own profile
    let query = supabase
      .from('influencers')
      .update(updateData)
      .eq('id', id);

    if (role === 'influencer') {
      query = query.eq('user_id', user.id);
    }

    const { data, error } = await query
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Influencer berhasil diupdate',
      data
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengupdate influencer';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// DELETE influencer (admin only)
export async function DELETE(request: Request) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const role = await getUserRole(user.id);
    
    if (role !== 'admin') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya admin yang dapat menghapus influencer.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID influencer harus disediakan' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('influencers')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Influencer berhasil dihapus'
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghapus influencer';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}