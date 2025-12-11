/**
 * Blog Page Component
 * @description Modern blog page with optimal UX hierarchy and layout
 * Based on 2025 best practices: card-based design, visual hierarchy,
 * learning center approach, and mobile-first responsive design
 *
 * SEO & AI Search Optimized:
 * - Dynamic metadata for search engines
 * - JSON-LD structured data (Blog schema)
 * - Open Graph and Twitter Card support
 * - Optimized for ChatGPT, Perplexity, and Google AI
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  getBlogPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getAllTags,
  getAllCategories,
} from "@/data/blog/posts";
import { BlogPost } from "@/types/blog";
import {
  SEO,
  generateBlogListSchema,
  generateWebPageSchema,
} from "@/components/seo";
import Navigation from "@/components/layout/Navigation";
import {
  Calendar,
  Clock,
  Tag,
  Search,
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  FileText,
  Zap,
  Lightbulb,
  Code,
  Users,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

/**
 * Category icons mapping for visual distinction
 */
const categoryIcons: Record<string, React.ReactNode> = {
  AI: <Zap className="w-4 h-4" />,
  Technology: <Code className="w-4 h-4" />,
  Leadership: <Users className="w-4 h-4" />,
  Tutorial: <Lightbulb className="w-4 h-4" />,
  default: <FileText className="w-4 h-4" />,
};

/**
 * Get icon for category
 */
const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || categoryIcons["default"];
};

/**
 * Blog component with modern UX-optimized layout
 * @returns {JSX.Element} The rendered Blog page
 */
const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [categoryPosts, setCategoryPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [posts, featured, tags, cats] = await Promise.all([
          getBlogPosts(),
          getFeaturedPosts(),
          getAllTags(),
          getAllCategories(),
        ]);
        setAllPosts(posts);
        setFeaturedPosts(featured);
        setAllTags(tags);
        setCategories(cats);
        setCategoryPosts(posts);
      } catch (error) {
        console.error("Error loading blog data:", error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };
    loadInitialData();
  }, []);

  // Load posts when category changes
  useEffect(() => {
    const loadCategoryPosts = async () => {
      try {
        const posts = await getPostsByCategory(selectedCategory);
        setCategoryPosts(posts);
      } catch (error) {
        console.error("Error loading category posts:", error);
      }
    };
    loadCategoryPosts();
  }, [selectedCategory]);

  // Filter posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    let posts = categoryPosts;

    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    if (selectedTag) {
      posts = posts.filter((post) => post.tags.includes(selectedTag));
    }

    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }, [categoryPosts, searchQuery, selectedTag]);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedTag;

  // Get latest post for hero
  const heroPost = featuredPosts[0] || allPosts[0];
  // Get secondary featured posts
  const secondaryFeatured = featuredPosts.slice(1, 3);
  // Get recent posts (excluding hero and secondary)
  const recentPosts = filteredPosts.filter(
    (p) =>
      p.id !== heroPost?.id && !secondaryFeatured.find((s) => s.id === p.id),
  );

  // Generate structured data for the blog listing (must be before any early returns)
  const blogStructuredData = useMemo(() => {
    if (allPosts.length === 0) return [];
    return [
      generateWebPageSchema(
        "Blog | Babangida Tsowa",
        "Ideas on AI, Engineering & Leadership - Practical insights from building AI products, leading engineering teams, and navigating the future of technology.",
        "/blog",
        "CollectionPage",
      ),
      generateBlogListSchema(allPosts),
    ];
  }, [allPosts]);

  // Loading skeleton - Neobrutalism style
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            {/* Hero skeleton */}
            <div className="h-[400px] bg-[#FFE156] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
            {/* Grid skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
        {/* SEO Meta Tags and Structured Data */}
        <SEO
          title="Blog | Ideas on AI, Engineering & Leadership"
          description="Practical insights from building AI products, leading engineering teams, and navigating the future of technology. Articles on AI, machine learning, software engineering, and leadership."
          keywords={[
            "AI blog",
            "engineering blog",
            "machine learning articles",
            "software engineering insights",
            "leadership articles",
            "technology blog",
            "Babangida Tsowa blog",
            "AI tutorials",
            "coding tutorials",
            ...allTags.slice(0, 10),
          ]}
          url="/blog"
          ogType="website"
          ogImage="/blog/og-blog.png"
          ogImageAlt="Babangida Tsowa Blog - Ideas on AI, Engineering & Leadership"
          structuredData={blogStructuredData}
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]}
        />

        {/* ============================================
          SECTION 1: HERO HEADER
          Clear value proposition and search
          ============================================ */}
        <header className="border-b-4 border-black dark:border-white bg-white dark:bg-[#2d2d44]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl">
              {/* Breadcrumb / Context */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8E986] border-3 border-black mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="w-4 h-4 text-black" />
                <span className="text-sm font-bold text-black uppercase tracking-wide">
                  Blog & Insights
                </span>
              </div>

              {/* Main headline - Clear value proposition */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black dark:text-white mb-4 leading-[1.1]">
                Ideas on AI, Engineering & Leadership
              </h1>

              {/* Subheadline - What readers will learn */}
              <p className="text-lg md:text-xl text-black/70 dark:text-white/70 font-mono mb-8 leading-relaxed max-w-2xl">
                Practical insights from building AI products, leading
                engineering teams, and navigating the future of technology.
              </p>

              {/* Search Bar - Prominent placement */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 h-14 text-base bg-[#FFFEF0] dark:bg-[#1a1a2e] border-4 border-black dark:border-white text-black dark:text-white font-mono placeholder:text-black/40 dark:placeholder:text-white/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#FF6B6B] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm font-mono text-black/60 dark:text-white/60">
                <span>{allPosts.length} articles</span>
                <span>•</span>
                <span>{categories.length - 1} topics</span>
                <span>•</span>
                <span>
                  {allPosts.reduce((acc, p) => acc + p.readingTime, 0)} min
                  total reading
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ============================================
            SECTION 2: LEARNING CENTER / CATEGORY NAV
            Quick topic-based navigation
            ============================================ */}
          <nav
            className="py-8 border-b-4 border-black dark:border-white"
            aria-label="Topic navigation"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide">
                Browse by Topic
              </span>
              <div className="h-0.5 flex-1 bg-black/20 dark:bg-white/20" />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 border-3 border-black dark:border-white font-bold text-sm uppercase tracking-wide transition-all ${
                    selectedCategory === category
                      ? "bg-[#FFE156] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                      : "bg-white dark:bg-[#2d2d44] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {category !== "All" && getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>

            {/* Active filters indicator */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-black/20 dark:border-white/20">
                <span className="text-xs font-bold text-black/60 dark:text-white/60 uppercase">
                  Filters:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#A0E7E5] border-2 border-black text-black text-xs font-bold">
                    "{searchQuery.slice(0, 15)}
                    {searchQuery.length > 15 ? "..." : ""}"
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedTag && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#DDA0DD] border-2 border-black text-black text-xs font-bold">
                    #{selectedTag}
                    <button onClick={() => setSelectedTag(null)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#FF6B6B] hover:underline uppercase"
                >
                  Clear all
                </button>
              </div>
            )}
          </nav>

          {/* ============================================
            SECTION 3: FEATURED / HERO POST
            Visual hierarchy - most important content first
            ============================================ */}
          {heroPost && !hasActiveFilters && (
            <section className="py-10" aria-label="Featured article">
              <div
                className="group grid lg:grid-cols-2 gap-0 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                onClick={() => handlePostClick(heroPost.slug)}
              >
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-white">
                  <img
                    src={heroPost.coverImage || "/blog/default.jpg"}
                    alt={heroPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-[#FF6B6B] border-3 border-black text-black text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#DDA0DD] border-2 border-black text-black text-xs font-bold uppercase">
                      {heroPost.category}
                    </span>
                    <span className="text-sm font-mono text-black/60 dark:text-white/60">
                      {heroPost.readingTime} min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-black dark:text-white mb-4 leading-tight group-hover:text-[#FF6B6B] transition-colors">
                    {heroPost.title}
                  </h2>

                  {/* Quick summary - Key for scannability */}
                  <p className="text-base lg:text-lg text-black/70 dark:text-white/70 font-mono mb-6 leading-relaxed line-clamp-3">
                    {heroPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={heroPost.author.avatar}
                        alt={heroPost.author.name}
                        className="w-10 h-10 border-2 border-black"
                      />
                      <div>
                        <div className="text-sm font-bold text-black dark:text-white">
                          {heroPost.author.name}
                        </div>
                        <div className="text-xs font-mono text-black/60 dark:text-white/60">
                          {format(
                            new Date(heroPost.publishedAt),
                            "MMM dd, yyyy",
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-black dark:text-white font-black uppercase text-sm group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================
            SECTION 4: SECONDARY FEATURED (2-up grid)
            Supporting featured content
            ============================================ */}
          {secondaryFeatured.length > 0 && !hasActiveFilters && (
            <section className="pb-10" aria-label="More featured articles">
              <div className="grid md:grid-cols-2 gap-6">
                {secondaryFeatured.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                    onClick={() => handlePostClick(post.slug)}
                  >
                    <div className="relative h-48 overflow-hidden border-b-4 border-black dark:border-white">
                      <img
                        src={post.coverImage || "/blog/default.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-[#B8E986] border-2 border-black text-black text-xs font-bold uppercase">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-black uppercase tracking-tight text-black dark:text-white mb-2 line-clamp-2 group-hover:text-[#FF6B6B] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-black/70 dark:text-white/70 font-mono mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs font-mono text-black/60 dark:text-white/60">
                        <span>
                          {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                        </span>
                        <span>{post.readingTime} min</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* ============================================
            SECTION 5: POPULAR TOPICS / TAGS
            Discovery and exploration
            ============================================ */}
          {allTags.length > 0 && !hasActiveFilters && (
            <section
              className="py-8 border-t-4 border-black dark:border-white"
              aria-label="Popular topics"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-black dark:text-white" />
                <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide">
                  Popular Topics
                </span>
                <div className="h-0.5 flex-1 bg-black/20 dark:bg-white/20" />
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 border-2 border-black dark:border-white font-bold text-sm transition-all ${
                      selectedTag === tag
                        ? "bg-[#FFE156] text-black"
                        : "bg-white dark:bg-[#2d2d44] text-black dark:text-white hover:bg-[#A0E7E5]"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ============================================
            SECTION 6: ALL POSTS GRID
            Card-based layout for scannability
            ============================================ */}
          <section
            className="py-10 border-t-4 border-black dark:border-white"
            aria-label="All articles"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                {hasActiveFilters ? "Search Results" : "All Articles"}
              </h2>
              <span className="text-sm font-mono text-black/60 dark:text-white/60">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"}
              </span>
            </div>

            {(hasActiveFilters ? filteredPosts : recentPosts).length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(hasActiveFilters ? filteredPosts : recentPosts).map(
                  (post, index) => (
                    <article
                      key={post.id}
                      className="group bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all animate-slideUp flex flex-col"
                      onClick={() => handlePostClick(post.slug)}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image with consistent aspect ratio */}
                      <div className="relative h-44 overflow-hidden border-b-4 border-black dark:border-white">
                        <img
                          src={post.coverImage || "/blog/default.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 px-2 py-1 bg-[#DDA0DD] border-2 border-black text-black text-xs font-bold uppercase">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="absolute top-3 right-3 p-1.5 bg-[#FFE156] border-2 border-black">
                            <Sparkles className="w-3 h-3 text-black" />
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Title - Most important, prominent placement */}
                        <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#FF6B6B] transition-colors">
                          {post.title}
                        </h3>

                        {/* Quick summary for scannability */}
                        <p className="text-sm text-black/70 dark:text-white/70 font-mono mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Meta - Secondary info */}
                        <div className="flex items-center gap-3 text-xs font-mono text-black/60 dark:text-white/60 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDistanceToNow(new Date(post.publishedAt), {
                              addSuffix: true,
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} min
                          </span>
                        </div>

                        {/* Tags - Tertiary, for discovery */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#FFE156] border border-black text-black text-xs font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 text-xs font-bold">
                              +{post.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ),
                )}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#A0E7E5] border-4 border-black dark:border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <Search className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 text-black dark:text-white">
                  No articles found
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-6 max-w-md mx-auto font-mono">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE156] border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* ============================================
            SECTION 7: NEWSLETTER CTA (Optional)
            Engagement and conversion
            ============================================ */}
          {!hasActiveFilters && allPosts.length > 0 && (
            <section
              className="py-10 border-t-4 border-black dark:border-white"
              aria-label="Newsletter signup"
            >
              <div className="bg-[#FFE156] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black mb-4">
                    Stay Updated
                  </h2>
                  <p className="text-black/70 font-mono mb-6">
                    Get notified when I publish new articles on AI, engineering,
                    and leadership.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://twitter.com/btsowa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    >
                      Follow on X
                      <ChevronRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/btsowa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-3 border-black text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    >
                      Connect on LinkedIn
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ============================================
            SECTION 8: STATS FOOTER
            Social proof and content overview
            ============================================ */}
          {allPosts.length > 0 && !hasActiveFilters && (
            <section
              className="py-10 border-t-4 border-black dark:border-white"
              aria-label="Blog statistics"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    value: allPosts.length,
                    label: "Articles",
                    color: "#FFE156",
                  },
                  {
                    value: categories.length - 1,
                    label: "Topics",
                    color: "#A0E7E5",
                  },
                  { value: allTags.length, label: "Tags", color: "#DDA0DD" },
                  {
                    value: `${allPosts.reduce((acc, p) => acc + p.readingTime, 0)}+`,
                    label: "Min Reading",
                    color: "#B8E986",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    style={{ backgroundColor: stat.color }}
                  >
                    <div className="text-3xl md:text-4xl font-black text-black mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-black font-bold uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
