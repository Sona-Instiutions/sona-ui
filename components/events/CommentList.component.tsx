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
import { User, ArrowBendDownRight, ThumbsUp } from "phosphor-react";
import { IEventComment } from "@/types/comments.types";
import { cn } from "@/lib/utils";

interface CommentItemProps {
  comment: IEventComment;
  isReply?: boolean;
  eventDocumentId: string;
}

function CommentItem({ comment, isReply = false, eventDocumentId }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [likes, setLikes] = useState(comment.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
    // TODO: Call API to persist like
  };

  return (
    <div className={cn("group", isReply && "ml-12 mt-6")}>
      <div className='flex gap-4 mb-4'>
        {/* Avatar Placeholder */}
        <div className='shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 border border-blue-100'>
          <User weight='bold' />
        </div>

        <div className='grow'>
          {/* Header */}
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-bold text-gray-900'>{comment.authorName}</span>
            <span className='text-xs text-gray-500'>• {formatRelativeTime(comment.createdAt)}</span>
          </div>

          {/* Content */}
          <div className='text-gray-700 leading-relaxed mb-3 whitespace-pre-line text-sm md:text-base'>
            {comment.content}
          </div>

          {/* Actions */}
          <div className='flex items-center gap-4 text-xs font-bold uppercase tracking-wider'>
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                hasLiked ? "text-blue-600" : "text-gray-400 hover:text-blue-600"
              )}
            >
              <ThumbsUp weight={hasLiked ? "fill" : "bold"} size={14} />
              <span>{likes > 0 ? likes : "Like"}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className='flex items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors'
            >
              <ArrowBendDownRight weight='bold' size={14} />
              <span>Reply</span>
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className='mt-4 animate-in fade-in slide-in-from-top-2 duration-300'>
              <CommentForm
                eventDocumentId={eventDocumentId}
                parentComment={comment.documentId}
                onSuccess={() => setShowReplyForm(false)}
                onCancel={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='border-l-2 border-gray-100'>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} isReply eventDocumentId={eventDocumentId} />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentListProps {
  eventDocumentId: string;
}

export function CommentList({ eventDocumentId }: CommentListProps) {
  const { data: comments, isLoading } = useEventComments(eventDocumentId);

  if (isLoading) {
    return <div className='py-8 text-center text-gray-500'>Loading comments...</div>;
  }

  return (
    <div className='space-y-12'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-extrabold text-gray-900 relative inline-block'>
          Comments ({comments?.length || 0})
          <span className='absolute -bottom-1 left-0 w-12 h-1 bg-blue-600 rounded-full'></span>
        </h3>
      </div>

      <div className='space-y-8'>
        {comments?.map((comment) => (
          <CommentItem key={comment.id} comment={comment} eventDocumentId={eventDocumentId} />
        ))}
        {(!comments || comments.length === 0) && (
          <div className='bg-gray-50 p-8 rounded-2xl text-center border border-dashed border-gray-200'>
            <p className='text-gray-500 italic'>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      <div className='pt-12 border-t border-gray-100'>
        <CommentForm eventDocumentId={eventDocumentId} />
      </div>
    </div>
  );
}
