# 🏗️ Supabase SQL Setup Commands

**PENTING:** Jalankan perintah-perintah SQL berikut di **Supabase SQL Editor** untuk menyelesaikan setup otentikasi.

## 📋 Dashboard Supabase Access
🔗 **Direct Link:** https://supabase.com/dashboard/project/nkqaiuzjejowzezrnrqb

## 🛠️ SQL Commands to Execute

### 1. Create Required Tables

```sql
-- 1. Create users_roles table
CREATE TABLE IF NOT EXISTS public.users_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'client', 'guest')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 2. Create influencers table
CREATE TABLE IF NOT EXISTS public.influencers (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    instagram TEXT NOT NULL,
    followers TEXT NOT NULL,
    city TEXT NOT NULL,
    avatar TEXT NOT NULL,
    engagement_rate TEXT NOT NULL DEFAULT '0%',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- 3. Create packages table
CREATE TABLE IF NOT EXISTS public.packages (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE public.users_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
```

### 3. Create Security Policies

```sql
-- Users can view their own role
CREATE POLICY "Users can view own role" 
ON public.users_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- ⚠️ CRITICAL: Users can insert their own role (fixes registration issue)
CREATE POLICY "Users can insert their own role"
ON public.users_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Anyone can view influencers
CREATE POLICY "Anyone can view influencers" 
ON public.influencers 
FOR SELECT 
USING (true);

-- Admin can manage all influencers, influencers can manage their own profile
CREATE POLICY "Admin can manage all influencers" 
ON public.influencers 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.users_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- Influencers can create and update their own profile
CREATE POLICY "Influencers can manage own profile" 
ON public.influencers 
FOR INSERT 
WITH CHECK (
    auth.uid() = user_id AND 
    EXISTS (
        SELECT 1 FROM public.users_roles 
        WHERE user_id = auth.uid() AND role = 'influencer'
    )
);

CREATE POLICY "Influencers can update own profile" 
ON public.influencers 
FOR UPDATE 
USING (
    auth.uid() = user_id AND 
    EXISTS (
        SELECT 1 FROM public.users_roles 
        WHERE user_id = auth.uid() AND role = 'influencer'
    )
);

-- Anyone can view packages
CREATE POLICY "Anyone can view packages" 
ON public.packages 
FOR SELECT 
USING (true);

-- Admin can manage packages
CREATE POLICY "Admin can manage packages" 
ON public.packages 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.users_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);
```

### 4. Insert Sample Data

```sql
-- Sample influencers data
INSERT INTO public.influencers (name, content_type, instagram, followers, city, avatar, engagement_rate) VALUES
('Sarah Johnson', 'Lifestyle & Fashion', '@sarahjohnson', '85.2K', 'Jakarta', 'https://images.unsplash.com/photo-1494790108755-2616b612b1ea?w=400&h=400&fit=crop', '6.8%'),
('Michael Chen', 'Tech & Gaming', '@michaelchen', '120.5K', 'Bandung', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', '5.4%'),
('Emily Rodriguez', 'Beauty & Skincare', '@emilyrodriguez', '95.8K', 'Surabaya', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop', '7.2%'),
('David Thompson', 'Travel & Food', '@davidthompson', '156.3K', 'Bali', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', '4.9%');

-- Sample packages data
INSERT INTO public.packages (title, description, price) VALUES
('Paket Micro Influencer Starter', 'Kampanye dengan 5 micro influencer pilihan', 'Rp 1.500.000'),
('Paket Micro Influencer Professional', 'Kampanye dengan 10 micro influencer terverifikasi', 'Rp 2.500.000'),
('Paket Micro Influencer Premium', 'Kampanye dengan 15 micro influencer + analytics', 'Rp 4.000.000'),
('Paket Viral Campaign', 'Kampanye viral dengan 50+ micro influencer', 'Rp 15.000.000');
```

## ⚙️ Authentication Settings

### Disable Email Confirmation (Development)
1. Go to **Authentication** → **Settings** → **Auth**
2. Under **User Signups**, set **Enable email confirmations** to **OFF**
3. This allows immediate login after registration during development

### Optional: Enable Google OAuth
1. Go to **Authentication** → **Providers**
2. Enable **Google** provider
3. Add your OAuth credentials

## 🧪 Testing the Setup

After running the SQL commands:

1. **Register Test User:**
   - Email: `test@example.com`
   - Password: `password123`
   - Should create user with 'client' role automatically

2. **Login Test:**
   - Use same credentials to login
   - Should redirect to homepage successfully

3. **Admin Test:**
   ```sql
   -- Manually set a user as admin for testing
   UPDATE public.users_roles 
   SET role = 'admin' 
   WHERE user_id = (SELECT id FROM auth.users WHERE email = 'test@example.com');
   ```

## 🔍 Troubleshooting

### If registration fails:
- Check if the "Users can insert their own role" policy exists
- Verify RLS is enabled on users_roles table

### If login fails:
- Check browser console for specific error messages
- Verify environment variables in `.env.local`

### If data doesn't load:
- Check if sample data was inserted successfully
- Verify RLS policies allow SELECT for public access

---

✅ **Setup Complete!** After running these SQL commands, restart your Next.js development server:

```bash
npm run dev
```