/**
 * Content Hero Component
 *
 * Generic full-width hero section for content detail pages (Events, Blogs).
 * Provides a unified design with background image, breadcrumbs, badges, and metadata.
 */

"use client";

import React from "react";
import Image from "next/image";
import { UserIcon, EyeIcon, ClockIcon } from "@phosphor-icons/react";
import { CategoryBadge } from "./CategoryBadge.component";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb.component";
import { buildMediaUrl } from "@/utils/common.utils";
import { formatDate } from "@/utils/date.utils";
import { IStrapiMedia, TContentType } from "@/types/common.types";
import { CONTENT_TYPE_EVENT, CONTENT_TYPE_BLOG, CONTENT_TYPE_CASE_STUDY } from "@/constants/common.constants";

interface ContentCategory {
  id: number;
  name: string;
  color?: string;
}

interface ContentAuthor {
  name: string;
  role?: string;
  image?: IStrapiMedia | null;
}

interface ContentHeroProps {
  type: TContentType;
  title: string;
  image?: IStrapiMedia | null;
  breadcrumbs: BreadcrumbItem[];
  categories?: ContentCategory[];
  date?: string | null;
  author?: string | ContentAuthor | null;
  viewCount?: number;
  readTime?: number | null;
  excerpt?: string | null;
}

export function ContentHero({
  type,
  title,
  image,
  breadcrumbs,
  categories = [],
  date,
  author,
  viewCount,
  readTime,
  excerpt,
}: ContentHeroProps) {
  const imageUrl =
    buildMediaUrl(image) ||
    (type === CONTENT_TYPE_EVENT
      ? "/images/event-1.webp"
      : type === CONTENT_TYPE_BLOG
      ? "/images/blog-placeholder.webp"
      : "/images/blog-placeholder.webp"); // reuse blog placeholder for case studies

  const authorName = typeof author === "string" ? author : author?.name;

  return (
    <div className='relative w-full h-[60vh] min-h-[450px] bg-gray-900 overflow-hidden flex items-end'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <Image src={imageUrl} alt={title} fill className='object-cover opacity-60' priority unoptimized />
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent' />
      </div>

      {/* Content */}
      <div className='container mx-auto relative z-10 pb-16 px-6 sm:px-10 md:px-10 lg:px-0'>
        <div className='px-auto'>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbs} light className='mb-6' />

          {/* Badges */}
          <div className='flex flex-wrap gap-2 mb-6'>
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} name={cat.name} color={cat.color} />
            ))}
          </div>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight'>{title}</h1>

          {/* Excerpt for Blogs & Case Studies */}
          {(type === CONTENT_TYPE_BLOG || type === CONTENT_TYPE_CASE_STUDY) && excerpt && (
            <p className='text-lg md:text-xl text-gray-300 mb-8 line-clamp-2 max-w-3xl leading-relaxed'>{excerpt}</p>
          )}

          {/* Metadata */}
          <div className='flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base'>
            {date && (
              <div className='flex items-center gap-2'>
                <span className='font-semibold text-white'>{formatDate(date)}</span>
              </div>
            )}

            {authorName && (
              <div className='flex items-center gap-2 border-l border-gray-700 pl-6 first:border-0 first:pl-0'>
                <UserIcon weight='bold' size={18} />
                <span>By {authorName}</span>
              </div>
            )}

            {readTime !== undefined && readTime !== null && (
              <div className='flex items-center gap-2 border-l border-gray-700 pl-6'>
                <ClockIcon weight='bold' size={18} />
                <span>{readTime} min read</span>
              </div>
            )}

            {viewCount !== undefined && (
              <div className='flex items-center gap-2 border-l border-gray-700 pl-6'>
                <EyeIcon weight='bold' size={18} />
                <span>{viewCount} Views</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
