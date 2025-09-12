-- Updated Influencer Schema for Supabase
-- Based on correct data structure from example

create table public.influencers (
  id serial not null,
  name text not null,
  content_type text not null,
  city text not null,
  avatar text not null,
  
  -- Instagram data
  instagram_handle text not null,
  instagram_followers text not null,
  instagram_engagement_rate text not null,
  instagram_avg_likes text not null,
  instagram_avg_comments text not null,
  
  -- TikTok data
  tiktok_handle text null,
  tiktok_followers text null,
  tiktok_engagement_rate text null,
  tiktok_avg_likes text null,
  tiktok_avg_views text null,
  
  -- Services
  services jsonb default '[]'::jsonb,
  
  -- Portfolio
  portfolio jsonb default '[]'::jsonb,
  
  -- Metadata
  user_id uuid null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  
  constraint influencers_pkey primary key (id),
  constraint influencers_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger set_updated_at_influencers BEFORE
update on influencers for EACH row
execute FUNCTION handle_updated_at ();

-- Enable RLS
alter table public.influencers enable row level security;

-- Policies
create policy "Public influencers are viewable by everyone" on public.influencers
  for select using (true);

create policy "Users can insert their own influencer data" on public.influencers
  for insert with check (auth.uid() = user_id);

create policy "Users can update own influencer data" on public.influencers
  for update using (auth.uid() = user_id);