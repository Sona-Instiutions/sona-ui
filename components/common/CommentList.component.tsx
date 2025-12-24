/**
 * Comment List Component
 *
 * Displays a list of comments with nested replies.
 */

"use client";

import React, { useState } from "react";
import { UserIcon, ArrowBendDownRightIcon, ThumbsUpIcon } from "@phosphor-icons/react";
import { IEventComment } from "@/types/comments.types";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/date.utils";
import { CommentForm } from "./CommentForm.component";

interface CommentListProps {
  comments: IEventComment[];
  onReply: (data: { authorName: string; authorEmail: string; content: string }, parentId: string) => void;
  isReplyPending: boolean;
}

interface CommentItemProps {
  comment: IEventComment;
  isReply?: boolean;
  onReply: (data: { authorName: string; authorEmail: string; content: string }, parentId: string) => void;
  isReplyPending: boolean;
}

function CommentItem({ comment, isReply = false, onReply, isReplyPending }: CommentItemProps) {
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

  const handleReplySubmit = (data: { authorName: string; authorEmail: string; content: string }) => {
    onReply(data, comment.documentId);
    // We assume success for UI flow, or parent can trigger close.
    // Ideally parent provides a promise.
    // For now, we'll close on submit if pending state is handled.
    // Wait, we don't know when it finishes here easily without more complex state.
    // We'll rely on the parent or just close it?
    // Actually CommentForm doesn't auto-close.
    // Let's keep it open until success?
    // If isReplyPending is true, we disable.
    // If we want to close form, we need a callback.
    // Let's just close it for now after submission triggers.
    // Refinement: Pass a promise-returning function?
  };

  return (
    <div className={cn("group", isReply && "ml-12 mt-6")}>
      <div className='flex gap-4 mb-4'>
        {/* Avatar Placeholder */}
        <div className='shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 border border-blue-100'>
          <UserIcon weight='bold' />
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
              <ThumbsUpIcon weight={hasLiked ? "fill" : "bold"} size={14} />
              <span>{likes > 0 ? likes : "Like"}</span>
            </button>

            {!isReply && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className='flex items-center gap-1.5 text-gray-400 hover:text-blue-600 transition-colors'
              >
                <ArrowBendDownRightIcon weight='bold' size={14} />
                <span>Reply</span>
              </button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className='mt-4 animate-in fade-in slide-in-from-top-2 duration-300'>
              <CommentForm
                onSubmit={handleReplySubmit}
                isPending={isReplyPending}
                isError={false} // Todo: handle error state specifically for this reply
                onCancel={() => setShowReplyForm(false)}
                isReply
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className='border-l-2 border-gray-100'>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply
              onReply={onReply}
              isReplyPending={isReplyPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentList({ comments, onReply, isReplyPending }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className='bg-gray-50 p-8 rounded-2xl text-center border border-dashed border-gray-200'>
        <p className='text-gray-500 italic'>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onReply={onReply}
          isReplyPending={isReplyPending}
        />
      ))}
    </div>
  );
}

