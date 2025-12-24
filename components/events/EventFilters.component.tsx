/**
 * Event Filters Component
 *
 * Tab navigation for filtering events by type.
 */

import React from "react";
import { EVENT_TAB_OPTIONS } from "@/constants/events.constants";
import { EEventType } from "@/types/events.types";
import { cn } from "@/lib/utils";

interface EventFiltersProps {
  currentTab: EEventType | string;
  onTabChange: (tab: EEventType | string) => void;
  className?: string;
}

export function EventFilters({ currentTab, onTabChange, className }: EventFiltersProps) {
  return (
    <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
      {EVENT_TAB_OPTIONS.map((option) => {
        const isActive = currentTab === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onTabChange(option.value)}
            className={cn(
              "px-8 py-2.5 text-sm font-semibold transition-all duration-200 rounded-md border",
              isActive
                ? "bg-blue-900 text-white border-blue-900 shadow-md"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
            aria-selected={isActive}
            role="tab"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

