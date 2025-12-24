/**
 * Blog Types
 *
 * Type definitions for the Blogs module.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

import { IStrapiMedia } from "./common.types";

/** Blog category structure */
export interface IBlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: unknown;
  order?: number;
}

/** Blog tag structure */
export interface IBlogTag {
  id: number;
  name: string;
  slug: string;
}

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

/** Author structure for blogs */
export interface IBlogAuthor {
  name: string;
  role?: string;
  bio?: string;
  image?: IStrapiMedia | null;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

/** Main Blog interface (Raw Strapi Response shape) */
export interface IBlog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: IStrapiBlock[] | string;
  publishedDate: string;
  readTime?: number;
  bannerImage?: IStrapiMedia;
  thumbnail?: IStrapiMedia;
  author?: string | IBlogAuthor;
  featured?: boolean;
  viewCount?: number;
  metaTitle?: string;
  metaDescription?: string;
  categories?: IBlogCategory[];
  tags?: IBlogTag[];
  relatedBlogs?: IBlog[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Normalized Blog interface for frontend consumption */
export interface INormalizedBlog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: IStrapiBlock[] | string | null;
  publishedDate: string;
  readTime: number | null;
  bannerImage: IStrapiMedia | null;
  thumbnail: IStrapiMedia | null;
  author: IBlogAuthor | null;
  featured: boolean;
  viewCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
  categories: IBlogCategory[];
  tags: IBlogTag[];
  relatedBlogs: INormalizedBlog[];
}

/** Lightweight blog suggestion for autocomplete */
export interface IBlogSearchSuggestion {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt?: string;
  thumbnail?: IStrapiMedia;
}

/** API Response wrapper for list of blogs */
export interface IBlogsResponse {
  data: IBlog[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
      start?: number;
      limit?: number;
    };
  };
}

/** API Response wrapper for single blog */
export interface IBlogResponse {
  data: IBlog;
  meta: Record<string, unknown>;
}

/** API Response wrapper for search suggestions */
export interface IBlogSuggestionsResponse {
  data: IBlogSearchSuggestion[];
}

/** Category list response */
export interface IBlogCategoriesResponse {
  data: IBlogCategory[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Tag list response */
export interface IBlogTagsResponse {
  data: IBlogTag[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Author data structure that can come in different formats from Strapi.
 */
export interface IBlogAuthorData {
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
