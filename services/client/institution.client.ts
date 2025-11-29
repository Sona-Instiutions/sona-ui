"use client";

/**
 * Client-side data access helpers for institution-related resources.
 * Provides TanStack Query hooks for fetching about-institute content.
 */

import { useQuery, keepPreviousData } from "@tanstack/react-query";

import axiosInstance from "@/lib/axios.config";
import {
  buildAchievementQuery,
  buildProgramSectionsQuery,
  buildValuePropositionQuery,
  normalizeAchievementRecord,
  normalizeColorValue,
  normalizeIconBadge,
  normalizeProgramRecord,
  normalizeValuePropositionRecord,
} from "@/utils/institution.utils";
import type {
  IAboutInstitute,
  IAboutInstituteResponse,
  IApiError,
  IBulletItem,
  IAchievementResponse,
  INormalizedAchievement,
  INormalizedProgram,
  INormalizedValueProposition,
  IProgramsResponse,
  IValuePropositionResponse,
} from "@/types/institution.types";
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

const mapBulletItems = (bullets: unknown): IBulletItem[] | null => {
  if (!Array.isArray(bullets)) {
    return null;
  }

  return bullets
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const id = typeof record.id === "number" ? (record.id as number) : undefined;
      const text = typeof record.text === "string" ? (record.text as string) : "";
      const icon = normalizeIconBadge(record.icon);

      if (!id) {
        return null;
      }

      return {
        id,
        text,
        icon: icon ?? null,
      } as IBulletItem;
    })
    .filter((item): item is IBulletItem => Boolean(item));
};

const mapAboutInstitute = (payload: IAboutInstitute | null | undefined): IAboutInstitute | null => {
  if (!payload) {
    return null;
  }

  return {
    ...payload,
    image: normalizeStrapiMedia(payload.image),
    titlePrefixColor: normalizeColorValue(payload.titlePrefixColor),
    titleHighlight: payload.titleHighlight ?? null,
    titleHighlightColor: normalizeColorValue(payload.titleHighlightColor),
    description: payload.description ?? null,
    bullets: mapBulletItems(payload.bullets),
    badgeText: payload.badgeText ?? null,
    badgeValue: payload.badgeValue ?? null,
    badgeColor: payload.badgeColor ?? null,
  };
};

const fetchAboutInstitute = async (institutionId: number): Promise<IAboutInstitute | null> => {
  const response = await axiosInstance.get<IAboutInstituteResponse>(
    `/api/about-institutes?filters[institution][id][$eq]=${institutionId}`
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

const fetchProgramByInstitution = async (institutionId: number): Promise<INormalizedProgram | null> => {
  const response = await axiosInstance.get<IProgramsResponse>(
    `/api/programs?${buildProgramSectionsQuery(institutionId)}`
  );

  if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
    return null;
  }

  return normalizeProgramRecord(response.data.data[0]);
};

interface UseProgramsOptions {
  institutionId?: number | null;
}

export const useProgramByInstitution = ({ institutionId }: UseProgramsOptions) => {
  const enabled = typeof institutionId === "number" && institutionId > 0;

  return useQuery<INormalizedProgram | null, IApiError>({
    queryKey: ["institutions", institutionId ?? "unknown", "program"],
    queryFn: () => fetchProgramByInstitution(institutionId as number),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

const fetchValueProposition = async (institutionId: number): Promise<INormalizedValueProposition | null> => {
  const response = await axiosInstance.get<IValuePropositionResponse>(
    `/api/value-propositions?${buildValuePropositionQuery(institutionId)}`
  );

  if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
    return null;
  }

  return normalizeValuePropositionRecord(response.data.data[0]);
};

interface UseValuePropositionOptions {
  institutionId?: number | null;
}

export const useValueProposition = ({ institutionId }: UseValuePropositionOptions) => {
  const enabled = typeof institutionId === "number" && institutionId > 0;

  return useQuery<INormalizedValueProposition | null, IApiError>({
    queryKey: ["institutions", institutionId ?? "unknown", "value-proposition"],
    queryFn: () => fetchValueProposition(institutionId as number),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

const fetchAchievementsByInstitution = async (institutionId: number): Promise<INormalizedAchievement | null> => {
  const response = await axiosInstance.get<IAchievementResponse>(
    `/api/achievements?${buildAchievementQuery(institutionId)}`
  );

  if (!Array.isArray(response.data.data) || response.data.data.length === 0) {
    return null;
  }

  return normalizeAchievementRecord(response.data.data[0]);
};

interface UseAchievementsOptions {
  institutionId?: number | null;
}

export const useAchievementsByInstitution = ({ institutionId }: UseAchievementsOptions) => {
  const enabled = typeof institutionId === "number" && institutionId > 0;

  return useQuery<INormalizedAchievement | null, IApiError>({
    queryKey: ["institutions", institutionId ?? "unknown", "achievements"],
    queryFn: () => fetchAchievementsByInstitution(institutionId as number),
    enabled,
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
  });
};

export { fetchProgramByInstitution, fetchValueProposition, fetchAchievementsByInstitution };
