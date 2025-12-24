/**
 * Events Constants
 *
 * Shared constants for the Events module.
 */

import { EEventType } from "@/types/events.types";

export const EVENTS_PAGE_SIZE = 9; // Grid layout: 3x3
export const RECENT_EVENTS_LIMIT = 5;
export const RELATED_EVENTS_LIMIT = 3;

// Search constants
export const MIN_SEARCH_CHARS = 3;
export const MAX_SUGGESTIONS = 8;
export const SEARCH_DEBOUNCE_MS = 300;

/** Mapping for filter tabs */
export const EVENT_TAB_OPTIONS = [
  { label: "All Events", value: EEventType.ALL },
  { label: "Student Events", value: EEventType.STUDENT },
  { label: "Industry Events", value: EEventType.INDUSTRY },
];

/** Query keys for TanStack Query */
export const EVENT_QUERY_KEYS = {
  LIST: "events-list",
  DETAIL: "event-detail",
  COMMENTS: "event-comments",
  CATEGORIES: "event-categories",
  TAGS: "event-tags",
  SUGGESTIONS: "event-suggestions",
};

/** Default revalidation time for ISR (in seconds) */
export const EVENTS_REVALIDATE_TIME = 600; // 10 minutes

