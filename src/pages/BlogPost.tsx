import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { getPostBySlug } from "@/data/blog/posts";
import type { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import "highlight.js/styles/github-dark.css";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      // You can add a toast notification here
      return;
    }

    window.open(
      urls[platform as keyof typeof urls],
      "_blank",
      "width=600,height=400",
    );
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8 animate-fadeIn">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>
        </div>

        {/* Hero Image */}
        {post.coverImage && (
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 animate-fadeIn">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6 bg-primary px-4 py-2 rounded-full text-sm font-medium text-primary-foreground shadow-lg">
              {post.category}
            </div>
          </div>
        )}

        {/* Post Header */}
        <header className="mb-12 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full border-2 border-primary"
              />
              <div>
                <div className="font-semibold text-foreground">
                  {post.author.name}
                </div>
                <div className="text-xs">{post.author.bio}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), "MMMM dd, yyyy")}</span>
              <span className="text-xs ml-1">
                (
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
                )
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium flex items-center gap-1 hover:bg-primary/20 transition-colors cursor-pointer"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("twitter")}
              className="hover:border-blue-400 hover:text-blue-400"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("facebook")}
              className="hover:border-blue-600 hover:text-blue-600"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("linkedin")}
              className="hover:border-blue-500 hover:text-blue-500"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare("copy")}
              className="hover:border-primary hover:text-primary"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Post Content with Custom Markdown Styling */}
        <div className="prose prose-lg dark:prose-invert max-w-none animate-fadeIn">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-12 text-foreground border-b-2 border-primary/20 pb-3">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold mb-5 mt-10 text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-8 text-foreground">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg md:text-xl font-semibold mb-3 mt-6 text-foreground">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-relaxed text-muted-foreground text-base md:text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 space-y-2 list-disc list-inside text-muted-foreground">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 space-y-2 list-decimal list-inside text-muted-foreground">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="ml-4 leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 py-3 my-6 glass-effect rounded-r-lg italic text-foreground">
                  {children}
                </blockquote>
              ),
              code: ({
                inline,
                className,
                children,
                ...props
              }: React.ComponentPropsWithoutRef<"code"> & {
                inline?: boolean;
              }) => {
                if (inline) {
                  return (
                    <code
                      className="px-2 py-1 bg-muted text-primary rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className={`${className} block p-4 rounded-lg overflow-x-auto text-sm`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="mb-6 bg-muted rounded-xl overflow-hidden border border-border">
                  {children}
                </pre>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="rounded-xl my-8 w-full border border-border shadow-lg"
                />
              ),
              hr: () => <hr className="my-12 border-t border-border" />,
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse border border-border">
                    {children}
                  </table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-border px-4 py-2 bg-muted font-semibold text-left">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-4 py-2 text-muted-foreground">
                  {children}
                </td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        <div className="mt-16 p-6 md:p-8 glass-effect rounded-2xl border-l-4 border-primary animate-fadeIn">
          <div className="flex items-start gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                About {post.author.name}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {post.author.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between items-center animate-fadeIn">
          <Button variant="outline" onClick={() => navigate("/blog")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Posts
          </Button>

          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
