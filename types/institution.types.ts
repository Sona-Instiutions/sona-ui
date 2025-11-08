/**
 * Institution Types
 *
 * Type definitions for institution content type fetched from Strapi.
 * Follows ADR 005 naming conventions: interfaces with I prefix, type aliases with T prefix.
 */

/** Institution entity from backend matching Strapi response structure */
export interface IInstitution {
  /** Unique numeric identifier */
  id: number;

  /** URL-friendly identifier derived from name */
  slug: string;

  /** Display name of the institution */
  name: string;

  /** ISO 8601 timestamp of creation */
  createdAt: string;

  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/** Type alias for institution slug with validation */
export type TInstitutionSlug = string & { readonly __brand: "InstitutionSlug" };

/** API response envelope for single institution query */
export interface IInstitutionResponse {
  data: IInstitution;
  meta: Record<string, unknown>;
}

/** API response envelope for paginated institution queries */
export interface IInstitutionsResponse {
  data: IInstitution[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** Standard API error response for consistent error handling */
export interface IApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}

