/**
 * Event Utilities
 *
 * Helpers for normalizing event data and building API queries.
 */

import qs from "qs";
import {
  IEvent,
  INormalizedEvent,
  EEventType,
} from "@/types/events.types";
import { IStrapiMedia } from "@/types/common.types";

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
    author: event.author || null,
    publishedDate: event.publishedDate,
    viewCount: event.viewCount || 0,
    categories: Array.isArray(event.categories) ? event.categories : [],
    tags: Array.isArray(event.tags) ? event.tags : [],
    relatedEvents: Array.isArray(event.relatedEvents)
      ? event.relatedEvents.map((e) => normalizeEvent(e)) // Recursive normalization (shallow if Strapi limits depth)
      : [],
    metaTitle: event.metaTitle || null,
    metaDescription: event.metaDescription || null,
  };
};

/**
 * Builds the Strapi query string for fetching events.
 */
export const buildEventsQuery = ({
  page = 1,
  pageSize = 9,
  eventType,
  search,
  slug,
  excludeId,
}: {
  page?: number;
  pageSize?: number;
  eventType?: EEventType | string;
  search?: string;
  slug?: string;
  excludeId?: number;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {
    populate: {
      featuredImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
      thumbnailImage: { fields: ["url", "alternativeText", "width", "height", "mime"] },
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

  // Search filter (title or excerpt)
  if (search) {
    query.filters.$or = [
      { title: { $containsi: search } },
      { excerpt: { $containsi: search } },
      // Note: searching within blocks content is harder in Strapi JSON filter, skipping for MVP
    ];
  }

  // Exclude specific ID (for "Related Events" or "Recent Events")
  if (excludeId) {
    query.filters.id = { $ne: excludeId };
  }

  return qs.stringify(query, { encodeValuesOnly: true });
};

