/**
 * Blogs Page Client Component
 *
 * Client-side logic for the blogs listing page (search, filtering, pagination).
 */

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useBlogsInfiniteQuery } from "@/services/client/blogs.client";
import { INormalizedBlog, IBlogsResponse } from "@/types/blog.types";
import { ContentGrid } from "@/components/common/ContentGrid.component";
import { BLOG_PAGE_SIZE } from "@/constants/blog.constants";

interface BlogsPageClientProps {
  initialData: { data: INormalizedBlog[]; meta: IBlogsResponse["meta"] };
}

function BlogsPageContent({ initialData }: BlogsPageClientProps) {
  const searchParams = useSearchParams();

  // Read search from URL or default
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";

  // Query Hook
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useBlogsInfiniteQuery({
    pageSize: BLOG_PAGE_SIZE,
    search: searchTerm || undefined,
    initialData: !searchTerm ? initialData : undefined,
  });

  // Flatten pages into single array
  const allBlogs = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className='container mx-auto px-8 py-16'>
      {/* Header */}
      <div className='flex flex-col items-center mb-16'>
        <h2 className='text-3xl font-bold text-gray-900'>Latest Insights</h2>
      </div>

      {/* Grid */}
      <ContentGrid
        type='blog'
        items={allBlogs}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export function BlogsPageClient(props: BlogsPageClientProps) {
  return (
    <Suspense fallback={<div className='h-96' />}>
      <BlogsPageContent {...props} />
    </Suspense>
  );
}
