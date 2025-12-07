# Supabase Integration Setup Guide

This guide explains how to set up and use Supabase for your blog posts in the portfolio.

## Project Information

- **Project Name:** My Blog
- **Project ID:** wdtiaofugxxinuohhnsn
- **Region:** eu-west-1
- **URL:** https://wdtiaofugxxinuohhnsn.supabase.co

## Setup Instructions

### 1. Run Database Migration

Go to your Supabase Dashboard:
1. Navigate to https://supabase.com/dashboard/project/wdtiaofugxxinuohhnsn
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase_migration.sql` file
5. Click **Run** to execute the migration

This will create:
- The `blog_posts` table with all necessary fields
- Indexes for optimal query performance
- Row Level Security (RLS) policies for public read access
- A sample blog post (optional)

### 2. Environment Variables

The `.env.local` file has been created with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://wdtiaofugxxinuohhnsn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important:** Make sure `.env.local` is in your `.gitignore` to keep your keys secure!

## Architecture

### Files Created

1. **`src/lib/supabase.ts`** - Supabase client configuration and type transformations
2. **`src/lib/api/blog.ts`** - Blog API service layer with all CRUD operations
3. **`src/data/blog/posts.ts`** - Updated to use Supabase with static data fallback

### Database Schema

```sql
Table: blog_posts
├── id (UUID, Primary Key)
├── title (TEXT)
├── slug (TEXT, Unique)
├── excerpt (TEXT)
├── content (TEXT)
├── cover_image (TEXT, Nullable)
├── author_name (TEXT)
├── author_avatar (TEXT, Nullable)
├── author_bio (TEXT, Nullable)
├── published_at (TIMESTAMPTZ)
├── updated_at (TIMESTAMPTZ, Nullable)
├── category (TEXT)
├── tags (TEXT[])
├── reading_time (INTEGER)
├── featured (BOOLEAN)
├── published (BOOLEAN)
└── created_at (TIMESTAMPTZ)
```

### Available API Functions

All functions in `src/lib/api/blog.ts`:

- `getBlogPosts()` - Fetch all published posts
- `getFeaturedPosts()` - Fetch featured posts only
- `getPostBySlug(slug)` - Fetch a single post by slug
- `getPostsByCategory(category)` - Filter posts by category
- `getPostsByTag(tag)` - Filter posts by tag
- `getAllTags()` - Get all unique tags
- `getAllCategories()` - Get all unique categories
- `searchPosts(query)` - Search posts by title, excerpt, or content

## Usage

### Fetching Blog Posts

The functions in `src/data/blog/posts.ts` now automatically fetch from Supabase:

```typescript
import { getBlogPosts, getPostBySlug } from '@/data/blog/posts';

// Fetch all posts (returns Promise)
const posts = await getBlogPosts();

// Fetch single post
const post = await getPostBySlug('my-blog-slug');
```

### Fallback Mechanism

The system automatically falls back to static data if:
- Supabase is unavailable
- No posts are found in the database
- An error occurs during fetching

This ensures your blog always works, even without a database connection.

## Adding Blog Posts

### Option 1: Supabase Dashboard (Recommended)

1. Go to https://supabase.com/dashboard/project/wdtiaofugxxinuohhnsn
2. Click **Table Editor** in the left sidebar
3. Select the `blog_posts` table
4. Click **Insert row**
5. Fill in the fields:
   - **title**: Your blog post title
   - **slug**: URL-friendly slug (e.g., "my-first-post")
   - **excerpt**: Brief summary
   - **content**: Full markdown content
   - **cover_image**: Image URL (optional)
   - **author_name**: Your name
   - **author_avatar**: Avatar URL (optional)
   - **author_bio**: Short bio (optional)
   - **category**: Post category
   - **tags**: Array of tags (e.g., ["React", "TypeScript"])
   - **reading_time**: Estimated reading time in minutes
   - **featured**: true/false
   - **published**: true/false
6. Click **Save**

### Option 2: SQL Insert

```sql
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  author_name,
  category,
  tags,
  reading_time,
  featured,
  published
) VALUES (
  'My Blog Post Title',
  'my-blog-post-title',
  'This is a brief excerpt...',
  '# My Blog Post\n\nFull markdown content here...',
  'Your Name',
  'Web Development',
  ARRAY['React', 'TypeScript'],
  5,
  false,
  true
);
```

### Option 3: Migrate Existing Static Posts

You can migrate your existing static posts to Supabase by running INSERT statements for each post in the `staticBlogPosts` array.

## Security

### Row Level Security (RLS)

The table has RLS enabled with two policies:

1. **Public Read Access**: Anyone can read published posts
2. **Authenticated Access**: Only authenticated users can insert/update/delete posts

### To Add Admin Access:

1. Go to Supabase Dashboard → Authentication
2. Create a new user account
3. Use this account to manage blog posts securely

## Testing

### Test the Connection

1. Start your development server: `npm run dev`
2. Navigate to your blog page
3. Open browser console - you should see no errors
4. If Supabase is empty, static posts will be displayed
5. Add a post via Supabase Dashboard, refresh, and it should appear

### Verify Database

Run this query in Supabase SQL Editor:

```sql
SELECT count(*) as total_posts FROM blog_posts;
SELECT count(*) as published_posts FROM blog_posts WHERE published = true;
```

## Troubleshooting

### Posts Not Appearing

1. Check if migration was run successfully
2. Verify environment variables are loaded (`console.log(import.meta.env.VITE_SUPABASE_URL)`)
3. Check browser console for errors
4. Verify posts have `published = true` in database

### Connection Errors

1. Verify your Supabase project is active (not paused)
2. Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
3. Restart development server after changing `.env.local`

### RLS Policy Issues

If you can't read posts:
```sql
-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'blog_posts';
```

## Next Steps

1. ✅ Run the database migration
2. ✅ Test the connection
3. 📝 Add your blog posts to Supabase
4. 🎨 Customize the blog post fields if needed
5. 🚀 Deploy your application

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)