import type { IStrapiMedia } from "@/types/common.types";

/** Icon badge entity providing configurable icon metadata */
export interface IIconBadge {
  /** Unique numeric identifier */
  id: number;

  /** Normalized icon token mapped to Phosphor icons (e.g., "check", "star") */
  iconName: string;

  /** Human-readable label to assist content editors */
  displayName?: string | null;

  /** Optional icon foreground color (any valid CSS color) */
  iconColor?: string | null;

  /** Optional badge background color (any valid CSS color) */
  backgroundColor?: string | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Repeatable bullet item containing markdown text and icon reference */
export interface IBulletItem {
  /** Component identifier emitted by Strapi */
  id: number;

  /** Markdown-enabled bullet text content */
  text: string;

  /** Related icon badge or relation identifier when not populated */
  icon: IIconBadge | number | null;
}

/** About section entity associated with an institution */
export interface IAboutInstitute {
  /** Unique numeric identifier */
  id: number;

  /** Optional headline for the about section */
  title?: string | null;

  /** Markdown-enabled description content */
  description?: string | null;

  /** Markdown-enabled bullet items associated with about section */
  bullets?: IBulletItem[] | null;

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

  /** Optional related program when populated */
  program?: IProgram | null;

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

  /** Related program normalized or null */
  program?: INormalizedProgram | null;
}

/** Program entity describing the overall offering for an institution */
export interface IProgram {
  /** Unique program identifier */
  id: number;

  /** Program title displayed above the sections */
  title: string;

  /** Markdown-enabled program description */
  description?: string | null;

  /** Associated program sections when populated */
  sections?: IProgramSection[] | null;

  /** Related institution reference when populated */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Individual program section describing a specific offering */
export interface IProgramSection {
  /** Unique section identifier */
  id: number;

  /** Section title (e.g., Software Development) */
  title: string;

  /** Optional icon badge relationship */
  icon?: IIconBadge | number | null;

  /** Markdown-enabled section description */
  description?: string | null;

  /** Optional CTA label for learn more link */
  learnMoreText?: string | null;

  /** Optional CTA URL for additional details */
  learnMoreUrl?: string | null;

  /** Flag indicating external link behavior */
  learnMoreIsExternal?: boolean | null;

  /** Ordering index to control display priority */
  order?: number | null;

  /** Related institution reference */
  program?: number | IProgram | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
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

/** API response for program queries */
export interface IProgramsResponse {
  data: IProgram[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Normalized program section entity with defaulted optional fields */
export interface INormalizedProgramSection
  extends Omit<
    IProgramSection,
    "description" | "learnMoreText" | "learnMoreUrl" | "learnMoreIsExternal" | "order" | "program" | "icon"
  > {
  /** Markdown description normalized to string or null */
  description: string | null;

  /** CTA label guaranteed to be string or null */
  learnMoreText: string | null;

  /** CTA URL guaranteed to be string or null */
  learnMoreUrl: string | null;

  /** External flag normalized to boolean */
  learnMoreIsExternal: boolean;

  /** Order normalized to number or null */
  order: number | null;

  /** Icon badge fully populated or null */
  icon: IIconBadge | null;
}

/** Normalized program entity with related sections */
export interface INormalizedProgram
  extends Omit<IProgram, "description" | "sections" | "institution"> {
  /** Program description normalized to string or null */
  description: string | null;

  /** Related sections normalized to array */
  sections: INormalizedProgramSection[];
}

/** Standard API error response for consistent error handling */
export interface IApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}
