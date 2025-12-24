/**
 * Events Client Service
 *
 * Client-side hooks for Events (TanStack Query).
 */

import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.config";
import {
  IEventsResponse,
  INormalizedEvent,
  EEventType,
  IEventSuggestionsResponse,
} from "@/types/events.types";
import { ICommentSubmission, IEventComment } from "@/types/comments.types";
import { buildEventsQuery, normalizeEvent } from "@/utils/events.utils";
import { EVENT_QUERY_KEYS } from "@/constants/events.constants";

/* =========================================
   EVENTS LIST & SEARCH
   ========================================= */

/**
 * Client-side fetcher for events (used by TanStack Query).
 */
export async function fetchEventsClient(params: {
  pageParam?: number;
  pageSize?: number;
  eventType?: EEventType | string;
}) {
  const query = buildEventsQuery({
    page: params.pageParam || 1,
    pageSize: params.pageSize,
    eventType: params.eventType,
  });

  const { data } = await axiosInstance.get<IEventsResponse>(`/api/events?${query}`);

  return {
    data: data.data.map(normalizeEvent),
    meta: data.meta,
  };
}

/**
 * Hook for infinite scrolling events list.
 */
export function useEventsInfiniteQuery(params: {
  pageSize?: number;
  eventType?: EEventType | string;
  initialData?: { data: INormalizedEvent[]; meta: IEventsResponse["meta"] }; // Optional initial data from SSR
}) {
  return useInfiniteQuery({
    queryKey: [EVENT_QUERY_KEYS.LIST, params.eventType],
    queryFn: ({ pageParam }) =>
      fetchEventsClient({
        pageParam: pageParam as number,
        pageSize: params.pageSize,
        eventType: params.eventType,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    // If initialData is provided (from ISR), use it for the first page
    initialData: params.initialData
      ? {
          pages: [params.initialData],
          pageParams: [1],
        }
      : undefined,
  });
}

/**
 * Fetch search suggestions for events.
 */
export async function fetchEventSuggestions(q: string, limit?: number) {
  const { data } = await axiosInstance.get<IEventSuggestionsResponse>(
    `/api/events/suggestions?q=${encodeURIComponent(q)}${limit ? `&limit=${limit}` : ""}`
  );
  return data.data;
}

/**
 * Hook for event search suggestions.
 */
export function useEventSearchSuggestionsQuery(
  q: string,
  options: {
    enabled?: boolean;
    limit?: number;
  } = {}
) {
  return useQuery({
    queryKey: [EVENT_QUERY_KEYS.SUGGESTIONS, q],
    queryFn: () => fetchEventSuggestions(q, options.limit),
    enabled: options.enabled && q.length >= 3,
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Hook to increment view count (fire-and-forget).
 */
export function useIncrementEventViewCount() {
  return useMutation({
    mutationFn: async (eventDocumentId: string) => {
      return axiosInstance.post(`/api/events/${eventDocumentId}/increment-view`);
    },
  });
}

/* =========================================
   EVENT COMMENTS
   ========================================= */

/**
 * Fetch approved comments for an event.
 * Uses the custom event comments endpoint.
 */
export async function fetchEventComments(eventDocumentId: string): Promise<IEventComment[]> {
  const { data } = await axiosInstance.get<{ data: IEventComment[] }>(
    `/api/events/${eventDocumentId}/comments`
  );
  return data.data;
}

/**
 * Hook to fetch comments.
 */
export function useEventComments(eventDocumentId?: string) {
  return useQuery({
    queryKey: [EVENT_QUERY_KEYS.COMMENTS, eventDocumentId],
    queryFn: () => fetchEventComments(eventDocumentId!),
    enabled: !!eventDocumentId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to submit a new comment.
 */
export function useSubmitEventComment() {
  return useMutation({
    mutationFn: async (
      payload: Omit<ICommentSubmission, "event"> & { eventDocumentId: string }
    ) => {
      const { eventDocumentId, ...commentData } = payload;
      const { data } = await axiosInstance.post<{ data: IEventComment }>(
        `/api/events/${eventDocumentId}/comments`,
        {
          data: commentData,
        }
      );
      return data.data;
    },
    onSuccess: () => {
      // Invalidation or toast handled by consumer
    },
  });
}
