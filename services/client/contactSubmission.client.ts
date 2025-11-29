import { axiosInstance } from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";

/**
 * Submit contact form to Strapi
 */
export const submitContactForm = async (payload: any) => {
  const response = await axiosInstance.post("/api/contact-submissions", {
    data: {
      Category: payload.Category,
      FirstName: payload.FirstName,
      LastName: payload.LastName,
      EmailAddress: payload.EmailAddress,
      PhoneNumber: payload.PhoneNumber,
      Subject: payload.Subject,
      Message: payload.Message?.toString() || "",
      submittedAt: new Date().toISOString(), // matches your Strapi field
    },
  });

  return response.data;
};

/**
 * TanStack Mutation Hook
 */
export const useSubmitContactFormMutation = () =>
  useMutation({
    mutationFn: submitContactForm,
  });
