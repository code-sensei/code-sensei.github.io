import { Helmet } from 'react-helmet-async';

/**
 * SEO Configuration Types
 * Comprehensive metadata types for traditional SEO and AI search optimization
 */

export interface SEOProps {
  // Basic Meta
  title: string;
  description: string;
  keywords?: string[];
  author?: string;

  // URL & Canonical
  url?: string;
  canonicalUrl?: string;

  // Open Graph
  ogType?: 'website' | 'article' | 'profile' | 'book';
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogLocale?: string;
  ogSiteName?: string;

  // Twitter Card
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  twitterImage?: string;

  // Article Specific (for blog posts)
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };

  // Robots
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
  };

  // Structured Data (JSON-LD)
  structuredData?: object | object[];

  // Additional Meta Tags
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;

  // Breadcrumbs for structured data
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

// Default values
const SITE_NAME = 'Babangida Tsowa';
const SITE_URL = 'https://btsowa.dev';
const DEFAULT_IMAGE = `${SITE_URL}/profile-image.png`;
const TWITTER_HANDLE = '@iam_ehnigma';
const DEFAULT_AUTHOR = 'Babangida Tsowa';

/**
 * SEO Component
 * Handles all meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
 * Optimized for both traditional search engines and AI search platforms
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  author = DEFAULT_AUTHOR,
  url,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  ogImageAlt,
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogLocale = 'en_US',
  ogSiteName = SITE_NAME,
  twitterCard = 'summary_large_image',
  twitterSite = TWITTER_HANDLE,
  twitterCreator = TWITTER_HANDLE,
  twitterImage,
  article,
  robots = { index: true, follow: true },
  structuredData,
  additionalMeta = [],
  breadcrumbs,
}) => {
  // Construct full title with site name
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;

  // Construct full URL
  const fullUrl = url ? `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}` : SITE_URL;
  const canonical = canonicalUrl || fullUrl;

  // Construct robots content
  const robotsContent = [
    robots.index !== false ? 'index' : 'noindex',
    robots.follow !== false ? 'follow' : 'nofollow',
    robots.noarchive ? 'noarchive' : '',
    robots.nosnippet ? 'nosnippet' : '',
    robots.maxSnippet !== undefined ? `max-snippet:${robots.maxSnippet}` : '',
    robots.maxImagePreview ? `max-image-preview:${robots.maxImagePreview}` : '',
    robots.maxVideoPreview !== undefined ? `max-video-preview:${robots.maxVideoPreview}` : '',
  ].filter(Boolean).join(', ');

  // Prepare structured data array
  const structuredDataArray: object[] = [];

  // Add WebSite schema for homepage
  if (url === '/' || !url) {
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: description,
      author: {
        '@type': 'Person',
        name: DEFAULT_AUTHOR,
        url: SITE_URL,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    });
  }

  // Add breadcrumb structured data if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredDataArray.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`,
      })),
    });
  }

  // Add custom structured data
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      structuredDataArray.push(...structuredData);
    } else {
      structuredDataArray.push(structuredData);
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content={ogSiteName} />

      {/* Article specific Open Graph */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={(twitterImage || ogImage).startsWith('http') ? (twitterImage || ogImage) : `${SITE_URL}${twitterImage || ogImage}`} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}

      {/* JSON-LD Structured Data */}
      {structuredDataArray.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(
            structuredDataArray.length === 1
              ? structuredDataArray[0]
              : structuredDataArray
          )}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
