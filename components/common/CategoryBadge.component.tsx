/**
 * Category Badge Component
 *
 * Displays a colored badge for a content category.
 */

import React from "react";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  color?: string; // Hex color or Tailwind class
  className?: string;
}

export function CategoryBadge({ name, color, className }: CategoryBadgeProps) {
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


