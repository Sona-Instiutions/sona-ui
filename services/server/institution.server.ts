import { axiosInstance } from "@/lib/axios.config";
import { IInstitution, IInstitutionResponse, IApiError, INormalizedInstitution } from "@/types/institution.types";
import type { IStrapiMedia } from "@/types/common.types";

const isStrapiMedia = (value: unknown): value is IStrapiMedia => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const media = value as Record<string, unknown>;

  return (
    typeof media.id === "number" &&
    typeof media.name === "string" &&
    typeof media.url === "string" &&
    typeof media.mime === "string" &&
    typeof media.size === "number"
  );
};

const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media) {
    return null;
  }

  if (isStrapiMedia(media)) {
    return media;
  }

  if (typeof media !== "object") {
    return null;
  }

  const mediaRecord = media as Record<string, unknown>;
  const data = mediaRecord.data as Record<string, unknown> | undefined;
  const attributes = (data?.attributes as Record<string, unknown> | undefined) ?? data;

  if (!attributes) {
    return null;
  }

  const id =
    (typeof data?.id === "number" ? data?.id : undefined) ??
    (typeof attributes.id === "number" ? (attributes.id as number) : undefined);
  const url = typeof attributes.url === "string" ? (attributes.url as string) : undefined;
  const name = typeof attributes.name === "string" ? (attributes.name as string) : undefined;
  const mime = typeof attributes.mime === "string" ? (attributes.mime as string) : undefined;
  const size = typeof attributes.size === "number" ? (attributes.size as number) : undefined;

  if (!id || !url || !name || !mime || size === undefined) {
    return null;
  }

  return {
    id,
    url,
    name,
    mime,
    size,
    alternativeText: attributes.alternativeText as string | undefined,
    caption: attributes.caption as string | undefined,
    width: attributes.width as number | undefined,
    height: attributes.height as number | undefined,
    formats: attributes.formats as Record<string, unknown> | undefined,
  };
};

/**
 * Fetch institution by slug from Strapi with populated banner image (server-only, safe for SSR).
 * Populates the bannerImage media field to retrieve the complete image object and URL.
 */
export async function getInstitutionBySlug(slug: string): Promise<INormalizedInstitution> {
  if (!slug || typeof slug !== "string") {
    throw {
      status: 400,
      message: "Invalid slug provided",
      details: { slug },
    } as IApiError;
  }

  try {
    const response = await axiosInstance.get<IInstitutionResponse>(
      `/api/institutions?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=bannerImage`
    );

    // Strapi returns array even for single item filter
    if (!response.data.data || (Array.isArray(response.data.data) && response.data.data.length === 0)) {
      throw {
        status: 404,
        message: "Institution not found",
        details: { slug },
      } as IApiError;
    }

    // Handle both single object and array responses
    const institution = Array.isArray(response.data.data)
      ? (response.data.data[0] as IInstitution | undefined)
      : (response.data.data as IInstitution | undefined);

    if (!institution) {
      throw {
        status: 404,
        message: "Institution not found",
        details: { slug },
      } as IApiError;
    }

    const normalizedInstitution: INormalizedInstitution = {
      ...institution,
      bannerTitle: institution.bannerTitle ?? institution.name,
      bannerSubtitle: institution.bannerSubtitle ?? null,
      bannerImage: normalizeStrapiMedia(institution.bannerImage),
      aboutInstitute: null,
    };

    return normalizedInstitution;
  } catch (error) {
    // Re-throw normalized errors from axios config
    throw error;
  }
}
