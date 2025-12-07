import { createClient } from '@supabase/supabase-js';
import { BlogPost } from '@/types/blog';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_name: string;
  author_avatar: string | null;
  author_bio: string | null;
  published_at: string;
  updated_at: string | null;
  category: string;
  tags: string[];
  reading_time: number;
  featured: boolean;
  published: boolean;
  created_at: string;
}

// Transform database row to BlogPost type
export function transformBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image || undefined,
    author: {
      name: row.author_name,
      avatar: row.author_avatar || undefined,
      bio: row.author_bio || undefined,
    },
    publishedAt: row.published_at,
    updatedAt: row.updated_at || undefined,
    category: row.category,
    tags: row.tags,
    readingTime: row.reading_time,
    featured: row.featured,
    published: row.published,
  };
}
