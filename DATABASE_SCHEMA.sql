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
