/**
 * Institution Service
 *
 * Service layer for institution data access and management.
 * Exposes server-safe helpers for SSR and client-safe TanStack Query hooks.
 *
 * Per ADR 002: All Strapi integrations are consolidated here with typed exports.
 */

'use client';

import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios.config';
import {
  IInstitution,
  IInstitutionResponse,
  IApiError,
} from '@/types/institution.types';

/** Query key factory for TanStack Query cache management */
const institutionQueryKeys = {
  all: ['institutions'] as const,
  bySlug: (slug: string) => [...institutionQueryKeys.all, 'by-slug', slug] as const,
};

/** Fetch institution by slug from Strapi (server-safe for SSR) */
export async function getInstitutionBySlug(slug: string): Promise<IInstitution> {
  if (!slug || typeof slug !== 'string') {
    throw {
      status: 400,
      message: 'Invalid slug provided',
      details: { slug },
    } as IApiError;
  }

  try {
    const response = await axiosInstance.get<IInstitutionResponse>(
      `/api/institutions?filters[slug][$eq]=${encodeURIComponent(slug)}`
    );

    // Strapi returns array even for single item filter
    if (!response.data.data || (Array.isArray(response.data.data) && response.data.data.length === 0)) {
      throw {
        status: 404,
        message: 'Institution not found',
        details: { slug },
      } as IApiError;
    }

    // Handle both single object and array responses
    const institution = Array.isArray(response.data.data)
      ? response.data.data[0]
      : response.data.data;

    return institution;
  } catch (error) {
    // Re-throw normalized errors from axios config
    throw error;
  }
}

/** Client-side hook for fetching institution by slug with TanStack Query */
export function useInstitutionQuery(slug: string) {
  return useQuery({
    queryKey: institutionQueryKeys.bySlug(slug),
    queryFn: async () => {
      const response = await axiosInstance.get<IInstitutionResponse>(
        `/api/institutions?filters[slug][$eq]=${encodeURIComponent(slug)}`
      );

      // Strapi returns array even for single item filter
      if (!response.data.data || (Array.isArray(response.data.data) && response.data.data.length === 0)) {
        throw {
          status: 404,
          message: 'Institution not found',
          details: { slug },
        } as IApiError;
      }

      // Handle both single object and array responses
      return Array.isArray(response.data.data)
        ? response.data.data[0]
        : response.data.data;
    },
    enabled: !!slug && slug.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/** Query keys for manual cache invalidation and refetching */
export { institutionQueryKeys };

