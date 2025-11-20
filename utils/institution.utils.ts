import type {
  IAchievement,
  IAchievementItem,
  IIconBadge,
  INormalizedAchievement,
  INormalizedAchievementItem,
  INormalizedProgram,
  INormalizedProgramSection,
  INormalizedRecognitionItem,
  INormalizedRecognitionSection,
  INormalizedValueProposition,
  INormalizedValuePropositionItem,
  IProgram,
  IProgramSection,
  IRecognitionItem,
  IRecognitionSection,
  IValueProposition,
  IValuePropositionItem,
} from "@/types/institution.types";
import type { IStrapiMedia } from "@/types/common.types";

const PROGRAM_FIELDS = ["title", "description", "createdAt", "updatedAt"] as const;
const PROGRAM_SECTION_FIELDS = [
  "title",
  "description",
  "learnMoreText",
  "learnMoreUrl",
  "learnMoreIsExternal",
  "order",
  "createdAt",
  "updatedAt",
] as const;

const VALUE_PROPOSITION_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "subtitle",
  "createdAt",
  "updatedAt",
] as const;

const VALUE_PROPOSITION_RELATION_FIELDS = ["title", "titleColor", "description", "order"] as const;
const MEDIA_FIELDS = [
  "url",
  "name",
  "alternativeText",
  "caption",
  "width",
  "height",
  "mime",
  "size",
  "formats",
] as const;

const ACHIEVEMENT_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "description",
] as const;

const ACHIEVEMENT_ITEM_FIELDS = ["statistic", "title", "description", "order"] as const;

const RECOGNITION_FIELDS = ["title", "backgroundColor"] as const;

const RECOGNITION_ITEM_FIELDS = ["title", "description", "order"] as const;

const resolveRecord = (value: unknown): { id: number; attributes: Record<string, unknown> } | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const attributes = (record.attributes as Record<string, unknown> | undefined) ?? record;

  const id =
    (typeof record.id === "number" ? (record.id as number) : undefined) ??
    (typeof attributes.id === "number" ? (attributes.id as number) : undefined);

  if (!id) {
    return null;
  }

  return { id, attributes };
};

const extractCollection = (value: unknown): unknown[] => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (Array.isArray(record.data)) {
      return record.data;
    }

    if (record.data) {
      return [record.data];
    }
  }

  return [];
};

const normalizeColorValue = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media || typeof media !== "object") {
    return null;
  }

  const candidate = (media as Record<string, unknown>).data ?? media;
  const resolved = resolveRecord(candidate);

  if (!resolved) {
    return null;
  }

  const { attributes, id } = resolved;
  const url = typeof attributes.url === "string" ? (attributes.url as string) : null;

  if (!url) {
    return null;
  }

  return {
    id,
    url,
    name: (attributes.name as string | undefined) ?? "",
    mime: (attributes.mime as string | undefined) ?? "",
    size: typeof attributes.size === "number" ? (attributes.size as number) : 0,
    alternativeText: (attributes.alternativeText as string | null | undefined) ?? undefined,
    caption: (attributes.caption as string | null | undefined) ?? undefined,
    width: typeof attributes.width === "number" ? (attributes.width as number) : undefined,
    height: typeof attributes.height === "number" ? (attributes.height as number) : undefined,
    formats: (attributes.formats as Record<string, unknown> | undefined) ?? undefined,
  };
};

/**
 * Build Strapi query string for fetching programs with sections populated.
 */
export const buildProgramSectionsQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  PROGRAM_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  // Simplified query to ensure we get all data
  params.set("populate[sections][populate]", "*");

  return params.toString();
};

export const normalizeIconBadge = (icon: unknown): IIconBadge | null => {
  if (!icon || typeof icon !== "object") {
    return null;
  }

  const iconRecord = icon as Record<string, unknown>;
  const candidate = iconRecord.data ?? icon;
  const resolved = resolveRecord(candidate);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;

  const iconName = (attributes.iconName as string | null | undefined) ?? null;

  if (!iconName) {
    return null;
  }

  return {
    id,
    iconName,
    displayName: (attributes.displayName as string | null | undefined) ?? null,
    iconColor: (attributes.iconColor as string | null | undefined) ?? null,
    backgroundColor: (attributes.backgroundColor as string | null | undefined) ?? null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a raw Strapi program section record into application-friendly shape.
 */
export const normalizeProgramSectionRecord = (section: IProgramSection | unknown): INormalizedProgramSection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const icon = normalizeIconBadge(attributes.icon);

  return {
    id,
    title: (attributes.title as string | null | undefined) ?? "",
    icon,
    description: (attributes.description as string | null | undefined) ?? null,
    learnMoreText: (attributes.learnMoreText as string | null | undefined) ?? null,
    learnMoreUrl: (attributes.learnMoreUrl as string | null | undefined) ?? null,
    learnMoreIsExternal: Boolean(attributes.learnMoreIsExternal),
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a raw Strapi program record into application-friendly shape.
 */
export const normalizeProgramRecord = (program: IProgram | unknown): INormalizedProgram | null => {
  const resolved = resolveRecord(program);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const sections = extractCollection(attributes.sections);

  const normalizedSections = sections
    .map((section) => normalizeProgramSectionRecord(section))
    .filter((section): section is INormalizedProgramSection => Boolean(section))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.title.localeCompare(b.title);
    });

  return {
    id,
    title: (attributes.title as string | null | undefined) ?? "",
    description: (attributes.description as string | null | undefined) ?? null,
    sections: normalizedSections,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Build Strapi query string for fetching value propositions with media and propositions populated.
 */
export const buildValuePropositionQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  VALUE_PROPOSITION_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  VALUE_PROPOSITION_RELATION_FIELDS.forEach((field, index) => {
    params.set(`populate[propositions][fields][${index}]`, field);
  });

  params.set("populate[propositions][populate][icon]", "*");
  MEDIA_FIELDS.forEach((field, index) => {
    params.set(`populate[backgroundImage][fields][${index}]`, field);
  });

  return params.toString();
};

/**
 * Normalize a single value proposition item record.
 */
export const normalizeValuePropositionItemRecord = (
  item: IValuePropositionItem | unknown
): INormalizedValuePropositionItem | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const icon = normalizeIconBadge(attributes.icon);

  const descriptionRaw = attributes.description;
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? (descriptionRaw as string) : "";

  return {
    id,
    title: (attributes.title as string | null | undefined) ?? "",
    titleColor: normalizeColorValue(attributes.titleColor),
    description,
    icon,
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a value proposition record with populated relations.
 */
export const normalizeValuePropositionRecord = (
  proposition: IValueProposition | unknown
): INormalizedValueProposition | null => {
  const resolved = resolveRecord(proposition);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;

  const propositionsRaw = extractCollection(attributes.propositions);
  const propositions = propositionsRaw
    .map((item) => normalizeValuePropositionItemRecord(item))
    .filter((item): item is INormalizedValuePropositionItem => Boolean(item))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.title.localeCompare(b.title);
    });

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? null,
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? null,
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    subtitle: (attributes.subtitle as string | null | undefined) ?? null,
    backgroundImage: normalizeStrapiMedia(attributes.backgroundImage),
    propositions,
    institution:
      typeof attributes.institution === "number" || typeof attributes.institution === "object"
        ? (attributes.institution as number | IValueProposition["institution"])
        : null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Build Strapi query string for fetching achievements with their cards.
 */
export const buildAchievementQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  ACHIEVEMENT_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  ACHIEVEMENT_ITEM_FIELDS.forEach((field, index) => {
    params.set(`populate[achievements][fields][${index}]`, field);
  });

  return params.toString();
};

/**
 * Normalize a single achievement card record.
 */
export const normalizeAchievementItemRecord = (
  item: IAchievementItem | unknown
): INormalizedAchievementItem | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const descriptionRaw = attributes.description;
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? (descriptionRaw as string) : "";

  return {
    id,
    statistic: (attributes.statistic as string | null | undefined) ?? "",
    title: (attributes.title as string | null | undefined) ?? "",
    description,
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize an achievement section record with populated cards.
 */
export const normalizeAchievementRecord = (
  achievement: IAchievement | unknown
): INormalizedAchievement | null => {
  const resolved = resolveRecord(achievement);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const cardsRaw = extractCollection(attributes.achievements);
  const achievements = cardsRaw
    .map((item) => normalizeAchievementItemRecord(item))
    .filter((item): item is INormalizedAchievementItem => Boolean(item))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.title.localeCompare(b.title);
    });

  const descriptionRaw = attributes.description;
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? (descriptionRaw as string) : null;

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? null,
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? null,
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    description,
    achievements,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Build Strapi query string for recognition sections with cards populated.
 */
export const buildRecognitionSectionQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  RECOGNITION_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  RECOGNITION_ITEM_FIELDS.forEach((field, index) => {
    params.set(`populate[recognitions][fields][${index}]`, field);
  });

  params.set("populate[recognitions][populate][icon]", "*");

  return params.toString();
};

/**
 * Normalize a recognition card record.
 */
export const normalizeRecognitionItemRecord = (
  item: IRecognitionItem | unknown
): INormalizedRecognitionItem | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const icon = normalizeIconBadge(attributes.icon);
  const descriptionRaw = attributes.description;
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? (descriptionRaw as string) : null;

  return {
    id,
    icon,
    title: (attributes.title as string | null | undefined) ?? "",
    description,
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a recognition section with populated recognitions.
 */
export const normalizeRecognitionSectionRecord = (
  recognition: IRecognitionSection | unknown
): INormalizedRecognitionSection | null => {
  const resolved = resolveRecord(recognition);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const recognitionsRaw = extractCollection(attributes.recognitions);
  const recognitions = recognitionsRaw
    .map((item) => normalizeRecognitionItemRecord(item))
    .filter((item): item is INormalizedRecognitionItem => Boolean(item))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.title.localeCompare(b.title);
    });

  const backgroundColor = normalizeColorValue(attributes.backgroundColor);

  return {
    id,
    title: (attributes.title as string | null | undefined) ?? "",
    backgroundColor,
    recognitions,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};
