/**
 * Cheatsheet type definitions
 * @description Types for the cheatsheets feature allowing storage of graphical
 * reference materials with search and full-view capabilities
 */

/**
 * Represents a single cheatsheet item
 * @interface Cheatsheet
 */
export interface Cheatsheet {
    /** Unique identifier for the cheatsheet */
    id: string;
    /** Display title of the cheatsheet */
    title: string;
    /** URL-friendly slug for routing */
    slug: string;
    /** Brief description of what the cheatsheet covers */
    description: string;
    /** Searchable keywords/tags for filtering */
    keywords: string[];
    /** Category for grouping (e.g., "JavaScript", "CSS", "Git", etc.) */
    category: string;
    /** Type of cheatsheet - image or page (markdown content) */
    type: "image" | "page";
    /** Image URL if type is 'image', relative to /public/cheatsheets/ */
    imageUrl?: string;
    /** Markdown content if type is 'page' */
    content?: string;
    /** ISO 8601 date string when the cheatsheet was created */
    createdAt: string;
    /** ISO 8601 date string when the cheatsheet was last updated */
    updatedAt?: string;
    /** Original source URL if applicable */
    sourceUrl?: string;
    /** Whether to show this cheatsheet publicly */
    published: boolean;
}

/**
 * Category with count for filtering
 * @interface CheatsheetCategory
 */
export interface CheatsheetCategory {
    /** Unique identifier for the category */
    id: string;
    /** Display name of the category */
    name: string;
    /** URL-friendly slug */
    slug: string;
    /** Number of cheatsheets in this category */
    count: number;
}

/**
 * Search/filter parameters for cheatsheets
 * @interface CheatsheetFilters
 */
export interface CheatsheetFilters {
    /** Search query string */
    query?: string;
    /** Category filter */
    category?: string;
    /** Type filter */
    type?: "image" | "page" | "all";
}

