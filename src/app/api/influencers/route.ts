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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil data influencer' },
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
    
    if (role !== 'admin') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya admin yang dapat menambah influencer.' },
        { status: 403 }
      );
    }

    const influencerData = await request.json();
    
    // Validate required fields
    const { name, content_type, instagram, followers, city, avatar } = influencerData;
    
    if (!name || !content_type || !instagram || !followers || !city || !avatar) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('influencers')
      .insert([{
        name,
        content_type,
        instagram,
        followers,
        city,
        avatar
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

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal menambah influencer' },
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
    
    if (role !== 'admin') {
      return NextResponse.json(
        { error: 'Akses ditolak. Hanya admin yang dapat mengupdate influencer.' },
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

    const { data, error } = await supabase
      .from('influencers')
      .update(updateData)
      .eq('id', id)
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

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal mengupdate influencer' },
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

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Gagal menghapus influencer' },
      { status: 500 }
    );
  }
}