/**
 * Comment Section Component
 *
 * Smart component that handles fetching and submitting comments for Events and Blogs.
 */

"use client";

import { useBlogComments, useSubmitBlogComment } from "@/services/client/blogs.client";
import { useEventComments, useSubmitEventComment } from "@/services/client/events.client";
import { useCaseStudyComments, useSubmitCaseStudyComment } from "@/services/client/case-studies.client";
import { CommentList } from "./CommentList.component";
import { CommentForm } from "./CommentForm.component";
import { ICommentSubmission } from "@/types/comments.types";
import { TContentType } from "@/types/common.types";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG, CONTENT_TYPE_CASE_STUDY } from "@/constants/common.constants";

interface CommentSectionProps {
  type: TContentType;
  documentId: string;
}

type EventCommentPayload = Omit<ICommentSubmission, "event"> & { eventDocumentId: string };
type BlogCommentPayload = Omit<ICommentSubmission, "event"> & { blogDocumentId: string };
type CaseStudyCommentPayload = Omit<ICommentSubmission, "event"> & { caseStudyDocumentId: string };

export function CommentSection({ type, documentId }: CommentSectionProps) {
  // Conditionally use hooks based on type
  const eventCommentsQuery = useEventComments(type === CONTENT_TYPE_EVENT ? documentId : undefined);
  const blogCommentsQuery = useBlogComments(type === CONTENT_TYPE_BLOG ? documentId : undefined);
  const caseStudyCommentsQuery = useCaseStudyComments(type === CONTENT_TYPE_CASE_STUDY ? documentId : undefined);

  const submitEventMutation = useSubmitEventComment();
  const submitBlogMutation = useSubmitBlogComment();
  const submitCaseStudyMutation = useSubmitCaseStudyComment();

  // Derived state
  let comments = caseStudyCommentsQuery.data;
  if (type === CONTENT_TYPE_EVENT) {
    comments = eventCommentsQuery.data;
  } else if (type === CONTENT_TYPE_BLOG) {
    comments = blogCommentsQuery.data;
  }

  let isLoading = caseStudyCommentsQuery.isLoading;
  if (type === CONTENT_TYPE_EVENT) {
    isLoading = eventCommentsQuery.isLoading;
  } else if (type === CONTENT_TYPE_BLOG) {
    isLoading = blogCommentsQuery.isLoading;
  }

  let mutation: typeof submitEventMutation | typeof submitBlogMutation | typeof submitCaseStudyMutation;
  if (type === CONTENT_TYPE_EVENT) {
    mutation = submitEventMutation;
  } else if (type === CONTENT_TYPE_BLOG) {
    mutation = submitBlogMutation;
  } else {
    mutation = submitCaseStudyMutation;
  }

  const isPending = mutation.isPending;
  const isError = mutation.isError;

  const handleSubmit = (data: { authorName: string; authorEmail: string; content: string }) => {
    if (type === CONTENT_TYPE_EVENT) {
      const payload: EventCommentPayload = {
        eventDocumentId: documentId,
        ...data,
      };
      submitEventMutation.mutate(payload, {
        onSuccess: () => {
          eventCommentsQuery.refetch();
        },
      });
    } else if (type === CONTENT_TYPE_BLOG) {
      const payload: BlogCommentPayload = {
        blogDocumentId: documentId,
        ...data,
      };
      submitBlogMutation.mutate(payload, {
        onSuccess: () => {
          blogCommentsQuery.refetch();
        },
      });
    } else {
      const payload: CaseStudyCommentPayload = {
        caseStudyDocumentId: documentId,
        ...data,
      };
      submitCaseStudyMutation.mutate(payload, {
        onSuccess: () => {
          caseStudyCommentsQuery.refetch();
        },
      });
    }
  };

  const handleReply = (data: { authorName: string; authorEmail: string; content: string }, parentId: string) => {
    if (type === CONTENT_TYPE_EVENT) {
      const payload: EventCommentPayload = {
        eventDocumentId: documentId,
        parentComment: parentId,
        ...data,
      };
      submitEventMutation.mutate(payload, {
        onSuccess: () => {
          eventCommentsQuery.refetch();
        },
      });
    } else if (type === CONTENT_TYPE_BLOG) {
      const payload: BlogCommentPayload = {
        blogDocumentId: documentId,
        parentComment: parentId,
        ...data,
      };
      submitBlogMutation.mutate(payload, {
        onSuccess: () => {
          blogCommentsQuery.refetch();
        },
      });
    } else {
      const payload: CaseStudyCommentPayload = {
        caseStudyDocumentId: documentId,
        parentComment: parentId,
        ...data,
      };
      submitCaseStudyMutation.mutate(payload, {
        onSuccess: () => {
          caseStudyCommentsQuery.refetch();
        },
      });
    }
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

      <CommentList comments={comments || []} onReply={handleReply} isReplyPending={isPending} />

      <div className='pt-12 border-t border-gray-100'>
        <CommentForm onSubmit={handleSubmit} isPending={isPending} isError={isError} />
        {mutation.isSuccess && (
          <p className='mt-4 text-green-600 font-medium text-center'>
            Thank you! Your comment has been submitted for moderation.
          </p>
        )}
      </div>
    </div>
  );
}
