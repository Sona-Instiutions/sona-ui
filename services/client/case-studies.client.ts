/**
 * Case Studies Client Service
 *
 * Client-side data access for Case Studies using TanStack Query.
 */

import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCaseStudies, getCaseStudyBySlug } from "../server/case-studies.server";
import { INormalizedCaseStudy, ICaseStudiesResponse, ICaseStudySuggestionsResponse } from "@/types/case-study.types";
import { IEventComment, ICommentSubmission, ECommentStatus } from "@/types/comments.types";
import axiosInstance from "@/lib/axios.config";

// Query Keys
export const caseStudyKeys = {
  all: ["case-studies"] as const,
  lists: () => [...caseStudyKeys.all, "list"] as const,
  list: (filters: string) => [...caseStudyKeys.lists(), { filters }] as const,
  details: () => [...caseStudyKeys.all, "detail"] as const,
  detail: (slug: string) => [...caseStudyKeys.details(), slug] as const,
  suggestions: (q: string) => [...caseStudyKeys.all, "suggestions", q] as const,
  comments: (id: string) => [...caseStudyKeys.detail(id), "comments"] as const,
};

/**
 * Infinite query for case studies list (with pagination/infinite scroll)
 */
export function useCaseStudiesInfiniteQuery({
  pageSize = 10,
  search,
  initialData,
}: {
  pageSize?: number;
  search?: string;
  initialData?: { data: INormalizedCaseStudy[]; meta: ICaseStudiesResponse["meta"] };
}) {
  return useInfiniteQuery({
    queryKey: caseStudyKeys.list(JSON.stringify({ pageSize, search })),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCaseStudies({
        page: pageParam as number,
        pageSize,
        search,
      });
      return response;
    },
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });
}

/**
 * Single case study query
 */
export function useCaseStudyQuery(slug: string, initialData?: INormalizedCaseStudy) {
  return useQuery({
    queryKey: caseStudyKeys.detail(slug),
    queryFn: () => getCaseStudyBySlug(slug),
    enabled: !!slug,
    initialData,
  });
}

/**
 * Fetch search suggestions for case studies.
 */
export async function fetchCaseStudySuggestions(q: string, limit?: number) {
  const { data } = await axiosInstance.get<ICaseStudySuggestionsResponse>(
    `/api/case-studies?filters[title][$containsi]=${encodeURIComponent(q)}&pagination[limit]=${
      limit || 5
    }&fields[0]=title&fields[1]=slug&fields[2]=publishedDate&populate[0]=thumbnail`
  );
  return data.data;
}

/**
 * Hook for case study search suggestions.
 */
export function useCaseStudySearchSuggestionsQuery(
  q: string,
  options: {
    enabled?: boolean;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: caseStudyKeys.suggestions(q),
    queryFn: () => fetchCaseStudySuggestions(q, options.limit),
    enabled: options.enabled && q.length >= 3,
    staleTime: 30000,
  });
}

/**
 * Mutation to increment view count
 */
export function useIncrementCaseStudyViewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (documentId: string) => {
      return axiosInstance.post(`/api/case-studies/${documentId}/view`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.all });
    },
  });
}

/**
 * Fetch approved comments for a case study.
 * Comments are stored as repeatable components within the case study document.
 */
export async function fetchCaseStudyComments(documentId: string): Promise<IEventComment[]> {
  const { data } = await axiosInstance.get<{
    data: INormalizedCaseStudy & { comments?: Array<Record<string, unknown>> };
  }>(`/api/case-studies/${documentId}?populate[comments][populate]=*`);

  const comments = (data.data.comments as Array<Record<string, unknown>>) || [];

  return comments
    .filter((c) => c.status === "approved")
    .map((c) => ({
      id: c.id as number,
      documentId: (c.id as number).toString(),
      authorName: c.authorName as string,
      authorEmail: c.authorEmail as string,
      content: c.content as string,
      status: c.status as ECommentStatus,
      createdAt: (c.publishedAt as string) || new Date().toISOString(),
      updatedAt: (c.publishedAt as string) || new Date().toISOString(),
      publishedAt: (c.publishedAt as string) || new Date().toISOString(),
      likes: c.likes as number,
      replies: [],
    }));
}

/**
 * Hook to fetch comments.
 */
export function useCaseStudyComments(documentId?: string) {
  return useQuery({
    queryKey: caseStudyKeys.comments(documentId!),
    queryFn: () => fetchCaseStudyComments(documentId!),
    enabled: !!documentId,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to submit a new comment.
 */
export function useSubmitCaseStudyComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Omit<ICommentSubmission, "event"> & { caseStudyDocumentId: string }) => {
      const { caseStudyDocumentId, ...commentData } = payload;
      return axiosInstance.post(`/api/case-studies/${caseStudyDocumentId}/comments`, {
        data: commentData,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.comments(variables.caseStudyDocumentId) });
      queryClient.invalidateQueries({ queryKey: caseStudyKeys.detail(variables.caseStudyDocumentId) });
    },
  });
}
