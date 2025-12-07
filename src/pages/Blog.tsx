import React, { useState, useMemo } from "react";
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
  categories,
  getAllTags,
} from "@/data/blog/posts";
import { BlogPost } from "@/types/blog";
import {
  Calendar,
  Clock,
  Search,
  Tag,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const navigate = useNavigate();
  const allPosts = getBlogPosts();
  const featuredPosts = getFeaturedPosts();
  const allTags = getAllTags();

  // Filter posts based on search, category, and tag
  const filteredPosts = useMemo(() => {
    let posts = getPostsByCategory(selectedCategory);

    if (searchQuery) {
      posts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedTag) {
      posts = posts.filter((post) => post.tags.includes(selectedTag));
    }

    return posts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory, searchQuery, selectedTag]);

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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights on AI, web development, career growth, and technology
            leadership
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && !searchQuery && selectedCategory === "All" && !selectedTag && (
          <div className="mb-16 animate-fadeIn">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold">Featured Posts</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <Card
                  key={post.id}
                  className="group card-hover overflow-hidden border-2 hover:border-primary/50 cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <img
                      src={post.coverImage || "/blog/default.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 glass-effect px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Featured
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-primary/90 px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                      {post.category}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDistanceToNow(new Date(post.publishedAt), {
                            addSuffix: true,
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min read
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-6 animate-fadeIn">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all hover:scale-105"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 justify-center items-center">
            <Tag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">
              Popular tags:
            </span>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "All" || selectedTag) && (
            <div className="flex flex-wrap gap-2 justify-center items-center text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <div className="glass-effect px-3 py-1 rounded-full flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  <span className="text-xs">{searchQuery}</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedCategory !== "All" && (
                <div className="glass-effect px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="text-xs">{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              )}
              {selectedTag && (
                <div className="glass-effect px-3 py-1 rounded-full flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  <span className="text-xs">{selectedTag}</span>
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedTag(null);
                }}
                className="text-xs text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground text-center mb-4">
                Showing {filteredPosts.length} post
                {filteredPosts.length !== 1 ? "s" : ""}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {filteredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group card-hover overflow-hidden border hover:border-primary/50 cursor-pointer flex flex-col"
                    onClick={() => handlePostClick(post.slug)}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.coverImage || "/blog/default.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-primary/90 px-2 py-1 rounded-full text-xs font-medium text-primary-foreground">
                        {post.category}
                      </div>
                    </div>

                    <CardHeader className="flex-grow">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(post.publishedAt), {
                            addSuffix: true,
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} min
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all"
                      >
                        Read More
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 animate-fadeIn">
              <div className="inline-block p-6 glass-effect rounded-2xl">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedTag(null);
                  }}
                  variant="outline"
                >
                  Clear all filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn">
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allPosts.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {categories.length - 1}
            </div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allTags.length}
            </div>
            <div className="text-sm text-muted-foreground">Topics</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allPosts.reduce((acc, post) => acc + post.readingTime, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Min Reading</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
