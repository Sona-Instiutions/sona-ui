/**
 * Event Hero Component
 *
 * Full-width hero section for event details.
 * Refactored to use generic ContentHero for DRY.
 */

"use client";

import React from "react";
import { INormalizedEvent } from "@/types/events.types";
import { ContentHero } from "../common/ContentHero.component";

interface EventHeroProps {
  event: INormalizedEvent;
}

export function EventHero({ event }: EventHeroProps) {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: event.title }];

  return (
    <ContentHero
      type='event'
      title={event.title}
      image={event.featuredImage || event.thumbnailImage}
      breadcrumbs={breadcrumbItems}
      categories={event.categories}
      date={event.eventDate}
      author={event.author}
      viewCount={event.viewCount}
    />
  );
}
