/**
 * Case Study Types
 *
 * Type definitions for the Case Studies module.
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

/** Case Study category structure */
export type ICaseStudyCategory = IContentCategory;

/** Case Study tag structure */
export type ICaseStudyTag = IContentTag;

/** Author structure for case studies */
export type ICaseStudyAuthor = IContentAuthor;

/** Main Case Study interface (Raw Strapi Response shape) */
export interface ICaseStudy extends IContentBase {
  excerpt: string; // Required for case studies
  publishedDate?: string;
  projectDate?: string;
  readTime?: number;
  bannerImage?: IStrapiMedia;
  thumbnail?: IStrapiMedia;
  relatedCaseStudies?: ICaseStudy[];
}

/** Normalized Case Study interface for frontend consumption */
export interface INormalizedCaseStudy extends INormalizedContentBase {
  publishedDate: string | null;
  projectDate: string | null;
  readTime: number | null;
  bannerImage: IStrapiMedia | null;
  thumbnail: IStrapiMedia | null;
  relatedCaseStudies: INormalizedCaseStudy[];
}

/** Lightweight case study suggestion for autocomplete */
export interface ICaseStudySearchSuggestion {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  publishedDate: string | null;
  excerpt?: string;
  thumbnail?: IStrapiMedia;
}

/** API Response wrapper for list of case studies */
export interface ICaseStudiesResponse {
  data: ICaseStudy[];
  meta: IPaginationMeta;
}

/** API Response wrapper for single case study */
export interface ICaseStudyResponse {
  data: ICaseStudy;
  meta: Record<string, unknown>;
}

/** API Response wrapper for search suggestions */
export interface ICaseStudySuggestionsResponse {
  data: ICaseStudySearchSuggestion[];
}

/** Category list response */
export interface ICaseStudyCategoriesResponse {
  data: ICaseStudyCategory[];
  meta: IPaginationMeta;
}

/** Tag list response */
export interface ICaseStudyTagsResponse {
  data: ICaseStudyTag[];
  meta: IPaginationMeta;
}

/**
 * Author data structure that can come in different formats from Strapi.
 */
export type ICaseStudyAuthorData = IContentAuthorData;
