export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
  published?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  coverImage?: string;
  featured?: boolean;
  published?: boolean;
}
