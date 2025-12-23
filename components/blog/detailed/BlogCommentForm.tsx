"use client";

import React, { useState } from "react";
import { Spinner } from "phosphor-react";
import { useSubmitBlogComment } from "@/services/client/blogComments.client";

interface BlogCommentFormProps {
  blogDocumentId: string;
  parentCommentId?: number | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BlogCommentForm({
  blogDocumentId,
  parentCommentId,
  onSuccess,
  onCancel,
}: BlogCommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending, isError } = useSubmitBlogComment();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.authorName || !formData.authorEmail || !formData.content) {
      return;
    }

    mutate(
      {
        blogDocumentId,
        parentCommentId,
        authorName: formData.authorName,
        authorEmail: formData.authorEmail,
        content: formData.content,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setFormData({
            authorName: "",
            authorEmail: "",
            content: "",
          });
          onSuccess?.();
        },
      }
    );
  }

  if (isSubmitted) {
    return (
      <div className="rounded-xl border bg-green-50 p-4 text-center text-green-800">
        <p className="font-semibold">Thank you for your comment!</p>
        <p className="text-sm mt-1">
          Your comment will appear after moderation.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-3 text-sm underline"
        >
          Add another comment
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-gray-50 p-6"
    >
      <h4 className="font-semibold">
        {parentCommentId ? "Leave a Reply" : "Leave a Comment"}
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="authorName"
          placeholder="Your Name"
          required
          value={formData.authorName}
          onChange={handleChange}
          className="input"
        />

        <input
          name="authorEmail"
          type="email"
          placeholder="Your Email"
          required
          value={formData.authorEmail}
          onChange={handleChange}
          className="input"
        />
      </div>

      <textarea
        name="content"
        placeholder="Your Comment"
        rows={4}
        required
        value={formData.content}
        onChange={handleChange}
        className="input"
      />

      {isError && (
        <p className="text-sm text-red-600">
          Failed to submit comment. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-600"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex items-center gap-2 flex items-center gap-2 px-6 py-2 cursor-pointer bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending && <Spinner className="animate-spin" />}
          {isPending ? "Submitting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
