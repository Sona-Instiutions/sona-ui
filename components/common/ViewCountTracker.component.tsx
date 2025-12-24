/**
 * View Count Tracker
 *
 * Client component to increment content view count on mount.
 */

"use client";

import { useEffect, useRef } from "react";
import { useIncrementEventViewCount } from "@/services/client/events.client";
import { useIncrementBlogViewCount } from "@/services/client/blogs.client";
import { useIncrementCaseStudyViewMutation } from "@/services/client/case-studies.client";
import { TContentType } from "@/types/common.types";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG } from "@/constants/common.constants";

interface ViewCountTrackerProps {
  type: TContentType;
  documentId: string;
}

export function ViewCountTracker({ type, documentId }: ViewCountTrackerProps) {
  const { mutate: incrementEventView } = useIncrementEventViewCount();
  const { mutate: incrementBlogView } = useIncrementBlogViewCount();
  const { mutate: incrementCaseStudyView } = useIncrementCaseStudyViewMutation();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (documentId && !hasIncremented.current) {
      if (type === CONTENT_TYPE_EVENT) {
        incrementEventView(documentId);
      } else if (type === CONTENT_TYPE_BLOG) {
        incrementBlogView(documentId);
      } else {
        incrementCaseStudyView(documentId);
      }
      hasIncremented.current = true;
    }
  }, [documentId, type, incrementEventView, incrementBlogView, incrementCaseStudyView]);

  return null; // Renderless component
}
