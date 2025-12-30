/**
 * Content Card Component
 *
 * Generic card component for Events and Blogs.
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "./CategoryBadge.component";
import { buildMediaUrl } from "@/utils/common.utils";
import { IStrapiMedia } from "@/types/common.types";

interface ContentCardProps {
  title: string;
  href: string;
  image?: IStrapiMedia | null;
  date: string; // Formatted date string
  excerpt?: string | null;
  category?: { name: string; color?: string };
  buttonText?: string;
}

export function ContentCard({
  title,
  href,
  image,
  date,
  excerpt,
  category,
  buttonText = "Read More",
}: ContentCardProps) {
  const imageUrl = buildMediaUrl(image) || "/images/placeholder.webp"; // Fallback image

  return (
    <div className='flex flex-col h-full min-h-[500px] bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group'>
      {/* Image Container */}
      <Link href={href} className='relative h-64 w-full overflow-hidden block'>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          unoptimized
        />
      </Link>

      {/* Content */}
      <div className='flex flex-col flex-grow p-8'>
        {/* Meta Header */}
        <div className='flex items-center gap-3 mb-3'>
          {category && <CategoryBadge name={category.name} color={category.color} />}
          <span className='text-xs font-medium text-gray-400'>{date}</span>
        </div>

        {/* Title */}
        <Link href={href} className='block mb-3'>
          <h3 className='text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-900 transition-colors line-clamp-2'>
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className='text-sm text-gray-600 mb-6 line-clamp-3'>
            {excerpt}
          </p>
        )}

        {/* Footer */}
        <div className='mt-auto pt-2'>
          <Link
            href={href}
            className='inline-flex items-center justify-center w-full px-6 py-2.5 bg-blue-900 text-white text-sm font-semibold rounded-md hover:bg-blue-800 transition-colors'
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}


