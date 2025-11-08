/**
 * Institution Types
 *
 * Type definitions for institution content type fetched from Strapi.
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

/** Institution entity from backend matching Strapi response structure */
export interface IInstitution {
  /** Unique numeric identifier */
  id: number;

  /** URL-friendly identifier derived from name */
  slug: string;

  /** Display name of the institution */
  name: string;

  /** Raw banner image for hero section (may be null when not set) */
  bannerImage?: IStrapiMedia | null;

  /** Raw banner title for hero section (may be null when not set) */
  bannerTitle?: string | null;

  /** Raw banner subtitle for hero section (may be null when not set) */
  bannerSubtitle?: string | null;

  /** ISO 8601 timestamp of creation */
  createdAt: string;

  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/** Normalized institution entity with banner fallbacks applied */
export interface INormalizedInstitution extends Omit<IInstitution, "bannerImage" | "bannerTitle" | "bannerSubtitle"> {
  /** Banner image guaranteed to be set or explicitly null */
  bannerImage: IStrapiMedia | null;

  /** Banner title with fallback to institution name */
  bannerTitle: string;

  /** Banner subtitle normalized to string or null */
  bannerSubtitle: string | null;
}

/** Type alias for institution slug with validation */
export type TInstitutionSlug = string & { readonly __brand: "InstitutionSlug" };

/** API response envelope for single institution query */
export interface IInstitutionResponse {
  data: IInstitution | IInstitution[];
  meta: Record<string, unknown>;
}

/** API response envelope for paginated institution queries */
export interface IInstitutionsResponse {
  data: IInstitution[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Standard API error response for consistent error handling */
export interface IApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}
