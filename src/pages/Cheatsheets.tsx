/**
 * Cheatsheets Page Component
 * @description Main page for browsing, searching, and filtering cheatsheets
 * Displays cheatsheets in reverse chronological order with search functionality
 *
 * SEO & AI Search Optimized:
 * - Dynamic metadata for search engines
 * - CollectionPage JSON-LD structured data
 * - Open Graph and Twitter Card support
 * - Optimized for ChatGPT, Perplexity, and Google AI
 */

import React, { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";

/**
 * Cheatsheets component
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
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Skeleton */}
          <div className="text-center mb-16 animate-pulse">
            <div className="h-12 w-56 bg-muted rounded-lg mx-auto mb-4" />
            <div className="h-6 w-96 bg-muted rounded-lg mx-auto" />
          </div>

          {/* Search Skeleton */}
          <div className="mb-8 space-y-4 animate-pulse">
            <div className="h-14 bg-muted rounded-2xl w-full max-w-2xl mx-auto" />
            <div className="flex flex-wrap gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-28 bg-muted rounded-full" />
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="h-48 bg-muted rounded-2xl mb-4" />
                <div className="h-6 bg-muted rounded-lg mb-3 w-3/4" />
                <div className="h-4 bg-muted rounded-lg mb-2 w-full" />
                <div className="h-4 bg-muted rounded-lg w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/50 pt-20">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with gradient and animation */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slideDown">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {allCheatsheets.length} Reference Sheets
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slideDown">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
              Cheatsheets
            </span>
          </h1>
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slideDown"
            style={{ animationDelay: "100ms" }}
          >
            Quick reference guides and visual cheatsheets for development tools,
            languages, and frameworks
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="mb-12 space-y-6 animate-fadeIn"
          style={{ animationDelay: "200ms" }}
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, keywords, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-base rounded-2xl border-2 focus:border-primary/50 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex justify-center lg:hidden">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Category Filters */}
          <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              <span className="font-medium">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("All")}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "shadow-lg shadow-primary/25 scale-105"
                    : "hover:scale-105"
                }`}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "shadow-lg shadow-primary/25 scale-105"
                      : "hover:scale-105"
                  }`}
                >
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({category.count})
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className={`space-y-4 ${!showFilters && "hidden lg:block"}`}>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Filter by Type</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                {
                  value: "all",
                  label: "All Types",
                  icon: <Layers className="w-3.5 h-3.5" />,
                },
                {
                  value: "image",
                  label: "Images",
                  icon: <ImageIcon className="w-3.5 h-3.5" />,
                },
                {
                  value: "page",
                  label: "Pages",
                  icon: <FileText className="w-3.5 h-3.5" />,
                },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setSelectedType(type.value as "all" | "image" | "page")
                  }
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedType === type.value
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground hover:scale-105"
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center justify-center gap-3 flex-wrap p-4 rounded-2xl bg-primary/5 border border-primary/20 max-w-3xl mx-auto animate-slideDown">
              <span className="text-sm font-medium text-muted-foreground">
                Active filters:
              </span>

              {searchQuery && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <Search className="w-3 h-3" />
                  <span className="text-xs font-medium">
                    "{searchQuery.slice(0, 20)}"
                  </span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedCategory !== "All" && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  <span className="text-xs font-medium">
                    {selectedCategory}
                  </span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {selectedType !== "all" && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-border">
                  {getTypeIcon(selectedType)}
                  <span className="text-xs font-medium capitalize">
                    {selectedType}
                  </span>
                  <button
                    onClick={() => setSelectedType("all")}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs rounded-full hover:bg-destructive/10 hover:text-destructive"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        {filteredCheatsheets.length > 0 && (
          <div className="text-center mb-8 animate-fadeIn">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {filteredCheatsheets.length}
              </span>{" "}
              {filteredCheatsheets.length === 1 ? "cheatsheet" : "cheatsheets"}
            </p>
          </div>
        )}

        {/* Cheatsheets Grid */}
        {filteredCheatsheets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredCheatsheets.map((sheet, index) => (
              <Card
                key={sheet.id}
                className="group overflow-hidden border hover:border-primary/50 transition-all duration-500 cursor-pointer hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-card/50 animate-slideUp"
                onClick={() => handleCheatsheetClick(sheet.slug)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Preview Section */}
                <div className="relative h-52 overflow-hidden bg-muted/30">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

                  {sheet.type === "image" && sheet.imageUrl ? (
                    <img
                      src={sheet.imageUrl}
                      alt={sheet.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.classList.add(
                          "flex",
                          "items-center",
                          "justify-center",
                        );
                        const placeholder = document.createElement("div");
                        placeholder.innerHTML =
                          '<svg class="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                        target.parentElement!.appendChild(
                          placeholder.firstElementChild!,
                        );
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <FileText className="w-16 h-16 text-primary/30" />
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium border border-border">
                    {getTypeIcon(sheet.type)}
                    <span className="capitalize">{sheet.type}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-xs font-medium text-primary-foreground">
                    {sheet.category}
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {sheet.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                    {sheet.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDistanceToNow(new Date(sheet.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                    {sheet.sourceUrl && (
                      <div className="flex items-center gap-1 text-primary">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </div>
                    )}
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1.5">
                    {sheet.keywords.slice(0, 4).map((keyword) => (
                      <span
                        key={keyword}
                        className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                    {sheet.keywords.length > 4 && (
                      <span className="px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                        +{sheet.keywords.length - 4}
                      </span>
                    )}
                  </div>

                  {/* View Full */}
                  <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                    <span>View Full</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No cheatsheets found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any cheatsheets matching your search. Try
              adjusting your filters or search terms.
            </p>
            <Button onClick={clearFilters} size="lg" className="rounded-full">
              Clear Filters
            </Button>
          </div>
        )}

        {/* Stats Section */}
        {allCheatsheets.length > 0 && (
          <div
            className="mt-20 pt-16 border-t border-border/50 animate-fadeIn"
            style={{ animationDelay: "300ms" }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold mb-2">Collection Overview</h3>
              <p className="text-muted-foreground">
                Your personal reference library
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {allCheatsheets.length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Total Sheets
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  {categories.length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Categories
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                  {allCheatsheets.filter((s) => s.type === "image").length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Image Sheets
                </div>
              </div>

              <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2 group-hover:scale-110 transition-transform">
                  {allCheatsheets.filter((s) => s.type === "page").length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Page Sheets
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cheatsheets;
