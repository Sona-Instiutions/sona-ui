/**
 * Blog Types
 *
 * Type definitions for the Blogs module.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

import {
  IStrapiMedia,
  IContentAuthor,
  IContentCategory,
  IContentTag,
  IContentAuthorData,
  IPaginationMeta,
  IContentBase,
  INormalizedContentBase,
} from "./common.types";

/** Blog category structure */
export type IBlogCategory = IContentCategory;

/** Blog tag structure */
export type IBlogTag = IContentTag;

/** Author structure for blogs */
export type IBlogAuthor = IContentAuthor;

/** Main Blog interface (Raw Strapi Response shape) */
export interface IBlog extends IContentBase {
  excerpt: string; // Required for blogs
  publishedDate: string;
  readTime?: number;
  bannerImage?: IStrapiMedia;
  thumbnail?: IStrapiMedia;
  relatedBlogs?: IBlog[];
}

/** Normalized Blog interface for frontend consumption */
export interface INormalizedBlog extends INormalizedContentBase {
  publishedDate: string;
  readTime: number | null;
  bannerImage: IStrapiMedia | null;
  thumbnail: IStrapiMedia | null;
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
  meta: IPaginationMeta;
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
  meta: IPaginationMeta;
}

/** Tag list response */
export interface IBlogTagsResponse {
  data: IBlogTag[];
  meta: IPaginationMeta;
}

/**
 * Author data structure that can come in different formats from Strapi.
 */
export type IBlogAuthorData = IContentAuthorData;
