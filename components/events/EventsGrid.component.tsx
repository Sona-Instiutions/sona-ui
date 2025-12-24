/**
 * Events Grid Component
 *
 * Responsive grid layout for displaying events.
 * Handles loading states, empty states, and pagination trigger.
 */

import React from "react";
import { INormalizedEvent } from "@/types/events.types";
import { EventCard } from "./EventCard.component";
import { EventCardSkeleton } from "./EventCardSkeleton.component";
import { SmileySadIcon } from "@phosphor-icons/react";

interface EventsGridProps {
  events: INormalizedEvent[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

export function EventsGrid({ events, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage }: EventsGridProps) {
  // Initial loading state (no data yet)
  if (isLoading && events.length === 0) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='flex flex-col h-full'>
            <EventCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!isLoading && events.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400'>
          <SmileySadIcon weight='bold' size={32} />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>No events found</h3>
        <p className='text-gray-500 max-w-sm'>
          We couldn&apos;t find any events matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16'>
        {events.map((event) => (
          <div key={event.id} className='flex flex-col h-full'>
            <EventCard event={event} />
          </div>
        ))}
        {/* Skeletons for next page loading */}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={`loading-${i}`} className='h-full'>
              <EventCardSkeleton />
            </div>
          ))}
      </div>

      {hasNextPage && (
        <div className='flex justify-center pt-4 pb-12'>
          <button
            onClick={() => fetchNextPage?.()}
            disabled={isFetchingNextPage}
            className='px-10 py-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm'
          >
            {isFetchingNextPage ? "Loading..." : "Load More Events"}
          </button>
        </div>
      )}
    </div>
  );
}
