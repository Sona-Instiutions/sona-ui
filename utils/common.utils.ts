import { STRAPI_CLIENT_URL } from "@/constants/app.constants";
import { IStrapiMedia, IContentAuthorData, IContentQueryFilters } from "@/types/common.types";

/**
 * Normalizes a Strapi media object (single file).
 *
 * @param media - Raw Strapi media object that may be in various formats.
 * @returns Normalized media object or null if invalid.
 */
export const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = media as any;

  // If it's already in the simplified format
  if (m.url && m.mime) return m as IStrapiMedia;

  const data = m.data || m;
  if (!data) return null;

  const attributes = data.attributes || data;
  if (!attributes || !attributes.url) return null;

  return {
    id: data.id || attributes.id,
    url: attributes.url,
    name: attributes.name,
    mime: attributes.mime,
    size: attributes.size,
    alternativeText: attributes.alternativeText,
    caption: attributes.caption,
    width: attributes.width,
    height: attributes.height,
    formats: attributes.formats,
  };
};

/**
 * Type guard to check if value is an object with author-like properties.
 *
 * @param value - Value to check.
 * @returns True if value is author data object.
 */
export const isAuthorData = (value: unknown): value is IContentAuthorData => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Safely extracts author property with fallback to alternative naming.
 *
 * @param data - Author data object.
 * @param primaryKey - Primary property key to check.
 * @param fallbackKey - Fallback property key if primary is missing.
 * @returns Property value or undefined.
 */
export const getAuthorProperty = <T extends string | undefined>(
  data: IContentAuthorData,
  primaryKey: keyof IContentAuthorData,
  fallbackKey: keyof IContentAuthorData
): T => {
  return (data[primaryKey] || data[fallbackKey]) as T;
};

export const normalizeBaseUrl = (rawUrl: string | undefined): string => {
  const fallback = "http://localhost:1337";
  if (!rawUrl || rawUrl.length === 0) {
    return fallback;
  }

  return rawUrl.replace(/\/api\/?$/, "").replace(/\/$/, "") || fallback;
};

export const buildMediaUrl = (media: { url: string } | null | undefined): string | null => {
  if (!media?.url) {
    return null;
  }

  if (media.url.startsWith("http")) {
    return media.url;
  }

  const baseUrl = normalizeBaseUrl(STRAPI_CLIENT_URL);
  return `${baseUrl}${media.url}`;
};

export const hasText = (value?: string | null): boolean => Boolean(value && value.trim().length > 0);

/**
 * Resolve the appropriate inline style for a color value supporting both CSS colors and Tailwind class tokens.
 *
 * @param color - Color value entered in Strapi (CSS color or Tailwind `text-*` class).
 * @param defaultColor - Fallback color when none is provided.
 */
export const applyColorStyle = (color?: string | null, defaultColor?: string) => {
  const value = (color ?? defaultColor)?.trim();

  if (!value || value.startsWith("text-")) {
    return undefined;
  }

  return { color: value };
};

/**
 * Resolve the appropriate Tailwind className when the color value represents a Tailwind token.
 *
 * @param color - Optional color value.
 * @param defaultClassName - Fallback class when no class-based color is supplied.
 */
export const getColorClassName = (color?: string | null, defaultClassName?: string): string | undefined => {
  if (!color) {
    return defaultClassName;
  }

  const trimmed = color.trim();

  if (trimmed.startsWith("text-")) {
    return trimmed;
  }

  return defaultClassName;
};

/**
 * Builds common filters for content queries (blogs, case studies, events).
 *
 * @param filters - Filter options.
 * @returns Filter object for Strapi query.
 */
export const buildContentFilters = (filters: IContentQueryFilters): Record<string, unknown> => {
  const result: Record<string, unknown> = {};

  if (filters.slug) {
    result.slug = { $eq: filters.slug };
  }

  if (filters.categorySlug) {
    result.categories = { slug: { $eq: filters.categorySlug } };
  }

  if (filters.tagSlug) {
    result.tags = { slug: { $eq: filters.tagSlug } };
  }

  if (filters.excludeId) {
    result.id = { $ne: filters.excludeId };
  }

  if (filters.search) {
    result.$or = [{ title: { $containsi: filters.search } }, { excerpt: { $containsi: filters.search } }];
  }

  return result;
};

/**
 * Common populate fields for content queries.
 */
export const CONTENT_POPULATE_FIELDS = {
  categories: { fields: ["name", "slug", "color"] },
  tags: { fields: ["name", "slug"] },
  authorImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
} as const;
