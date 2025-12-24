/**
 * View Count Tracker
 *
 * Client component to increment content view count on mount.
 */

"use client";

import { useEffect, useRef } from "react";
import { useIncrementEventViewCount } from "@/services/client/events.client";
import { useIncrementBlogViewCount } from "@/services/client/blogs.client";

interface ViewCountTrackerProps {
  type: "event" | "blog";
  documentId: string;
}

export function ViewCountTracker({ type, documentId }: ViewCountTrackerProps) {
  const { mutate: incrementEventView } = useIncrementEventViewCount();
  const { mutate: incrementBlogView } = useIncrementBlogViewCount();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (documentId && !hasIncremented.current) {
      if (type === "event") {
        incrementEventView(documentId);
      } else {
        incrementBlogView(documentId);
      }
      hasIncremented.current = true;
    }
  }, [documentId, type, incrementEventView, incrementBlogView]);

  return null; // Renderless component
}

