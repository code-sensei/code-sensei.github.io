/**
 * Blog Page Component
 * @description Main page for browsing, searching, and filtering blog posts
 * Uses Neobrutalism design style consistent with cheatsheets
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
  Calendar,
  Clock,
  Tag,
  Search,
  TrendingUp,
  Sparkles,
  BookOpen,
  ArrowRight,
  Filter,
  X,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

/**
 * Blog component with Neobrutalism design
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
  const [showFilters, setShowFilters] = useState(false);

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
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedTag(null);
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedTag;

  // Loading skeleton - Neobrutalism style
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-16 animate-pulse">
            <div className="h-16 w-64 bg-[#FFE156] border-4 border-black dark:border-white mx-auto mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]" />
            <div className="h-6 w-96 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
          </div>

          {/* Search Skeleton */}
          <div className="mb-8 space-y-4 animate-pulse">
            <div className="h-14 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white w-full max-w-2xl mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
            <div className="flex flex-wrap gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 w-28 bg-[#A0E7E5] border-3 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                />
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-48 bg-[#DDA0DD] border-4 border-black dark:border-white mb-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" />
                <div className="h-8 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white mb-3 w-3/4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" />
                <div className="h-4 bg-[#B8E986] border-2 border-black dark:border-white w-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Neobrutalism */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8E986] border-4 border-black dark:border-white mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-slideDown">
            <BookOpen className="w-5 h-5 text-black" />
            <span className="text-sm font-black text-black uppercase tracking-wider">
              {allPosts.length} Articles & Insights
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 animate-slideDown uppercase tracking-tight">
            <span className="text-black dark:text-white">Blog & Insights</span>
          </h1>
          <p
            className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-3xl mx-auto leading-relaxed font-mono animate-slideDown"
            style={{ animationDelay: "100ms" }}
          >
            Exploring AI engineering, web development, leadership, and the
            future of technology
          </p>
        </div>

        {/* Featured Posts - Neobrutalism */}
        {featuredPosts.length > 0 &&
          !searchQuery &&
          selectedCategory === "All" &&
          !selectedTag && (
            <div className="mb-20 animate-fadeIn">
              <div className="flex items-center gap-4 mb-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFE156] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                  <Sparkles className="w-5 h-5 text-black" />
                  <h2 className="text-xl font-black text-black uppercase tracking-tight">
                    Featured
                  </h2>
                </div>
                <div className="h-1 flex-1 bg-black dark:bg-white" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <div
                    key={post.id}
                    className="group relative bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 animate-slideUp"
                    onClick={() => handlePostClick(post.slug)}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden border-b-4 border-black dark:border-white">
                      <img
                        src={post.coverImage || "/blog/default.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF6B6B] border-3 border-black text-black text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Featured
                        </div>
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#DDA0DD] border-3 border-black text-black text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {post.category}
                      </div>

                      {/* Reading time badge */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white border-3 border-black text-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white line-clamp-2 leading-tight group-hover:text-[#FF6B6B] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-base text-black/70 dark:text-white/70 line-clamp-2 leading-relaxed font-mono">
                        {post.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-sm">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFFEF0] dark:bg-[#1a1a2e] border-2 border-black dark:border-white text-black dark:text-white font-mono">
                          <Calendar className="w-4 h-4" />
                          {formatDistanceToNow(new Date(post.publishedAt), {
                            addSuffix: true,
                          })}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-[#FFE156] border-2 border-black text-black text-xs font-bold uppercase tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read more indicator */}
                      <div className="flex items-center gap-2 text-black dark:text-white font-black uppercase tracking-wide pt-2">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Search and Filters - Neobrutalism */}
        <div
          className="mb-12 space-y-6 animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-14 h-14 text-base bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white text-black dark:text-white font-mono placeholder:text-black/50 dark:placeholder:text-white/50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:translate-x-0.5 focus:translate-y-0.5 focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 bg-[#FF6B6B] border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex justify-center lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#A0E7E5] border-4 border-black dark:border-white text-black font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Category Filters */}
          <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
            <div className="flex items-center justify-center gap-2 text-sm text-black dark:text-white font-mono uppercase tracking-wide">
              <Tag className="w-4 h-4" />
              <span className="font-bold">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 border-3 border-black dark:border-white font-bold uppercase text-sm tracking-wide transition-all ${
                    selectedCategory === category
                      ? "bg-[#FFE156] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                      : "bg-white dark:bg-[#2d2d44] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          {allTags.length > 0 && (
            <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
              <div className="flex items-center justify-center gap-2 text-sm text-black dark:text-white font-mono uppercase tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">Popular Topics</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                {allTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 border-2 border-black dark:border-white font-bold text-sm transition-all ${
                      selectedTag === tag
                        ? "bg-[#B8E986] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white dark:bg-[#2d2d44] text-black dark:text-white hover:bg-[#A0E7E5] hover:translate-x-0.5 hover:translate-y-0.5"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center justify-center gap-3 flex-wrap p-5 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white max-w-3xl mx-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-slideDown">
              <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide">
                Active filters:
              </span>

              {searchQuery && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFEF0] dark:bg-[#1a1a2e] border-2 border-black dark:border-white">
                  <Search className="w-3 h-3" />
                  <span className="text-xs font-bold">
                    "{searchQuery.slice(0, 20)}"
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-[#FF6B6B] transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedCategory !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#DDA0DD] border-2 border-black">
                  <span className="text-xs font-bold text-black">
                    {selectedCategory}
                  </span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-[#FF6B6B] transition-colors"
                  >
                    <X className="w-3 h-3 text-black" />
                  </button>
                </div>
              )}

              {selectedTag && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#B8E986] border-2 border-black">
                  <Tag className="w-3 h-3 text-black" />
                  <span className="text-xs font-bold text-black">
                    #{selectedTag}
                  </span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-[#FF6B6B] transition-colors"
                  >
                    <X className="w-3 h-3 text-black" />
                  </button>
                </div>
              )}

              <button
                onClick={clearFilters}
                className="px-3 py-1.5 bg-[#FF6B6B] border-2 border-black text-black text-xs font-bold uppercase hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <div className="text-center mb-8 animate-fadeIn">
            <p className="text-sm text-black/70 dark:text-white/70 font-mono">
              Showing{" "}
              <span className="font-bold text-black dark:text-white">
                {filteredPosts.length}
              </span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>
        )}

        {/* Blog Posts Grid - Neobrutalism Cards */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="group bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] transition-all duration-200 animate-slideUp"
                onClick={() => handlePostClick(post.slug)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden border-b-4 border-black dark:border-white">
                  <img
                    src={post.coverImage || "/blog/default.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 bg-[#DDA0DD] border-3 border-black text-black text-xs font-black uppercase tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    {post.category}
                  </div>

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-3 right-3 p-2 bg-[#FFE156] border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Sparkles className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white line-clamp-2 leading-snug group-hover:text-[#FF6B6B] transition-colors">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-black/70 dark:text-white/70 font-mono">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#FFFEF0] dark:bg-[#1a1a2e] border-2 border-black dark:border-white text-black dark:text-white">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDistanceToNow(new Date(post.publishedAt), {
                        addSuffix: true,
                      })}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#A0E7E5] border-2 border-black text-black">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} min
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-[#FFE156] border-2 border-black text-black text-xs font-bold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-black dark:text-white text-sm font-black uppercase tracking-wide pt-2">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State - Neobrutalism
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-28 h-28 mx-auto mb-6 bg-[#A0E7E5] border-4 border-black dark:border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              <Search className="w-14 h-14 text-black" />
            </div>
            <h3 className="text-3xl font-black uppercase mb-4 text-black dark:text-white">
              No articles found
            </h3>
            <p className="text-black/70 dark:text-white/70 mb-6 max-w-md mx-auto font-mono">
              We couldn't find any articles matching your search. Try adjusting
              your filters or search terms.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE156] border-4 border-black dark:border-white text-black font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Stats Section - Neobrutalism */}
        {allPosts.length > 0 && (
          <div
            className="mt-20 pt-16 border-t-4 border-black dark:border-white animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-black uppercase mb-2 text-black dark:text-white">
                Blog Statistics
              </h3>
              <p className="text-black/70 dark:text-white/70 font-mono">
                A snapshot of my content library
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 bg-[#FFE156] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="text-4xl font-black text-black mb-2">
                  {allPosts.length}
                </div>
                <div className="text-sm text-black font-bold uppercase tracking-wide">
                  Total Articles
                </div>
              </div>

              <div className="group p-8 bg-[#A0E7E5] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="text-4xl font-black text-black mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-black font-bold uppercase tracking-wide">
                  Categories
                </div>
              </div>

              <div className="group p-8 bg-[#DDA0DD] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="text-4xl font-black text-black mb-2">
                  {allTags.length}
                </div>
                <div className="text-sm text-black font-bold uppercase tracking-wide">
                  Topics
                </div>
              </div>

              <div className="group p-8 bg-[#B8E986] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="text-4xl font-black text-black mb-2">
                  {allPosts.reduce((acc, post) => acc + post.readingTime, 0)}
                </div>
                <div className="text-sm text-black font-bold uppercase tracking-wide">
                  Min Reading
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
