/**
 * Text Utilities
 *
 * Shared text manipulation helpers.
 */

/**
 * Truncates text to a specified length and appends ellipsis.
 */
export function truncateText(text: string | null | undefined, maxLength: number = 100): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates reading time estimate (approx 200 words per minute).
 */
export function getReadingTime(text: string | null | undefined): string {
  if (!text) return "1 min read";

  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}

