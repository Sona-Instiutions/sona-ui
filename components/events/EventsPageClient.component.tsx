/**
 * Events Page Client Wrapper
 *
 * Handles client-side state for events listing (filtering, search, pagination).
 * Integrates with TanStack Query.
 */

"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { INormalizedEvent, EEventType, IEventsResponse } from "@/types/events.types";
import { useEventsInfiniteQuery } from "@/services/client/events.client";
import { EventsGrid } from "./EventsGrid.component";
import { EventFilters } from "./EventFilters.component";
import { EventSearch } from "./EventSearch.component";
import { EVENTS_PAGE_SIZE } from "@/constants/events.constants";

interface EventsPageClientProps {
  initialData: { data: INormalizedEvent[]; meta: IEventsResponse["meta"] };
}

function EventsPageContent({ initialData }: EventsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read state from URL or default
  const typeParam = searchParams.get("type");
  const searchParam = searchParams.get("search");

  const currentTab = (Object.values(EEventType).includes(typeParam as EEventType)
    ? typeParam
    : EEventType.ALL) as EEventType;
  
  const currentSearch = searchParam || "";

  // Query Hook
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useEventsInfiniteQuery({
    pageSize: EVENTS_PAGE_SIZE,
    eventType: currentTab,
    search: currentSearch,
    initialData: (currentTab === EEventType.ALL && !currentSearch) ? initialData : undefined,
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
    // Reset search on tab change? Usually keep it.
    params.set("page", "1"); // Reset pagination (implicit by query key change)
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
        <EventFilters currentTab={currentTab} onTabChange={handleTabChange} />
        <EventSearch initialValue={currentSearch} onSearch={handleSearch} />
      </div>

      {/* Grid */}
      <EventsGrid
        events={allEvents}
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
    <Suspense fallback={<div className="h-96" />}>
      <EventsPageContent {...props} />
    </Suspense>
  );
}

