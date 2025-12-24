import type {
  IAchievement,
  IAchievementItem,
  ICampusGalleryColumn,
  ICampusGalleryImage,
  ICampusGallerySection,
  IFaqItem,
  IFaqSection,
  IIconBadge,
  INormalizedAchievement,
  INormalizedAchievementItem,
  INormalizedCampusGalleryColumn,
  INormalizedCampusGalleryImage,
  INormalizedCampusGallerySection,
  INormalizedFaqSection,
  INormalizedKeyHighlightSection,
  INormalizedPartnershipSection,
  INormalizedProgram,
  INormalizedProgramSection,
  INormalizedRecognitionItem,
  INormalizedTestimonialSection,
  INormalizedValueProposition,
  INormalizedValuePropositionItem,
  IKeyHighlightSection,
  IPartnershipItem,
  IPartnershipSection,
  IProgram,
  IProgramSection,
  IRecognitionItem,
  ITestimonial,
  ITestimonialSection,
  IValueProposition,
  IValuePropositionItem,
  TCampusGalleryLayoutVariant,
} from "@/types/institution.types";
import { normalizeStrapiMedia } from "@/utils/common.utils";

const PROGRAM_FIELDS = ["title", "description", "createdAt", "updatedAt"] as const;

const VALUE_PROPOSITION_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "subtitle",
  "createdAt",
  "updatedAt",
] as const;

const KEY_HIGHLIGHT_SECTION_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "description",
  "createdAt",
  "updatedAt",
] as const;

const CAMPUS_GALLERY_SECTION_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "description",
  "createdAt",
  "updatedAt",
] as const;

const CAMPUS_GALLERY_COLUMN_FIELDS = ["order"] as const;
const CAMPUS_GALLERY_IMAGE_FIELDS = ["altText", "layoutVariant"] as const;

const FAQ_SECTION_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "description",
  "createdAt",
  "updatedAt",
] as const;
const FAQ_ITEM_FIELDS = ["question", "answer", "order"] as const;

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

const GALLERY_LAYOUT_VARIANTS: readonly TCampusGalleryLayoutVariant[] = ["square", "tall", "wide"] as const;
const DEFAULT_GALLERY_LAYOUT: TCampusGalleryLayoutVariant = "square";

const ACHIEVEMENT_FIELDS = [
  "titlePrefix",
  "titlePrefixColor",
  "titleHighlight",
  "titleHighlightColor",
  "description",
  "recognitionTitle",
  "recognitionBackgroundColor",
] as const;

const ACHIEVEMENT_ITEM_FIELDS = ["statistic", "title", "description", "order"] as const;

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

const isGalleryLayoutVariant = (value: unknown): value is TCampusGalleryLayoutVariant => {
  return typeof value === "string" && GALLERY_LAYOUT_VARIANTS.includes(value as TCampusGalleryLayoutVariant);
};

export const normalizeColorValue = (value: unknown): string | null => {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
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
 * Build Strapi query string for fetching key highlight section with media and highlights populated.
 */
export const buildKeyHighlightSectionQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  KEY_HIGHLIGHT_SECTION_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  VALUE_PROPOSITION_RELATION_FIELDS.forEach((field, index) => {
    params.set(`populate[highlights][fields][${index}]`, field);
  });

  params.set("populate[highlights][populate][icon]", "*");
  MEDIA_FIELDS.forEach((field, index) => {
    params.set(`populate[image][fields][${index}]`, field);
  });
  MEDIA_FIELDS.forEach((field, index) => {
    params.set(`populate[backgroundImage][fields][${index}]`, field);
  });

  return params.toString();
};

/**
 * Build Strapi query string for fetching campus gallery section with media populated.
 */
export const buildCampusGallerySectionQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  CAMPUS_GALLERY_SECTION_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  CAMPUS_GALLERY_COLUMN_FIELDS.forEach((field, index) => {
    params.set(`populate[columns][fields][${index}]`, field);
  });

  CAMPUS_GALLERY_IMAGE_FIELDS.forEach((field, index) => {
    params.set(`populate[columns][populate][images][fields][${index}]`, field);
  });

  MEDIA_FIELDS.forEach((field, index) => {
    params.set(`populate[columns][populate][images][populate][image][fields][${index}]`, field);
  });

  MEDIA_FIELDS.forEach((field, index) => {
    params.set(`populate[backgroundImage][fields][${index}]`, field);
  });

  return params.toString();
};

/**
 * Build Strapi query string for fetching FAQ section with questions populated.
 */
export const buildFaqSectionQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  FAQ_SECTION_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  FAQ_ITEM_FIELDS.forEach((field, index) => {
    params.set(`populate[faqs][fields][${index}]`, field);
  });

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
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a key highlight section record with populated relations.
 */
export const normalizeKeyHighlightSectionRecord = (
  section: IKeyHighlightSection | unknown
): INormalizedKeyHighlightSection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;

  const highlightsRaw = extractCollection(attributes.highlights);
  const highlights = highlightsRaw
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
    description: (attributes.description as string | null | undefined) ?? null,
    image: normalizeStrapiMedia(attributes.image),
    backgroundImage: normalizeStrapiMedia(attributes.backgroundImage),
    highlights,
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

  RECOGNITION_ITEM_FIELDS.forEach((field, index) => {
    params.set(`populate[recognitions][fields][${index}]`, field);
  });

  params.set("populate[recognitions][populate][icon]", "*");

  return params.toString();
};

/**
 * Normalize a single achievement card record.
 */
export const normalizeAchievementItemRecord = (item: IAchievementItem | unknown): INormalizedAchievementItem | null => {
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
export const normalizeAchievementRecord = (achievement: IAchievement | unknown): INormalizedAchievement | null => {
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

  const descriptionRaw = attributes.description;
  const description =
    typeof descriptionRaw === "string" && descriptionRaw.trim().length > 0 ? (descriptionRaw as string) : null;
  const recognitionTitleRaw = attributes.recognitionTitle;
  const recognitionTitle =
    typeof recognitionTitleRaw === "string" && recognitionTitleRaw.trim().length > 0
      ? (recognitionTitleRaw as string)
      : null;
  const recognitionBackgroundColor = normalizeColorValue(attributes.recognitionBackgroundColor) ?? "#1e3a5f";

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? null,
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? null,
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    description,
    achievements,
    recognitionTitle,
    recognitionBackgroundColor,
    recognitions,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a recognition card record.
 */
export const normalizeRecognitionItemRecord = (item: IRecognitionItem | unknown): INormalizedRecognitionItem | null => {
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
 * Normalize a single testimonial item record.
 */
export const normalizeTestimonialItemRecord = (item: ITestimonial | unknown): ITestimonial | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;

  return {
    id,
    name: (attributes.name as string | null | undefined) ?? "",
    role: (attributes.role as string | null | undefined) ?? "",
    company: (attributes.company as string | null | undefined) ?? null,
    quote: (attributes.quote as string | null | undefined) ?? "",
    rating: typeof attributes.rating === "number" ? (attributes.rating as number) : 5,
    avatar: normalizeStrapiMedia(attributes.avatar),
  };
};

/**
 * Normalize a testimonial section record with populated testimonials.
 */
export const normalizeTestimonialSectionRecord = (
  section: ITestimonialSection | unknown
): INormalizedTestimonialSection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const testimonialsRaw = extractCollection(attributes.testimonials);
  const testimonials = testimonialsRaw
    .map((item) => normalizeTestimonialItemRecord(item))
    .filter((item): item is ITestimonial => Boolean(item));

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? null,
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? null,
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    description: (attributes.description as string | null | undefined) ?? null,
    testimonials,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a single partnership item record.
 */
export const normalizePartnershipItemRecord = (item: IPartnershipItem | unknown): IPartnershipItem | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const companyLogo = normalizeStrapiMedia(attributes.companyLogo);

  if (!companyLogo) {
    return null;
  }

  return {
    id,
    companyName: (attributes.companyName as string | null | undefined) ?? "",
    companyLogo,
    backgroundColor: normalizeColorValue(attributes.backgroundColor),
  };
};

/**
 * Normalize a partnership section record with populated partnerships.
 */
export const normalizePartnershipSectionRecord = (
  section: IPartnershipSection | unknown
): INormalizedPartnershipSection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const partnershipsRaw = extractCollection(attributes.partnerships);
  const partnerships = partnershipsRaw
    .map((item) => normalizePartnershipItemRecord(item))
    .filter((item): item is IPartnershipItem => Boolean(item));

  const backgroundImage = normalizeStrapiMedia(attributes.backgroundImage);

  if (!backgroundImage) {
    return null;
  }

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? "",
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? "",
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    description: (attributes.description as string | null | undefined) ?? "",
    backgroundImage,
    partnerships,
  };
};

/**
 * Normalize a single campus gallery image record.
 */
export const normalizeCampusGalleryImageRecord = (
  item: ICampusGalleryImage | unknown
): INormalizedCampusGalleryImage | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const image = normalizeStrapiMedia(attributes.image);

  if (!image) {
    return null;
  }

  const layoutRaw = attributes.layoutVariant;
  const layoutVariant = isGalleryLayoutVariant(layoutRaw) ? layoutRaw : DEFAULT_GALLERY_LAYOUT;

  const altRaw = attributes.altText;
  const altText = typeof altRaw === "string" ? altRaw.trim() || null : null;

  return {
    id,
    image,
    altText,
    layoutVariant,
  };
};

/**
 * Normalize a campus gallery column record with its two images.
 */
export const normalizeCampusGalleryColumnRecord = (
  column: ICampusGalleryColumn | unknown
): INormalizedCampusGalleryColumn | null => {
  const resolved = resolveRecord(column);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const imagesRaw = extractCollection(attributes.images);
  const images = imagesRaw
    .map((item) => normalizeCampusGalleryImageRecord(item))
    .filter((item): item is INormalizedCampusGalleryImage => Boolean(item));

  if (images.length !== 2) {
    return null;
  }

  return {
    id,
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
    images,
  };
};

/**
 * Normalize a campus gallery section record with populated columns.
 */
export const normalizeCampusGallerySectionRecord = (
  section: ICampusGallerySection | unknown
): INormalizedCampusGallerySection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const columnsRaw = extractCollection(attributes.columns);
  const columns = columnsRaw
    .map((column) => normalizeCampusGalleryColumnRecord(column))
    .filter((column): column is INormalizedCampusGalleryColumn => Boolean(column))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.id - b.id;
    });

  if (columns.length === 0) {
    return null;
  }

  return {
    id,
    titlePrefix: (attributes.titlePrefix as string | null | undefined) ?? null,
    titlePrefixColor: normalizeColorValue(attributes.titlePrefixColor),
    titleHighlight: (attributes.titleHighlight as string | null | undefined) ?? null,
    titleHighlightColor: normalizeColorValue(attributes.titleHighlightColor),
    description: (attributes.description as string | null | undefined) ?? null,
    backgroundImage: normalizeStrapiMedia(attributes.backgroundImage),
    columns,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};

/**
 * Normalize a single FAQ item record.
 */
export const normalizeFaqItemRecord = (item: IFaqItem | unknown): IFaqItem | null => {
  const resolved = resolveRecord(item);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;

  const questionRaw = attributes.question;
  const answerRaw = attributes.answer;

  const question = typeof questionRaw === "string" && questionRaw.trim().length > 0 ? (questionRaw as string) : "";
  const answer = typeof answerRaw === "string" ? (answerRaw as string) : "";

  return {
    id,
    question,
    answer,
    order: typeof attributes.order === "number" ? (attributes.order as number) : null,
  };
};

/**
 * Normalize an FAQ section record with populated FAQs.
 */
export const normalizeFaqSectionRecord = (section: IFaqSection | unknown): INormalizedFaqSection | null => {
  const resolved = resolveRecord(section);

  if (!resolved) {
    return null;
  }

  const { id, attributes } = resolved;
  const faqsRaw = extractCollection(attributes.faqs);
  const faqs = faqsRaw
    .map((item) => normalizeFaqItemRecord(item))
    .filter((item): item is IFaqItem => Boolean(item))
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      return a.question.localeCompare(b.question);
    });

  if (faqs.length === 0) {
    return null;
  }

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
    backgroundImage: normalizeStrapiMedia(attributes.backgroundImage),
    faqs,
    createdAt: (attributes.createdAt as string | undefined) ?? "",
    updatedAt: (attributes.updatedAt as string | undefined) ?? "",
  };
};
