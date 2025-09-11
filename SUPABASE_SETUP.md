# 🚀 Supabase Backend Setup Guide

## Prerequisites
- Supabase account (https://supabase.com)
- Project created with ID: `nkqaiuzjejowzezrnrqb` (or your own project)

## Step 1: Setup Environment Variables

1. Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Go to your Supabase project dashboard:
   - URL: https://supabase.com/dashboard/project/nkqaiuzjejowzezrnrqb
   - Go to Settings → API
   - Copy your Project URL and anon public key

3. Update `.env.local` with your actual values:
```
NEXT_PUBLIC_SUPABASE_URL=https://nkqaiuzjejowzezrnrqb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

## Step 2: Create Database Schema

1. Go to your Supabase dashboard → SQL Editor
2. Copy and run the SQL from `database/schema.sql`
3. This will create:
   - `users_roles` table for user role management
   - `influencers` table with sample data
   - `packages` table with sample data
   - Row Level Security (RLS) policies
   - Triggers for automatic timestamp updates

## Step 3: Configure Authentication

1. In Supabase dashboard → Authentication → Settings
2. Enable email confirmation if desired
3. Configure email templates as needed
4. Set up any OAuth providers if required

## Step 4: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Go to `/register` to create a new admin account
3. Go to `/login` to test authentication
4. Test CRUD operations on `/influencer` and `/packages` pages

## API Endpoints

### Authentication
- `POST /api/auth` - Register new user
- `PUT /api/auth` - Login user  
- `DELETE /api/auth` - Logout user

### Influencers
- `GET /api/influencers` - Get all influencers
- `POST /api/influencers` - Create influencer (admin only)
- `PUT /api/influencers` - Update influencer (admin only)
- `DELETE /api/influencers?id=:id` - Delete influencer (admin only)

### Packages
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package (admin only)
- `PUT /api/packages` - Update package (admin only)
- `DELETE /api/packages?id=:id` - Delete package (admin only)

## User Roles

- **Admin**: Full CRUD access to influencers and packages
- **Client**: Read-only access (for future client-specific features)
- **Guest**: Read-only access without authentication

## Security Features

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- JWT-based authentication via Supabase
- API route protection with user role validation

## Troubleshooting

1. **Environment Variables**: Make sure `.env.local` is in the root directory and contains correct values
2. **Database Schema**: Ensure all tables are created with proper RLS policies
3. **CORS Issues**: Supabase should handle CORS automatically for your domain
4. **Authentication**: Check Supabase Auth settings if login/register fails

## Next Steps

1. Update frontend components to use `useAuth()` hook
2. Implement role-based UI visibility
3. Add loading states and error handling
4. Test all CRUD operations
5. Deploy to production with proper environment variables