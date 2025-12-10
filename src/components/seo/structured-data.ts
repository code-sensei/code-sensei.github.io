/**
 * Structured Data Generators for JSON-LD
 * Optimized for both traditional SEO and AI search engines (ChatGPT, Perplexity, Google AI)
 */

import type { BlogPost } from "@/types/blog";
import type { Cheatsheet } from "@/types/cheatsheet";

const SITE_URL = "https://btsowa.dev";
const SITE_NAME = "Babangida Tsowa";
const DEFAULT_AUTHOR = {
  name: "Babangida Tsowa",
  url: SITE_URL,
  image: `${SITE_URL}/profile-image.png`,
  jobTitle: "Product & AI Engineer",
  sameAs: [
    "https://twitter.com/iam_ehnigma",
    "https://github.com/code-sensei",
    "https://linkedin.com/in/btsowa",
  ],
};

/**
 * Generate Person schema for author
 */
export function generatePersonSchema(author?: {
  name: string;
  avatar?: string;
  bio?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author?.name || DEFAULT_AUTHOR.name,
    url: DEFAULT_AUTHOR.url,
    image: author?.avatar || DEFAULT_AUTHOR.image,
    jobTitle: DEFAULT_AUTHOR.jobTitle,
    description:
      author?.bio ||
      "Product & AI Engineer specializing in AI-driven platforms and mission-critical systems.",
    sameAs: DEFAULT_AUTHOR.sameAs,
  };
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/profile-image.png`,
    sameAs: DEFAULT_AUTHOR.sameAs,
    founder: {
      "@type": "Person",
      name: DEFAULT_AUTHOR.name,
    },
  };
}

/**
 * Generate BlogPosting schema for individual blog posts
 * Optimized for AI search with clear structure and comprehensive metadata
 */
export function generateBlogPostSchema(post: BlogPost) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage?.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage || "/profile-image.png"}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: SITE_URL,
      image: post.author.avatar || DEFAULT_AUTHOR.image,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/profile-image.png`,
        width: 512,
        height: 512,
      },
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    // AI Search Optimization: Add speakable for voice search
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article", ".blog-content", "h1", "h2", "p"],
    },
  };
}

/**
 * Generate Blog listing page schema
 */
export function generateBlogListSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    name: "Blog | Babangida Tsowa",
    description:
      "Ideas on AI, Engineering & Leadership - Articles and insights from Babangida Tsowa",
    url: `${SITE_URL}/blog`,
    author: generatePersonSchema(),
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };
}

/**
 * Generate Article schema (alternative to BlogPosting for more formal articles)
 */
export function generateArticleSchema(post: BlogPost) {
  const baseSchema = generateBlogPostSchema(post);
  return {
    ...baseSchema,
    "@type": "Article",
  };
}

/**
 * Generate TechArticle schema for technical blog posts
 */
export function generateTechArticleSchema(post: BlogPost) {
  const baseSchema = generateBlogPostSchema(post);
  return {
    ...baseSchema,
    "@type": "TechArticle",
    proficiencyLevel: "Intermediate",
    dependencies:
      post.tags
        .filter((tag) =>
          [
            "JavaScript",
            "TypeScript",
            "React",
            "Python",
            "AI",
            "Machine Learning",
          ].includes(tag),
        )
        .join(", ") || undefined,
  };
}

/**
 * Generate HowTo schema for tutorial-type posts
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>,
  totalTime?: string,
  tools?: string[],
  supplies?: string[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: description,
    totalTime: totalTime || "PT30M",
    tool: tools?.map((tool) => ({
      "@type": "HowToTool",
      name: tool,
    })),
    supply: supplies?.map((supply) => ({
      "@type": "HowToSupply",
      name: supply,
    })),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Generate FAQ schema for FAQ sections
 * Highly valuable for AI search as it provides clear Q&A format
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate LearningResource schema for cheatsheets
 * Perfect for educational content that AI search can reference
 */
export function generateCheatsheetSchema(cheatsheet: Cheatsheet) {
  const cheatsheetUrl = `${SITE_URL}/cheatsheets/${cheatsheet.slug}`;
  const imageUrl = cheatsheet.imageUrl?.startsWith("http")
    ? cheatsheet.imageUrl
    : cheatsheet.imageUrl
      ? `${SITE_URL}${cheatsheet.imageUrl}`
      : `${SITE_URL}/profile-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": cheatsheetUrl,
    name: cheatsheet.title,
    description: cheatsheet.description,
    url: cheatsheetUrl,
    image: imageUrl,
    dateCreated: cheatsheet.createdAt,
    dateModified: cheatsheet.updatedAt || cheatsheet.createdAt,
    author: generatePersonSchema(),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: "Intermediate",
    learningResourceType: cheatsheet.type === "image" ? "Reference" : "Guide",
    keywords: cheatsheet.keywords.join(", "),
    about: {
      "@type": "Thing",
      name: cheatsheet.category,
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    // If there's a source, add citation
    ...(cheatsheet.sourceUrl && {
      citation: {
        "@type": "CreativeWork",
        url: cheatsheet.sourceUrl,
      },
    }),
  };
}

/**
 * Generate CreativeWork schema for cheatsheet collections
 */
export function generateCheatsheetCollectionSchema(cheatsheets: Cheatsheet[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/cheatsheets`,
    name: "Developer Cheatsheets | Babangida Tsowa",
    description:
      "A curated collection of developer cheatsheets and quick reference guides for programming, AI, and software engineering.",
    url: `${SITE_URL}/cheatsheets`,
    author: generatePersonSchema(),
    hasPart: cheatsheets.slice(0, 20).map((cs) => ({
      "@type": "LearningResource",
      "@id": `${SITE_URL}/cheatsheets/${cs.slug}`,
      name: cs.title,
      description: cs.description,
      url: `${SITE_URL}/cheatsheets/${cs.slug}`,
    })),
    numberOfItems: cheatsheets.length,
  };
}

/**
 * Generate ImageObject schema for image-based cheatsheets
 */
export function generateImageSchema(
  name: string,
  description: string,
  imageUrl: string,
  author?: string,
) {
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${SITE_URL}${imageUrl}`;

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: name,
    description: description,
    contentUrl: fullImageUrl,
    url: fullImageUrl,
    author: {
      "@type": "Person",
      name: author || DEFAULT_AUTHOR.name,
    },
    copyrightHolder: {
      "@type": "Person",
      name: DEFAULT_AUTHOR.name,
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  type:
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "ProfilePage" = "WebPage",
) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": fullUrl,
    name: title,
    description: description,
    url: fullUrl,
    isPartOf: {
      "@type": "WebSite",
      "@id": SITE_URL,
      name: SITE_NAME,
      url: SITE_URL,
    },
    author: generatePersonSchema(),
    inLanguage: "en-US",
  };
}

/**
 * Generate SiteNavigationElement schema for main navigation
 */
export function generateNavigationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Main Navigation",
    hasPart: [
      {
        "@type": "WebPage",
        name: "Home",
        url: SITE_URL,
      },
      {
        "@type": "WebPage",
        name: "Blog",
        url: `${SITE_URL}/blog`,
      },
      {
        "@type": "WebPage",
        name: "Cheatsheets",
        url: `${SITE_URL}/cheatsheets`,
      },
    ],
  };
}

/**
 * Generate ProfilePage schema for the homepage/portfolio
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": SITE_URL,
    name: "Babangida Tsowa | Product & AI Engineer",
    description:
      "Trusted by government institutions and venture-backed startups to architect AI-driven platforms and mission-critical systems.",
    url: SITE_URL,
    mainEntity: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Babangida Tsowa",
      alternateName: "BT",
      jobTitle: "Product & AI Engineer",
      description:
        "Architecting AI-driven platforms and mission-critical systems for organizations where failure isn't an option.",
      image: `${SITE_URL}/profile-image.png`,
      url: SITE_URL,
      sameAs: DEFAULT_AUTHOR.sameAs,
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Software Engineering",
        "Product Development",
        "System Architecture",
        "Full-Stack Development",
        "Leadership",
        "Enterprise Software",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Product & AI Engineer",
        occupationLocation: {
          "@type": "Country",
          name: "United States",
        },
        skills:
          "AI, Machine Learning, Software Engineering, Product Development",
      },
    },
  };
}
