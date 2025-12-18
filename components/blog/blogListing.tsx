"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/lib/api";
import { Blog, Category } from "@/types/blog";
import { mediaUrl } from "@/lib/utils";

export default function BlogListing() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(1); // 👈 show 1 initially

  /* =======================
     FETCH BLOGS ONCE
  ======================= */
  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data || []);
      setVisibleCount(1);
    });
  }, []);

  /* =======================
     BUILD CATEGORY TABS
     (FROM BLOG DATA)
  ======================= */
  const categories: Category[] = Array.from(
    new Map(
      blogs
        .flatMap((blog) => blog.categories || [])
        .map((cat: Category) => [cat.slug, cat])
    ).values()
  );


  /* =======================
     FILTER BLOGS BY CATEGORY
  ======================= */
  const filteredBlogs =
    activeCategory === "all"
      ? blogs
      : blogs.filter((blog) =>
        blog.categories?.some(
          (cat) => cat.slug === activeCategory
        )
      );

  /* =======================
     LOAD MORE LOGIC
  ======================= */
  const visibleBlogs = filteredBlogs.slice(0, visibleCount);

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
            className={`px-5 py-2 rounded-full text-sm font-medium ${activeCategory === "all"
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
              className={`px-5 py-2 rounded-full text-sm font-medium ${activeCategory === cat.slug
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

                <h3 className="font-bold text-lg mb-2">
                  {blog.title}
                </h3>

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
