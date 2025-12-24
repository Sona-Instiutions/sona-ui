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
import { buildMediaUrl } from "@/utils/common.utils";

interface EventCardProps {
  event: INormalizedEvent;
}

export function EventCard({ event }: EventCardProps) {
  const primaryCategory = event.categories?.[0];
  const imageUrl = buildMediaUrl(event.thumbnailImage) || buildMediaUrl(event.featuredImage) || "/images/event-1.webp";

  return (
    <div className='flex flex-col h-full min-h-[580px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group'>
      {/* Image Container */}
      <Link href={`/events/${event.slug}`} className='relative h-64 w-full overflow-hidden block'>
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          unoptimized
        />
      </Link>

      {/* Content */}
      <div className='flex flex-col flex-grow p-8'>
        {/* Meta Header */}
        <div className='flex items-center gap-3 mb-3'>
          {primaryCategory && <CategoryBadge name={primaryCategory.name} color={primaryCategory.color} />}
          <span className='text-xs font-medium text-gray-400'>{formatDate(event.eventDate)}</span>
        </div>

        {/* Title */}
        <Link href={`/events/${event.slug}`} className='block mb-3'>
          <h3 className='text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2'>
            {event.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className='text-sm text-gray-600 mb-6 line-clamp-3'>
          {event.excerpt ||
            (Array.isArray(event.content) ? truncateText(event.content[0]?.children?.[0]?.text, 120) : "")}
        </p>

        {/* Footer */}
        <div className='mt-auto pt-2'>
          <Link
            href={`/events/${event.slug}`}
            className='inline-flex items-center justify-center w-full px-6 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-md hover:bg-blue-800 transition-colors'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
