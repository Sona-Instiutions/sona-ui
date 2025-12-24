/**
 * Case Studies Utils
 *
 * Utilities for normalizers and query builders for case studies.
 */

import qs from "qs";
import {
  ICaseStudy,
  INormalizedCaseStudy,
  ICaseStudyAuthor,
  ICaseStudyAuthorData,
  ICaseStudyCategory,
  ICaseStudyTag,
} from "@/types/case-study.types";
import { IStrapiMedia } from "@/types/common.types";

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

  const filters: Record<string, unknown> = {};

  if (slug) {
    filters.slug = { $eq: slug };
  }

  if (excludeId) {
    filters.id = { $ne: excludeId };
  }

  if (categorySlug) {
    filters.categories = {
      slug: { $eq: categorySlug },
    };
  }

  if (tagSlug) {
    filters.tags = {
      slug: { $eq: tagSlug },
    };
  }

  if (search) {
    filters.$or = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
      { content: { $containsi: search } },
    ];
  }

  if (Object.keys(filters).length > 0) {
    query.filters = filters;
  }

  return qs.stringify(query, { encodeValuesOnly: true });
}

/**
 * Extract author from different possible Strapi structures
 */
export function extractCaseStudyAuthor(data: ICaseStudyAuthorData): ICaseStudyAuthor | null {
  if (!data) return null;

  // Check for flat structure first (most common in our implementation)
  if (data.authorName || data.name || (typeof data === "string" && data)) {
    return {
      name: data.authorName || data.name || (data as unknown as string),
      role: data.authorRole || data.role,
      bio: data.authorBio || data.bio,
      image: data.authorImage as IStrapiMedia,
      linkedin: data.authorLinkedin || data.linkedin,
      twitter: data.authorTwitter || data.twitter,
      email: data.authorEmail || data.email,
    };
  }

  return null;
}

/**
 * Normalize raw Strapi case study response to frontend interface
 */
export function normalizeCaseStudy(item: ICaseStudy): INormalizedCaseStudy {
  const author = extractCaseStudyAuthor(item as unknown as ICaseStudyAuthorData);

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
    bannerImage: item.bannerImage || null,
    thumbnail: item.thumbnail || item.bannerImage || null,
    author,
    featured: item.featured || false,
    viewCount: item.viewCount || 0,
    metaTitle: item.metaTitle || item.title,
    metaDescription: item.metaDescription || item.excerpt,
    categories: item.categories || ([] as ICaseStudyCategory[]),
    tags: item.tags || ([] as ICaseStudyTag[]),
    relatedCaseStudies: (item.relatedCaseStudies || []).map((related) => ({
      ...normalizeCaseStudy(related),
      relatedCaseStudies: [], // Avoid infinite recursion
    })),
  };
}
