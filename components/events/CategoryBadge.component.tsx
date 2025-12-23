/**
 * Category Badge Component
 *
 * Displays a colored badge for an event category.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  color?: string; // Hex color or Tailwind class if we decide to map
  className?: string;
}

export function CategoryBadge({ name, color, className }: CategoryBadgeProps) {
  // Simple style logic: if color is provided and looks like a hex, use style.
  // Otherwise default to a brand color or use the string as a class.
  // For MVP, we'll default to a clean gray/blue pill style if no color.

  const style = color?.startsWith("#") ? { backgroundColor: `${color}20`, color: color } : undefined;
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
        className
      )}
      style={style}
    >
      {name}
    </span>
  );
}

