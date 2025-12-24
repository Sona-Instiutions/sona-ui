/**
 * Comment Section Component
 *
 * Smart component that handles fetching and submitting comments for Events and Blogs.
 */

"use client";

import React from "react";
import { useBlogComments, useSubmitBlogComment } from "@/services/client/blogs.client";
import { useEventComments, useSubmitEventComment } from "@/services/client/events.client";
import { CommentList } from "./CommentList.component";
import { CommentForm } from "./CommentForm.component";

interface CommentSectionProps {
  type: "event" | "blog";
  documentId: string;
}

export function CommentSection({ type, documentId }: CommentSectionProps) {
  // Conditionally use hooks based on type
  // Note: We must call all hooks unconditionally, but can disable them
  const eventCommentsQuery = useEventComments(type === "event" ? documentId : undefined);
  const blogCommentsQuery = useBlogComments(type === "blog" ? documentId : undefined);

  const submitEventMutation = useSubmitEventComment();
  const submitBlogMutation = useSubmitBlogComment();

  // Derived state
  const comments = type === "event" ? eventCommentsQuery.data : blogCommentsQuery.data;
  const isLoading = type === "event" ? eventCommentsQuery.isLoading : blogCommentsQuery.isLoading;
  
  const mutation = type === "event" ? submitEventMutation : submitBlogMutation;
  const isPending = mutation.isPending;
  const isError = mutation.isError;

  const handleSubmit = (data: { authorName: string; authorEmail: string; content: string }) => {
    mutation.mutate(
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [type === "event" ? "eventDocumentId" : "blogDocumentId"]: documentId,
        ...data,
      } as any, // Type assertion needed due to conditional key
      {
        onSuccess: () => {
          // Ideally invalidate query
          if (type === "event") eventCommentsQuery.refetch();
          else blogCommentsQuery.refetch();
        },
      }
    );
  };

  const handleReply = (data: { authorName: string; authorEmail: string; content: string }, parentId: string) => {
    mutation.mutate(
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [type === "event" ? "eventDocumentId" : "blogDocumentId"]: documentId,
        parentComment: parentId, // Use consistent field name? API expects 'parentComment' or 'parentCommentId'?
        // The merged services both expect 'parentComment' or 'parentCommentId' in the payload interface?
        // Let's check ICommentSubmission. It has 'parentComment'.
        ...data,
      } as any,
      {
        onSuccess: () => {
          if (type === "event") eventCommentsQuery.refetch();
          else blogCommentsQuery.refetch();
        },
      }
    );
  };

  if (isLoading) {
    return <div className='py-8 text-center text-gray-500'>Loading comments...</div>;
  }

  // Success message state is handled by Form/List if needed, or simple toast.
  // For now, we rely on the list updating (which might not happen immediately for pending comments).
  // Pending comments show in list? Usually not until approved.
  // We should show a "Thank you for submitting" message.
  // But CommentForm is dumb. We can wrap it?
  // Let's implement simple success feedback in CommentForm if we had time, but adhering to "dumb" logic.
  
  return (
    <div className='space-y-12'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl font-extrabold text-gray-900 relative inline-block'>
          Comments ({comments?.length || 0})
          <span className='absolute -bottom-1 left-0 w-12 h-1 bg-blue-600 rounded-full'></span>
        </h3>
      </div>

      <CommentList 
        comments={comments || []} 
        onReply={handleReply} 
        isReplyPending={isPending} 
      />

      <div className='pt-12 border-t border-gray-100'>
        <CommentForm 
          onSubmit={handleSubmit} 
          isPending={isPending} 
          isError={isError} 
        />
        {mutation.isSuccess && (
          <p className="mt-4 text-green-600 font-medium text-center">
            Thank you! Your comment has been submitted for moderation.
          </p>
        )}
      </div>
    </div>
  );
}

