/**
 * Blogs Client Service
 *
 * Client-side hooks for Blogs (TanStack Query).
 */

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.config";
import {
  IBlogsResponse,
  INormalizedBlog,
  IBlogSuggestionsResponse,
} from "@/types/blog.types";
import { IEventComment, ICommentSubmission } from "@/types/comments.types";
import { buildBlogsQuery, normalizeBlog } from "@/utils/blog.utils";
import { BLOG_QUERY_KEYS } from "@/constants/blog.constants";

/* =========================================
   BLOGS LIST & SEARCH
   ========================================= */

/**
 * Client-side fetcher for blogs (used by TanStack Query).
 */
export async function fetchBlogsClient(params: {
  pageParam?: number;
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
}) {
  const query = buildBlogsQuery({
    page: params.pageParam || 1,
    pageSize: params.pageSize,
    categorySlug: params.categorySlug,
    tagSlug: params.tagSlug,
    search: params.search,
  });

  const { data } = await axiosInstance.get<IBlogsResponse>(`/api/blogs?${query}`);

  return {
    data: data.data.map(normalizeBlog),
    meta: data.meta,
  };
}

/**
 * Hook for infinite scrolling blogs list.
 */
export function useBlogsInfiniteQuery(params: {
  pageSize?: number;
  categorySlug?: string;
  tagSlug?: string;
  search?: string;
  initialData?: { data: INormalizedBlog[]; meta: IBlogsResponse["meta"] };
}) {
  return useInfiniteQuery({
    queryKey: [BLOG_QUERY_KEYS.LIST, params.categorySlug, params.tagSlug, params.search],
    queryFn: ({ pageParam }) =>
      fetchBlogsClient({
        pageParam: pageParam as number,
        pageSize: params.pageSize,
        categorySlug: params.categorySlug,
        tagSlug: params.tagSlug,
        search: params.search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialData: params.initialData
      ? {
          pages: [params.initialData],
          pageParams: [1],
        }
      : undefined,
  });
}

/**
 * Fetch search suggestions for blogs.
 */
export async function fetchBlogSuggestions(q: string, limit?: number) {
  const { data } = await axiosInstance.get<IBlogSuggestionsResponse>(
    `/api/blogs/suggestions?q=${encodeURIComponent(q)}${limit ? `&limit=${limit}` : ""}`
  );
  return data.data;
}

/**
 * Hook for blog search suggestions.
 */
export function useBlogSearchSuggestionsQuery(
  q: string,
  options: {
    enabled?: boolean;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: [BLOG_QUERY_KEYS.SUGGESTIONS, q],
    queryFn: () => fetchBlogSuggestions(q, options.limit),
    enabled: options.enabled && q.length >= 3,
    staleTime: 30000,
  });
}

/**
 * Hook to increment view count (fire-and-forget).
 */
export function useIncrementBlogViewCount() {
  return useMutation({
    mutationFn: async (blogDocumentId: string) => {
      return axiosInstance.post(`/api/blogs/${blogDocumentId}/increment-view`);
    },
  });
}

/* =========================================
   BLOG COMMENTS
   ========================================= */

/**
 * Fetch approved comments for a blog.
 */
export async function fetchBlogComments(blogDocumentId: string): Promise<IEventComment[]> {
  const { data } = await axiosInstance.get<{ data: IEventComment[] }>(
    `/api/blogs/${blogDocumentId}/comments`
  );
  return data.data;
}

/**
 * Hook to fetch comments.
 */
export function useBlogComments(blogDocumentId?: string) {
  return useQuery({
    queryKey: [BLOG_QUERY_KEYS.COMMENTS, blogDocumentId],
    queryFn: () => fetchBlogComments(blogDocumentId!),
    enabled: !!blogDocumentId,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to submit a new comment.
 */
export function useSubmitBlogComment() {
  return useMutation({
    mutationFn: async (
      payload: Omit<ICommentSubmission, "event"> & { blogDocumentId: string }
    ) => {
      const { blogDocumentId, ...commentData } = payload;
      const { data } = await axiosInstance.post<{ data: IEventComment }>(
        `/api/blogs/${blogDocumentId}/comments`,
        {
          data: commentData,
        }
      );
      return data.data;
    },
  });
}


