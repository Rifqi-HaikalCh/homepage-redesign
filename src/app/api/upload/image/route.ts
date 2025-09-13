import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Fungsi untuk mendapatkan Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured');
  }
  return createClient(supabaseUrl, supabaseKey);
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // (Opsional) Validasi tipe dan ukuran file di sini

    const supabase = getSupabaseClient();
    const timestamp = Date.now();
    const fileName = `public/${timestamp}_${file.name}`;

    // Unggah file ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars') // Pastikan nama bucket sama
      .upload(fileName, file);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw new Error(uploadError.message);
    }

    // Dapatkan URL publik dari file yang baru diunggah
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
      
    if (!publicUrlData) {
        throw new Error('Could not get public URL for avatar');
    }

    return NextResponse.json({
      message: 'Image uploaded successfully',
      url: publicUrlData.publicUrl,
    });

  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}