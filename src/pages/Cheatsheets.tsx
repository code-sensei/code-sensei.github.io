/**
 * Cheatsheets Page Component
 * @description Main page for browsing, searching, and filtering cheatsheets
 * Displays cheatsheets in reverse chronological order with search functionality
 * Now using Neobrutalism design style consistent with blog pages
 *
 * SEO & AI Search Optimized:
 * - Dynamic metadata for search engines
 * - CollectionPage JSON-LD structured data
 * - Open Graph and Twitter Card support
 * - Optimized for ChatGPT, Perplexity, and Google AI
 */

import React, { useState, useMemo, useEffect } from "react";
import {
  getCheatsheets,
  searchCheatsheets,
  getCategories,
  getAllKeywords,
} from "@/data/cheatsheets";
import type { Cheatsheet, CheatsheetCategory } from "@/types/cheatsheet";
import {
  SEO,
  generateCheatsheetCollectionSchema,
  generateWebPageSchema,
} from "@/components/seo";
import Navigation from "@/components/layout/Navigation";
import {
  Search,
  FileText,
  Image as ImageIcon,
  Calendar,
  Tag,
  Filter,
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  Code,
  Database,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

/**
 * Category icons mapping for visual distinction
 */
const categoryIcons: Record<string, React.ReactNode> = {
  Programming: <Code className="w-4 h-4" />,
  "Machine Learning": <Database className="w-4 h-4" />,
  "Web Development": <Zap className="w-4 h-4" />,
  default: <Layers className="w-4 h-4" />,
};

/**
 * Get icon for category
 */
const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || categoryIcons["default"];
};

/**
 * Cheatsheets component with Neobrutalism design
 * @returns {JSX.Element} The rendered Cheatsheets page
 */
const Cheatsheets: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "page">(
    "all",
  );
  const [allCheatsheets, setAllCheatsheets] = useState<Cheatsheet[]>([]);
  const [categories, setCategories] = useState<CheatsheetCategory[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  /**
   * Load initial data on component mount
   */
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [sheets, cats, keys] = await Promise.all([
          getCheatsheets(),
          getCategories(),
          getAllKeywords(),
        ]);
        setAllCheatsheets(sheets);
        setCategories(cats);
        setKeywords(keys);
      } catch (error) {
        console.error("Error loading cheatsheets data:", error);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };
    loadInitialData();
  }, []);

  /**
   * Filter cheatsheets based on search query, category, and type
   */
  const filteredCheatsheets = useMemo(() => {
    let results = allCheatsheets;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (sheet) =>
          sheet.title.toLowerCase().includes(query) ||
          sheet.description.toLowerCase().includes(query) ||
          sheet.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query),
          ) ||
          sheet.category.toLowerCase().includes(query),
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter((sheet) => sheet.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== "all") {
      results = results.filter((sheet) => sheet.type === selectedType);
    }

    // Sort by date (newest first)
    return results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [allCheatsheets, searchQuery, selectedCategory, selectedType]);

  /**
   * Handle clicking on a cheatsheet card
   * @param {string} slug - The cheatsheet slug to navigate to
   */
  const handleCheatsheetClick = (slug: string) => {
    navigate(`/cheatsheets/${slug}`);
  };

  /**
   * Clear all active filters
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("all");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedType !== "all";

  /**
   * Get the icon for a cheatsheet type
   * @param {string} type - The cheatsheet type
   * @returns {JSX.Element} The appropriate icon
   */
  const getTypeIcon = (type: "image" | "page") => {
    return type === "image" ? (
      <ImageIcon className="w-4 h-4" />
    ) : (
      <FileText className="w-4 h-4" />
    );
  };

  // Generate structured data for cheatsheets collection (must be before any early returns)
  const cheatsheetsStructuredData = useMemo(() => {
    if (allCheatsheets.length === 0) return [];
    return [
      generateWebPageSchema(
        "Developer Cheatsheets | Babangida Tsowa",
        "A curated collection of developer cheatsheets and quick reference guides for programming, AI, and software engineering.",
        "/cheatsheets",
        "CollectionPage",
      ),
      generateCheatsheetCollectionSchema(allCheatsheets),
    ];
  }, [allCheatsheets]);

  // Loading skeleton - Neobrutalism style
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
              {/* Header skeleton */}
              <div className="h-[200px] bg-[#FFE156] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
              {/* Grid skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  />
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
      <div className="min-h-screen bg-[#FFFEF0] dark:bg-[#1a1a2e] pt-20">
        {/* SEO Meta Tags and Structured Data */}
        <SEO
          title="Developer Cheatsheets | Quick Reference Guides"
          description="A curated collection of developer cheatsheets and quick reference guides for programming, AI, machine learning, and software engineering. Visual references and markdown guides."
          keywords={[
            "developer cheatsheets",
            "programming reference",
            "coding cheatsheets",
            "quick reference guides",
            "software engineering",
            "AI cheatsheets",
            "machine learning reference",
            ...keywords.slice(0, 10),
          ]}
          url="/cheatsheets"
          ogType="website"
          ogImage="/cheatsheets/og-cheatsheets.png"
          ogImageAlt="Developer Cheatsheets Collection - Babangida Tsowa"
          structuredData={cheatsheetsStructuredData}
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Cheatsheets", url: "/cheatsheets" },
          ]}
        />

        {/* ============================================
            SECTION 1: HERO HEADER
            Clear value proposition and search
            ============================================ */}
        <header className="border-b-4 border-black dark:border-white bg-white dark:bg-[#2d2d44]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl">
              {/* Breadcrumb / Context */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0E7E5] border-3 border-black mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <Layers className="w-4 h-4 text-black" />
                <span className="text-sm font-bold text-black uppercase tracking-wide">
                  Quick Reference Library
                </span>
              </div>

              {/* Main headline - Clear value proposition */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black dark:text-white mb-4 leading-[1.1]">
                Developer Cheatsheets
              </h1>

              {/* Subheadline - What readers will find */}
              <p className="text-lg md:text-xl text-black/70 dark:text-white/70 font-mono mb-8 leading-relaxed max-w-2xl">
                Quick reference guides and visual cheatsheets for development
                tools, languages, frameworks, and machine learning concepts.
              </p>

              {/* Search Bar - Prominent placement */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50 dark:text-white/50" />
                <input
                  type="text"
                  placeholder="Search cheatsheets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 h-14 text-base bg-[#FFFEF0] dark:bg-[#1a1a2e] border-4 border-black dark:border-white text-black dark:text-white font-mono placeholder:text-black/40 dark:placeholder:text-white/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#FF6B6B] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm font-mono text-black/60 dark:text-white/60">
                <span>{allCheatsheets.length} cheatsheets</span>
                <span>•</span>
                <span>{categories.length} categories</span>
                <span>•</span>
                <span>
                  {allCheatsheets.filter((s) => s.type === "page").length} page
                  guides
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ============================================
              SECTION 2: CATEGORY & TYPE FILTERS
              Quick navigation and filtering
              ============================================ */}
          <nav
            className="py-8 border-b-4 border-black dark:border-white"
            aria-label="Category and type navigation"
          >
            {/* Category Filters */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide">
                Browse by Category
              </span>
              <div className="h-0.5 flex-1 bg-black/20 dark:bg-white/20" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`inline-flex items-center gap-2 px-4 py-2.5 border-3 border-black dark:border-white font-bold text-sm uppercase tracking-wide transition-all ${
                  selectedCategory === "All"
                    ? "bg-[#FFE156] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                    : "bg-white dark:bg-[#2d2d44] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 border-3 border-black dark:border-white font-bold text-sm uppercase tracking-wide transition-all ${
                    selectedCategory === category.name
                      ? "bg-[#FFE156] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                      : "bg-white dark:bg-[#2d2d44] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {getCategoryIcon(category.name)}
                  {category.name}
                  <span className="text-xs opacity-60">({category.count})</span>
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-black text-black dark:text-white uppercase tracking-wide">
                Filter by Type
              </span>
              <div className="h-0.5 flex-1 bg-black/20 dark:bg-white/20" />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                {
                  value: "all",
                  label: "All Types",
                  icon: <Layers className="w-4 h-4" />,
                },
                {
                  value: "image",
                  label: "Images",
                  icon: <ImageIcon className="w-4 h-4" />,
                },
                {
                  value: "page",
                  label: "Pages",
                  icon: <FileText className="w-4 h-4" />,
                },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setSelectedType(type.value as "all" | "image" | "page")
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 border-3 border-black dark:border-white font-bold text-sm uppercase tracking-wide transition-all ${
                    selectedType === type.value
                      ? "bg-[#A0E7E5] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-0 translate-y-0"
                      : "bg-white dark:bg-[#2d2d44] text-black dark:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>

            {/* Active filters indicator */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t-2 border-black/20 dark:border-white/20">
                <span className="text-xs font-bold text-black/60 dark:text-white/60 uppercase">
                  Filters:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFE156] border-2 border-black text-black text-xs font-bold">
                    "{searchQuery.slice(0, 15)}
                    {searchQuery.length > 15 ? "..." : ""}"
                    <button onClick={() => setSearchQuery("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#DDA0DD] border-2 border-black text-black text-xs font-bold">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedType !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#A0E7E5] border-2 border-black text-black text-xs font-bold">
                    {getTypeIcon(selectedType)}
                    <span className="capitalize">{selectedType}</span>
                    <button onClick={() => setSelectedType("all")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#FF6B6B] hover:underline uppercase"
                >
                  Clear all
                </button>
              </div>
            )}
          </nav>

          {/* ============================================
              SECTION 3: CHEATSHEETS GRID
              Card-based layout
              ============================================ */}
          <section className="py-10" aria-label="All cheatsheets">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">
                {hasActiveFilters ? "Search Results" : "All Cheatsheets"}
              </h2>
              <span className="text-sm font-mono text-black/60 dark:text-white/60">
                {filteredCheatsheets.length}{" "}
                {filteredCheatsheets.length === 1 ? "sheet" : "sheets"}
              </span>
            </div>

            {filteredCheatsheets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCheatsheets.map((sheet, index) => (
                  <article
                    key={sheet.id}
                    className="group bg-white dark:bg-[#2d2d44] border-4 border-black dark:border-white cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all animate-slideUp flex flex-col"
                    onClick={() => handleCheatsheetClick(sheet.slug)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Preview Image/Placeholder */}
                    <div className="relative h-44 overflow-hidden border-b-4 border-black dark:border-white">
                      {sheet.type === "image" && sheet.imageUrl ? (
                        <img
                          src={sheet.imageUrl}
                          alt={sheet.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add(
                                "flex",
                                "items-center",
                                "justify-center",
                                "bg-[#DDA0DD]",
                              );
                              const placeholder = document.createElement("div");
                              placeholder.innerHTML =
                                '<svg class="w-16 h-16 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                              parent.appendChild(
                                placeholder.firstElementChild!,
                              );
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#B8E986]">
                          <FileText className="w-16 h-16 text-black/30" />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black text-black text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {getTypeIcon(sheet.type)}
                        <span className="capitalize">{sheet.type}</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-[#FFE156] border-2 border-black text-black text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {sheet.category}
                      </div>

                      {sheet.sourceUrl && (
                        <div className="absolute bottom-3 right-3 p-2 bg-[#A0E7E5] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <ExternalLink className="w-3 h-3 text-black" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#FF6B6B] transition-colors">
                        {sheet.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-black/70 dark:text-white/70 font-mono mb-4 line-clamp-2 flex-1">
                        {sheet.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs font-mono text-black/60 dark:text-white/60 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDistanceToNow(new Date(sheet.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-1">
                        {sheet.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-0.5 bg-[#FFE156] border border-black text-black text-xs font-bold"
                          >
                            {keyword}
                          </span>
                        ))}
                        {sheet.keywords.length > 3 && (
                          <span className="px-2 py-0.5 bg-black/10 dark:bg-white/10 text-black/60 dark:text-white/60 text-xs font-bold">
                            +{sheet.keywords.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#A0E7E5] border-4 border-black dark:border-white flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <Search className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 text-black dark:text-white">
                  No cheatsheets found
                </h3>
                <p className="text-black/70 dark:text-white/70 mb-6 max-w-md mx-auto font-mono">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE156] border-4 border-black text-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* ============================================
              SECTION 4: STATS FOOTER
              Collection overview
              ============================================ */}
          {allCheatsheets.length > 0 && (
            <section
              className="py-10 border-t-4 border-black dark:border-white"
              aria-label="Collection statistics"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    value: allCheatsheets.length,
                    label: "Total Sheets",
                    color: "#FFE156",
                  },
                  {
                    value: categories.length,
                    label: "Categories",
                    color: "#A0E7E5",
                  },
                  {
                    value: allCheatsheets.filter((s) => s.type === "image")
                      .length,
                    label: "Image Sheets",
                    color: "#DDA0DD",
                  },
                  {
                    value: allCheatsheets.filter((s) => s.type === "page")
                      .length,
                    label: "Page Guides",
                    color: "#B8E986",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    style={{ backgroundColor: stat.color }}
                  >
                    <div className="text-3xl md:text-4xl font-black text-black mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-black font-bold uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Cheatsheets;
