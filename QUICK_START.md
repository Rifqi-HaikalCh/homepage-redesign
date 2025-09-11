# 🚀 Quick Start Guide - Supabase Integration

## ✅ Current Status
- ✅ Backend integration complete
- ✅ Environment file created (`.env.local`)
- ✅ Development server running on http://localhost:3008

## 🔧 Next Steps

### 1. Get Your Supabase Credentials

You need to update the `.env.local` file with your actual Supabase credentials:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/nkqaiuzjejowzezrnrqb
2. Navigate to **Settings** → **API**
3. Copy these values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (long string starting with `eyJ`)

### 2. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nkqaiuzjejowzezrnrqb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_from_supabase_dashboard
```

### 3. Setup Database Schema

1. Go to your Supabase dashboard → **SQL Editor**
2. Copy the entire contents from `database/schema.sql`
3. Paste and run the SQL to create:
   - User roles table
   - Influencers table with sample data
   - Packages table with sample data
   - Security policies

### 4. Test the Application

After updating the environment variables:

1. **Restart the dev server** (Ctrl+C and run `npm run dev` again)
2. **Visit**: http://localhost:3008
3. **Test Registration**: Go to `/register` and create an admin account
4. **Test Login**: Go to `/login` and login with your new account
5. **Test CRUD**: Visit `/influencer` and `/packages` to test add/edit/delete

### 5. Verify Everything Works

- ✅ Can register new accounts
- ✅ Can login with email/password
- ✅ Can use "Guest Mode" without authentication
- ✅ Admins can add/edit/delete influencers and packages
- ✅ Non-admins see read-only interface

## 🎯 User Roles

- **Admin**: Full CRUD access to all data
- **Client**: Read-only access (for future client features)
- **Guest**: Browse without authentication

## 🚨 Troubleshooting

### Environment Variables Not Working?
- Make sure `.env.local` is in the root directory
- Restart the development server after changing `.env.local`
- Check the browser console for Supabase warnings

### Database Errors?
- Ensure you've run the SQL schema in Supabase dashboard
- Check that your Supabase project is active
- Verify the project URL matches your dashboard

### Authentication Issues?
- Check that email confirmation is disabled in Supabase Auth settings
- Verify your API keys are correct
- Look for error messages in browser dev tools

## 🔗 Important URLs

- **Local App**: http://localhost:3008
- **Supabase Dashboard**: https://supabase.com/dashboard/project/nkqaiuzjejowzezrnrqb
- **SQL Editor**: https://supabase.com/dashboard/project/nkqaiuzjejowzezrnrqb/sql

## 📝 Test Accounts

Once you've set up the database, you can:

1. Register as admin: `/register` (select "Admin" role)
2. Test guest mode: Click "Masuk sebagai Tamu" on login page
3. Register regular users: `/register` (select "Client" role)

Your platform is ready to go! 🎉