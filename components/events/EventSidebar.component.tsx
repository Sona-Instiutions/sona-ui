/**
 * Event Sidebar Component
 *
 * Sidebar widgets for the event detail page.
 */

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { INormalizedEvent, IEventCategory, IEventTag, IEventSearchSuggestion } from "@/types/events.types";
import { EventSearch } from "./EventSearch.component";
import { formatDate } from "@/utils/date.utils";
import { buildMediaUrl } from "@/utils/common.utils";

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

  const handleSelectSuggestion = (suggestion: IEventSearchSuggestion) => {
    router.push(`/events/${suggestion.slug}`);
  };

  return (
    <aside className='space-y-10'>
      {/* Search Widget */}
      <div className='bg-gray-50 p-6 rounded-2xl border border-gray-100'>
        <h3 className='text-lg font-bold text-gray-900 mb-4 relative inline-block'>
          Search Events
          <span className="absolute -bottom-1 left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
        </h3>
        <EventSearch 
          onSearch={handleSearch} 
          onSelectSuggestion={handleSelectSuggestion}
          placeholder='Search...' 
        />
      </div>

      {/* Recent Events Widget */}
      {recentEvents.length > 0 && (
        <div>
          <h3 className='text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            Recent Events
            <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600"></span>
          </h3>
          <div className='space-y-6'>
            {recentEvents.map((event) => (
              <div key={event.id} className='flex gap-4 group'>
                <Link
                  href={`/events/${event.slug}`}
                  className='relative w-20 h-20 shrink-0 rounded-xl overflow-hidden block shadow-sm'
                >
                  <Image
                    src={buildMediaUrl(event.thumbnailImage) || buildMediaUrl(event.featuredImage) || "/images/event-1.webp"}
                    alt={event.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-110'
                    sizes='80px'
                    unoptimized
                  />
                </Link>
                <div className="flex flex-col justify-center">
                  <div className='text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1'>{formatDate(event.eventDate)}</div>
                  <Link href={`/events/${event.slug}`}>
                    <h4 className='text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2'>
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
          <h3 className='text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            Categories
            <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600"></span>
          </h3>
          <ul className='space-y-3'>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/events?type=${
                    cat.slug === "industry" ? "industry" : cat.slug === "student" ? "student" : "all"
                  }`}
                  className='flex items-center justify-between text-gray-600 hover:text-blue-600 transition-all py-1 group'
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform">{cat.name}</span>
                  <span className='text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors'>
                    {/* Placeholder count since it's not in the data yet */}
                    12
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
          <h3 className='text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            Popular Tags
            <span className="absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600"></span>
          </h3>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/events?search=${encodeURIComponent(tag.name)}`}
                className='px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all'
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
