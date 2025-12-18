// Common Strapi media type
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;

  // ✅ ADD THIS (IMPORTANT)
  formats?: {
    large?: {
      url: string;
      width?: number;
      height?: number;
    };
    medium?: {
      url: string;
      width?: number;
      height?: number;
    };
    small?: {
      url: string;
      width?: number;
      height?: number;
    };
    thumbnail?: {
      url: string;
      width?: number;
      height?: number;
    };
  };
}


// Category
export interface Category {
  id: number;
  name: string;
  slug: string;
}

// Tag
export interface Tag {
  id: number;
  name: string;
  slug: string;
}

// Author
export interface Author {
  id: number;
  name: string;
  designation?: string;
  avatar?: StrapiMedia;
}

// Rich text blocks (safe typing)
export type RichTextBlock = {
  type: string;
  children?: {
    type: string;
    text?: string;
  }[];
};

// Blog (matches your screenshot exactly)
export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: RichTextBlock[];
  publishedDate: string;
  publishedAt?: string;   // Strapi system field
  readTime?: number;
  bannerImage?: StrapiMedia;
  thumbnail?: StrapiMedia;
  categories?: Category[];
  tags?: Tag[];
  author?: Author;
}
