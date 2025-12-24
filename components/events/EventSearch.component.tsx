/**
 * Event Search Component
 *
 * Search input with debouncing.
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlass, X } from "phosphor-react";
import { cn } from "@/lib/utils";

interface EventSearchProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function EventSearch({
  initialValue = "",
  onSearch,
  className,
  placeholder = "Search events...",
}: EventSearchProps) {
  const [value, setValue] = useState(initialValue);
  const onSearchRef = useRef(onSearch);
  const isMounted = useRef(false);

  // Update ref when prop changes
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const handler = setTimeout(() => {
      onSearchRef.current(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value]); // Only depend on value, stable behavior

  const handleClear = () => {
    setValue("");
    // Effect will handle onSearch trigger
  };

  return (
    <div className={cn("relative max-w-md w-full", className)}>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400'>
        <MagnifyingGlass size={20} weight='bold' />
      </div>
      <input
        type='text'
        className='block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all shadow-sm'
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          onClick={handleClear}
          className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
        >
          <X size={16} weight='bold' />
        </button>
      )}
    </div>
  );
}
