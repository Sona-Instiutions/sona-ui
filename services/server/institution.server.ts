import { isAxiosError } from "axios";

import { axiosInstance } from "@/lib/axios.config";
import {
  buildAchievementQuery,
  buildCampusGallerySectionQuery,
  buildFaqSectionQuery,
  buildKeyHighlightSectionQuery,
  buildProgramSectionsQuery,
  buildValuePropositionQuery,
  normalizeAchievementRecord,
  normalizeCampusGallerySectionRecord,
  normalizeColorValue,
  normalizeFaqSectionRecord,
  normalizeKeyHighlightSectionRecord,
  normalizeProgramRecord,
  normalizeTestimonialSectionRecord,
  normalizeValuePropositionRecord,
  normalizePartnershipSectionRecord,
} from "@/utils/institution.utils";
import {
  IInstitution,
  IInstitutionResponse,
  IApiError,
  INormalizedInstitution,
  INormalizedCampusGallerySection,
  INormalizedFaqSection,
  IProgramsResponse,
  INormalizedProgram,
  INormalizedValueProposition,
  IValuePropositionResponse,
  INormalizedAchievement,
  IAchievementResponse,
  INormalizedKeyHighlightSection,
  IKeyHighlightSectionResponse,
  ICampusGallerySectionResponse,
  IFaqSectionResponse,
} from "@/types/institution.types";
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
      `/api/institutions?filters[slug][$eq]=${encodeURIComponent(
        slug
      )}&populate[0]=bannerImage&populate[1]=testimonialSection.testimonials.avatar&populate[2]=partnershipSection.partnerships.companyLogo&populate[3]=partnershipSection.backgroundImage&populate[4]=campusGallerySection.columns.images.image&populate[5]=campusGallerySection.backgroundImage&populate[6]=faqSection.faqs&populate[7]=faqSection.backgroundImage`
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
      bannerSubtitle: institution.bannerSubtitle ?? null,
      bannerTitlePrefix: (institution.bannerTitlePrefix as string | null | undefined) ?? null,
      bannerTitlePrefixColor: normalizeColorValue(institution.bannerTitlePrefixColor),
      bannerTitleHighlight: (institution.bannerTitleHighlight as string | null | undefined) ?? null,
      bannerTitleHighlightColor: normalizeColorValue(institution.bannerTitleHighlightColor),
      bannerImage: normalizeStrapiMedia(institution.bannerImage),
      aboutInstitute: null,
      program: null,
      valueProposition: null,
      achievements: null,
      keyHighlightSection: null,
      testimonialSection: normalizeTestimonialSectionRecord(
        Array.isArray(institution.testimonialSection)
          ? institution.testimonialSection[0]
          : institution.testimonialSection
      ),
      partnershipSection: normalizePartnershipSectionRecord(institution.partnershipSection),
      campusGallerySection: normalizeCampusGallerySectionRecord(institution.campusGallerySection),
      faqSection: normalizeFaqSectionRecord(institution.faqSection),
    };

    return normalizedInstitution;
  } catch (error) {
    // Re-throw normalized errors from axios config
    throw error;
  }
}

/**
 * Fetch value proposition associated with an institution (server-only).
 */
export async function getValuePropositionByInstitution(
  institutionId: number
): Promise<INormalizedValueProposition | null> {
  if (!institutionId || typeof institutionId !== "number") {
    return null;
  }

  try {
    const response = await axiosInstance.get<IValuePropositionResponse>(
      `/api/value-propositions?${buildValuePropositionQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalized = normalizeValuePropositionRecord(response.data.data[0]);

    return normalized ?? null;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status >= 400 && status < 500) {
        return null;
      }

      throw {
        status,
        message: error.message,
        details: error.response?.data ?? {},
      } as IApiError;
    }

    throw error;
  }
}

/**
 * Fetch achievements associated with an institution (server-only).
 */
export async function getAchievementsByInstitution(institutionId: number): Promise<INormalizedAchievement | null> {
  if (!institutionId || typeof institutionId !== "number") {
    return null;
  }

  try {
    const response = await axiosInstance.get<IAchievementResponse>(
      `/api/achievements?${buildAchievementQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalized = normalizeAchievementRecord(response.data.data[0]);

    return normalized ?? null;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status >= 400 && status < 500) {
        return null;
      }

      throw {
        status,
        message: error.message,
        details: error.response?.data ?? {},
      } as IApiError;
    }

    throw error;
  }
}

/**
 * Fetch program associated with an institution (server-only).
 */
export async function getProgramByInstitution(institutionId: number): Promise<INormalizedProgram | null> {
  if (!institutionId || typeof institutionId !== "number") {
    throw {
      status: 400,
      message: "Invalid institution id provided",
      details: { institutionId },
    } as IApiError;
  }

  try {
    const response = await axiosInstance.get<IProgramsResponse>(
      `/api/programs?${buildProgramSectionsQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalizedProgram = normalizeProgramRecord(response.data.data[0]);

    return normalizedProgram ?? null;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch key highlights section associated with an institution (server-only).
 */
export async function getKeyHighlightsByInstitution(
  institutionId: number
): Promise<INormalizedKeyHighlightSection | null> {
  if (!institutionId || typeof institutionId !== "number") {
    return null;
  }

  try {
    const response = await axiosInstance.get<IKeyHighlightSectionResponse>(
      `/api/key-highlight-sections?${buildKeyHighlightSectionQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalized = normalizeKeyHighlightSectionRecord(response.data.data[0]);

    return normalized ?? null;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status >= 400 && status < 500) {
        return null;
      }

      throw {
        status,
        message: error.message,
        details: error.response?.data ?? {},
      } as IApiError;
    }

    throw error;
  }
}

/**
 * Fetch campus gallery section associated with an institution (server-only).
 */
export async function getCampusGalleryByInstitution(
  institutionId: number
): Promise<INormalizedCampusGallerySection | null> {
  if (!institutionId || typeof institutionId !== "number") {
    return null;
  }

  try {
    const response = await axiosInstance.get<ICampusGallerySectionResponse>(
      `/api/campus-gallery-sections?${buildCampusGallerySectionQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalized = normalizeCampusGallerySectionRecord(response.data.data[0]);

    return normalized ?? null;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status >= 400 && status < 500) {
        return null;
      }

      throw {
        status,
        message: error.message,
        details: error.response?.data ?? {},
      } as IApiError;
    }

    throw error;
  }
}

/**
 * Fetch FAQ section associated with an institution (server-only).
 */
export async function getFaqSectionByInstitution(institutionId: number): Promise<INormalizedFaqSection | null> {
  if (!institutionId || typeof institutionId !== "number") {
    return null;
  }

  try {
    const response = await axiosInstance.get<IFaqSectionResponse>(
      `/api/faq-sections?${buildFaqSectionQuery(institutionId)}`
    );

    if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
      return null;
    }

    const normalized = normalizeFaqSectionRecord(response.data.data[0]);

    return normalized ?? null;
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;

      if (status >= 400 && status < 500) {
        return null;
      }

      throw {
        status,
        message: error.message,
        details: error.response?.data ?? {},
      } as IApiError;
    }

    throw error;
  }
}
