/**
 * Event Utilities
 *
 * Helpers for normalizing event data and building API queries.
 */

import qs from "qs";
import { IEvent, INormalizedEvent, EEventType, IEventAuthor } from "@/types/events.types";
import { normalizeStrapiMedia, isAuthorData, getAuthorProperty } from "@/utils/common.utils";

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
      name: getAuthorProperty<string>(authorData, "name", "authorName") || "SCALE Author",
      role: getAuthorProperty<string | undefined>(authorData, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(authorData, "bio", "authorBio"),
      image: normalizeStrapiMedia(authorData.authorImage || authorData.image),
      linkedin: getAuthorProperty<string | undefined>(authorData, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(authorData, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(authorData, "email", "authorEmail"),
    };
  }

  // Fallback if some author fields are directly on the event (older Strapi versions or specific schema)
  if (!normalizedAuthor && isAuthorData(event)) {
    normalizedAuthor = {
      name: getAuthorProperty<string>(event, "name", "authorName") || "SCALE Author",
      role: getAuthorProperty<string | undefined>(event, "role", "authorRole"),
      bio: getAuthorProperty<string | undefined>(event, "bio", "authorBio"),
      image: normalizeStrapiMedia(event.authorImage || event.image),
      linkedin: getAuthorProperty<string | undefined>(event, "linkedin", "authorLinkedin"),
      twitter: getAuthorProperty<string | undefined>(event, "twitter", "authorTwitter"),
      email: getAuthorProperty<string | undefined>(event, "email", "authorEmail"),
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
    showComments: event.showComments || false,
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
