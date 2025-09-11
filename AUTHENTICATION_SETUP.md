# 🔐 Authentication Setup Guide

## Current Status
✅ **Development Mode Active** - Authentication works with mock data
⚠️ **Production**: Requires Supabase configuration

## Quick Development Testing
Untuk testing development, aplikasi sudah dikonfigurasi dengan fallback:
- **Email**: Masukkan email apa saja (contoh: `test@example.com`)
- **Password**: Masukkan password apa saja (minimal 6 karakter)
- **Role**: Otomatis akan login sebagai `client`

## Production Setup

### 1. Supabase Configuration
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project atau gunakan project yang sudah ada
3. Copy URL dan Anon Key dari **Settings > API**

### 2. Environment Variables
Edit file `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 3. Database Setup
Buat tabel yang diperlukan di Supabase:

```sql
-- Users roles table
CREATE TABLE users_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('admin', 'client', 'guest')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Influencers table
CREATE TABLE influencers (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    content_type TEXT NOT NULL,
    instagram TEXT NOT NULL,
    followers TEXT NOT NULL,
    city TEXT NOT NULL,
    avatar TEXT NOT NULL,
    engagement_rate TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Packages table
CREATE TABLE packages (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Row Level Security (RLS)
Enable RLS dan buat policies:

```sql
-- Enable RLS
ALTER TABLE users_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

-- Policies for users_roles
CREATE POLICY "Users can view own role" ON users_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own role" ON users_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for influencers (readable by all, writable by admin)
CREATE POLICY "Anyone can view influencers" ON influencers FOR SELECT USING (true);
CREATE POLICY "Admin can manage influencers" ON influencers FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);

-- Policies for packages (readable by all, writable by admin)
CREATE POLICY "Anyone can view packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Admin can manage packages" ON packages FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users_roles 
        WHERE user_id = auth.uid() AND role = 'admin'
    )
);
```

## Features Implemented

### ✅ Authentication Flow
- [x] Login dengan redirect ke homepage
- [x] Register dengan role selection
- [x] Guest mode dengan notifikasi
- [x] Profile protection untuk guest users
- [x] Logout functionality

### ✅ Development Features
- [x] Mock authentication untuk testing
- [x] Fallback data untuk API calls
- [x] Error handling dengan informative messages
- [x] Development mode indicators

### ✅ Security Features
- [x] Middleware untuk route protection
- [x] Role-based access control
- [x] Session management
- [x] CSRF protection (built-in Next.js)

## Error Troubleshooting

### Error 401: Unauthorized
**Penyebab umum:**
1. Supabase key belum dikonfigurasi
2. User belum terdaftar
3. Password salah
4. Database connection issue

**Solusi:**
1. Check environment variables
2. Pastikan user sudah register
3. Check browser console untuk error details
4. Restart development server setelah mengubah env vars

### Error 500: Server Configuration
**Penyebab:**
- Environment variables tidak di-set dengan benar
- Supabase project tidak accessible

**Solusi:**
1. Restart server: `npm run dev`
2. Check `.env.local` file
3. Verify Supabase project status

## Current User Roles

| Role | Description | Access |
|------|-------------|---------|
| `guest` | Unauthenticated user | Limited access, notifications |
| `client` | Regular user | Full app access |
| `admin` | Administrator | Full access + admin features |

## Next Steps for Production

1. **Database Seeding**: Add initial data for influencers dan packages
2. **Admin Panel**: Create admin interface untuk manage data
3. **Email Verification**: Enable email confirmation di Supabase
4. **Rate Limiting**: Add rate limiting untuk API endpoints
5. **Monitoring**: Setup error tracking (Sentry, LogRocket)

---

Untuk pertanyaan atau masalah setup, check console browser untuk development logs.