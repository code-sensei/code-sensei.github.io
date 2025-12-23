/**
 * BlogPost Page Component
 * @description Full-screen view for individual blog posts
 * Uses Neobrutalism design style consistent with cheatsheets
 *
 * SEO & AI Search Optimized:
 * - Dynamic per-post metadata
 * - BlogPosting/Article JSON-LD structured data
 * - Open Graph article tags with publish dates
 * - Twitter Card large image support
 * - Optimized for AI search citations (ChatGPT, Perplexity, Google AI)
 */

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { getPostBySlug } from "@/data/blog/posts";
import type { BlogPost } from "@/types/blog";
import {
  SEO,
  generateBlogPostSchema,
  generatePersonSchema,
} from "@/components/seo";
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
  FileText,
  Check,
  Maximize2,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import "highlight.js/styles/github-dark.css";

/**
 * BlogPost component with Neobrutalism design
 * @returns {JSX.Element} The rendered BlogPost page
 */
const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  /**
   * Handle fullscreen toggle
   */
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  /**
   * Listen for fullscreen changes
   */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /**
   * Copy link to clipboard
   */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  /**
   * Share post
   */
  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href;
    const shareTitle = post?.title || "";
    const shareDescription = post?.excerpt || "";

    // If no platform specified, try native share first, then fall back to copy
    if (!platform) {
      if (navigator.share && post) {
        try {
          await navigator.share({
            title: post.title,
            text: post.excerpt,
            url: shareUrl,
          });
          return;
        } catch (error) {
          // User cancelled or share failed, fall back to copy
          console.log(
            "Native share cancelled or unavailable, copying link instead",
          );
        }
      }
      // Fall back to copying the link
      await handleCopyLink();
      return;
    }

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (platform === "copy") {
      await handleCopyLink();
      return;
    }

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  // Generate structured data for this blog post (must be before any early returns)
  const postStructuredData = useMemo(() => {
    if (!post) return [];
    return [generateBlogPostSchema(post), generatePersonSchema(post.author)];
  }, [post]);

  // Loading state - Neobrutalism
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#FFE156] border-4 border-black dark:border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
            <FileText className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tight text-black dark:text-white">
            Loading...
          </h1>
          <p className="text-black/70 dark:text-white/70 font-mono">
            Fetching article
          </p>
        </div>
      </div>
    );
  }

  // Not found state - Neobrutalism
  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20 flex items-center justify-center">
        <SEO
          title="Post Not Found"
          description="The blog post you're looking for doesn't exist or has been removed."
          url={`/blog/${slug}`}
          robots={{ index: false, follow: true }}
        />
        <div className="text-center animate-fadeIn p-8">
          <div className="w-28 h-28 mx-auto mb-6 bg-[#FF6B6B] border-4 border-black dark:border-white flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
            <FileText className="w-14 h-14 text-black" />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight text-black dark:text-white">
            Post Not Found
          </h1>
          <p className="text-black/70 dark:text-white/70 mb-6 max-w-md mx-auto font-mono">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#A0E7E5] border-4 border-black dark:border-white text-black font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] ${isFullscreen ? "" : "pt-20"}`}
    >
      {/* SEO Meta Tags and Structured Data for Blog Post */}
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={[post.category, ...post.tags]}
        author={post.author.name}
        url={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage || "/profile-image.png"}
        ogImageAlt={`Cover image for ${post.title}`}
        twitterCard="summary_large_image"
        article={{
          publishedTime: post.publishedAt,
          modifiedTime: post.updatedAt || post.publishedAt,
          author: post.author.name,
          section: post.category,
          tags: post.tags,
        }}
        structuredData={postStructuredData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          {
            name: post.category,
            url: `/blog?category=${encodeURIComponent(post.category)}`,
          },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
        additionalMeta={[
          {
            name: "article:reading_time",
            content: `${post.readingTime} minutes`,
          },
          { name: "publish_date", content: post.publishedAt },
        ]}
      />

      <div
        className={`${isFullscreen ? "h-screen flex flex-col" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"}`}
      >
        {/* Back Button & Actions - Neobrutalism */}
        <div
          className={`${isFullscreen ? "p-4 bg-[#FFFEF0] dark:bg-[#1a1a2e] border-b-4 border-black dark:border-white" : "mb-8"} animate-fadeIn flex items-center justify-between`}
        >
          <button
            onClick={() => navigate("/blog")}
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.3)] transition-all text-black dark:text-white"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleShare()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0E7E5] border-3 border-black dark:border-white text-black font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Share"}
              </span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE156] border-3 border-black dark:border-white text-black font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? "Exit" : "Full"}
              </span>
            </button>
          </div>
        </div>

        {/* Hero Image - Neobrutalism */}
        {post.coverImage && !isFullscreen && (
          <div className="relative h-64 md:h-96 overflow-hidden mb-10 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] animate-fadeIn">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />

            {/* Category Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 bg-[#DDA0DD] border-3 border-black text-black text-sm font-black uppercase tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {post.category}
            </div>

            {/* Reading time */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-white border-3 border-black text-black text-sm font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
          </div>
        )}

        {/* Post Header - Neobrutalism */}
        <header
          className={`${isFullscreen ? "px-4 pb-4" : "mb-12"} animate-fadeIn`}
        >
          {/* Type and Category Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8E986] border-3 border-black dark:border-white text-black font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <FileText className="w-4 h-4" />
              <span>Article</span>
            </div>
            {!post.coverImage && (
              <div className="px-4 py-2 bg-[#DDA0DD] border-3 border-black dark:border-white text-black font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {post.category}
              </div>
            )}
          </div>

          {/* Title - Neobrutalism */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-tight text-black dark:text-white">
            {post.title}
          </h1>

          {/* Excerpt - Neobrutalism */}
          <p className="text-lg md:text-xl font-mono text-black/70 dark:text-white/70 leading-relaxed mb-8 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Author and Meta Information - Neobrutalism */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            {/* Author */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 border-3 border-black dark:border-white"
              />
              <div>
                <div className="font-black text-black dark:text-white uppercase text-sm">
                  {post.author.name}
                </div>
                <div className="text-xs font-mono text-black/70 dark:text-white/70">
                  {post.author.bio}
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-[#FFFEF0] dark:bg-[#1a1a2e] border-3 border-black dark:border-white text-black dark:text-white font-mono text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</span>
            </div>

            {/* Time ago */}
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-[#A0E7E5] border-3 border-black text-black font-mono text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              {formatDistanceToNow(new Date(post.publishedAt), {
                addSuffix: true,
              })}
            </div>

            {/* Reading time */}
            {!post.coverImage && (
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-[#FFE156] border-3 border-black text-black font-mono text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            )}
          </div>

          {/* Tags - Neobrutalism */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFE156] border-2 border-black dark:border-white text-black font-bold text-xs uppercase tracking-wide hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-default"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share Buttons - Neobrutalism */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t-4 border-black dark:border-white">
            <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share:
            </span>
            <button
              onClick={() => handleShare("twitter")}
              className="p-2.5 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:bg-[#1DA1F2] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("facebook")}
              className="p-2.5 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:bg-[#4267B2] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <Facebook className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="p-2.5 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:bg-[#0077B5] hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleShare("copy")}
              className="p-2.5 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] hover:bg-[#FFE156] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>

        {/* Post Content - Neobrutalism Markdown */}
        <div
          className={`${isFullscreen ? "flex-1 overflow-auto px-4" : ""} animate-fadeIn neobrutalism-content`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-8 mt-16 text-foreground pb-4 border-b-4 border-primary">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6 mt-12 text-foreground inline-block bg-primary/20 px-4 py-2 border-2 border-primary shadow-md">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4 mt-10 text-foreground inline-block bg-secondary/30 px-3 py-1.5 border-2 border-secondary shadow-sm">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg md:text-xl font-black uppercase tracking-tight mb-3 mt-8 text-foreground inline-block bg-accent/30 px-3 py-1 border-2 border-accent shadow-sm">
                  {children}
                </h4>
              ),
              p: ({ children }) => (
                <p className="mb-5 leading-relaxed text-foreground text-base md:text-lg">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="mb-6 space-y-3 text-foreground pl-6">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-6 space-y-3 text-foreground pl-6 list-decimal">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed pl-2 border-l-4 border-primary">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-8 p-6 bg-muted border-l-4 border-primary text-foreground font-semibold rounded-r-lg">
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
                      className="px-2 py-1 bg-primary/20 border border-primary/40 text-foreground font-mono font-semibold text-sm rounded"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code
                    className={`${className} block p-5 overflow-x-auto text-sm font-mono`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => (
                <pre className="my-6 bg-muted border-2 border-border overflow-hidden rounded-lg shadow-md">
                  {children}
                </pre>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold underline decoration-2 decoration-primary underline-offset-4 hover:text-primary/80 transition-colors"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt}
                  className="my-8 w-full border-2 border-border rounded-lg shadow-md"
                />
              ),
              hr: () => <hr className="my-12 border-t-2 border-border" />,
              table: ({ children }) => (
                <div className="overflow-x-auto my-8">
                  <table className="w-full border-2 border-border shadow-md rounded-lg overflow-hidden bg-card">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-primary/20">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="border border-border px-4 py-3 text-foreground font-bold uppercase text-left text-sm tracking-wide">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-border px-4 py-3 text-foreground text-sm">
                  {children}
                </td>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-primary">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-secondary-foreground">{children}</em>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Author Bio - Neobrutalism */}
        {!isFullscreen && (
          <div className="mt-16 p-6 md:p-8 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] animate-fadeIn">
            <div className="flex items-start gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-16 h-16 md:w-20 md:h-20 border-4 border-black dark:border-white flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-black uppercase mb-2 text-black dark:text-white">
                  About {post.author.name}
                </h3>
                <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed font-mono">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Footer - Neobrutalism */}
        {!isFullscreen && (
          <div className="mt-12 pt-8 flex justify-between items-center animate-fadeIn border-t-4 border-black dark:border-white">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              All Posts
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-5 py-3 bg-[#FFE156] border-3 border-black dark:border-white text-black font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              Back to Top
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
