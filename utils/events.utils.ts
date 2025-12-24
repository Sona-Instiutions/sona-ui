/**
 * Event Utilities
 *
 * Helpers for normalizing event data and building API queries.
 */

import qs from "qs";
import { IEvent, INormalizedEvent, EEventType, IEventAuthor, IAuthorData } from "@/types/events.types";
import { IStrapiMedia } from "@/types/common.types";

/**
 * Type guard to check if value is an object with author-like properties.
 */
const isAuthorData = (value: unknown): value is IAuthorData => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

/**
 * Safely extracts author property with fallback to alternative naming.
 */
const getAuthorProperty = <T extends string | undefined>(
  data: IAuthorData,
  primaryKey: keyof IAuthorData,
  fallbackKey: keyof IAuthorData
): T => {
  return (data[primaryKey] || data[fallbackKey]) as T;
};

/**
 * Normalizes a Strapi media object (single file).
 */
export const normalizeStrapiMedia = (media: unknown): IStrapiMedia | null => {
  if (!media) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const m = media as any;

  // If it's already in the simplified format (e.g. from a previous normalization)
  if (m.url && m.mime) return m as IStrapiMedia;

  // Strapi v5 often returns data unwrapped, but let's handle standard response shape
  const data = m.data || m;
  if (!data) return null;

  const attributes = data.attributes || data;
  if (!attributes || !attributes.url) return null;

  return {
    id: data.id || attributes.id,
    url: attributes.url,
    name: attributes.name,
    mime: attributes.mime,
    size: attributes.size,
    alternativeText: attributes.alternativeText,
    caption: attributes.caption,
    width: attributes.width,
    height: attributes.height,
    formats: attributes.formats,
  };
};

/**
 * Normalizes raw event data into a clean interface.
 */
export const normalizeEvent = (event: IEvent): INormalizedEvent => {
  const authorData = event.author;
  let normalizedAuthor: string | IEventAuthor | null = null;

  if (typeof authorData === "string") {
    normalizedAuthor = authorData;
  } else if (isAuthorData(authorData)) {
    normalizedAuthor = {
      name: getAuthorProperty(authorData, "name", "authorName") || "SCALE Author",
      role: getAuthorProperty(authorData, "role", "authorRole"),
      bio: getAuthorProperty(authorData, "bio", "authorBio"),
      image: normalizeStrapiMedia(authorData.authorImage || authorData.image),
      linkedin: getAuthorProperty(authorData, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty(authorData, "twitter", "authorTwitter"),
      email: getAuthorProperty(authorData, "email", "authorEmail"),
    };
  }

  // Fallback if some author fields are directly on the event (older Strapi versions or specific schema)
  if (!normalizedAuthor && isAuthorData(event)) {
    normalizedAuthor = {
      name: getAuthorProperty(event, "name", "authorName") || "SCALE Author",
      role: getAuthorProperty(event, "role", "authorRole"),
      bio: getAuthorProperty(event, "bio", "authorBio"),
      image: normalizeStrapiMedia(event.authorImage || event.image),
      linkedin: getAuthorProperty(event, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty(event, "twitter", "authorTwitter"),
      email: getAuthorProperty(event, "email", "authorEmail"),
    };
  }

  return {
    id: event.id,
    documentId: event.documentId,
    title: event.title,
    slug: event.slug,
    eventType: event.eventType,
    eventDate: event.eventDate,
    excerpt: event.excerpt || null,
    content: event.content || null,
    featuredImage: normalizeStrapiMedia(event.featuredImage),
    thumbnailImage: normalizeStrapiMedia(event.thumbnailImage),
    author: normalizedAuthor,
    featured: event.featured || false,
    publishedDate: event.publishedDate,
    viewCount: event.viewCount || 0,
    categories: Array.isArray(event.categories) ? event.categories : [],
    tags: Array.isArray(event.tags) ? event.tags : [],
    relatedEvents: Array.isArray(event.relatedEvents)
      ? event.relatedEvents.map((e) => normalizeEvent(e)) // Recursive normalization (shallow if Strapi limits depth)
      : [],
    metaTitle: event.metaTitle || null,
    metaDescription: event.metaDescription || null,
    eventLocation: event.eventLocation || null,
    eventTime: event.eventTime || null,
    registrationStatus: event.registrationStatus || null,
    eventHighlights: event.eventHighlights || null,
  };
};

/**
 * Builds the Strapi query string for fetching events.
 */
export const buildEventsQuery = ({
  page = 1,
  pageSize = 9,
  eventType,
  slug,
  excludeId,
}: {
  page?: number;
  pageSize?: number;
  eventType?: EEventType | string;
  slug?: string;
  excludeId?: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    populate: {
      featuredImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      thumbnailImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      authorImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      categories: { fields: ["name", "slug", "color"] },
      tags: { fields: ["name", "slug"] },
      // Minimal populate for related events to avoid deep nesting issues
      relatedEvents: {
        populate: {
          thumbnailImage: { fields: ["url"] },
          categories: { fields: ["name", "color"] },
        },
      },
    },
    sort: ["eventDate:desc", "publishedAt:desc"],
    pagination: {
      page,
      pageSize,
    },
    filters: {},
  };

  // Filter by slug (for detail page)
  if (slug) {
    query.filters.slug = { $eq: slug };
  }

  // Filter by event type
  if (eventType && eventType !== EEventType.ALL) {
    query.filters.eventType = { $eq: eventType };
  }

  // Exclude specific ID (for "Related Events" or "Recent Events")
  if (excludeId) {
    query.filters.id = { $ne: excludeId };
  }

  return qs.stringify(query, { encodeValuesOnly: true });
};
