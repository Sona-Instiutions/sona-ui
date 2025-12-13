/**
 * Event Card Component
 *
 * Displays a summary of an event in a card layout.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INormalizedEvent } from "@/types/events.types";
import { CategoryBadge } from "./CategoryBadge.component";
import { formatDate } from "@/utils/date.utils";
import { truncateText } from "@/utils/text.utils";
import { ArrowRight } from "lucide-react"; // Or Phosphor if I switch, but Lucide is in package.json

interface EventCardProps {
  event: INormalizedEvent;
}

export function EventCard({ event }: EventCardProps) {
  const primaryCategory = event.categories?.[0];
  const imageUrl = event.thumbnailImage?.url || event.featuredImage?.url || "/images/placeholder-event.jpg"; // Fallback if needed

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group">
      {/* Image Container */}
      <Link href={`/events/${event.slug}`} className="relative h-48 w-full overflow-hidden block">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Date Badge Overlay (Optional - Design has it inline, but sometimes overlay is nice. Sticking to design inline) */}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Meta Header */}
        <div className="flex items-center justify-between mb-3">
          {primaryCategory && (
            <CategoryBadge name={primaryCategory.name} color={primaryCategory.color} />
          )}
          <span className="text-xs font-medium text-gray-500">
            {formatDate(event.eventDate)}
          </span>
        </div>

        {/* Title */}
        <Link href={`/events/${event.slug}`} className="block mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
          {event.excerpt || truncateText(event.content?.[0]?.children?.[0]?.text, 120)}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={`/events/${event.slug}`}
            className="text-sm font-semibold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

