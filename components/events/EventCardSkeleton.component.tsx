/**
 * Event Card Skeleton
 *
 * Loading state for event cards.
 */

import React from "react";

export function EventCardSkeleton() {
  return (
    <div className="flex flex-col h-full min-h-[580px] bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-64 w-full bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex gap-3 mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="h-7 w-full bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="h-7 w-2/3 bg-gray-200 rounded mb-6 animate-pulse" />

        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-4/5 bg-gray-200 rounded mb-8 animate-pulse" />

        <div className="mt-auto">
          <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

