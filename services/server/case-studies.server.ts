/**
 * Case Studies Server Service
 *
 * Server-side data access for Case Studies.
 * Used by Server Components (ISR) and Server Actions.
 */

import axiosInstance from "@/lib/axios.config";
import {
  ICaseStudiesResponse,
  INormalizedCaseStudy,
  ICaseStudyCategoriesResponse,
  ICaseStudyTagsResponse,
  ICaseStudyCategory,
  ICaseStudyTag,
} from "@/types/case-study.types";
import { buildCaseStudiesQuery, normalizeCaseStudy } from "@/utils/case-study.utils";
import { CASE_STUDY_PAGE_SIZE } from "@/constants/case-study.constants";
import qs from "qs";

/**
 * Fetch a paginated list of case studies.
 */
export async function getCaseStudies(params: {
  page?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
}): Promise<{ data: INormalizedCaseStudy[]; meta: ICaseStudiesResponse["meta"] }> {
  try {
    const query = buildCaseStudiesQuery(params);
    const { data } = await axiosInstance.get<ICaseStudiesResponse>(`/api/case-studies?${query}`);

    return {
      data: data.data.map(normalizeCaseStudy),
      meta: data.meta,
    };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: params.pageSize || CASE_STUDY_PAGE_SIZE,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}

/**
 * Fetch a single case study by slug (with full population).
 */
export async function getCaseStudyBySlug(slug: string): Promise<INormalizedCaseStudy | null> {
  if (!slug) return null;

  try {
    const query = buildCaseStudiesQuery({ slug });
    const { data } = await axiosInstance.get<ICaseStudiesResponse>(`/api/case-studies?${query}`);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return normalizeCaseStudy(data.data[0]);
  } catch (error) {
    console.error(`Error fetching case study by slug [${slug}]:`, error);
    return null;
  }
}

/**
 * Fetch recent case studies (excluding a specific ID).
 */
export async function getRecentCaseStudies(params: {
  limit?: number;
  excludeId?: number;
}): Promise<INormalizedCaseStudy[]> {
  try {
    const query = buildCaseStudiesQuery({
      page: 1,
      pageSize: params.limit || 3,
      excludeId: params.excludeId,
    });
    const { data } = await axiosInstance.get<ICaseStudiesResponse>(`/api/case-studies?${query}`);
    return data.data.map(normalizeCaseStudy);
  } catch (error) {
    console.error("Error fetching recent case studies:", error);
    return [];
  }
}

/**
 * Fetch all case study categories.
 */
export async function getCaseStudyCategories(): Promise<ICaseStudyCategory[]> {
  try {
    const query = qs.stringify({
      sort: ["order:asc", "name:asc"],
      pagination: { pageSize: 100 },
    });
    const { data } = await axiosInstance.get<ICaseStudyCategoriesResponse>(`/api/case-study-categories?${query}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching case study categories:", error);
    return [];
  }
}

/**
 * Fetch all case study tags.
 */
export async function getCaseStudyTags(): Promise<ICaseStudyTag[]> {
  try {
    const query = qs.stringify({
      sort: ["name:asc"],
      pagination: { pageSize: 100 },
    });
    const { data } = await axiosInstance.get<ICaseStudyTagsResponse>(`/api/case-study-tags?${query}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching case study tags:", error);
    return [];
  }
}

