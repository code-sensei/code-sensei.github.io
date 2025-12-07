-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  author_bio TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  reading_time INTEGER NOT NULL,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);

-- Create index on published_at for sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);

-- Create index on tags using GIN for array searching
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);

-- Create index on published status
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);

-- Create index on featured status
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Allow public read access to published posts"
  ON public.blog_posts
  FOR SELECT
  USING (published = true);

-- Create policy to allow authenticated users full access
CREATE POLICY "Allow authenticated users full access"
  ON public.blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Add comment to table
COMMENT ON TABLE public.blog_posts IS 'Stores blog post data for the portfolio website';

-- Insert sample blog post (optional - you can remove this if you don't want sample data)
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  cover_image,
  author_name,
  author_avatar,
  author_bio,
  published_at,
  category,
  tags,
  reading_time,
  featured,
  published
) VALUES (
  'Building Scalable AI Systems: Lessons from Production',
  'building-scalable-ai-systems',
  'Discover the key principles and best practices I''ve learned while building and deploying AI systems at scale for government and enterprise clients.',
  '# Building Scalable AI Systems: Lessons from Production

Building AI systems that work in production is vastly different from creating proof-of-concepts. Over the past few years, I''ve had the privilege of working on large-scale AI projects for government agencies and enterprises. Here are the key lessons I''ve learned.

## 1. Start with the Problem, Not the Technology

One of the biggest mistakes I see is teams rushing to implement the latest AI model without fully understanding the business problem. Before writing a single line of code, ask:

- What specific problem are we solving?
- What does success look like?
- Can this be solved without AI?

## 2. Data Quality Trumps Model Complexity

The quality of your data matters more than the sophistication of your model. I''ve seen simple models with clean data outperform complex architectures trained on messy datasets.

## 3. Infrastructure Matters

Your AI system is only as good as its infrastructure. Key considerations:

- **Scalability**: Can it handle 10x traffic?
- **Monitoring**: Real-time performance tracking
- **Fallback mechanisms**: What happens when the model fails?

## Conclusion

Building production AI systems requires a holistic approach that goes beyond just training models.',
  '/blog/ai-systems.jpg',
  'Babangida Tsowa',
  '/profile-image.png',
  'Fullstack Developer, AI Engineer & Technology Consultant',
  NOW(),
  'AI Engineering',
  ARRAY['AI', 'Machine Learning', 'Production', 'Best Practices', 'Architecture'],
  8,
  true,
  true
);
