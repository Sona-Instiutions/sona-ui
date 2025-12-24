"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { blogService } from "@/services/client/blog.client";
import { Category } from "@/types/blog.types";
import { mediaUrl } from "@/lib/utils";

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(1);

  /* =======================
     FETCH BLOGS (TanStack)
  ======================= */
const {
  data: blogs = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ["blogs"],
  queryFn: blogService.getAll,
});

  /* =======================
     BUILD CATEGORY TABS
  ======================= */
  const categories: Category[] = useMemo(() => {
    return Array.from(
      new Map(
        blogs
          .flatMap((blog) => blog.categories || [])
          .map((cat) => [cat.slug, cat])
      ).values()
    );
  }, [blogs]);

  /* =======================
     FILTER BY CATEGORY
  ======================= */
  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((blog) =>
          blog.categories?.some((cat) => cat.slug === activeCategory)
        );

  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

  /* =======================
     STATES
  ======================= */
  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <p className="text-gray-500">Loading blogs...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 text-center">
        <p className="text-red-500">Failed to load blogs</p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-6">
        {/* =======================
            CATEGORY TABS
        ======================= */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setActiveCategory("all");
              setVisibleCount(1);
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setActiveCategory(cat.slug);
                setVisibleCount(1);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium ${
                activeCategory === cat.slug
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* =======================
            BLOG LIST
        ======================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <Image
                src={mediaUrl(blog.thumbnail)}
                alt={blog.thumbnail?.alternativeText || blog.title}
                width={400}
                height={250}
              />

              <div className="p-6">
                <p className="text-sm text-blue-600 mb-2">
                  {blog.categories?.[0]?.name}
                </p>

                <h3 className="font-bold text-lg mb-2">{blog.title}</h3>

                <p className="text-sm text-gray-600 mb-4">
                  {blog.excerpt}
                </p>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block bg-blue-900 text-white px-4 py-2 rounded"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* =======================
            LOAD MORE
        ======================= */}
        {visibleCount < filteredBlogs.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() =>
                setVisibleCount((prev) =>
                  Math.min(prev + 1, filteredBlogs.length)
                )
              }
              className="bg-blue-600 text-white px-8 py-3 rounded-full"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
