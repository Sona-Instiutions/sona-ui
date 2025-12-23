"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Blog, Category, Tag } from "@/types/blog";
type SidebarProps = {
  categories: (Category & { blogsCount?: number })[];
  recentPosts: Blog[];
  tags: Tag[];
};

export default function Sidebar({
  categories = [],
  recentPosts = [],
  tags = [],
}: SidebarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/blog/search?q=${encodeURIComponent(query)}`);
  }


  return (
    <aside className="space-y-8">
      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="rounded-2xl border p-5"
      >
        <h3 className="font-semibold mb-4">Search Articles</h3>
        <div className="relative">
          <MagnifyingGlass
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blog posts..."
            className="w-full rounded-full border px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      {/* Categories */}
      <div className="rounded-2xl border p-5">
        <h3 className="font-semibold mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between text-sm"
            >
              <Link href={`/blog/category/${cat.slug}`}>
                {cat.name}
              </Link>
              <span className="bg-gray-100 px-2 rounded-full text-xs">
                {cat.blogsCount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      {/* Recent Posts */}
      <div className="rounded-2xl border p-5">
        <h3 className="font-semibold mb-4">Recent Posts</h3>

        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li
              key={post.id}
              className="flex items-start justify-center gap-3"
            >
              {/* Image */}
              <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={
                    post.thumbnail?.url
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.thumbnail.url}`
                      : "/placeholder.jpg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block text-sm font-medium leading-snug line-clamp-2"
                >
                  {post.title}
                </Link>

                <p className="mt-1 text-xs text-gray-500">
                  {post.publishedAt ? new Date(post.publishedAt).toDateString() : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="rounded-2xl border p-5">
        <h3 className="font-semibold mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.slug}`}
              className="bg-gray-100 px-3 py-1 rounded-full text-xs"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
