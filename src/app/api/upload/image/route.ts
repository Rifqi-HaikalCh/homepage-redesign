import { NextRequest, NextResponse } from 'next/server';

// Mock upload service - replace dengan real cloud storage (Supabase Storage, Cloudinary, etc.)
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validasi file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validasi file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Mock upload process - generate fake URL
    // Dalam implementasi nyata, upload ke Supabase Storage atau cloud provider lainnya
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `avatar_${timestamp}_${randomId}.${fileExtension}`;
    
    // Mock URL - replace dengan actual upload URL
    const mockImageUrl = `https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center&sig=${randomId}`;
    
    // Simulasi delay upload
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      message: 'Image uploaded successfully',
      url: mockImageUrl,
      fileName: fileName,
      fileSize: file.size,
      fileType: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// GET - Get upload info/status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('fileName');
    
    if (!fileName) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 }
      );
    }

    // Mock response untuk file info
    return NextResponse.json({
      fileName,
      url: `https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center`,
      status: 'uploaded',
      uploadedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching upload info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch upload info' },
      { status: 500 }
    );
  }
}