/**
 * Blog Page Component
 * @description Modern blog page with clean design and optimal UX hierarchy
 * Uses vibrant design system with Space Grotesk typography
 *
 * SEO & AI Search Optimized:
 * - Dynamic metadata for search engines
 * - JSON-LD structured data (Blog schema)
 * - Open Graph and Twitter Card support
 */

import { useState, useMemo, useEffect } from "react";
import {
  getBlogPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getAllTags,
  getAllCategories,
} from "@/data/blog/posts";
import type { BlogPost } from "@/types/blog";
import {
  SEO,
  generateBlogListSchema,
  generateWebPageSchema,
} from "@/components/seo";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Calendar,
  Clock,
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  X,
  FileText,
  Zap,
  Lightbulb,
  Code,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

/** Category icons mapping */
const categoryIcons: Record<string, React.ReactNode> = {
  AI: <Zap className="w-4 h-4" />,
  Technology: <Code className="w-4 h-4" />,
  Leadership: <Users className="w-4 h-4" />,
  Tutorial: <Lightbulb className="w-4 h-4" />,
  default: <FileText className="w-4 h-4" />,
};

const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || categoryIcons["default"];
};

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

  // Generate structured data
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

  // Loading skeleton
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24">
          <div className="container-wide section-padding">
            <div className="animate-pulse space-y-8">
              <div className="h-[400px] bg-muted/30 rounded-2xl" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-muted/20 rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background pt-24">
        <SEO
          title="Blog | Ideas on AI, Engineering & Leadership"
          description="Practical insights from building AI products, leading engineering teams, and navigating the future of technology."
          keywords={[
            "AI blog",
            "engineering blog",
            "machine learning articles",
            "software engineering insights",
            "leadership articles",
            "technology blog",
            "Babangida Tsowa blog",
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

        {/* Hero Header */}
        <header className="border-b border-border/50">
          <div className="container-wide section-padding">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Blog & Insights
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-foreground mb-4">
                Ideas on AI, Engineering & Leadership
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Practical insights from building AI products, leading
                engineering teams, and navigating the future of technology.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 h-14 text-base bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                <span>{allPosts.length} articles</span>
                <span className="text-border">•</span>
                <span>{categories.length - 1} topics</span>
                <span className="text-border">•</span>
                <span>
                  {allPosts.reduce((acc, p) => acc + p.readingTime, 0)} min
                  total reading
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-wide">
          {/* Category Navigation */}
          <nav
            className="py-8 border-b border-border/50"
            aria-label="Topic navigation"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-foreground">
                Browse by Topic
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {category !== "All" && getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                <span className="text-xs font-medium text-muted-foreground">
                  Filters:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-foreground text-xs font-medium">
                    "{searchQuery.slice(0, 15)}
                    {searchQuery.length > 15 ? "..." : ""}"
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedTag && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 rounded-full text-foreground text-xs font-medium">
                    #{selectedTag}
                    <button
                      type="button"
                      onClick={() => setSelectedTag(null)}
                      className="cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </nav>

          {/* Featured Hero Post */}
          {heroPost && !hasActiveFilters && (
            <section className="py-10" aria-label="Featured article">
              <button
                type="button"
                className="group w-full text-left grid lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden card-interactive cursor-pointer"
                onClick={() => handlePostClick(heroPost.slug)}
              >
                {/* Image */}
                <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
                  <img
                    src={heroPost.coverImage || "/blog/default.jpg"}
                    alt={heroPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-medium rounded-full">
                      {heroPost.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {heroPost.readingTime} min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                    {heroPost.title}
                  </h2>

                  <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                    {heroPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={heroPost.author.avatar}
                        alt={heroPost.author.name}
                        className="w-10 h-10 rounded-full border border-border"
                      />
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          {heroPost.author.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(
                            new Date(heroPost.publishedAt),
                            "MMM dd, yyyy",
                          )}
                        </div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </button>
            </section>
          )}

          {/* Secondary Featured Posts */}
          {secondaryFeatured.length > 0 && !hasActiveFilters && (
            <section className="pb-10" aria-label="More featured articles">
              <div className="grid md:grid-cols-2 gap-6">
                {secondaryFeatured.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden card-interactive cursor-pointer"
                    onClick={() => handlePostClick(post.slug)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handlePostClick(post.slug)
                    }
                    tabIndex={0}
                    role="button"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage || "/blog/default.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-heading font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
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

          {/* Popular Topics / Tags */}
          {allTags.length > 0 && !hasActiveFilters && (
            <section
              className="py-8 border-t border-border/50"
              aria-label="Popular topics"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Popular Topics
                </span>
                <div className="h-px flex-1 bg-border/50" />
              </div>

              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* All Posts Grid */}
          <section
            className="py-10 border-t border-border/50"
            aria-label="All articles"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {hasActiveFilters ? "Search Results" : "All Articles"}
              </h2>
              <span className="text-sm text-muted-foreground">
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
                      className="group bg-card border border-border rounded-xl overflow-hidden card-interactive cursor-pointer flex flex-col animate-slideUp"
                      onClick={() => handlePostClick(post.slug)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handlePostClick(post.slug)
                      }
                      tabIndex={0}
                      role="button"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={post.coverImage || "/blog/default.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="absolute top-3 right-3 p-1.5 bg-primary rounded-full">
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 2 && (
                            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded">
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
                <div className="w-24 h-24 mx-auto mb-6 bg-muted/30 rounded-2xl flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                  No articles found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* Newsletter CTA */}
          {!hasActiveFilters && allPosts.length > 0 && (
            <section
              className="py-10 border-t border-border/50"
              aria-label="Newsletter signup"
            >
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-border rounded-2xl p-8 md:p-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    Stay Updated
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Get notified when I publish new articles on AI, engineering,
                    and leadership.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="https://twitter.com/iam_ehnigma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
                    >
                      Follow on X
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="https://linkedin.com/in/btsowa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
                    >
                      Connect on LinkedIn
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Stats Footer */}
          {allPosts.length > 0 && !hasActiveFilters && (
            <section
              className="py-10 border-t border-border/50"
              aria-label="Blog statistics"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: allPosts.length, label: "Articles" },
                  { value: categories.length - 1, label: "Topics" },
                  { value: allTags.length, label: "Tags" },
                  {
                    value: `${allPosts.reduce((acc, p) => acc + p.readingTime, 0)}+`,
                    label: "Min Reading",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 bg-card border border-border rounded-xl text-center hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
