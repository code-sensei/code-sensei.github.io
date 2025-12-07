import { supabase, transformBlogPost, BlogPostRow } from '../supabase';
import { BlogPost } from '@/types/blog';

/**
 * Fetch all published blog posts from Supabase
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    return data ? data.map(transformBlogPost) : [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

/**
 * Fetch featured blog posts
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching featured posts:', error);
      throw error;
    }

    return data ? data.map(transformBlogPost) : [];
  } catch (error) {
    console.error('Failed to fetch featured posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching post by slug:', error);
      throw error;
    }

    return data ? transformBlogPost(data) : null;
  } catch (error) {
    console.error(`Failed to fetch post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch blog posts by category
 */
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    if (category === 'All') {
      return getBlogPosts();
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .eq('category', category)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts by category:', error);
      throw error;
    }

    return data ? data.map(transformBlogPost) : [];
  } catch (error) {
    console.error(`Failed to fetch posts for category ${category}:`, error);
    return [];
  }
}

/**
 * Fetch blog posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .contains('tags', [tag])
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts by tag:', error);
      throw error;
    }

    return data ? data.map(transformBlogPost) : [];
  } catch (error) {
    console.error(`Failed to fetch posts for tag ${tag}:`, error);
    return [];
  }
}

/**
 * Fetch all unique tags from published posts
 */
export async function getAllTags(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('tags')
      .eq('published', true);

    if (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }

    if (!data) return [];

    // Flatten all tags and get unique values
    const allTags = data.flatMap((post: BlogPostRow) => post.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();

    return uniqueTags;
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

/**
 * Fetch all unique categories from published posts
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('category')
      .eq('published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    if (!data) return ['All'];

    const uniqueCategories = Array.from(
      new Set(data.map((post: BlogPostRow) => post.category))
    ).sort();

    return ['All', ...uniqueCategories];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return ['All'];
  }
}

/**
 * Search blog posts by title or content
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error searching posts:', error);
      throw error;
    }

    return data ? data.map(transformBlogPost) : [];
  } catch (error) {
    console.error(`Failed to search posts with query "${query}":`, error);
    return [];
  }
}
