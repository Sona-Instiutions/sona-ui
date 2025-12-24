/**
 * Search Suggestions Component
 *
 * Generic search input with autocomplete suggestions for Events or Blogs.
 */

"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { MagnifyingGlassIcon, XIcon, CircleNotchIcon, CalendarBlankIcon, ClockIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useBlogSearchSuggestionsQuery } from "@/services/client/blogs.client";
import { useEventSearchSuggestionsQuery } from "@/services/client/events.client";
import { MIN_SEARCH_CHARS, SEARCH_DEBOUNCE_MS } from "@/constants/events.constants";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG } from "@/constants/common.constants";
import { formatDate } from "@/utils/date.utils";
import Image from "next/image";
import { buildMediaUrl } from "@/utils/common.utils";
import { IEventSearchSuggestion } from "@/types/events.types";
import { IBlogSearchSuggestion } from "@/types/blog.types";
import { TContentType } from "@/types/common.types";

interface SearchSuggestionsProps {
  type: TContentType;
  initialValue?: string;
  onSearch: (value: string) => void;
  onSelectSuggestion?: (suggestion: IEventSearchSuggestion | IBlogSearchSuggestion) => void;
  className?: string;
  placeholder?: string;
}

export function SearchSuggestions({
  type,
  initialValue = "",
  onSearch,
  onSelectSuggestion,
  className,
  placeholder,
}: SearchSuggestionsProps) {
  const [value, setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  // Debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(handler);
  }, [value]);

  // Hooks
  const eventQuery = useEventSearchSuggestionsQuery(debouncedValue, {
    enabled: type === CONTENT_TYPE_EVENT && isOpen && debouncedValue.length >= MIN_SEARCH_CHARS,
  });
  const blogQuery = useBlogSearchSuggestionsQuery(debouncedValue, {
    enabled: type === CONTENT_TYPE_BLOG && isOpen && debouncedValue.length >= MIN_SEARCH_CHARS,
  });

  const suggestions = (type === CONTENT_TYPE_EVENT ? eventQuery.data : blogQuery.data) || [];
  const isFetching = type === CONTENT_TYPE_EVENT ? eventQuery.isFetching : blogQuery.isFetching;
  const isLoading = type === CONTENT_TYPE_EVENT ? eventQuery.isLoading : blogQuery.isLoading;

  const showSuggestions = isOpen && debouncedValue.length >= MIN_SEARCH_CHARS;

  // Click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        onSearch(value);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else {
          onSearch(value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuggestionClick = (suggestion: any) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    } else {
      onSearch(suggestion.title);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setValue("");
    setDebouncedValue("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Helper to get image safely
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getThumbnail = (s: any) => (type === CONTENT_TYPE_EVENT ? s.thumbnailImage : s.thumbnail);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDate = (s: any) => (type === CONTENT_TYPE_EVENT ? s.eventDate : s.publishedDate);

  return (
    <div ref={containerRef} className={cn("relative max-w-md w-full", className)}>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400'>
          {isFetching ? (
            <CircleNotchIcon size={20} className='animate-spin' />
          ) : (
            <MagnifyingGlassIcon size={20} weight='bold' />
          )}
        </div>
        <input
          ref={inputRef}
          type='text'
          className='block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm'
          placeholder={placeholder || `Search ${type === CONTENT_TYPE_EVENT ? "events" : "blogs"}...`}
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setValue(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          role='combobox'
          aria-expanded={showSuggestions}
          aria-haspopup='listbox'
          aria-controls={listboxId}
        />
        {value && (
          <button
            onClick={handleClear}
            className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Clear search'
          >
            <XIcon size={16} weight='bold' />
          </button>
        )}
      </div>

      {isOpen && value.length > 0 && value.length < MIN_SEARCH_CHARS && (
        <div className='absolute z-10 mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-[10px] text-gray-500 animate-in fade-in slide-in-from-top-1'>
          Type at least {MIN_SEARCH_CHARS} characters...
        </div>
      )}

      {showSuggestions && (
        <div
          id={listboxId}
          role='listbox'
          className='absolute z-20 mt-2 w-full bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 max-h-[400px] overflow-y-auto'
        >
          {suggestions.length > 0 ? (
            <div className='py-2'>
              <div className='px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-50 mb-1'>
                {type === CONTENT_TYPE_EVENT ? "Event Suggestions" : "Blog Suggestions"}
              </div>
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                    selectedIndex === index ? "bg-blue-50" : "hover:bg-gray-50"
                  )}
                  role='option'
                  aria-selected={selectedIndex === index}
                >
                  <div className='relative w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-50'>
                    <Image
                      src={buildMediaUrl(getThumbnail(suggestion)) || "/images/placeholder.webp"}
                      alt={suggestion.title}
                      fill
                      className='object-cover'
                      sizes='48px'
                      unoptimized
                    />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <h4 className='text-sm font-bold text-gray-900 truncate leading-tight mb-1'>{suggestion.title}</h4>
                    <div className='flex items-center text-[10px] text-gray-500 font-medium'>
                      {type === CONTENT_TYPE_EVENT ? (
                        <CalendarBlankIcon size={12} className='mr-1 text-blue-500' />
                      ) : (
                        <ClockIcon size={12} className='mr-1 text-blue-500' />
                      )}
                      {formatDate(getDate(suggestion))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !isLoading ? (
            <div className='p-8 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3'>
                <MagnifyingGlassIcon size={24} className='text-gray-300' />
              </div>
              <p className='text-sm font-medium text-gray-900'>No results found</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
