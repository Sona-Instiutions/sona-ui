import { axiosInstance } from "@/lib/axios.config";
import { IInstitution, IInstitutionResponse, IApiError } from "@/types/institution.types";

/**
 * Fetch institution by slug from Strapi (server-only, safe for SSR)
 */
export async function getInstitutionBySlug(slug: string): Promise<IInstitution> {
  if (!slug || typeof slug !== "string") {
    throw {
      status: 400,
      message: "Invalid slug provided",
      details: { slug },
    } as IApiError;
  }

  try {
    const response = await axiosInstance.get<IInstitutionResponse>(
      `/api/institutions?filters[slug][$eq]=${encodeURIComponent(slug)}`
    );

    // Strapi returns array even for single item filter
    if (!response.data.data || (Array.isArray(response.data.data) && response.data.data.length === 0)) {
      throw {
        status: 404,
        message: "Institution not found",
        details: { slug },
      } as IApiError;
    }

    // Handle both single object and array responses
    const institution = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;

    return institution;
  } catch (error) {
    // Re-throw normalized errors from axios config
    throw error;
  }
}
