/**
 * Event Types
 *
 * Type definitions for the Events module.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

import { IStrapiMedia } from "./common.types";

/** Event type enumeration */
export enum EEventType {
  STUDENT = "student",
  INDUSTRY = "industry",
  ALL = "all",
}

/** Event category structure */
export interface IEventCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: unknown; // Will rely on icon-badge relation if needed, or simple string
  order?: number;
}

/** Event tag structure */
export interface IEventTag {
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

/** Author structure for events */
export interface IEventAuthor {
  name: string;
  role?: string;
  bio?: string;
  image?: IStrapiMedia;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

/** Main Event interface (Raw Strapi Response shape) */
export interface IEvent {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  eventType: EEventType;
  eventDate: string;
  excerpt?: string;
  content: IStrapiBlock[] | string; // Rich text blocks or Markdown string
  featuredImage?: IStrapiMedia;
  thumbnailImage?: IStrapiMedia;
  author?: string | IEventAuthor;
  publishedDate: string;
  featured?: boolean;
  viewCount?: number;
  metaTitle?: string;
  metaDescription?: string;
  categories?: IEventCategory[];
  tags?: IEventTag[];
  relatedEvents?: IEvent[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Normalized Event interface for frontend consumption */
export interface INormalizedEvent {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  eventType: EEventType;
  eventDate: string; // ISO string
  excerpt: string | null;
  content: IStrapiBlock[] | string | null;
  featuredImage: IStrapiMedia | null;
  thumbnailImage: IStrapiMedia | null;
  author: string | IEventAuthor | null;
  publishedDate: string;
  viewCount: number;
  categories: IEventCategory[];
  tags: IEventTag[];
  relatedEvents: INormalizedEvent[]; // Recursive but usually limited depth in normalization
  metaTitle: string | null;
  metaDescription: string | null;
  // New fields
  eventLocation?: string | null;
  eventTime?: string | null;
  registrationStatus?: string | null;
  eventHighlights?: any; // JSON
}

/** API Response wrapper for list of events */
export interface IEventsResponse {
  data: IEvent[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** API Response wrapper for single event */
export interface IEventResponse {
  data: IEvent;
  meta: Record<string, unknown>;
}

/** Category list response */
export interface IEventCategoriesResponse {
  data: IEventCategory[];
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
export interface IEventTagsResponse {
  data: IEventTag[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

