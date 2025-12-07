import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Blog = () => {
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
        setTimeout(() => setLoading(false), 500); // Smooth transition
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

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 w-48 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto" />
          </div>

          {/* Featured Posts Skeleton */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-64 bg-muted rounded-2xl mb-4" />
                <div className="h-8 bg-muted rounded-lg mb-3 w-3/4" />
                <div className="h-4 bg-muted rounded-lg mb-2 w-full" />
                <div className="h-4 bg-muted rounded-lg w-2/3" />
              </div>
            ))}
          </div>

          {/* Search Skeleton */}
          <div className="mb-8 space-y-4 animate-pulse">
            <div className="h-12 bg-muted rounded-xl w-full max-w-2xl mx-auto" />
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-32 bg-muted rounded-full" />
              ))}
            </div>
          </div>

          {/* Posts Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-48 bg-muted rounded-2xl mb-4" />
                <div className="h-6 bg-muted rounded-lg mb-3 w-3/4" />
                <div className="h-4 bg-muted rounded-lg mb-2 w-full" />
                <div className="h-4 bg-muted rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with gradient and animation */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slideDown">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {allPosts.length} Articles & Insights
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slideDown">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Blog & Insights
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slideDown"
            style={{ animationDelay: "100ms" }}
          >
            Exploring AI engineering, web development, leadership, and the
            future of technology
          </p>
        </div>

        {/* Featured Posts - Enhanced Design */}
        {featuredPosts.length > 0 &&
          !searchQuery &&
          selectedCategory === "All" &&
          !selectedTag && (
            <div className="mb-20 animate-fadeIn">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                  <h2 className="text-2xl font-bold">Featured Articles</h2>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <Card
                    key={post.id}
                    className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 bg-gradient-to-br from-card via-card to-card/50 animate-slideUp"
                    onClick={() => handlePostClick(post.slug)}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* Image with overlay */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                      <img
                        src={post.coverImage || "/blog/default.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 z-20 flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold shadow-lg backdrop-blur-sm">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Featured
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border border-primary/30">
                          {post.category}
                        </div>
                      </div>

                      {/* Reading time badge */}
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border border-border">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} min
                      </div>
                    </div>

                    <CardHeader className="space-y-4">
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </CardDescription>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-1.5">
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
                            className="px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-xs font-medium transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>

                    {/* Read more indicator */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium">Read article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

        {/* Search and Filters - Modern Design */}
        <div
          className="mb-12 space-y-6 animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-base rounded-2xl border-2 focus:border-primary/50 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex justify-center lg:hidden">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Category Filters */}
          <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span className="font-medium">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "shadow-lg shadow-primary/25 scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          {allTags.length > 0 && (
            <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">Popular Topics</span>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
                {allTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:scale-105"
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
            <div className="flex items-center justify-center gap-3 flex-wrap p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-3xl mx-auto animate-slideDown">
              <span className="text-sm font-medium text-muted-foreground">
                Active filters:
              </span>

              {searchQuery && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <Search className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    "{searchQuery.slice(0, 20)}"
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedCategory !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <span className="text-xs font-medium">
                    {selectedCategory}
                  </span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedTag && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <Tag className="w-3 h-3" />
                  <span className="text-xs font-medium">#{selectedTag}</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredPosts.length > 0 && (
          <div className="text-center mb-8 animate-fadeIn">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredPosts.length}
              </span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>
        )}

        {/* Blog Posts Grid - Enhanced Cards */}
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden border hover:border-primary/50 transition-all duration-500 cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 animate-slideUp"
                onClick={() => handlePostClick(post.slug)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                  <img
                    src={post.coverImage || "/blog/default.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border border-border">
                    {post.category}
                  </div>

                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-primary/90 backdrop-blur-sm">
                      <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </div>

                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDistanceToNow(new Date(post.publishedAt), {
                        addSuffix: true,
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime} min
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                    <span>Read more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No articles found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any articles matching your search. Try adjusting
              your filters or search terms.
            </p>
            <Button onClick={clearFilters} size="lg" className="rounded-full">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Stats Section - Enhanced */}
        {allPosts.length > 0 && (
          <div
            className="mt-20 pt-16 border-t border-border/50 animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-2">Blog Statistics</h3>
              <p className="text-muted-foreground">
                A snapshot of our content library
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {allPosts.length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Total Articles
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  {categories.length - 1}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Categories
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                  {allTags.length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Topics
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
                  {allPosts.reduce((acc, post) => acc + post.readingTime, 0)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
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
