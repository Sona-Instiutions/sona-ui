import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog";

export default function BlogCard({ blog }: { blog: Blog }) {
  const imageUrl = blog.thumbnail?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.thumbnail.url}`
    : "/placeholder.jpg";

  return (
    <article className=" flex flex-col md:flex-col gap-6 rounded-2xl border p-5 hover:shadow-md transition">
      {/* Image */}
      <div className="relative w-full md:w-64 h-44 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Category */}
          {/* {blog.categories?.[0] && (
            <Link
              href={`/blog/category/${blog.categories[0].slug}`}
              className="text-xs font-semibold uppercase text-blue-600"
            >
              {blog.categories[0].name}
            </Link>
          )} */}

          {/* Title */}
          <h2 className="mt-2 text-lg font-semibold leading-snug line-clamp-2">
            <Link href={`/blog/${blog.slug}`} className="hover:underline">
              {blog.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mt-3 text-sm text-gray-600 line-clamp-3">
              {blog.excerpt}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
          {(blog.publishedDate || blog.publishedAt) && (
            <span>
              {new Date(blog.publishedDate ?? blog.publishedAt!).toDateString()}
            </span>
          )}

          {blog.readTime && <span>• {blog.readTime} min read</span>}
        </div>
      </div>
    </article>
  );
}
