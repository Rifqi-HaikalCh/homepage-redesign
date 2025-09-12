-- Complete Database Schema for the Application

-- 1. Influencers Table (Updated Structure)
CREATE TABLE public.influencers (
  id SERIAL NOT NULL,
  name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  city TEXT NOT NULL,
  avatar TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  instagram_followers TEXT NOT NULL,
  instagram_engagement_rate TEXT NOT NULL,
  instagram_avg_likes TEXT NOT NULL,
  instagram_avg_comments TEXT NOT NULL,
  tiktok_handle TEXT NULL,
  tiktok_followers TEXT NULL,
  tiktok_engagement_rate TEXT NULL,
  tiktok_avg_likes TEXT NULL,
  tiktok_avg_views TEXT NULL,
  services JSONB NULL DEFAULT '[]'::jsonb,
  portfolio JSONB NULL DEFAULT '[]'::jsonb,
  user_id UUID NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT influencers_pkey PRIMARY KEY (id),
  CONSTRAINT influencers_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- 2. Packages Table (New)
CREATE TABLE public.packages (
  id SERIAL NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT packages_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- 3. Create Triggers for Updated At
CREATE TRIGGER set_updated_at_influencers 
  BEFORE UPDATE ON influencers 
  FOR EACH ROW 
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_packages 
  BEFORE UPDATE ON packages 
  FOR EACH ROW 
  EXECUTE FUNCTION handle_updated_at();

-- 4. Enable RLS
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- 5. Create Policies for Influencers
CREATE POLICY "Public influencers are viewable by everyone" ON public.influencers
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own influencer data" ON public.influencers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own influencer data" ON public.influencers
  FOR UPDATE USING (auth.uid() = user_id);

-- 6. Create Policies for Packages
CREATE POLICY "Public packages are viewable by everyone" ON public.packages
  FOR SELECT USING (true);

-- For admin access to packages (adjust as needed)
CREATE POLICY "Admins can manage packages" ON public.packages
  FOR ALL USING (true); -- You may want to restrict this based on user role

-- 7. Insert Sample Packages Data
INSERT INTO public.packages (title, description, price, icon, category) VALUES
('Paket Starter', 'Cocok untuk brand yang baru memulai campaign dengan influencer', 'Rp 2.500.000', '🚀', 'micro'),
('Paket Growth', 'Untuk brand yang ingin meningkatkan awareness dan engagement', 'Rp 5.000.000', '📈', 'micro'),
('Paket Pro', 'Solusi lengkap untuk campaign influencer marketing yang komprehensif', 'Rp 8.500.000', '⭐', 'micro'),
('Paket Enterprise', 'Paket premium dengan jangkauan maksimal dan ROI terbaik', 'Rp 15.000.000', '👑', 'micro');

-- 8. Insert Sample Influencer Data (for testing)
INSERT INTO public.influencers (
  name, content_type, city, avatar,
  instagram_handle, instagram_followers, instagram_engagement_rate, 
  instagram_avg_likes, instagram_avg_comments,
  tiktok_handle, tiktok_followers, tiktok_engagement_rate,
  tiktok_avg_likes, tiktok_avg_views,
  services
) VALUES 
(
  'Sarah Johnson', 'Beauty & Fashion', 'Jakarta', 
  'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=center',
  'sarahjohnson', '125.4K', '4.2%', '5234', '89',
  '@sarahjohnson', '89.2K', '1.8%', '1600', '28.4K',
  '["Endorse", "Foto Katalog", "Video Review"]'::jsonb
),
(
  'Alex Chen', 'Tech & Lifestyle', 'Bandung', 
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
  'alexchen_tech', '78.9K', '3.8%', '2998', '45',
  '@alexchen', '156.7K', '2.1%', '3290', '45.6K',
  '["Endorse", "Unboxing Video", "Tech Review"]'::jsonb
),
(
  'Maya Sari', 'Food & Travel', 'Surabaya',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=center',
  'mayasari_foodie', '95.2K', '5.1%', '4856', '127',
  '@mayasari', '203.8K', '2.3%', '4687', '78.9K',
  '["Food Review", "Travel Content", "Recipe Video"]'::jsonb
);