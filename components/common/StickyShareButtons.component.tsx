"use client";

import React, { useState, useEffect } from "react";
import { ShareButtons } from "./ShareButtons.component";
import { cn } from "@/lib/utils";

interface StickyShareButtonsProps {
  title: string;
  className?: string;
}

/**
 * Sticky Share Buttons Component
 * 
 * A fixed-position wrapper for ShareButtons that appears on the left viewport edge on desktop.
 * Hidden on mobile/tablet viewports and arrives after header is scrolled.
 */
export function StickyShareButtons({ title, className }: StickyShareButtonsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 400px (past header/hero area)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none",
        className
      )}
    >
      <div className="bg-white p-2 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
          Share
        </span>
        <ShareButtons 
          title={title} 
          variant="vertical" 
          showLabels={false} 
        />
      </div>
    </div>
  );
}

