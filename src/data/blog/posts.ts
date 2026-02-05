import { BlogPost } from "@/types/blog";
import {
  deepResearchAgentTechnical,
  deepResearchAgentBeginner,
  promptingTechniques,
  scalableAiSystems,
  reactPerformance,
  journeyStudentToCto,
  typescriptBestPractices,
  aeoAiSearchEngines,
} from "./posts/index";

// All static blog posts - imported from individual files for maintainability
const staticBlogPosts: BlogPost[] = [
  deepResearchAgentTechnical,
  deepResearchAgentBeginner,
  promptingTechniques,
  scalableAiSystems,
  reactPerformance,
  journeyStudentToCto,
  typescriptBestPractices,
  aeoAiSearchEngines,
];

export const categories: string[] = [
  "All",
  "AI Engineering",
  "Web Development",
  "Career",
  "Leadership",
  "Technology",
];

// Direct static data functions - no Supabase calls
export async function getBlogPosts(): Promise<BlogPost[]> {
  return staticBlogPosts.filter((post) => post.published);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return staticBlogPosts.filter((post) => post.published && post.featured);
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  return staticBlogPosts.find((post) => post.slug === slug && post.published);
}

export async function getPostsByCategory(
  category: string,
): Promise<BlogPost[]> {
  if (category === "All") {
    return staticBlogPosts.filter((post) => post.published);
  }
  return staticBlogPosts.filter(
    (post) => post.published && post.category === category,
  );
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return staticBlogPosts.filter(
    (post) => post.published && post.tags.includes(tag),
  );
}

export async function getAllTags(): Promise<string[]> {
  const tags = new Set<string>();
  staticBlogPosts.forEach((post) => {
    if (post.published) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export async function getAllCategories(): Promise<string[]> {
  return categories;
}

// Export static data for direct access if needed
export { staticBlogPosts as blogPosts };
