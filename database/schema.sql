-- Create database schema for Influencer Platform
-- Run this in your Supabase SQL Editor

-- 1. Users roles table to store user roles
CREATE TABLE IF NOT EXISTS public.users_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'client', 'guest')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Influencers table
CREATE TABLE IF NOT EXISTS public.influencers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    instagram TEXT NOT NULL,
    followers TEXT NOT NULL,
    city TEXT NOT NULL,
    avatar TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Packages table
CREATE TABLE IF NOT EXISTS public.packages (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    icon TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users_roles
CREATE POLICY "Users can view their own role" ON public.users_roles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own role" ON public.users_roles
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for influencers
CREATE POLICY "Anyone can view influencers" ON public.influencers
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert influencers" ON public.influencers
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can update influencers" ON public.influencers
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete influencers" ON public.influencers
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for packages
CREATE POLICY "Anyone can view packages" ON public.packages
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert packages" ON public.packages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can update packages" ON public.packages
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Only admins can delete packages" ON public.packages
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.users_roles 
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Create function to automatically set updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER set_updated_at_influencers
    BEFORE UPDATE ON public.influencers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_packages
    BEFORE UPDATE ON public.packages
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample data
INSERT INTO public.influencers (name, content_type, instagram, followers, city, avatar) VALUES
('Khansa Mariska', 'Lifestyle & Fashion', '@khansa_mariska', '76.8K', 'Jakarta', 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center'),
('Rina Salsabila', 'Beauty & Skincare', '@rinasalsabila', '92.3K', 'Bandung', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center'),
('Dimas Anggara', 'Tech & Gaming', '@dimasanggara', '154.7K', 'Surabaya', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=680&h=1020&fit=crop&crop=center'),
('Sarah Octavia', 'Travel & Food', '@sarahoctavia', '128.9K', 'Bali', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center'),
('Arya Pratama', 'Fitness & Health', '@aryapratama', '67.2K', 'Yogyakarta', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=680&h=1020&fit=crop&crop=center'),
('Luna Maharani', 'Art & Creative', '@lunamaharani', '203.4K', 'Medan', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center'),
('Sari Indah', 'Beauty & Skincare', '@sariindah', '45.2K', 'Solo', 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=680&h=1020&fit=crop&crop=center'),
('Maya Putri', 'Lifestyle & Fashion', '@mayaputri', '38.7K', 'Malang', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=680&h=1020&fit=crop&crop=center'),
('Dewi Lestari', 'Travel & Food', '@dewilestari', '52.1K', 'Semarang', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=680&h=1020&fit=crop&crop=center'),
('Rina Safitri', 'Art & Creative', '@rinasafitri', '41.9K', 'Palembang', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=680&h=1020&fit=crop&crop=center');

INSERT INTO public.packages (title, description, price, icon, category) VALUES
('Paket Endorsement 10 Micro Influencer', 'Kampanye endorsement dengan 10 micro influencer pilihan', 'Rp 2.500.000', '🎯', 'Endorsement'),
('Paket Paid Promote 10 Micro Influencer', 'Promosi berbayar melalui 10 micro influencer terverifikasi', 'Rp 1.500.000', '📢', 'Paid Promote'),
('Paket Produk Review 10 Micro Influencer', 'Review produk mendalam oleh 10 micro influencer', 'Rp 2.000.000', '⭐', 'Review'),
('Paket Bundle TikTok + Instagram Story 10 Micro Influencer', 'Konten multi-platform TikTok dan Instagram Story', 'Rp 3.500.000', '📱', 'Bundle'),
('Paket Kampanye Viral 100 Micro Influencer', 'Kampanye viral massal dengan 100 micro influencer', 'Rp 25.000.000', '🚀', 'Viral');