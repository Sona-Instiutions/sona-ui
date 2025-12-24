/**
 * Comment Form Component
 *
 * Form for submitting comments on events.
 */

"use client";

import React, { useState } from "react";
import { useSubmitEventComment } from "@/services/client/eventComments.client";
import { Spinner } from "phosphor-react";

interface CommentFormProps {
  eventDocumentId: string;
  onSuccess?: () => void;
  onCancel?: () => void; // For reply forms
}

export function CommentForm({ eventDocumentId, onSuccess, onCancel }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { mutate, isPending, isError } = useSubmitEventComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorName || !formData.authorEmail || !formData.content) return;

    mutate(
      {
        eventDocumentId,
        ...formData,
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          setFormData({ authorName: "", authorEmail: "", content: "" });
          if (onSuccess) onSuccess();
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <div className='bg-green-50 text-green-800 p-4 rounded-lg border border-green-100 text-center'>
        <p className='font-semibold'>Thank you for your comment!</p>
        <p className='text-sm'>It has been submitted for moderation and will appear shortly.</p>
        <button onClick={() => setIsSubmitted(false)} className='mt-2 text-sm underline hover:text-green-900'>
          Post another comment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100'>
      <h4 className='font-semibold text-gray-900'>Leave a Comment</h4>

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
          {isPending && <Spinner className='animate-spin' />}
          {isPending ? "Submitting..." : "Post Comment"}
        </button>
      </div>
    </form>
  );
}
