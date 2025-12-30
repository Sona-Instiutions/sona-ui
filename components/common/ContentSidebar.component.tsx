/**
 * Content Sidebar Component
 *
 * Generic sidebar widget for Events or Blogs detail pages.
 * Follows DRY principle by reusing common sidebar patterns.
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/date.utils";
import { buildMediaUrl } from "@/utils/common.utils";
import { IStrapiMedia, TContentType } from "@/types/common.types";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG } from "@/constants/common.constants";

interface BaseContentItem {
  id: number;
  title: string;
  slug: string;
}

interface EventItem extends BaseContentItem {
  eventDate: string;
  thumbnailImage?: IStrapiMedia | null;
  featuredImage?: IStrapiMedia | null;
}

interface BlogItem extends BaseContentItem {
  publishedDate: string | null;
  thumbnail?: IStrapiMedia | null;
  bannerImage?: IStrapiMedia | null;
}

interface CaseStudyItem extends BaseContentItem {
  publishedDate: string | null;
  thumbnail?: IStrapiMedia | null;
  bannerImage?: IStrapiMedia | null;
}

type ContentItem = EventItem | BlogItem | CaseStudyItem;

interface BaseCategory {
  id: number;
  name: string;
  slug: string;
}

interface BaseTag {
  id: number;
  name: string;
}

interface ContentSidebarProps {
  type: TContentType;
  recentItems: ContentItem[];
  categories?: BaseCategory[];
  tags?: BaseTag[];
  basePath: string; // e.g., "/events" or "/blogs"
  recentTitle?: string; // e.g., "Recent Events" or "Recent Articles"
}

/**
 * Get thumbnail image for content item
 */
function getThumbnail(item: ContentItem, type: TContentType): IStrapiMedia | null | undefined {
  if (type === CONTENT_TYPE_EVENT) {
    const event = item as EventItem;
    return event.thumbnailImage || event.featuredImage || null;
  }
  const itemWithImage = item as BlogItem | CaseStudyItem;
  return itemWithImage.thumbnail || itemWithImage.bannerImage || null;
}

/**
 * Get date for content item
 */
function getDate(item: ContentItem, type: TContentType): string {
  if (type === CONTENT_TYPE_EVENT) {
    return (item as EventItem).eventDate;
  }
  return (item as BlogItem | CaseStudyItem).publishedDate || new Date().toISOString();
}

/**
 * Get placeholder image path
 */
function getPlaceholderImage(type: TContentType): string {
  if (type === CONTENT_TYPE_EVENT) return "/images/event-1.webp";
  return "/images/blog-placeholder.webp";
}

export function ContentSidebar({
  type,
  recentItems,
  categories = [],
  tags = [],
  basePath,
  recentTitle,
}: ContentSidebarProps) {
  const defaultRecentTitle =
    type === CONTENT_TYPE_EVENT
      ? "Recent Events"
      : type === CONTENT_TYPE_BLOG
      ? "Recent Articles"
      : "Recent Case Studies";

  return (
    <aside className='space-y-10'>
      {/* Recent Items Widget */}
      {recentItems.length > 0 && (
        <div>
          <h3 className='text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            {recentTitle || defaultRecentTitle}
            <span className='absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600'></span>
          </h3>
          <div className='space-y-6'>
            {recentItems.map((item) => {
              const thumbnail = getThumbnail(item, type);
              const date = getDate(item, type);
              const imageUrl = buildMediaUrl(thumbnail) || getPlaceholderImage(type);

              return (
                <div key={item.id} className='flex gap-4 group'>
                  <Link
                    href={`${basePath}/${item.slug}`}
                    className='relative w-20 h-20 shrink-0 rounded-xl overflow-hidden block shadow-sm'
                  >
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-110'
                      sizes='80px'
                      unoptimized
                    />
                  </Link>
                  <div className='flex flex-col justify-center'>
                    <div className='text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1'>
                      {formatDate(date)}
                    </div>
                    <Link href={`${basePath}/${item.slug}`}>
                      <h4 className='text-sm font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2'>
                        {item.title}
                      </h4>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div>
          <h3 className='text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            Categories
            <span className='absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600'></span>
          </h3>
          <ul className='space-y-3'>
            {categories.map((cat) => {
              // Events use type filter, blogs/case studies use category filter
              const href =
                type === CONTENT_TYPE_EVENT
                  ? `${basePath}?type=${
                      cat.slug === "industry" ? "industry" : cat.slug === "student" ? "student" : "all"
                    }`
                  : `${basePath}?category=${cat.slug}`;

              return (
                <li key={cat.id}>
                  <Link
                    href={href}
                    className='flex items-center justify-between text-gray-600 hover:text-blue-600 transition-all py-1 group'
                  >
                    <span className='font-medium group-hover:translate-x-1 transition-transform'>{cat.name}</span>
                    <span className='text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-md text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors'>
                      {/* Placeholder count since it's not in the data yet */}
                      12
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Tags Widget */}
      {tags.length > 0 && (
        <div>
          <h3 className='text-xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-gray-100 relative'>
            Popular Tags
            <span className='absolute -bottom-0.5 left-0 w-12 h-0.5 bg-blue-600'></span>
          </h3>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`${basePath}?search=${encodeURIComponent(tag.name)}`}
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
