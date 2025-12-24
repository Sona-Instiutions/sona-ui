/**
 * Content Grid Component
 *
 * Generic grid layout for displaying Events or Blogs.
 * Handles loading states, empty states, and pagination trigger.
 */

import { INormalizedEvent } from "@/types/events.types";
import { INormalizedBlog } from "@/types/blog.types";
import { INormalizedCaseStudy } from "@/types/case-study.types";
import { TContentType } from "@/types/common.types";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG, CONTENT_TYPE_CASE_STUDY } from "@/constants/common.constants";
import { ContentCard } from "./ContentCard.component";
import { EventCardSkeleton } from "@/components/events/EventCardSkeleton.component";
import { SpinnerIcon, SmileySadIcon } from "@phosphor-icons/react";
import { formatDate } from "@/utils/date.utils";

type ContentItem = INormalizedEvent | INormalizedBlog | INormalizedCaseStudy;

interface ContentGridProps {
  type: TContentType;
  items: ContentItem[];
  isLoading: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  loadMoreText?: string;
}

/**
 * Type guard to check if item is an event
 */
function isEvent(item: ContentItem): item is INormalizedEvent {
  return "eventDate" in item;
}

/**
 * Type guard to check if item is a blog
 */
function isBlog(item: ContentItem): item is INormalizedBlog {
  return "publishedDate" in item && !("projectDate" in item);
}

/**
 * Type guard to check if item is a case study
 */
function isCaseStudy(item: ContentItem): item is INormalizedCaseStudy {
  // Case studies might have projectDate (even if optional/null in type, keys exist)
  // or we rely on explicit type passing if intersection is ambiguous
  return "projectDate" in item;
}

/**
 * Extract card props from content item
 */
function getCardProps(item: ContentItem, type: TContentType) {
  if (type === CONTENT_TYPE_EVENT && isEvent(item)) {
    return {
      title: item.title,
      href: `/events/${item.slug}`,
      image: item.thumbnailImage || item.featuredImage,
      date: formatDate(item.eventDate),
      excerpt: item.excerpt,
      category: item.categories?.[0],
      buttonText: "Read More",
    };
  }

  if (type === CONTENT_TYPE_BLOG && isBlog(item)) {
    return {
      title: item.title,
      href: `/blogs/${item.slug}`,
      image: item.thumbnail || item.bannerImage,
      date: formatDate(item.publishedDate),
      excerpt: item.excerpt,
      category: item.categories?.[0],
      buttonText: "Read Article",
    };
  }

  if (type === CONTENT_TYPE_CASE_STUDY && isCaseStudy(item)) {
    return {
      title: item.title,
      href: `/case-studies/${item.slug}`,
      image: item.thumbnail || item.bannerImage,
      date: item.publishedDate ? formatDate(item.publishedDate) : "Recent",
      excerpt: item.excerpt,
      category: item.categories?.[0],
      buttonText: "View Case Study",
    };
  }

  // Fallback (should never happen with proper types)
  throw new Error(`Unsupported content type: ${type}`);
}

export function ContentGrid({
  type,
  items,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  emptyTitle,
  emptyMessage,
  loadMoreText,
}: ContentGridProps) {
  // Default empty state messages
  const defaultEmptyTitle =
    emptyTitle ||
    (type === CONTENT_TYPE_EVENT
      ? "No events found"
      : type === CONTENT_TYPE_BLOG
      ? "No blogs found"
      : "No case studies found");
  const defaultEmptyMessage =
    emptyMessage ||
    (type === CONTENT_TYPE_EVENT
      ? "We couldn't find any events matching your criteria. Try adjusting your filters or search terms."
      : type === CONTENT_TYPE_BLOG
      ? "We couldn't find any blogs matching your criteria. Try adjusting your search terms."
      : "We couldn't find any case studies matching your criteria. Try adjusting your search terms.");
  const defaultLoadMoreText =
    loadMoreText ||
    (type === CONTENT_TYPE_EVENT
      ? "Load More Events"
      : type === CONTENT_TYPE_BLOG
      ? "Load More Articles"
      : "Load More Case Studies");

  // Initial loading state (no data yet)
  if (isLoading && items.length === 0) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='flex flex-col h-full'>
            <EventCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!isLoading && items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center'>
        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400'>
          <SmileySadIcon weight='bold' size={32} />
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>{defaultEmptyTitle}</h3>
        <p className='text-gray-500 max-w-sm'>{defaultEmptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 mb-16'>
        {items.map((item) => {
          const cardProps = getCardProps(item, type);
          return (
            <div key={item.id} className='flex flex-col h-full'>
              <ContentCard {...cardProps} />
            </div>
          );
        })}
        {/* Loading indicators for next page */}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={`loading-${i}`} className='flex flex-col h-full'>
              <EventCardSkeleton />
            </div>
          ))}
      </div>

      {hasNextPage && (
        <div className='flex justify-center pt-4 pb-12'>
          <button
            onClick={() => fetchNextPage?.()}
            disabled={isFetchingNextPage}
            className='px-10 py-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2'
          >
            {isFetchingNextPage && <SpinnerIcon className='animate-spin' />}
            {isFetchingNextPage ? "Loading..." : defaultLoadMoreText}
          </button>
        </div>
      )}
    </div>
  );
}
