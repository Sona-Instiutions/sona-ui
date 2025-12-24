import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog.types";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export default function RelatedArticles({ blogs }: { blogs: Blog[] }) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="mt-16 border-t pt-10">
      <h2 className="text-xl font-semibold mb-6">
        Related Articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog) => {
          const imageUrl = blog.thumbnail?.url
            ? `${API_URL}${blog.thumbnail.url}`
            : "/placeholder.jpg";

          return (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group rounded-2xl border p-4 hover:shadow-md transition"
            >
              {/* Image */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {blog.excerpt}
              </p>

              {/* Meta */}
              <p className="text-xs text-gray-400">
                {blog.publishedDate} · {blog.readTime} min read
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
