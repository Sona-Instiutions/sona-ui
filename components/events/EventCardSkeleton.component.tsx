/**
 * Event Card Skeleton
 *
 * Loading state for event cards.
 */

import React from "react";

export function EventCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between mb-4">
          <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="h-6 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-6 w-2/3 bg-gray-200 rounded mb-4 animate-pulse" />

        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
        <div className="h-4 w-4/5 bg-gray-200 rounded mb-4 animate-pulse" />

        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

