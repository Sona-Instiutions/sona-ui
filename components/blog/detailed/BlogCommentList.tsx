"use client";

import React, { useState } from "react";
import { useBlogComments } from "@/services/client/blogComments.client";
import { BlogCommentForm } from "./BlogCommentForm";
import { IEventComment } from "@/types/comments.types";
import { User, ArrowBendDownRight } from "phosphor-react";
import { formatRelativeTime } from "@/utils/date.utils";

interface BlogCommentItemProps {
  comment: IEventComment;
  blogDocumentId: string;
  depth?: number;
}

function BlogCommentItem({
  comment,
  blogDocumentId,
  depth = 0,
}: BlogCommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const maxDepth = 1;

  const replies = comment.replies ?? []; // ✅ ADD THIS

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User />
        </div>

        <div className="flex-1">
          <div className="flex gap-2 items-center mb-1">
            <span className="font-semibold">{comment.authorName}</span>
            <span className="text-xs text-gray-500">
              • {formatRelativeTime(comment.createdAt)}
            </span>
          </div>

          <p className="text-gray-700 mb-2">{comment.content}</p>

          {depth < maxDepth && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-sm text-blue-600 flex items-center gap-1"
            >
              <ArrowBendDownRight /> Reply
            </button>
          )}

          {isReplying && (
            <div className="mt-4">
              <BlogCommentForm
                blogDocumentId={blogDocumentId}
                parentCommentId={comment.id}
                onSuccess={() => setIsReplying(false)}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}
        </div>
      </div>

      {replies.length > 0 && (
        <div className="ml-14 border-l pl-6 space-y-6">
          {replies.map((reply) => (
            <BlogCommentItem
              key={reply.id}
              comment={reply}
              blogDocumentId={blogDocumentId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export function BlogCommentList({
  blogDocumentId,
}: {
  blogDocumentId: string;
}) {
  const { data: comments, isLoading } = useBlogComments(blogDocumentId);

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading comments...</p>;
  }

  return (
    <div className="space-y-8 mt-12">
      <h3 className="text-2xl font-bold">
        Comments ({comments?.length || 0})
      </h3>

      <div className="space-y-8">
        {comments?.map((comment) => (
          <BlogCommentItem
            key={comment.id}
            comment={comment}
            blogDocumentId={blogDocumentId}
          />
        ))}

        {(!comments || comments.length === 0) && (
          <p className="italic text-gray-500">No comments yet.</p>
        )}
      </div>

      <div className="pt-8 border-t">
        <BlogCommentForm blogDocumentId={blogDocumentId} />
      </div>
    </div>
  );
}
