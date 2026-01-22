/**
 * Common Types
 *
 * Shared type definitions used across multiple modules.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

/** Strapi media object structure from file uploads */
export interface IStrapiMedia {
  /** Unique numeric identifier */
  id: number;

  /** File name with extension */
  name: string;

  /** Alternative text for accessibility */
  alternativeText?: string;

  /** Image caption */
  caption?: string;

  /** File width in pixels (for images) */
  width?: number;

  /** File height in pixels (for images) */
  height?: number;

  /** MIME type of the file */
  mime: string;

  /** File size in bytes */
  size: number;

  /** URL path to the file on Strapi server */
  url: string;

  /** Full URL to the file including base URL */
  formats?: Record<string, unknown>;
}

/** Variant for share buttons layout */
export type TShareButtonVariant = "horizontal" | "vertical";

/** Content type for events, blogs, and case studies */
export type TContentType = "event" | "blog" | "case-study";

/** Strapi Block structure (simplified) */
export interface IStrapiBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/** Author structure for content (blogs, case studies, events) */
export interface IContentAuthor {
  name: string;
  role?: string;
  bio?: string;
  image?: IStrapiMedia | null;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

/** Category structure for content (blogs, case studies, events) */
export interface IContentCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: unknown;
  order?: number;
}

/** Tag structure for content (blogs, case studies, events) */
export interface IContentTag {
  id: number;
  name: string;
  slug: string;
}

/** Author data structure that can come in different formats from Strapi */
export interface IContentAuthorData {
  name?: string;
  authorName?: string;
  role?: string;
  authorRole?: string;
  bio?: string;
  authorBio?: string;
  image?: unknown;
  authorImage?: unknown;
  linkedin?: string;
  authorLinkedin?: string;
  twitter?: string;
  authorTwitter?: string;
  email?: string;
  authorEmail?: string;
}

/** Pagination metadata structure */
export interface IPaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
    start?: number;
    limit?: number;
  };
}

/** Base content interface shared by blogs, case studies, and events */
export interface IContentBase {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: IStrapiBlock[] | string;
  author?: string | IContentAuthor;
  featured?: boolean;
  viewCount?: number;
  showComments?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  categories?: IContentCategory[];
  tags?: IContentTag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Base normalized content interface for frontend consumption */
export interface INormalizedContentBase {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: IStrapiBlock[] | string | null;
  author: IContentAuthor | null;
  featured: boolean;
  viewCount: number;
  showComments: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  categories: IContentCategory[];
  tags: IContentTag[];
}

/** Common filter options for content queries (blogs, case studies, events) */
export interface IContentQueryFilters {
  slug?: string;
  categorySlug?: string;
  tagSlug?: string;
  excludeId?: number;
  search?: string;
}

/** Props for social share buttons */
export interface IShareButtonsProps {
  /** The title of the content being shared */
  title: string;
  /** Layout orientation of buttons */
  variant?: TShareButtonVariant;
  /** Whether to show the platform name labels */
  showLabels?: boolean;
  /** Optional container class name */
  className?: string;
}
