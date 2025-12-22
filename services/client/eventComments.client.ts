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
 * Retrieves top-level comments with approved replies populated.
 */
export async function fetchEventComments(eventId: number): Promise<IEventComment[]> {
  const query = qs.stringify(
    {
      filters: {
        event: { id: { $eq: eventId } },
        status: { $eq: "approved" },
        parentComment: { $null: true }, // Top-level only
      },
      populate: {
        replies: {
          filters: { status: { $eq: "approved" } }, // Only approved replies
          sort: ["createdAt:asc"],
        },
      },
      sort: ["createdAt:desc"], // Newest top-level comments first
      pagination: {
        pageSize: 100, // Limit to 100 comments for now
      },
    },
    { encodeValuesOnly: true }
  );

  const { data } = await axiosInstance.get<IEventCommentsResponse>(
    `/api/event-comments?${query}`
  );
  return data.data;
}

/**
 * Hook to fetch comments.
 */
export function useEventComments(eventId?: number) {
  return useQuery({
    queryKey: [EVENT_QUERY_KEYS.COMMENTS, eventId],
    queryFn: () => fetchEventComments(eventId!),
    enabled: !!eventId,
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to submit a new comment.
 */
export function useSubmitEventComment() {
  return useMutation({
    mutationFn: async (payload: ICommentSubmission) => {
      const { data } = await axiosInstance.post<IEventCommentResponse>(
        "/api/event-comments",
        {
          data: {
            ...payload,
            status: "pending", // Force pending status
          },
        }
      );
      return data.data;
    },
    onSuccess: () => {
      // We don't invalidate immediately because the comment is pending.
      // But we could trigger a toast notification in the UI.
    },
  });
}

