/**
 * View Count Tracker
 *
 * Client component to increment event view count on mount.
 */

"use client";

import { useEffect, useRef } from "react";
import { useIncrementEventViewCount } from "@/services/client/events.client";

interface ViewCountTrackerProps {
  eventDocumentId: string;
}

export function ViewCountTracker({ eventDocumentId }: ViewCountTrackerProps) {
  const { mutate } = useIncrementEventViewCount();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (eventDocumentId && !hasIncremented.current) {
      mutate(eventDocumentId);
      hasIncremented.current = true;
    }
  }, [eventDocumentId, mutate]);

  return null; // Renderless component
}

