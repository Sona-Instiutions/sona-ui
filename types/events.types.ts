/**
 * Event Types
 *
 * Type definitions for the Events module.
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

/** Event type enumeration */
export enum EEventType {
  STUDENT = "student",
  INDUSTRY = "industry",
  ALL = "all",
}

/** Event category structure */
export type IEventCategory = IContentCategory;

/** Event tag structure */
export type IEventTag = IContentTag;

/** Author structure for events */
export type IEventAuthor = IContentAuthor;

/** Main Event interface (Raw Strapi Response shape) */
export interface IEvent extends IContentBase {
  eventType: EEventType;
  eventDate: string;
  featuredImage?: IStrapiMedia;
  thumbnailImage?: IStrapiMedia;
  publishedDate: string;
  relatedEvents?: IEvent[];
  // New fields for specific event types
  eventLocation?: string;
  eventTime?: string;
  registrationStatus?: string;
  eventHighlights?: Record<string, unknown> | null; // JSON
}

/** Normalized Event interface for frontend consumption */
export interface INormalizedEvent extends Omit<INormalizedContentBase, "author"> {
  eventType: EEventType;
  eventDate: string; // ISO string
  featuredImage: IStrapiMedia | null;
  thumbnailImage: IStrapiMedia | null;
  author: string | IEventAuthor | null; // Events can have string author
  publishedDate: string;
  relatedEvents: INormalizedEvent[]; // Recursive but usually limited depth in normalization
  // New fields
  eventLocation?: string | null;
  eventTime?: string | null;
  registrationStatus?: string | null;
  eventHighlights?: Record<string, unknown> | null; // JSON
}

/** Lightweight event suggestion for autocomplete */
export interface IEventSearchSuggestion {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  eventDate: string;
  excerpt?: string;
  thumbnailImage?: IStrapiMedia;
}

/** API Response wrapper for list of events */
export interface IEventsResponse {
  data: IEvent[];
  meta: IPaginationMeta;
}

/** API Response wrapper for single event */
export interface IEventResponse {
  data: IEvent;
  meta: Record<string, unknown>;
}

/** API Response wrapper for search suggestions */
export interface IEventSuggestionsResponse {
  data: IEventSearchSuggestion[];
}

/** Category list response */
export interface IEventCategoriesResponse {
  data: IEventCategory[];
  meta: IPaginationMeta;
}

/** Tag list response */
export interface IEventTagsResponse {
  data: IEventTag[];
  meta: IPaginationMeta;
}

/**
 * Author data structure that can come in different formats from Strapi.
 */
export type IAuthorData = IContentAuthorData;
