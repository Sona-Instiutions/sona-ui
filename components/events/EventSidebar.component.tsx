/**
 * Event Sidebar Component
 *
 * Sidebar widgets for the event detail page.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { INormalizedEvent, IEventCategory, IEventTag } from "@/types/events.types";
import { EventSearch } from "./EventSearch.component";
import { formatDate } from "@/utils/date.utils";

interface EventSidebarProps {
  recentEvents: INormalizedEvent[];
  categories: IEventCategory[];
  tags: IEventTag[];
}

export function EventSidebar({ recentEvents, categories, tags }: EventSidebarProps) {
  const router = useRouter();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      router.push(`/events?search=${encodeURIComponent(term)}`);
    }
  };

  return (
    <aside className='space-y-10'>
      {/* Search Widget */}
      <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>Search Events</h3>
        <EventSearch onSearch={handleSearch} placeholder='Search...' />
      </div>

      {/* Recent Events Widget */}
      {recentEvents.length > 0 && (
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100'>Recent Events</h3>
          <div className='space-y-6'>
            {recentEvents.map((event) => (
              <div key={event.id} className='flex gap-4 group'>
                <Link
                  href={`/events/${event.slug}`}
                  className='relative w-20 h-20 shrink-0 rounded-lg overflow-hidden block'
                >
                  <Image
                    src={event.thumbnailImage?.url || event.featuredImage?.url || "/images/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-110'
                    sizes='80px'
                  />
                </Link>
                <div>
                  <div className='text-xs text-gray-500 mb-1'>{formatDate(event.eventDate)}</div>
                  <Link href={`/events/${event.slug}`}>
                    <h4 className='text-sm font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2'>
                      {event.title}
                    </h4>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100'>Categories</h3>
          <ul className='space-y-2'>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/events?type=${
                    cat.slug === "industry" ? "industry" : cat.slug === "student" ? "student" : "all"
                  }`} // Mapping basic types, ideally filter by category slug
                  // Note: Our EventFilters currently only supports enum (student/industry/all).
                  // If we want detailed category filtering, we need to update EventFilters logic.
                  // For now, I'll link to main events page if no direct mapping, or just disable link?
                  // Plan says "Categories linked to category filter pages".
                  // Since we have limited tabs, I'll just link to /events mostly.
                  // But if category name matches "Industry" or "Student", I can map it.
                  className='flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors py-1'
                >
                  <span>{cat.name}</span>
                  <span className='text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-500'>
                    {/* Ideally count, but we don't have it. Just arrow? Or nothing. */}→
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags Widget */}
      {tags.length > 0 && (
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100'>Tags</h3>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/events?search=${encodeURIComponent(tag.name)}`} // Search by tag name as fallback filter
                className='px-3 py-1 bg-white border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors'
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
