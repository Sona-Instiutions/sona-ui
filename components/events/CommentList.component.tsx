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
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className='group'>
      <div className='flex gap-4 mb-4'>
        {/* Avatar Placeholder */}
        <div className='flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500'>
          <User weight='bold' />
        </div>

        <div className='flex-grow'>
          {/* Header */}
          <div className='flex items-center gap-2 mb-1'>
            <span className='font-bold text-gray-900'>{comment.authorName}</span>
            <span className='text-xs text-gray-500'>• {formatRelativeTime(comment.createdAt)}</span>
          </div>

          {/* Content */}
          <div className='text-gray-700 leading-relaxed mb-2 whitespace-pre-line'>{comment.content}</div>
        </div>
      </div>
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
    <div className='space-y-8'>
      <h3 className='text-2xl font-bold text-gray-900'>Comments ({comments?.length || 0})</h3>

      <div className='space-y-8'>
        {comments?.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
        {(!comments || comments.length === 0) && (
          <p className='text-gray-500 italic'>No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <div className='pt-8 border-t border-gray-100'>
        <CommentForm eventDocumentId={eventDocumentId} />
      </div>
    </div>
  );
}
