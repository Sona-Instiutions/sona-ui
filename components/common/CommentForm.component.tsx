/**
 * Comment Form Component
 *
 * Form for submitting comments on content (Events/Blogs).
 */

"use client";

import React, { useState } from "react";
import { SpinnerIcon } from "@phosphor-icons/react";

interface CommentFormProps {
  onSubmit: (data: { authorName: string; authorEmail: string; content: string }) => void;
  isPending: boolean;
  isError: boolean;
  onCancel?: () => void;
  isReply?: boolean;
}

export function CommentForm({ onSubmit, isPending, isError, onCancel, isReply = false }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorName || !formData.authorEmail || !formData.content) return;

    onSubmit(formData);
    // Note: Parent should handle success state, but for this dumb component we might want to know if it succeeded.
    // However, since we don't have that callback, we'll rely on parent re-rendering or we can assume if not error it submitted?
    // Better: let the parent handle the "Submitted" view?
    // For now, let's keep it simple. If isPending goes true then false and !isError, we can assume success?
    // Actually, usually reset form on success.
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // If we need to show success message inside form, we need a way to know it succeeded.
  // For now, we'll let the parent handle the success view replacement if needed, 
  // or pass a `isSuccess` prop.

  return (
    <form onSubmit={handleSubmit} className='space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100'>
      <h4 className='font-semibold text-gray-900'>{isReply ? "Leave a Reply" : "Leave a Comment"}</h4>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label htmlFor='authorName' className='block text-sm font-medium text-gray-700 mb-1'>
            Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            id='authorName'
            name='authorName'
            required
            maxLength={100}
            value={formData.authorName}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
            placeholder='John Doe'
          />
        </div>
        <div>
          <label htmlFor='authorEmail' className='block text-sm font-medium text-gray-700 mb-1'>
            Email <span className='text-red-500'>*</span>{" "}
            <span className='text-xs font-normal text-gray-500'>(Not published)</span>
          </label>
          <input
            type='email'
            id='authorEmail'
            name='authorEmail'
            required
            value={formData.authorEmail}
            onChange={handleChange}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
            placeholder='john@example.com'
          />
        </div>
      </div>

      <div>
        <label htmlFor='content' className='block text-sm font-medium text-gray-700 mb-1'>
          Comment <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='content'
          name='content'
          required
          maxLength={2000}
          rows={4}
          value={formData.content}
          onChange={handleChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y'
          placeholder='Share your thoughts...'
        />
        <div className='text-right text-xs text-gray-400 mt-1'>{formData.content.length}/2000</div>
      </div>

      {isError && (
        <div className='text-red-600 text-sm bg-red-50 p-2 rounded'>Failed to submit comment. Please try again.</div>
      )}

      <div className='flex justify-end gap-3'>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors'
          >
            Cancel
          </button>
        )}
        <button
          type='submit'
          disabled={isPending}
          className='flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isPending && <SpinnerIcon weight='bold' className='animate-spin' />}
          {isPending ? "Submitting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}

