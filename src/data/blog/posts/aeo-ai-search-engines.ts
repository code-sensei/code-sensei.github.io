import { BlogPost } from "@/types/blog";

export const aeoAiSearchEngines: BlogPost = {
  id: "8",
  title: "Beyond SEO: How I Built My Portfolio for AI Search Engines",
  slug: "beyond-seo-building-for-ai-search-engines",
  excerpt:
    "Traditional SEO isn't enough anymore. Learn how I implemented AEO (AI Engine Optimization) to make my portfolio discoverable and citable by ChatGPT, Perplexity, Claude, and Google AI Overviews.",
  content: `# Beyond SEO: How I Built My Portfolio for AI Search Engines

When ChatGPT started citing websites in its responses, I realized something fundamental had changed. Traditional SEO—keywords, backlinks, meta descriptions—wasn't designed for AI. These language models parse content differently than Google's crawlers. They need structure, context, and machine-readable metadata to understand and cite your content accurately.

This is the story of how I implemented AEO (AI Engine Optimization) on my portfolio, making it discoverable and citable by ChatGPT, Perplexity, Claude, and Google's AI Overviews.

## What is AEO and Why Does It Matter?

AEO (AI Engine Optimization) is the practice of optimizing your website for AI-powered search engines and assistants. Unlike traditional SEO which focuses on ranking in search results, AEO focuses on being **understood and cited** by AI systems.

Here's the key difference:

| Traditional SEO | AEO (AI Engine Optimization) |
|-----------------|------------------------------|
| Keywords in content | Structured data with context |
| Backlinks for authority | Author credibility via schemas |
| Title tags for ranking | Full content structure for parsing |
| Meta descriptions for CTR | Speakable content for voice/AI |
| PageRank algorithms | Semantic understanding |

When someone asks ChatGPT "How do I optimize my site for AI search?" or uses Perplexity to research structured data—I want my content to be the source they cite. That's the goal of AEO.

## My Complete AEO Implementation

Let me walk you through every optimization I implemented, with the actual code from my portfolio.

### 1. Allowing AI Crawlers (robots.txt)

The first step is explicitly allowing AI crawlers to index your site. Many default configurations block these bots, which means your content is invisible to AI search engines.

Here's my \`robots.txt\`:

\`\`\`txt
# robots.txt for btsowa.dev
# SEO & AI Search Optimization

# Allow all search engines
User-agent: *
Allow: /

# Allow AI search crawlers
User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: Cohere-AI
Allow: /

# Sitemap location
Sitemap: https://btsowa.dev/sitemap.xml

# Crawl delay (be considerate to the server)
Crawl-delay: 1

# Disallow private paths
Disallow: /api/
Disallow: /_*
\`\`\`

**Key AI Crawler User Agents:**
- \`OAI-SearchBot\` - OpenAI's crawler for ChatGPT search functionality
- \`ChatGPT-User\` - ChatGPT's browsing mode
- \`Google-Extended\` - Google Bard/Gemini
- \`PerplexityBot\` - Perplexity AI
- \`ClaudeBot\` - Anthropic's Claude
- \`Cohere-AI\` - Cohere's models

By explicitly allowing these crawlers, you're signaling that your content should be indexed for AI search.

### 2. Structured Data with JSON-LD

Structured data is the backbone of AEO. AI engines use schema.org vocabulary to understand the context and relationships in your content. I implemented multiple schema types, each optimized for different content.

#### BlogPosting Schema with Speakable Content

The most important schema for blog content. Notice the \`speakable\` property. This tells AI engines which parts of the page are suitable for voice reading and citation:

\`\`\`typescript
export function generateBlogPostSchema(post: BlogPost) {
  const postUrl = \`\${SITE_URL}/blog/\${post.slug}\`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,

    author: {
      "@type": "Person",
      name: post.author.name,
      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "Babangida Tsowa",
      logo: {
        "@type": "ImageObject",
        url: \`\${SITE_URL}/profile-image.png\`,
      },
    },

    // Content metrics for AI understanding
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount: post.content.split(/\\s+/).length,
    timeRequired: \`PT\${post.readingTime}M\`,
    inLanguage: "en-US",
    isAccessibleForFree: true,

    // AI-Specific: Speakable content for voice search
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article", ".blog-content", "h1", "h2", "p"],
    },
  };
}
\`\`\`

**Why Speakable Matters:**
- Voice assistants use it to determine what to read aloud
- AI engines use it to identify key quotable sections
- It helps AI understand which content is primary vs. secondary

#### Person Schema for Author Credibility

AI engines evaluate author credibility when deciding whether to cite content. A comprehensive Person schema establishes your expertise:

\`\`\`typescript
export function generatePersonSchema(author?: {
  name: string;
  avatar?: string;
  bio?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author?.name || "Babangida Tsowa",
    url: SITE_URL,
    image: author?.avatar || \`\${SITE_URL}/profile-image.png\`,
    jobTitle: "Product & AI Engineer",
    description: "Product & AI Engineer specializing in AI-driven platforms and mission-critical systems.",

    // Social proof via sameAs links
    sameAs: [
      "https://twitter.com/iam_ehnigma",
      "https://github.com/code-sensei",
      "https://linkedin.com/in/btsowa",
    ],
  };
}
\`\`\`

### 3. Edge Function for Dynamic Bot Detection

I built an Edge Function that detects AI crawlers and serves them pre-rendered HTML with all meta tags, while regular users get the normal React SPA experience.

\`\`\`typescript
// api/og.ts - Vercel Edge Runtime

const BOT_PATTERNS = [
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "Googlebot",
  "bingbot",
  // AI-specific crawlers
  "ChatGPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "GrokBot",
  "ClaudeBot",
  "AnthropicBot",
];

function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase())
  );
}
\`\`\`

**Why Edge Functions:**
- **Global distribution** - Low latency worldwide
- **No cold starts** - Always fast for crawlers
- **Cost effective** - Only fetch data when bots request it
- **Dynamic content** - Fresh metadata on every crawl

### 4. Content Structure for AI Parsing

Beyond schemas, the actual HTML structure matters. I use semantic HTML throughout:

\`\`\`tsx
<article>
  <header>
    <h1>{post.title}</h1>
    <time dateTime={post.publishedAt}>
      {formatDate(post.publishedAt)}
    </time>
    <address className="author">
      <img src={author.avatar} alt={author.name} />
      <span>{author.name}</span>
    </address>
  </header>

  <section className="blog-content">
    {/* Proper heading hierarchy */}
    <h2>Introduction</h2>
    <p>Clear, structured paragraphs...</p>

    <h2>Main Content</h2>
    <p>Logical flow of information...</p>
  </section>

  <footer>
    <nav className="tags" aria-label="Article tags">
      {post.tags.map(tag => <a href={\`/blog?tag=\${tag}\`}>#{tag}</a>)}
    </nav>
  </footer>
</article>
\`\`\`

**Why Structure Matters:**
- AI engines parse HTML structure to understand content hierarchy
- Proper heading levels (H1 > H2 > H3) indicate importance
- Semantic elements (\`article\`, \`section\`, \`time\`) provide context
- Clear paragraphs are easier to quote and cite

## The Complete Schema Library

Here's every schema type I implemented:

| Schema Type | Use Case | AI Benefit |
|-------------|----------|------------|
| BlogPosting | Blog articles | Citation with proper attribution |
| Person | Author info | Credibility evaluation |
| Organization | Publisher | Trust signals |
| LearningResource | Tutorials/cheatsheets | Educational reference |
| TechArticle | Technical posts | Expertise signaling |
| HowTo | Step-by-step guides | Procedure extraction |
| FAQPage | Q&A content | Direct answer matching |
| ProfilePage | Portfolio homepage | Entity recognition |
| BreadcrumbList | Navigation | Site structure understanding |

## Results and Impact

After implementing these AEO optimizations, I observed:

**Crawler Activity:**
- Regular visits from GPTBot, PerplexityBot, and ClaudeBot in server logs
- Increased crawl frequency after adding explicit bot permissions

**Content Discovery:**
- My content appears in Perplexity search results with proper citations
- Blog posts are referenced in ChatGPT responses about relevant topics
- Structured data validates perfectly in Google's Rich Results Test

**Traditional SEO Benefits:**
- Rich snippets appearing in Google search results
- Improved click-through rates from search
- Better social media previews when content is shared

## Key Takeaways

1. **AEO is different from SEO** - Focus on structured data and machine-readable formats, not just keywords.

2. **Explicitly allow AI crawlers** - Update your robots.txt to welcome GPTBot, PerplexityBot, ClaudeBot, and others.

3. **Implement comprehensive schemas** - BlogPosting with speakable content, Person for author credibility, and appropriate schemas for each content type.

4. **Use Edge Functions for bots** - Serve pre-rendered HTML with full meta tags to crawlers while maintaining your SPA for users.

5. **Structure content semantically** - Use proper HTML elements and heading hierarchies that AI can parse.

6. **Include author credibility signals** - Person schemas with sameAs links help AI evaluate your expertise.

7. **Make content speakable** - The SpeakableSpecification tells AI which content is quotable.

## Future Enhancements

I'm planning to add:

- **FAQ schemas** on relevant pages for direct answer matching
- **HowTo schemas** for tutorial content with step-by-step extraction
- **VideoObject schemas** when I add video content
- **Review/Rating schemas** for project showcases
- **Event schemas** for speaking engagements
- **Dataset schemas** if I share any public data

## Conclusion

The shift from traditional search to AI-powered discovery is already happening. When someone asks an AI assistant a question in your expertise area, you want your content to be the source it cites—not your competitor's.

AEO isn't about gaming AI systems. It's about making your content genuinely easier for machines to understand, parse, and accurately represent. The structured data, semantic HTML, and explicit crawler permissions we've covered are all about clarity and accessibility.

Implement these patterns on your own site, and you'll be ahead of the curve as AI search becomes the dominant way people discover information.

The future of search is here. Is your content ready for it?

---

*Have questions about implementing AEO on your site? Reach out on [Twitter](https://twitter.com/iam_ehnigma) or [LinkedIn](https://linkedin.com/in/btsowa).*`,
  coverImage: "/blog/aeo-ai-search-optimization.jpg",
  author: {
    name: "Babangida Tsowa",
    avatar: "/profile-image.png",
    bio: "Product & AI Engineer specializing in AI-driven platforms and mission-critical systems.",
  },
  publishedAt: "2025-02-01T10:00:00Z",
  updatedAt: "2025-02-01T10:00:00Z",
  category: "AI Engineering",
  tags: [
    "AEO",
    "SEO",
    "AI",
    "Structured Data",
    "Schema.org",
    "ChatGPT",
    "Perplexity",
    "Edge Functions",
    "Web Development",
    "Search Optimization",
  ],
  readingTime: 18,
  featured: false,
  published: true,
};
