/**
 * CheatsheetView Page Component
 * @description Full-screen view for individual cheatsheets
 * Supports both image-based cheatsheets and markdown page content
 * Page cheatsheets use Neobrutalism design style
 *
 * SEO & AI Search Optimized:
 * - Dynamic per-cheatsheet metadata
 * - LearningResource JSON-LD structured data
 * - Open Graph and Twitter Card support
 * - Optimized for AI search citations (ChatGPT, Perplexity, Google AI)
 */

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { getCheatsheetBySlug } from "@/data/cheatsheets";
import type { Cheatsheet } from "@/types/cheatsheet";
import {
  SEO,
  generateCheatsheetSchema,
  generateImageSchema,
} from "@/components/seo";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  Tag,
  ExternalLink,
  Maximize2,
  Minimize2,
  Share2,
  FileText,
  Image as ImageIcon,
  Check,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import "highlight.js/styles/github-dark.css";

/**
 * CheatsheetView component
 * @returns {JSX.Element} The rendered CheatsheetView page
 */
const CheatsheetView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<Cheatsheet | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageZoom, setImageZoom] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);

  /**
   * Load cheatsheet data on mount
   */
  useEffect(() => {
    window.scrollTo(0, 0);

    const loadSheet = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const sheetData = await getCheatsheetBySlug(slug);
        setSheet(sheetData);
      } catch (error) {
        console.error("Error loading cheatsheet:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSheet();
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
   * Handle image zoom
   * @param {number} delta - Zoom delta (+/-)
   */
  const handleZoom = (delta: number) => {
    setImageZoom((prev) => {
      const newZoom = prev + delta;
      return Math.min(Math.max(newZoom, 50), 200);
    });
  };

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
   * Share cheatsheet
   */
  const handleShare = async () => {
    if (navigator.share && sheet) {
      try {
        await navigator.share({
          title: sheet.title,
          text: sheet.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
        console.error("Share failed:", error);
      }
    } else {
      handleCopyLink();
    }
  };

  // Generate structured data for this cheatsheet (must be before any early returns)
  const cheatsheetStructuredData = useMemo(() => {
    if (!sheet) return [];
    const schemas = [generateCheatsheetSchema(sheet)];
    // Add ImageObject schema for image-based cheatsheets
    if (sheet.type === "image" && sheet.imageUrl) {
      schemas.push(
        generateImageSchema(sheet.title, sheet.description, sheet.imageUrl),
      );
    }
    return schemas;
  }, [sheet]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-4 bg-[#FFE156] border-4 border-black dark:border-white rounded-none flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
            <FileText className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-2xl font-black mb-2 uppercase tracking-tight">
            Loading...
          </h1>
          <p className="text-muted-foreground font-mono">Fetching cheatsheet</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!sheet) {
    return (
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20 flex items-center justify-center">
        <SEO
          title="Cheatsheet Not Found"
          description="The cheatsheet you're looking for doesn't exist or has been removed."
          url={`/cheatsheets/${slug}`}
          robots={{ index: false, follow: true }}
        />
        <div className="text-center animate-fadeIn p-8">
          <div className="w-28 h-28 mx-auto mb-6 bg-[#FF6B6B] border-4 border-black dark:border-white rounded-none flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
            <FileText className="w-14 h-14 text-black" />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">
            Not Found
          </h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto font-mono">
            The cheatsheet you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/cheatsheets")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#A0E7E5] border-4 border-black dark:border-white text-black font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cheatsheets
          </button>
        </div>
      </div>
    );
  }

  // Neobrutalism page content rendering
  const isPageType = sheet.type === "page";

  return (
    <div
      className={`min-h-screen ${isPageType ? "bg-[#FFFEF0] dark:bg-[#1a1a2e]" : "bg-background"} ${isFullscreen ? "" : "pt-20"}`}
    >
      {/* SEO Meta Tags and Structured Data for Cheatsheet */}
      <SEO
        title={sheet.title}
        description={sheet.description}
        keywords={[sheet.category, ...sheet.keywords]}
        url={`/cheatsheets/${sheet.slug}`}
        ogType="article"
        ogImage={
          sheet.type === "image" && sheet.imageUrl
            ? sheet.imageUrl
            : "/profile-image.png"
        }
        ogImageAlt={`${sheet.title} - Developer Cheatsheet`}
        twitterCard="summary_large_image"
        structuredData={cheatsheetStructuredData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Cheatsheets", url: "/cheatsheets" },
          {
            name: sheet.category,
            url: `/cheatsheets?category=${encodeURIComponent(sheet.category)}`,
          },
          { name: sheet.title, url: `/cheatsheets/${sheet.slug}` },
        ]}
        additionalMeta={[
          { name: "content:type", content: sheet.type },
          { name: "content:category", content: sheet.category },
        ]}
      />

      <div
        className={`${isFullscreen ? "h-screen flex flex-col" : "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"}`}
      >
        {/* Back Button & Actions - Neobrutalism style for page type */}
        <div
          className={`${isFullscreen ? "p-4 bg-background/95 backdrop-blur-md border-b-4 border-black dark:border-white" : "mb-8"} animate-fadeIn flex items-center justify-between`}
        >
          <button
            onClick={() => navigate("/cheatsheets")}
            className={`group inline-flex items-center gap-2 ${isPageType ? "px-4 py-2 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.3)] transition-all" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>

          <div className="flex items-center gap-2">
            {sheet.type === "image" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(-10)}
                  disabled={imageZoom <= 50}
                  className="hidden sm:flex"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm text-muted-foreground hidden sm:inline px-2">
                  {imageZoom}%
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom(10)}
                  disabled={imageZoom >= 200}
                  className="hidden sm:flex"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </>
            )}

            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-2 ${isPageType ? "px-4 py-2 bg-[#A0E7E5] border-3 border-black dark:border-white text-black font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" : "px-3 py-1.5 border rounded-md text-sm hover:bg-muted"}`}
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
              className={`inline-flex items-center gap-2 ${isPageType ? "px-4 py-2 bg-[#FFE156] border-3 border-black dark:border-white text-black font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" : "px-3 py-1.5 border rounded-md text-sm hover:bg-muted"}`}
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

            {sheet.sourceUrl && (
              <button
                onClick={() => window.open(sheet.sourceUrl, "_blank")}
                className={`inline-flex items-center gap-2 ${isPageType ? "px-4 py-2 bg-[#FF6B6B] border-3 border-black dark:border-white text-black font-bold uppercase text-sm tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" : "px-3 py-1.5 border rounded-md text-sm hover:bg-muted"}`}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Source</span>
              </button>
            )}
          </div>
        </div>

        {/* Header Info - Neobrutalism style for page type */}
        {(!isFullscreen || sheet.type === "page") && (
          <header
            className={`${isFullscreen ? "px-4 pb-4" : "mb-10"} animate-fadeIn`}
          >
            {/* Type and Category Badges - Neobrutalism */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div
                className={`inline-flex items-center gap-2 ${isPageType ? "px-4 py-2 bg-[#B8E986] border-3 border-black dark:border-white text-black font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary"}`}
              >
                {sheet.type === "image" ? (
                  <ImageIcon className="w-4 h-4" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                <span>{sheet.type}</span>
              </div>
              <div
                className={`${isPageType ? "px-4 py-2 bg-[#DDA0DD] border-3 border-black dark:border-white text-black font-bold uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "px-3 py-1.5 rounded-full bg-muted text-sm font-medium"}`}
              >
                {sheet.category}
              </div>
            </div>

            {/* Title - Neobrutalism */}
            <h1
              className={`mb-6 leading-tight ${isPageType ? "text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-black dark:text-white" : "text-3xl sm:text-4xl md:text-5xl font-bold"}`}
            >
              {sheet.title}
            </h1>

            {/* Description - Neobrutalism */}
            <p
              className={`mb-8 max-w-3xl ${isPageType ? "text-lg md:text-xl font-mono text-black/70 dark:text-white/70 leading-relaxed" : "text-lg md:text-xl text-muted-foreground"}`}
            >
              {sheet.description}
            </p>

            {/* Meta Information - Neobrutalism */}
            <div
              className={`flex flex-wrap items-center gap-4 mb-6 ${isPageType ? "font-mono text-sm" : "text-sm text-muted-foreground"}`}
            >
              <div
                className={`inline-flex items-center gap-2 ${isPageType ? "px-3 py-1.5 bg-white dark:bg-[#2d2d44] border-2 border-black dark:border-white text-black dark:text-white" : ""}`}
              >
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(sheet.createdAt), "MMM dd, yyyy")}</span>
              </div>
              {sheet.updatedAt && (
                <div
                  className={`inline-flex items-center gap-2 ${isPageType ? "px-3 py-1.5 bg-white dark:bg-[#2d2d44] border-2 border-black dark:border-white text-black dark:text-white" : ""}`}
                >
                  <span>
                    Updated{" "}
                    {formatDistanceToNow(new Date(sheet.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Keywords - Neobrutalism */}
            <div className="flex flex-wrap gap-2">
              {sheet.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className={`inline-flex items-center gap-1 ${isPageType ? "px-3 py-1.5 bg-[#FFE156] border-2 border-black dark:border-white text-black font-bold text-xs uppercase tracking-wide hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-default" : "px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"}`}
                >
                  <Tag className="w-3 h-3" />
                  {keyword}
                </span>
              ))}
            </div>
          </header>
        )}

        {/* Content */}
        <div
          className={`${isFullscreen ? "flex-1 overflow-auto" : ""} animate-fadeIn`}
        >
          {sheet.type === "image" && sheet.imageUrl ? (
            /* Image Cheatsheet View */
            <div
              className={`${isFullscreen ? "h-full flex items-center justify-center p-4 bg-muted/30" : "rounded-2xl overflow-hidden border border-border shadow-lg"}`}
            >
              <div
                className={`${isFullscreen ? "max-h-full" : ""} overflow-auto`}
                style={{ maxWidth: isFullscreen ? "100%" : undefined }}
              >
                <img
                  src={sheet.imageUrl}
                  alt={sheet.title}
                  className="transition-transform duration-300"
                  style={{
                    transform: `scale(${imageZoom / 100})`,
                    transformOrigin: "top left",
                    maxWidth: isFullscreen ? "none" : "100%",
                    height: "auto",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const container = target.parentElement;
                    if (container) {
                      container.innerHTML = `
                                                <div class="flex flex-col items-center justify-center h-96 text-muted-foreground">
                                                    <svg class="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                    </svg>
                                                    <p class="text-lg font-medium">Image failed to load</p>
                                                    <p class="text-sm">The cheatsheet image could not be found</p>
                                                </div>
                                            `;
                    }
                  }}
                />
              </div>
            </div>
          ) : sheet.type === "page" && sheet.content ? (
            /* Neobrutalism Markdown Page Content */
            <div className="neobrutalism-content">
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
                    <strong className="font-bold text-primary">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-secondary-foreground">
                      {children}
                    </em>
                  ),
                }}
              >
                {sheet.content}
              </ReactMarkdown>
            </div>
          ) : (
            /* Fallback for missing content */
            <div className="text-center py-20">
              <div className="w-28 h-28 mx-auto mb-6 bg-[#FF6B6B] border-4 border-black dark:border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
                <FileText className="w-14 h-14 text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-3">
                Content Not Available
              </h3>
              <p className="text-muted-foreground font-mono">
                The content for this cheatsheet is not available.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Footer - Neobrutalism */}
        {!isFullscreen && (
          <div
            className={`mt-12 pt-8 flex justify-between items-center animate-fadeIn ${isPageType ? "border-t-4 border-black dark:border-white" : "border-t border-border"}`}
          >
            <button
              onClick={() => navigate("/cheatsheets")}
              className={`inline-flex items-center gap-2 ${isPageType ? "px-5 py-3 bg-white dark:bg-[#2d2d44] border-3 border-black dark:border-white text-black dark:text-white font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" : "px-4 py-2 border rounded-md hover:bg-muted"}`}
            >
              <ArrowLeft className="w-4 h-4" />
              All Cheatsheets
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`${isPageType ? "px-5 py-3 bg-[#FFE156] border-3 border-black dark:border-white text-black font-bold uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all" : "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"}`}
            >
              Back to Top
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheatsheetView;
