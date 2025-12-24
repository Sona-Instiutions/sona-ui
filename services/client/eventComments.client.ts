/**
 * Event Comments Client Service
 *
 * Client-side hooks for Event Comments.
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios.config";
import qs from "qs";
import {
  IEventCommentsResponse,
  IEventCommentResponse,
  ICommentSubmission,
  IEventComment,
} from "@/types/comments.types";
import { EVENT_QUERY_KEYS } from "@/constants/events.constants";

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
    mutationFn: async (payload: Omit<ICommentSubmission, "event"> & { eventDocumentId: string }) => {
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

