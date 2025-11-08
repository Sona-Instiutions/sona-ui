/**
 * Common Types
 *
 * Shared type definitions used across multiple modules.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

/** Strapi media object structure from file uploads */
export interface IStrapiMedia {
  /** Unique numeric identifier */
  id: number;

  /** File name with extension */
  name: string;

  /** Alternative text for accessibility */
  alternativeText?: string;

  /** Image caption */
  caption?: string;

  /** File width in pixels (for images) */
  width?: number;

  /** File height in pixels (for images) */
  height?: number;

  /** MIME type of the file */
  mime: string;

  /** File size in bytes */
  size: number;

  /** URL path to the file on Strapi server */
  url: string;

  /** Full URL to the file including base URL */
  formats?: Record<string, unknown>;
}
