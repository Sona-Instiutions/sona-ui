/**
 * Events Server Service
 *
 * Server-side data access for Events.
 * Used by Server Components (ISR) and Server Actions.
 */

import axiosInstance from "@/lib/axios.config";
import {
  IEventsResponse,
  INormalizedEvent,
  EEventType,
  IEventCategoriesResponse,
  IEventTagsResponse,
  IEventCategory,
  IEventTag,
} from "@/types/events.types";
import { buildEventsQuery, normalizeEvent } from "@/utils/events.utils";
import qs from "qs";

/**
 * Fetch a paginated list of events.
 */
export async function getEvents(params: {
  page?: number;
  pageSize?: number;
  eventType?: EEventType | string;
}): Promise<{ data: INormalizedEvent[]; meta: IEventsResponse["meta"] }> {
  try {
    const query = buildEventsQuery(params);
    const { data } = await axiosInstance.get<IEventsResponse>(`/api/events?${query}`);

    return {
      data: data.data.map(normalizeEvent),
      meta: data.meta,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: params.pageSize || 10, pageCount: 0, total: 0 },
      },
    };
  }
}

/**
 * Fetch a single event by slug (with full population).
 */
export async function getEventBySlug(slug: string): Promise<INormalizedEvent | null> {
  if (!slug) return null;

  try {
    const query = buildEventsQuery({ slug });
    const { data } = await axiosInstance.get<IEventsResponse>(`/api/events?${query}`);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return normalizeEvent(data.data[0]);
  } catch (error) {
    console.error(`Error fetching event by slug [${slug}]:`, error);
    return null;
  }
}

/**
 * Fetch recent events (excluding a specific ID).
 */
export async function getRecentEvents(params: {
  limit?: number;
  excludeId?: number;
}): Promise<INormalizedEvent[]> {
  try {
    const query = buildEventsQuery({
      page: 1,
      pageSize: params.limit || 5,
      excludeId: params.excludeId,
    });
    const { data } = await axiosInstance.get<IEventsResponse>(`/api/events?${query}`);
    return data.data.map(normalizeEvent);
  } catch (error) {
    console.error("Error fetching recent events:", error);
    return [];
  }
}

/**
 * Fetch all event categories.
 */
export async function getEventCategories(): Promise<IEventCategory[]> {
  try {
    const query = qs.stringify({
      sort: ["order:asc", "name:asc"],
      pagination: { pageSize: 100 },
    });
    const { data } = await axiosInstance.get<IEventCategoriesResponse>(
      `/api/event-categories?${query}`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching event categories:", error);
    return [];
  }
}

/**
 * Fetch all event tags.
 */
export async function getEventTags(): Promise<IEventTag[]> {
  try {
    const query = qs.stringify({
      sort: ["name:asc"],
      pagination: { pageSize: 100 },
    });
    const { data } = await axiosInstance.get<IEventTagsResponse>(`/api/event-tags?${query}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching event tags:", error);
    return [];
  }
}

