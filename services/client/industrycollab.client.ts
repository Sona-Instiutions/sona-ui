import axios from "@/lib/axios.config";
import type { IIndustryCollaborationFormData } from "@/types/industry-collaboration.types";

/**
 * Submit Industry Collaboration Lead to Strapi
 */
export async function submitIndustryCollaboration(
  payload: IIndustryCollaborationFormData
) {
  const { data } = await axios.post(
    "/api/industry-collaboration-leads",
    {
      data: payload,
    }
  );

  return data;
}
