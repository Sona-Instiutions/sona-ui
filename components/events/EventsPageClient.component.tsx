/**
 * Events Page Client Wrapper
 *
 * Handles client-side state for events listing (filtering, pagination).
 * Integrates with TanStack Query.
 */

"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { INormalizedEvent, EEventType, IEventsResponse } from "@/types/events.types";
import { useEventsInfiniteQuery } from "@/services/client/events.client";
import { ContentGrid } from "@/components/common/ContentGrid.component";
import { EventFilters } from "./EventFilters.component";
import { EVENTS_PAGE_SIZE } from "@/constants/events.constants";

interface EventsPageClientProps {
  initialData: { data: INormalizedEvent[]; meta: IEventsResponse["meta"] };
}

function EventsPageContent({ initialData }: EventsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read state from URL or default
  const typeParam = searchParams.get("type");

  const currentTab = (
    Object.values(EEventType).includes(typeParam as EEventType) ? typeParam : EEventType.ALL
  ) as EEventType;

  // Query Hook
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useEventsInfiniteQuery({
    pageSize: EVENTS_PAGE_SIZE,
    eventType: currentTab,
    initialData: currentTab === EEventType.ALL ? initialData : undefined,
  });

  // Flatten pages into single array
  const allEvents = data?.pages.flatMap((page) => page.data) || [];

  // Handlers
  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === EEventType.ALL) {
      params.delete("type");
    } else {
      params.set("type", tab);
    }

    params.set("page", "1"); // Reset pagination (implicit by query key change)
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className='container mx-auto px-8 py-16'>
      {/* Filters Toolbar */}
      <div className='flex flex-col items-center mb-16'>
        <EventFilters currentTab={currentTab} onTabChange={handleTabChange} />
      </div>

      {/* Grid */}
      <ContentGrid
        type='event'
        items={allEvents}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export function EventsPageClient(props: EventsPageClientProps) {
  return (
    <Suspense fallback={<div className='h-96' />}>
      <EventsPageContent {...props} />
    </Suspense>
  );
}
