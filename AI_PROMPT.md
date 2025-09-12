# AI PROMPT - INFLUENCER REGISTRATION FLOW

## Task Description
Modify the application registration flow to automatically collect influencer profile data during signup and save it to the database. Currently, users can login/register but influencer profile data is not being captured or persisted.

## Database Schema
```sql
create table public.influencers (
  id serial not null,
  name text not null,
  content_type text not null,
  instagram text not null,
  followers text not null,
  city text not null,
  avatar text not null,
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  updated_at timestamp with time zone not null default timezone ('utc'::text, now()),
  user_id uuid null,
  constraint influencers_pkey primary key (id),
  constraint influencers_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger set_updated_at_influencers BEFORE
update on influencers for EACH row
execute FUNCTION handle_updated_at ();
```

## Required Changes

### 1. Update Registration Form
- Add influencer-specific fields to `/src/app/register/page.tsx` when user selects "influencer" role:
  - Name (required)
  - Content Type (dropdown: Lifestyle, Tech, Fashion, Food, Travel, etc.)
  - Instagram Handle (required)
  - City (required)
  - Avatar Upload (optional - default avatar if not provided)

### 2. Update Registration API
- Modify `/src/app/api/auth/route.ts` POST method
- When role = 'influencer', also create record in `influencers` table
- Generate mock followers data automatically when Instagram handle is provided
- Link influencer record to user via `user_id` foreign key

### 3. Update Profile Loading
- Modify `/src/app/api/influencers/profile/route.ts` GET method
- Load real data from database instead of mock data
- Return actual user's influencer profile data

### 4. Update Profile Display
- Ensure profile page shows real database data
- Handle case where influencer data exists vs doesn't exist

## Technical Requirements
- Maintain existing login/register functionality
- Use proper TypeScript types
- Handle errors gracefully
- Auto-generate mock Instagram metrics (followers, engagement, etc.) on registration
- Ensure data persistence between sessions
- Keep existing UI/UX design

## Expected Flow
1. User visits `/register`
2. User selects "influencer" role
3. Additional influencer fields appear
4. User fills form and submits
5. System creates both auth user AND influencer profile record
6. User can immediately login and see their profile with real data
7. Edit profile updates the database record

## Files to Modify
- `/src/app/register/page.tsx` - Add influencer form fields
- `/src/app/api/auth/route.ts` - Create influencer record on signup
- `/src/app/api/influencers/profile/route.ts` - Load real data from DB
- Add proper database integration (currently using mock data)

## Success Criteria
- Influencer registration creates complete profile in one step
- Profile page shows real data from database
- Edit profile updates database
- No more mock data - all data comes from actual database
- Seamless user experience from registration to profile usage

## Context
Currently the application has login/register working, but influencer profile data is all mock. Users register successfully but their profile shows default/mock data instead of what they entered during registration. We need to bridge this gap so registration immediately populates their profile with real, editable data.

---
**Priority**: HIGH - Core functionality gap
**Complexity**: Medium - Database integration + form enhancement
**Impact**: Essential for proper influencer onboarding flow