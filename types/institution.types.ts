import type { IStrapiMedia } from "@/types/common.types";

/** About section entity associated with an institution */
export interface IAboutInstitute {
  /** Unique numeric identifier */
  id: number;

  /** Optional headline for the about section */
  title?: string | null;

  /** Markdown-enabled description content */
  description?: string | null;

  /** Markdown-enabled bullet list content */
  bullets?: string | null;

  /** Associated hero image */
  image?: IStrapiMedia | null;

  /** Optional badge label (e.g., Job Placement Rate) */
  badgeText?: string | null;

  /** Optional badge value (e.g., 98%) */
  badgeValue?: string | null;

  /** Optional badge color keyword */
  badgeColor?: string | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** API response envelope for about-institute queries */
export interface IAboutInstituteResponse {
  data: IAboutInstitute[];
  meta: Record<string, unknown>;
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

  /** Optional related about-institute entity when populated */
  aboutInstitute?: IAboutInstitute | null;

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

  /** About section normalized to entity or null */
  aboutInstitute: IAboutInstitute | null;
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
