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
