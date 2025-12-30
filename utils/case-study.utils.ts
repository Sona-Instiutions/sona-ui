/**
 * Case Studies Utils
 *
 * Utilities for normalizers and query builders for case studies.
 */

import qs from "qs";
import { ICaseStudy, INormalizedCaseStudy, ICaseStudyAuthor } from "@/types/case-study.types";
import { normalizeStrapiMedia, isAuthorData, getAuthorProperty, buildContentFilters } from "@/utils/common.utils";

/**
 * Build Strapi query string for case studies
 */
export function buildCaseStudiesQuery(params: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
  slug?: string;
  excludeId?: number;
}): string {
  const { page = 1, pageSize = 10, categorySlug, tagSlug, search, slug, excludeId } = params;

  const baseFilters = buildContentFilters({ slug, categorySlug, tagSlug, excludeId, search });

  // Case studies include content in search
  if (search && Array.isArray(baseFilters.$or)) {
    baseFilters.$or.push({ content: { $containsi: search } });
  }

  const query: Record<string, unknown> = {
    populate: {
      categories: true,
      tags: true,
      bannerImage: true,
      thumbnail: true,
      authorImage: true,
      relatedCaseStudies: {
        populate: ["thumbnail", "bannerImage", "categories"],
      },
    },
    sort: ["publishedDate:desc"],
    pagination: {
      page,
      pageSize,
    },
  };

  if (Object.keys(baseFilters).length > 0) {
    query.filters = baseFilters;
  }

  return qs.stringify(query, { encodeValuesOnly: true });
}

/**
 * Normalize raw Strapi case study response to frontend interface.
 */
export function normalizeCaseStudy(item: ICaseStudy): INormalizedCaseStudy {
  const authorData = item.author;
  let normalizedAuthor: ICaseStudyAuthor | null = null;

  if (typeof authorData === "string") {
    normalizedAuthor = {
      name: authorData,
    };
  } else if (isAuthorData(authorData)) {
    normalizedAuthor = {
      name: getAuthorProperty<string>(authorData, "name", "authorName") || "Sona Author",
      role: getAuthorProperty<string | undefined>(authorData, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(authorData, "bio", "authorBio"),
      image: normalizeStrapiMedia(authorData.authorImage || authorData.image),
      linkedin: getAuthorProperty<string | undefined>(authorData, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(authorData, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(authorData, "email", "authorEmail"),
    };
  }

  // Fallback if some author fields are directly on the case study
  if (!normalizedAuthor && isAuthorData(item)) {
    normalizedAuthor = {
      name: getAuthorProperty<string>(item, "name", "authorName") || "Sona Author",
      role: getAuthorProperty<string | undefined>(item, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(item, "bio", "authorBio"),
      image: normalizeStrapiMedia(item.authorImage || item.image),
      linkedin: getAuthorProperty<string | undefined>(item, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(item, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(item, "email", "authorEmail"),
    };
  }

  return {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt || "",
    content: item.content || null,
    publishedDate: item.publishedDate || null,
    projectDate: item.projectDate || null,
    readTime: item.readTime || null,
    bannerImage: normalizeStrapiMedia(item.bannerImage),
    thumbnail: normalizeStrapiMedia(item.thumbnail || item.bannerImage),
    author: normalizedAuthor,
    featured: item.featured || false,
    viewCount: item.viewCount || 0,
    showComments: item.showComments || false,
    metaTitle: item.metaTitle || item.title,
    metaDescription: item.metaDescription || item.excerpt,
    categories: Array.isArray(item.categories) ? item.categories : [],
    tags: Array.isArray(item.tags) ? item.tags : [],
    relatedCaseStudies: Array.isArray(item.relatedCaseStudies)
      ? item.relatedCaseStudies.map((related) => ({
          ...normalizeCaseStudy(related),
          relatedCaseStudies: [], // Avoid infinite recursion
        }))
      : [],
  };
}
