/**
 * Event Hero Component
 *
 * Full-width hero section for event details.
 */

"use client";

import Image from "next/image";
import { INormalizedEvent } from "@/types/events.types";
import { CategoryBadge } from "./CategoryBadge.component";
import { formatDate } from "@/utils/date.utils";
import { User, Eye } from "phosphor-react";

interface EventHeroProps {
  event: INormalizedEvent;
}

export function EventHero({ event }: EventHeroProps) {
  const imageUrl = event.featuredImage?.url || event.thumbnailImage?.url || "/images/placeholder-event.jpg";

  return (
    <div className="relative w-full h-[60vh] min-h-[400px] bg-gray-900 overflow-hidden flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pb-16">
        <div className="max-w-4xl">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {event.categories?.map((cat) => (
              <CategoryBadge key={cat.id} name={cat.name} color={cat.color} />
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{formatDate(event.eventDate)}</span>
            </div>
            
            {event.author && (
              <div className="flex items-center gap-2">
                <User weight="bold" />
                <span>By {event.author}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Eye weight="bold" />
              <span>{event.viewCount} Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

