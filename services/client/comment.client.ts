import { fetchAPI } from "@/lib/fetcher";
import type { Comment } from "@/types/blog.types";

/* =========================
   TYPES
========================= */
type StrapiListResponse<T> = {
  data: T[];
};

type StrapiSingleResponse<T> = {
  data: T;
};

export type CommentPayload = {
  blogId: number;
  author: string;
  email?: string;
  content: string;
  parent?: number;
  isAuthor?: boolean;
};

/* =========================
   COMMENT SERVICE
========================= */
export const commentService = {
  /* GET COMMENTS */
  async getComments(blogId: number): Promise<Comment[]> {
    const res = await fetchAPI<StrapiListResponse<Comment>>(
      `/api/comments?filters[blog][id][$eq]=${blogId}&populate=*`
    );

    return res.data;
  },

  /* POST COMMENT / REPLY */
  async postComment(payload: CommentPayload): Promise<Comment> {
    const res = await fetchAPI<StrapiSingleResponse<Comment>>(
      "/api/comments",
      {
        method: "POST",
        body: JSON.stringify({
          data: {
            blog: payload.blogId,
            name: payload.author,
            email: payload.email,
            message: payload.content,
            parent: payload.parent,
            isAuthor: payload.isAuthor ?? false,
          },
        }),
      }
    );

    return res.data;
  },
};
