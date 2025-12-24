/**
 * Breadcrumb Component
 *
 * A reusable component for site-wide breadcrumb navigation.
 */

"use client";

import React from "react";
import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  light?: boolean;
}

export function Breadcrumb({ items, className, light = false }: BreadcrumbProps) {
  return (
    <nav aria-label='Breadcrumb' className={cn("flex flex-wrap items-center text-sm", className)}>
      <ol className='flex items-center gap-2'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className='flex items-center gap-2'>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-blue-600"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn("font-medium", light ? "text-white" : "text-gray-900")}>{item.label}</span>
              )}

              {!isLast && (
                <CaretRightIcon size={12} className={light ? "text-gray-500" : "text-gray-400"} weight='bold' />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
