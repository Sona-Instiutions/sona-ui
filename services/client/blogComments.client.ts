"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/fetcher";
import { IEventComment } from "@/types/comments.types";

/* =========================
   TYPES
========================= */
export interface SubmitBlogCommentInput {
  blogDocumentId: string;
  parentCommentId?: number | null;
  authorName: string;
  authorEmail: string;
  content: string;
}

/* =========================
   GET BLOG COMMENTS
========================= */
export function useBlogComments(blogDocumentId: string) {
  return useQuery<IEventComment[]>({
    queryKey: ["blog-comments", blogDocumentId],
    queryFn: async () => {
      const res = await fetchAPI<{
        data: {
          comments: IEventComment[];
        };
      }>(`/api/blogs/${blogDocumentId}?populate=*`);

      return res.data.comments ?? [];
    },
    enabled: !!blogDocumentId,
  });
}

/* =========================
   SUBMIT BLOG COMMENT
========================= */
export function useSubmitBlogComment() {
  return useMutation({
    mutationFn: async ({
      blogDocumentId,
      parentCommentId,
      authorName,
      authorEmail,
      content,
    }: SubmitBlogCommentInput) => {
      return fetchAPI(`/api/blogs/${blogDocumentId}`, {
        method: "PUT",
        body: JSON.stringify({
          data: {
            comments: [
              {
                authorName,
                authorEmail,
                content,
                parentCommentId, // ✅ now allowed
                statuss: "pending",
              },
            ],
          },
        }),
      });
    },
  });
}
