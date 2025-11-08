"use client";

/**
 * Client-side data access helpers for institution-related resources.
 * Provides TanStack Query hooks for fetching about-institute content.
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios.config";
import type { IAboutInstitute, IAboutInstituteResponse, IApiError } from "@/types/institution.types";
import type { IStrapiMedia } from "@/types/common.types";

const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media || typeof media !== "object") {
    return null;
  }

  const record = media as Record<string, unknown>;

  if (
    typeof record.id === "number" &&
    typeof record.url === "string" &&
    typeof record.name === "string" &&
    typeof record.mime === "string" &&
    typeof record.size === "number"
  ) {
    return {
      id: record.id as number,
      url: record.url as string,
      name: record.name as string,
      mime: record.mime as string,
      size: record.size as number,
      alternativeText: record.alternativeText as string | undefined,
      caption: record.caption as string | undefined,
      width: record.width as number | undefined,
      height: record.height as number | undefined,
      formats: record.formats as Record<string, unknown> | undefined,
    };
  }

  const data = record.data as Record<string, unknown> | undefined;
  const attributes = (data?.attributes as Record<string, unknown> | undefined) ?? data;

  if (!attributes) {
    return null;
  }

  const id =
    (typeof data?.id === "number" ? (data.id as number) : undefined) ??
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

const mapAboutInstitute = (payload: IAboutInstitute | null | undefined): IAboutInstitute | null => {
  if (!payload) {
    return null;
  }

  return {
    ...payload,
    image: normalizeStrapiMedia(payload.image),
    title: payload.title ?? null,
    description: payload.description ?? null,
    bullets: payload.bullets ?? null,
    badgeText: payload.badgeText ?? null,
    badgeValue: payload.badgeValue ?? null,
    badgeColor: payload.badgeColor ?? null,
  };
};

const fetchAboutInstitute = async (institutionId: number): Promise<IAboutInstitute | null> => {
  const response = await axiosInstance.get<IAboutInstituteResponse>(
    `/api/about-institutes?filters[institution][id][$eq]=${institutionId}&populate=image`
  );

  if (!response.data.data || response.data.data.length === 0) {
    return null;
  }

  const aboutInstitute = response.data.data[0];
  return mapAboutInstitute(aboutInstitute);
};

interface UseAboutInstituteOptions {
  institutionId?: number | null;
}

export const useAboutInstitute = ({ institutionId }: UseAboutInstituteOptions) => {
  const enabled = typeof institutionId === "number" && institutionId > 0;

  return useQuery<IAboutInstitute | null, IApiError>({
    queryKey: ["institutions", institutionId ?? "unknown", "about"],
    queryFn: () => fetchAboutInstitute(institutionId as number),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};
