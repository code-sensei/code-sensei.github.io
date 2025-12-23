import { createClient } from "@supabase/supabase-js";

// Use SUPABASE_URL and SUPABASE_ANON_KEY for Vercel Edge Functions
// These should be set in Vercel's environment variables dashboard
const supabaseUrl =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

const SITE_URL = "https://btsowa.dev";
const SITE_NAME = "Babangida Tsowa";
const DEFAULT_IMAGE = `${SITE_URL}/profile-image.png`;
const DEFAULT_DESCRIPTION =
  "Trusted by government institutions and venture-backed startups to architect platforms, automate processes and build mission-critical systems.";

// User agent patterns for social media and AI search crawlers (excludes training bots)
const BOT_PATTERNS = [
  // Social media crawlers
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
  "Pinterest",
  // Traditional search engines
  "Googlebot",
  "Bingbot",
  "Applebot",
  // AI search/retrieval crawlers (not training)
  "ChatGPT-User",
  "OAI-SearchBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-CloudVertexBot",
  "Gemini-Deep-Research",
  "PerplexityBot",
  "Perplexity-User",
  "Meta-WebIndexer",
  "DuckAssistBot",
  "MistralAI-User",
];

function isBot(userAgent: string): boolean {
  return BOT_PATTERNS.some((pattern) =>
    userAgent.toLowerCase().includes(pattern.toLowerCase()),
  );
}

function generateHTML(meta: {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
}): string {
  const fullTitle =
    meta.title === SITE_NAME ? meta.title : `${meta.title} | ${SITE_NAME}`;
  const imageUrl = meta.image.startsWith("http")
    ? meta.image
    : `${SITE_URL}${meta.image}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Primary Meta Tags -->
  <title>${fullTitle}</title>
  <meta name="title" content="${fullTitle}">
  <meta name="description" content="${meta.description}">
  ${meta.author ? `<meta name="author" content="${meta.author}">` : ""}

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="${meta.type}">
  <meta property="og:url" content="${meta.url}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="${SITE_NAME}">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${meta.url}">
  <meta name="twitter:title" content="${fullTitle}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:site" content="@iam_ehnigma">
  <meta name="twitter:creator" content="@iam_ehnigma">

  ${
    meta.type === "article" && meta.publishedTime
      ? `
  <!-- Article Meta -->
  <meta property="article:published_time" content="${meta.publishedTime}">
  <meta property="article:author" content="${meta.author || SITE_NAME}">
  ${meta.tags?.map((tag) => `<meta property="article:tag" content="${tag}">`).join("\n  ") || ""}
  `
      : ""
  }

  <!-- Redirect to actual page -->
  <meta http-equiv="refresh" content="0;url=${meta.url}">
  <link rel="canonical" href="${meta.url}">
</head>
<body>
  <p>Redirecting to <a href="${meta.url}">${meta.url}</a></p>
</body>
</html>`;
}

export default async function handler(request: Request): Promise<Response> {
  const userAgent = request.headers.get("user-agent") || "";
  const url = new URL(request.url);

  // Get the original path from the query parameter or referer
  const originalPath = url.searchParams.get("path") || "/";
  const fullUrl = `${SITE_URL}${originalPath}`;

  // If not a bot, redirect to the actual page
  if (!isBot(userAgent)) {
    return Response.redirect(fullUrl, 302);
  }

  // Check if this is a blog post
  const blogMatch = originalPath.match(/^\/blog\/([^/]+)$/);

  if (blogMatch) {
    const slug = blogMatch[1];

    try {
      // Fetch blog post from Supabase
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select(
          "title, excerpt, cover_image, author_name, published_at, tags, category",
        )
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (post && !error) {
        const html = generateHTML({
          title: post.title,
          description: post.excerpt,
          image: post.cover_image || DEFAULT_IMAGE,
          url: fullUrl,
          type: "article",
          author: post.author_name,
          publishedTime: post.published_at,
          tags: post.tags,
        });

        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    } catch (err) {
      console.error("Error fetching blog post:", err);
    }
  }

  // Default meta for other pages or if blog post not found
  const html = generateHTML({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    url: fullUrl,
    type: "website",
  });

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export const config = {
  runtime: "edge",
};
