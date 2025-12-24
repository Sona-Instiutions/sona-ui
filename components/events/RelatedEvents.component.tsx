/**
 * Related Events Component
 *
 * Displays a grid of related events.
 */

import React from "react";
import { INormalizedEvent } from "@/types/events.types";
import { ContentCard } from "@/components/common/ContentCard.component";
import { formatDate } from "@/utils/date.utils";

interface RelatedEventsProps {
  events: INormalizedEvent[];
}

export function RelatedEvents({ events }: RelatedEventsProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="py-12 border-t border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="h-full">
            <ContentCard
              title={event.title}
              href={`/events/${event.slug}`}
              image={event.thumbnailImage || event.featuredImage}
              date={formatDate(event.eventDate)}
              category={event.categories?.[0]}
              buttonText="View Event"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
