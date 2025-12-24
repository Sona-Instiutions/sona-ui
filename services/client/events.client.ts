/**
 * Events Client Service
 *
 * Client-side hooks for Events (TanStack Query).
 */

import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.config";
import {
  IEventsResponse,
  INormalizedEvent,
  EEventType,
} from "@/types/events.types";
import { buildEventsQuery, normalizeEvent } from "@/utils/events.utils";
import { EVENT_QUERY_KEYS } from "@/constants/events.constants";

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
 * Hook to increment view count (fire-and-forget).
 */
export function useIncrementEventViewCount() {
  return useMutation({
    mutationFn: async (eventId: number) => {
      return axiosInstance.post(`/api/events/${eventId}/increment-view`);
    },
  });
}

