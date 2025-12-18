import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";

export default function BlogGrid({ posts }: { posts: Blog[] }) {
  if (!posts?.length) {
    return <p>No articles found.</p>;
  }
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
      {posts.map((post) => {
        const imageUrl =
          post.thumbnail?.formats?.small?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.thumbnail.formats.small.url}`
            : post.thumbnail?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.thumbnail.url}`
              : null;

        return (
          <article
            key={post.id}
            className="flex flex-col rounded-2xl border overflow-hidden hover:shadow-md transition"
          >
            {/* Image */}
            {imageUrl && (
              <div className="relative h-48">
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-semibold leading-snug hover:text-blue-600 transition line-clamp-2"
              >
                {post.title}
              </Link>

              {post.excerpt && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {/* Footer */}
              <div className="mt-auto pt-4 flex items-center justify-between">
                {post.publishedAt && (
                  <span className="text-xs text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </div>

            </div>
          </article>
        );
      })}
    </div>
  );
}
