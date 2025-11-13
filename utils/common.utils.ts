import { STRAPI_CLIENT_URL } from "@/constants/app.constants";
import { IStrapiMedia } from "@/types/common.types";

export const normalizeBaseUrl = (rawUrl: string | undefined): string => {
  const fallback = "http://localhost:1337";
  if (!rawUrl || rawUrl.length === 0) {
    return fallback;
  }

  return rawUrl.replace(/\/api\/?$/, "").replace(/\/$/, "") || fallback;
};

export const buildMediaUrl = (media: IStrapiMedia | null | undefined): string | null => {
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
