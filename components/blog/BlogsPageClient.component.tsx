/**
 * Blogs Page Client Component
 *
 * Client-side logic for the blogs listing page (search, filtering, pagination).
 */

"use client";

import React, { useState } from "react";
import { useBlogsInfiniteQuery } from "@/services/client/blogs.client";
import { ContentCard } from "@/components/common/ContentCard.component";
import { SearchSuggestions } from "@/components/common/SearchSuggestions.component";
import { SpinnerIcon } from "@phosphor-icons/react";
import { formatDate } from "@/utils/date.utils";

export function BlogsPageClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useBlogsInfiniteQuery({
    search: searchTerm,
    pageSize: 9,
  });

  const blogs = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className='container py-12'>
      {/* Search & Filter Header */}
      <div className='flex flex-col md:flex-row justify-between items-center gap-6 mb-10'>
        <h2 className='text-3xl font-bold text-gray-900'>Latest Insights</h2>
        <div className='w-full md:w-96'>
          <SearchSuggestions
            type='blog'
            onSearch={setSearchTerm}
            placeholder='Search blogs...'
            initialValue={searchTerm}
          />
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className='flex justify-center py-20'>
          <SpinnerIcon className='animate-spin text-blue-600' size={40} />
        </div>
      ) : isError ? (
        <div className='text-center py-20 text-red-600'>Failed to load blogs. Please try again.</div>
      ) : blogs.length === 0 ? (
        <div className='text-center py-20 bg-gray-50 rounded-2xl'>
          <p className='text-gray-500'>No blogs found matching your criteria.</p>
          <button onClick={() => setSearchTerm("")} className='mt-4 text-blue-600 hover:underline font-medium'>
            Clear Search
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogs.map((blog) => (
            <ContentCard
              key={blog.id}
              title={blog.title}
              href={`/blog/${blog.slug}`}
              image={blog.thumbnail || blog.bannerImage}
              date={formatDate(blog.publishedDate)}
              excerpt={blog.excerpt}
              category={blog.categories?.[0]}
              buttonText='Read Article'
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className='flex justify-center pt-10 pb-12'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className='px-10 py-3 bg-gray-100 border border-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2'
          >
            {isFetchingNextPage && <SpinnerIcon className='animate-spin' />}
            {isFetchingNextPage ? "Loading..." : "Load More Articles"}
          </button>
        </div>
      )}
    </div>
  );
}
