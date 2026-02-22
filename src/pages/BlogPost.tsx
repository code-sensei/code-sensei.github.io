/**
 * BlogPost Page Component
 * @description Full-screen view for individual blog posts
 * Uses clean, modern design with Space Grotesk typography
 *
 * SEO & AI Search Optimized:
 * - Dynamic per-post metadata
 * - BlogPosting/Article JSON-LD structured data
 * - Open Graph article tags with publish dates
 */

import { useEffect, useState, useMemo } from "react";
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
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  FileText,
  Check,
  Maximize2,
  Minimize2,
  ChevronUp,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import "highlight.js/styles/github-dark.css";

const BlogPostPage = () => {
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShare = async (platform?: string) => {
    const shareUrl = window.location.href;
    const shareTitle = post?.title || "";

    if (!platform) {
      if (navigator.share && post) {
        try {
          await navigator.share({
            title: post.title,
            text: post.excerpt,
            url: shareUrl,
          });
          return;
        } catch {
          // Fall back to copy
        }
      }
      await handleCopyLink();
      return;
    }

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
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

  const postStructuredData = useMemo(() => {
    if (!post) return [];
    return [generateBlogPostSchema(post), generatePersonSchema(post.author)];
  }, [post]);

  // Loading state
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <div className="text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2 text-foreground">
              Loading...
            </h1>
            <p className="text-muted-foreground">Fetching article</p>
          </div>
        </div>
      </>
    );
  }

  // Not found state
  if (!post) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <SEO
            title="Post Not Found"
            description="The blog post you're looking for doesn't exist or has been removed."
            url={`/blog/${slug}`}
            robots={{ index: false, follow: true }}
          />
          <div className="text-center animate-fadeIn p-8">
            <div className="w-28 h-28 mx-auto mb-6 bg-destructive/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-14 h-14 text-destructive" />
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The blog post you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {!isFullscreen && <Navigation />}
      <div
        className={`min-h-screen bg-background ${isFullscreen ? "" : "pt-24"}`}
      >
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
          className={`${isFullscreen ? "h-screen flex flex-col" : "container-wide section-padding"}`}
        >
          {/* Back Button & Actions */}
          <div
            className={`${isFullscreen ? "p-4 bg-background border-b border-border" : "mb-8"} animate-fadeIn flex items-center justify-between`}
          >
            <button
              type="button"
              onClick={() => navigate("/blog")}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg font-medium text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShare()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer"
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
                type="button"
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg font-medium text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
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

          {/* Hero Image */}
          {post.coverImage && !isFullscreen && (
            <div className="relative h-64 md:h-96 overflow-hidden mb-10 rounded-2xl border border-border animate-fadeIn">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />

              {/* Category Badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-accent/90 backdrop-blur-sm text-accent-foreground text-sm font-medium rounded-full">
                {post.category}
              </div>

              {/* Reading time */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium rounded-full">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </div>
            </div>
          )}

          {/* Post Header */}
          <header
            className={`${isFullscreen ? "px-4 pb-4" : "mb-12"} animate-fadeIn`}
          >
            {/* Type and Category Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-medium text-xs rounded-full">
                <FileText className="w-4 h-4" />
                <span>Article</span>
              </div>
              {!post.coverImage && (
                <div className="px-4 py-2 bg-accent/20 text-accent-foreground font-medium text-xs rounded-full">
                  {post.category}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author and Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              {/* Author */}
              <div className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full border border-border"
                />
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.author.bio}
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-muted text-foreground text-sm rounded-lg">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(post.publishedAt), "MMM dd, yyyy")}
                </span>
              </div>

              {/* Time ago */}
              <div className="inline-flex items-center gap-2 px-4 py-3 bg-primary/10 text-primary text-sm rounded-lg">
                {formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
              </div>

              {/* Reading time */}
              {!post.coverImage && (
                <div className="inline-flex items-center gap-2 px-4 py-3 bg-accent/20 text-accent-foreground text-sm rounded-lg">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share:
              </span>
              <button
                type="button"
                onClick={() => handleShare("twitter")}
                className="p-2.5 bg-card border border-border rounded-lg text-foreground hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all cursor-pointer"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleShare("linkedin")}
                className="p-2.5 bg-card border border-border rounded-lg text-foreground hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleShare("copy")}
                className="p-2.5 bg-card border border-border rounded-lg text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </header>

          {/* Post Content - Markdown */}
          <div
            className={`${isFullscreen ? "flex-1 overflow-auto px-4" : ""} animate-fadeIn prose-content`}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 mt-16 text-foreground pb-4 border-b border-border">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 mt-12 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-heading font-semibold mb-4 mt-10 text-foreground">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg md:text-xl font-heading font-semibold mb-3 mt-8 text-foreground">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="mb-5 leading-relaxed text-foreground text-base md:text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-6 space-y-2 text-foreground pl-6 list-disc">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-6 space-y-2 text-foreground pl-6 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-8 p-6 bg-muted/50 border-l-4 border-primary text-foreground italic rounded-r-xl">
                    {children}
                  </blockquote>
                ),
                code: ({
                  className,
                  children,
                  ...props
                }: React.ComponentPropsWithoutRef<"code">) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        className="px-2 py-1 bg-primary/10 text-primary font-mono font-medium text-sm rounded"
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
                  <pre className="my-6 bg-[#0d1117] border border-border overflow-hidden rounded-xl">
                    {children}
                  </pre>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium underline decoration-primary/50 underline-offset-4 hover:decoration-primary transition-colors"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="my-8 w-full border border-border rounded-xl"
                  />
                ),
                hr: () => <hr className="my-12 border-t border-border" />,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border border-border rounded-xl overflow-hidden bg-card">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="border-b border-border px-4 py-3 text-foreground font-semibold text-left text-sm">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-border px-4 py-3 text-foreground text-sm">
                    {children}
                  </td>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          {!isFullscreen && (
            <div className="mt-16 p-6 md:p-8 bg-card border border-border rounded-2xl animate-fadeIn">
              <div className="flex items-start gap-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-heading font-bold mb-2 text-foreground">
                    About {post.author.name}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          {!isFullscreen && (
            <div className="mt-12 pt-8 flex justify-between items-center animate-fadeIn border-t border-border">
              <button
                type="button"
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                All Posts
              </button>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4" />
                Back to Top
              </button>
            </div>
          )}
        </div>

        {!isFullscreen && <Footer />}
      </div>
    </>
  );
};

export default BlogPostPage;
