/**
 * Cheatsheets Page Component
 * @description Main page for browsing, searching, and filtering cheatsheets
 * Uses clean, modern design with Space Grotesk typography
 *
 * SEO & AI Search Optimized:
 * - Dynamic metadata for search engines
 * - CollectionPage JSON-LD structured data
 * - Open Graph and Twitter Card support
 */

import { useState, useMemo, useEffect } from "react";
import {
  getCheatsheets,
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
import Footer from "@/components/layout/Footer";
import {
  Search,
  FileText,
  Image as ImageIcon,
  Calendar,
  X,
  Layers,
  Code,
  Database,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

/** Category icons mapping */
const categoryIcons: Record<string, React.ReactNode> = {
  Programming: <Code className="w-4 h-4" />,
  "Machine Learning": <Database className="w-4 h-4" />,
  "Web Development": <Zap className="w-4 h-4" />,
  default: <Layers className="w-4 h-4" />,
};

const getCategoryIcon = (category: string) => {
  return categoryIcons[category] || categoryIcons["default"];
};

const Cheatsheets = () => {
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

  const filteredCheatsheets = useMemo(() => {
    let results = allCheatsheets;

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

    if (selectedCategory !== "All") {
      results = results.filter((sheet) => sheet.category === selectedCategory);
    }

    if (selectedType !== "all") {
      results = results.filter((sheet) => sheet.type === selectedType);
    }

    return results.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [allCheatsheets, searchQuery, selectedCategory, selectedType]);

  const handleCheatsheetClick = (slug: string) => {
    navigate(`/cheatsheets/${slug}`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("all");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory !== "All" || selectedType !== "all";

  const getTypeIcon = (type: "image" | "page") => {
    return type === "image" ? (
      <ImageIcon className="w-4 h-4" />
    ) : (
      <FileText className="w-4 h-4" />
    );
  };

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
      <>
        <Navigation />
        <div className="min-h-screen bg-background pt-24">
          <div className="container-wide section-padding">
            <div className="animate-pulse space-y-8">
              <div className="h-[200px] bg-muted/30 rounded-2xl" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-muted/20 rounded-xl" />
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
      <div className="min-h-screen bg-background pt-24">
        <SEO
          title="Developer Cheatsheets | Quick Reference Guides"
          description="A curated collection of developer cheatsheets and quick reference guides for programming, AI, machine learning, and software engineering."
          keywords={[
            "developer cheatsheets",
            "programming reference",
            "coding cheatsheets",
            "quick reference guides",
            "software engineering",
            "AI cheatsheets",
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

        {/* Hero Header */}
        <header className="border-b border-border/50">
          <div className="container-wide section-padding">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <Layers className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Quick Reference Library
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-display-lg md:text-display-xl font-heading font-bold text-foreground mb-4">
                Developer Cheatsheets
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Quick reference guides and visual cheatsheets for development
                tools, languages, frameworks, and machine learning concepts.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search cheatsheets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 h-14 text-base bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                <span>{allCheatsheets.length} cheatsheets</span>
                <span className="text-border">•</span>
                <span>{categories.length} categories</span>
                <span className="text-border">•</span>
                <span>
                  {allCheatsheets.filter((s) => s.type === "page").length} page
                  guides
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-wide">
          {/* Category & Type Filters */}
          <nav
            className="py-8 border-b border-border/50"
            aria-label="Category and type navigation"
          >
            {/* Category Filters */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-foreground">
                Browse by Category
              </span>
              <div className="h-px flex-1 bg-border/50" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    selectedCategory === category.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:bg-muted"
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
              <span className="text-sm font-semibold text-foreground">
                Filter by Type
              </span>
              <div className="h-px flex-1 bg-border/50" />
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
                  type="button"
                  onClick={() =>
                    setSelectedType(type.value as "all" | "image" | "page")
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    selectedType === type.value
                      ? "bg-accent text-accent-foreground"
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50">
                <span className="text-xs font-medium text-muted-foreground">
                  Filters:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted rounded-full text-foreground text-xs font-medium">
                    "{searchQuery.slice(0, 15)}
                    {searchQuery.length > 15 ? "..." : ""}"
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-foreground text-xs font-medium">
                    {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("All")}
                      className="cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedType !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 rounded-full text-foreground text-xs font-medium">
                    {getTypeIcon(selectedType)}
                    <span className="capitalize">{selectedType}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedType("all")}
                      className="cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-medium text-primary hover:underline cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}
          </nav>

          {/* Cheatsheets Grid */}
          <section className="py-10" aria-label="All cheatsheets">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {hasActiveFilters ? "Search Results" : "All Cheatsheets"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredCheatsheets.length}{" "}
                {filteredCheatsheets.length === 1 ? "sheet" : "sheets"}
              </span>
            </div>

            {filteredCheatsheets.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCheatsheets.map((sheet, index) => (
                  <article
                    key={sheet.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden card-interactive cursor-pointer flex flex-col animate-slideUp"
                    onClick={() => handleCheatsheetClick(sheet.slug)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCheatsheetClick(sheet.slug)
                    }
                    tabIndex={0}
                    role="button"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Preview Image/Placeholder */}
                    <div className="relative h-44 overflow-hidden">
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
                                "bg-muted",
                              );
                              const placeholder = document.createElement("div");
                              placeholder.className = "text-muted-foreground";
                              placeholder.innerHTML =
                                '<svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                              parent.appendChild(
                                placeholder.firstElementChild!,
                              );
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <FileText className="w-16 h-16 text-muted-foreground" />
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium rounded-full">
                        {getTypeIcon(sheet.type)}
                        <span className="capitalize">{sheet.type}</span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {sheet.category}
                      </div>

                      {sheet.sourceUrl && (
                        <div className="absolute bottom-3 right-3 p-1.5 bg-background/90 backdrop-blur-sm rounded-full">
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-heading font-bold text-foreground mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                        {sheet.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {sheet.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
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
                            className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                        {sheet.keywords.length > 3 && (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded">
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
                <div className="w-24 h-24 mx-auto mb-6 bg-muted/30 rounded-2xl flex items-center justify-center">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-3 text-foreground">
                  No cheatsheets found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>

          {/* Stats Footer */}
          {allCheatsheets.length > 0 && (
            <section
              className="py-10 border-t border-border/50"
              aria-label="Collection statistics"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: allCheatsheets.length, label: "Total Sheets" },
                  { value: categories.length, label: "Categories" },
                  {
                    value: allCheatsheets.filter((s) => s.type === "image")
                      .length,
                    label: "Image Sheets",
                  },
                  {
                    value: allCheatsheets.filter((s) => s.type === "page")
                      .length,
                    label: "Page Guides",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-6 bg-card border border-border rounded-xl text-center hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Cheatsheets;
