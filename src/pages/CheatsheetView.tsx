/**
 * CheatsheetView Page Component
 * @description Full-screen view for individual cheatsheets
 * Supports both image-based cheatsheets and markdown page content
 * Uses clean, modern design with Space Grotesk typography
 *
 * SEO & AI Search Optimized:
 * - Dynamic per-cheatsheet metadata
 * - LearningResource JSON-LD structured data
 * - Open Graph and Twitter Card support
 */

import { useEffect, useState, useMemo } from "react";
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
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
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
  ChevronUp,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import "highlight.js/styles/github-dark.css";

const CheatsheetView = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<Cheatsheet | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [imageZoom, setImageZoom] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);

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

  const handleZoom = (delta: number) => {
    setImageZoom((prev) => {
      const newZoom = prev + delta;
      return Math.min(Math.max(newZoom, 50), 200);
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share && sheet) {
      try {
        await navigator.share({
          title: sheet.title,
          text: sheet.description,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const cheatsheetStructuredData = useMemo(() => {
    if (!sheet) return [];
    const schemas = [generateCheatsheetSchema(sheet)];
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
            <p className="text-muted-foreground">Fetching cheatsheet</p>
          </div>
        </div>
      </>
    );
  }

  // Not found state
  if (!sheet) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <SEO
            title="Cheatsheet Not Found"
            description="The cheatsheet you're looking for doesn't exist or has been removed."
            url={`/cheatsheets/${slug}`}
            robots={{ index: false, follow: true }}
          />
          <div className="text-center animate-fadeIn p-8">
            <div className="w-28 h-28 mx-auto mb-6 bg-destructive/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-14 h-14 text-destructive" />
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4 text-foreground">
              Not Found
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              The cheatsheet you're looking for doesn't exist or has been
              removed.
            </p>
            <button
              type="button"
              onClick={() => navigate("/cheatsheets")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cheatsheets
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
          className={`${isFullscreen ? "h-screen flex flex-col" : "container-wide section-padding"}`}
        >
          {/* Back Button & Actions */}
          <div
            className={`${isFullscreen ? "p-4 bg-background border-b border-border" : "mb-8"} animate-fadeIn flex items-center justify-between`}
          >
            <button
              type="button"
              onClick={() => navigate("/cheatsheets")}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg font-medium text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>

            <div className="flex items-center gap-2">
              {sheet.type === "image" && (
                <>
                  <button
                    type="button"
                    onClick={() => handleZoom(-10)}
                    disabled={imageZoom <= 50}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-muted disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-sm text-muted-foreground hidden sm:inline px-2">
                    {imageZoom}%
                  </span>
                  <button
                    type="button"
                    onClick={() => handleZoom(10)}
                    disabled={imageZoom >= 200}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-muted disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={handleShare}
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

              {sheet.sourceUrl && (
                <button
                  type="button"
                  onClick={() => window.open(sheet.sourceUrl, "_blank")}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Source</span>
                </button>
              )}
            </div>
          </div>

          {/* Header Info */}
          {(!isFullscreen || sheet.type === "page") && (
            <header
              className={`${isFullscreen ? "px-4 pb-4" : "mb-10"} animate-fadeIn`}
            >
              {/* Type and Category Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary font-medium text-xs rounded-full">
                  {sheet.type === "image" ? (
                    <ImageIcon className="w-4 h-4" />
                  ) : (
                    <FileText className="w-4 h-4" />
                  )}
                  <span className="capitalize">{sheet.type}</span>
                </div>
                <div className="px-4 py-2 bg-accent/20 text-accent-foreground font-medium text-xs rounded-full">
                  {sheet.category}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight text-foreground">
                {sheet.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                {sheet.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(sheet.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
                {sheet.updatedAt && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
                    <span>
                      Updated{" "}
                      {formatDistanceToNow(new Date(sheet.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2">
                {sheet.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full"
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
                className={`${isFullscreen ? "h-full flex items-center justify-center p-4 bg-muted/30" : "rounded-2xl overflow-hidden border border-border"}`}
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
              /* Markdown Page Content */
              <div className="prose-content">
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
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  }}
                >
                  {sheet.content}
                </ReactMarkdown>
              </div>
            ) : (
              /* Fallback for missing content */
              <div className="text-center py-20">
                <div className="w-28 h-28 mx-auto mb-6 bg-destructive/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-14 h-14 text-destructive" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                  Content Not Available
                </h3>
                <p className="text-muted-foreground">
                  The content for this cheatsheet is not available.
                </p>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          {!isFullscreen && (
            <div className="mt-12 pt-8 flex justify-between items-center animate-fadeIn border-t border-border">
              <button
                type="button"
                onClick={() => navigate("/cheatsheets")}
                className="inline-flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                All Cheatsheets
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

export default CheatsheetView;
