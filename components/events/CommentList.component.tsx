/**
 * Comment List Component
 *
 * Displays a list of approved comments with nested replies.
 */

"use client";

import React, { useState } from "react";
import { useEventComments } from "@/services/client/eventComments.client";
import { CommentForm } from "./CommentForm.component";
import { formatRelativeTime } from "@/utils/date.utils";
import { User, ArrowBendDownRight } from "phosphor-react";
import { IEventComment } from "@/types/comments.types";

interface CommentItemProps {
  comment: IEventComment;
  eventId: number;
  depth?: number;
}

function CommentItem({ comment, eventId, depth = 0 }: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const maxDepth = 1; // Limit nesting to 1 level (Root + 1 Reply level)

  return (
    <div className="group">
      <div className="flex gap-4 mb-4">
        {/* Avatar Placeholder */}
        <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <User weight="bold" />
        </div>

        <div className="flex-grow">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">{comment.authorName}</span>
            <span className="text-xs text-gray-500">• {formatRelativeTime(comment.createdAt)}</span>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed mb-2 whitespace-pre-line">
            {comment.content}
          </div>

          {/* Actions */}
          {depth < maxDepth && (
            <div>
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1"
              >
                <ArrowBendDownRight /> Reply
              </button>
            </div>
          )}

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4">
              <CommentForm
                eventId={eventId}
                parentCommentId={comment.id}
                onSuccess={() => setIsReplying(false)}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-14 mb-8 space-y-6 border-l-2 border-gray-100 ml-5">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} eventId={eventId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentListProps {
  eventId: number;
}

export function CommentList({ eventId }: CommentListProps) {
  const { data: comments, isLoading } = useEventComments(eventId);

  if (isLoading) {
    return <div className="py-8 text-center text-gray-500">Loading comments...</div>;
  }

  // Comments are already sorted by backend
  // But we need to ensure replies are attached if backend didn't nest them structure-wise.
  // Strapi relation population usually nests them if `populate[replies]` is used.
  // However, `useEventComments` fetches top-level comments with populated replies.
  // So `comments` array contains top-level comments, each with `replies` array.

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">
        Comments ({comments?.length || 0})
      </h3>

      <div className="space-y-8">
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} eventId={eventId} />
        ))}
        {(!comments || comments.length === 0) && (
          <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <CommentForm eventId={eventId} />
      </div>
    </div>
  );
}

