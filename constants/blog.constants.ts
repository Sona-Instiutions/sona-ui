/**
 * Blog Constants
 *
 * Shared constants for the Blogs module.
 */

export const BLOG_PAGE_SIZE = 9; // Grid layout: 3x3
export const RECENT_BLOGS_LIMIT = 5;
export const RELATED_BLOGS_LIMIT = 3;

// Search constants
export const MIN_SEARCH_CHARS = 3;
export const MAX_SUGGESTIONS = 8;
export const SEARCH_DEBOUNCE_MS = 300;

/** Query keys for TanStack Query */
export const BLOG_QUERY_KEYS = {
  LIST: "blogs-list",
  DETAIL: "blog-detail",
  COMMENTS: "blog-comments",
  CATEGORIES: "blog-categories",
  TAGS: "blog-tags",
  SUGGESTIONS: "blog-suggestions",
};

/** Default revalidation time for ISR (in seconds) */
export const BLOGS_REVALIDATE_TIME = 600; // 10 minutes


