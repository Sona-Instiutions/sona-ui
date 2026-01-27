"use client";

import Link from "next/link";
import Image from "next/image";
import { INormalizedBlog } from "@/types/blog.types";
import { IStrapiMedia } from "@/types/common.types";

interface LatestBlogsSectionProps {
  blogs: INormalizedBlog[];
}

export default function LatestBlogsSection({
  blogs,
}: LatestBlogsSectionProps) {
  /**
   * Derive latest blogs (UI-only logic)
   * Similar to `allBlogs` derivation in BlogsPageClient
   */
  const latestBlogs: INormalizedBlog[] = blogs.slice(0, 3);
  type StrapiImageFormat = {
    url: string;
  };

  type StrapiImageFormats = {
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
  };

  const getImageSrc = (media?: IStrapiMedia): string | undefined => {
    if (!media) return undefined;

    const formats = media.formats as StrapiImageFormats | undefined;

    const url =
      formats?.medium?.url ||
      formats?.small?.url ||
      media.url;

    if (!url) return undefined;

    return url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`;
  };



  if (latestBlogs.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-12">
      {/* ===== HEADER ===== */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Latest <span className="text-yellow-500">Blogs</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Stay updated with the latest developments in education, technology,
          and innovation from SCALE&apos;s thought leaders and industry experts.
        </p>
      </div>

      {/* ===== GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {latestBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-56">

              {blog.thumbnail && (
                <Image
                  src={getImageSrc(blog.thumbnail)!}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category + Date */}
              <div className="flex items-center gap-3 text-sm mb-3">
                {blog.categories?.[0] && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    {blog.categories[0].name}
                  </span>
                )}

                <span className="text-gray-400">
                  {new Date(blog.publishedDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg text-gray-900 leading-snug group-hover:text-yellow-600 transition">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className="text-center mt-20">
        <Link href="/blogs">
          <button className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-10 py-4 rounded-md transition">
            View All Articles
          </button>
        </Link>
      </div>
    </section>
  );
}
