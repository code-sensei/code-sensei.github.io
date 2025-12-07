import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturedPosts } from "@/data/blog/posts";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const featuredPosts = getFeaturedPosts().slice(0, 3);

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleViewAllClick = () => {
    navigate("/blog");
  };

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Latest from the Blog
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights on AI, web development, career growth, and technology
            leadership
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group card-hover overflow-hidden border-2 hover:border-primary/50 cursor-pointer flex flex-col"
              onClick={() => handlePostClick(post.slug)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Cover Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={post.coverImage || "/blog/default.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary-foreground">
                  {post.category}
                </div>
              </div>

              {/* Card Content */}
              <CardHeader className="flex-grow">
                <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
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

                {/* Tags */}
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

                {/* Read More Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fadeIn">
          <Button
            size="lg"
            onClick={handleViewAllClick}
            className="group transition-all hover:scale-105"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
