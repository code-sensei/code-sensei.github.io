# How to Clear and Seed Your New Blog Post

## Quick Steps

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/wdtiaofugxxinuohhnsn

2. **Navigate to SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Seed Script**
   - Open the file: `supabase_clear_and_seed_new.sql`
   - Copy all the contents
   - Paste into the SQL Editor
   - Click "Run" or press Cmd/Ctrl + Enter

4. **Verify**
   - You should see a result showing 1 row
   - The new blog post: "Building a Smarter Research Assistant: A Beginner's Guide"

## What This Does

### Deletes:
- All 4 existing blog posts (AI Systems, React Performance, Journey to CTO, TypeScript)

### Creates:
- 1 new comprehensive blog post about building AI research assistants
- **Title**: Building a Smarter Research Assistant: A Beginner's Guide
- **Slug**: building-smarter-research-assistant-beginners-guide
- **Reading Time**: 15 minutes
- **Category**: AI Engineering
- **Tags**: AI, Research, Agents, Tutorial, Beginner-Friendly, LLM, Iterative Learning
- **Featured**: Yes
- **Status**: Published

## What to Expect on Your Blog Page

After running the script, your blog will show:

### Featured Section
- 1 large featured card with your research assistant article

### Stats Section
- **Total Articles**: 1
- **Categories**: 1 (AI Engineering)
- **Topics**: 7 tags
- **Min Reading**: 15 minutes

### Blog Grid
- Single article card with modern styling
- All the smooth animations and hover effects we added

## Troubleshooting

### If you see "Permission denied"
- Make sure you're logged into the correct Supabase account
- Check that you have admin access to the project

### If you see "Syntax error"
- Make sure you copied the ENTIRE file contents
- Check that no characters were lost during copy/paste

### If the blog page still shows old posts
- Hard refresh your browser (Cmd/Ctrl + Shift + R)
- Clear browser cache
- Check that the SQL script completed successfully

## Next Steps

After seeding:
1. Visit your blog page: http://localhost:5173/blog
2. You should see the new article
3. Click on it to view the full content
4. Test search and filters still work
5. Check mobile responsive design

## Future Blog Posts

To add more posts, you can either:
1. Use the Supabase Table Editor (manual entry)
2. Create new SQL INSERT statements
3. Build an admin interface (future enhancement)

---

**Note**: This is a one-way operation. The old blog posts will be permanently deleted. If you want to keep them, backup first by exporting the data from Supabase.

