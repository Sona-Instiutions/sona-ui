// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

/**
 * Generic HTTP wrapper
 * Used by all client services
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}
