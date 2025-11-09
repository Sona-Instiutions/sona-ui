import type {
  INormalizedProgram,
  INormalizedProgramSection,
  IProgram,
  IProgramSection,
} from "@/types/institution.types";

const PROGRAM_FIELDS = ["title", "description", "createdAt", "updatedAt"] as const;
const PROGRAM_SECTION_FIELDS = [
  "title",
  "icon",
  "description",
  "learnMoreText",
  "learnMoreUrl",
  "learnMoreIsExternal",
  "order",
  "createdAt",
  "updatedAt",
] as const;

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

/**
 * Build Strapi query string for fetching programs with sections populated.
 */
export const buildProgramSectionsQuery = (institutionId: number): string => {
  const params = new URLSearchParams();

  params.set("filters[institution][id][$eq]", String(institutionId));

  PROGRAM_FIELDS.forEach((field, index) => {
    params.set(`fields[${index}]`, field);
  });

  PROGRAM_SECTION_FIELDS.forEach((field, index) => {
    params.set(`populate[sections][fields][${index}]`, field);
  });

  return params.toString();
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

  return {
    id,
    title: (attributes.title as string | null | undefined) ?? "",
    icon: (attributes.icon as string | null | undefined) ?? null,
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

