import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/data/blog/posts";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "@/types/blog";

const Blog = () => {
  const navigate = useNavigate();
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await getFeaturedPosts();
        setFeaturedPosts(posts.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured posts:", error);
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };
    loadPosts();
  }, []);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleViewAllClick = () => {
    navigate("/blog");
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-48 bg-muted rounded-2xl mb-4" />
                <div className="h-6 bg-muted rounded-lg mb-3 w-3/4" />
                <div className="h-4 bg-muted rounded-lg mb-2 w-full" />
                <div className="h-4 bg-muted rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slideDown">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Latest Insights
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slideDown">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Featured Articles
            </span>
          </h2>

          <p
            className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slideDown"
            style={{ animationDelay: "100ms" }}
          >
            Dive into the latest thoughts on AI, development, and technology
            leadership
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden border hover:border-primary/50 transition-all duration-500 cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 animate-slideUp"
              onClick={() => handlePostClick(post.slug)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Cover Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
                <img
                  src={post.coverImage || "/blog/default.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Featured Badge */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs font-semibold shadow-lg">
                  <TrendingUp className="w-3 h-3" />
                  Featured
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border border-border">
                  {post.category}
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta Information */}
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

                {/* Read More Indicator */}
                <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                  <span>Read article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div
          className="text-center animate-fadeIn"
          style={{ animationDelay: "400ms" }}
        >
          <Button
            size="lg"
            onClick={handleViewAllClick}
            className="group rounded-full px-8 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
