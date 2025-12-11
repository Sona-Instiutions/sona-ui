import { axiosInstance } from "@/lib/axios.config";
import { useMutation } from "@tanstack/react-query";

/* ----------------------------------------------------
   1️⃣ Type for Contact Submission Form
---------------------------------------------------- */
export interface ContactSubmissionPayload {
  Category: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  PhoneNumber: string;
  Subject: string;
  Message: string;
}

/* ----------------------------------------------------
   2️⃣ Submit Function (STRONGLY TYPED)
---------------------------------------------------- */
export const submitContactForm = async (
  payload: ContactSubmissionPayload
) => {
  const response = await axiosInstance.post("/api/contact-submissions", {
    data: {
      Category: payload.Category,
      FirstName: payload.FirstName,
      LastName: payload.LastName,
      EmailAddress: payload.EmailAddress,
      PhoneNumber: payload.PhoneNumber,
      Subject: payload.Subject,
      Message: payload.Message ?? "",
      submittedAt: new Date().toISOString(), // Strapi datetime field
    },
  });

  return response.data;
};

/* ----------------------------------------------------
   3️⃣ TanStack React Query Mutation Hook
---------------------------------------------------- */
export const useSubmitContactFormMutation = () =>
  useMutation({
    mutationFn: (payload: ContactSubmissionPayload) =>
      submitContactForm(payload),
  });
