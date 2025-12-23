/**
 * View Count Tracker
 *
 * Client component to increment event view count on mount.
 */

"use client";

import { useEffect, useRef } from "react";
import { useIncrementEventViewCount } from "@/services/client/events.client";

interface ViewCountTrackerProps {
  eventId: number;
}

export function ViewCountTracker({ eventId }: ViewCountTrackerProps) {
  const { mutate } = useIncrementEventViewCount();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (eventId && !hasIncremented.current) {
      mutate(eventId);
      hasIncremented.current = true;
    }
  }, [eventId, mutate]);

  return null; // Renderless component
}

