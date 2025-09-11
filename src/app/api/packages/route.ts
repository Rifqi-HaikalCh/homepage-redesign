import { supabase, getCurrentUser, getUserRole } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET all packages
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('packages')
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
    const message = error instanceof Error ? error.message : 'Gagal mengambil data paket';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// POST new package (admin only)
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
        { error: 'Akses ditolak. Hanya admin yang dapat menambah paket.' },
        { status: 403 }
      );
    }

    const packageData = await request.json();
    
    // Validate required fields
    const { title, description, price, icon, category = 'Custom' } = packageData;
    
    if (!title || !description || !price || !icon) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('packages')
      .insert([{
        title,
        description,
        price,
        icon,
        category
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
      message: 'Paket berhasil ditambahkan',
      data
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menambah paket';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// PUT update package (admin only)
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
        { error: 'Akses ditolak. Hanya admin yang dapat mengupdate paket.' },
        { status: 403 }
      );
    }

    const { id, ...updateData } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID paket harus disediakan' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('packages')
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
      message: 'Paket berhasil diupdate',
      data
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal mengupdate paket';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

// DELETE package (admin only)
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
        { error: 'Akses ditolak. Hanya admin yang dapat menghapus paket.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID paket harus disediakan' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Paket berhasil dihapus'
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Gagal menghapus paket';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}