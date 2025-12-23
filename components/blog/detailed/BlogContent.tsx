import RichTextRenderer from "./RichTextRenderer";
import { Blog, Category, Tag } from "@/types/blog";

export default function BlogContent({ blog }: { blog: Blog }) {

  return (
    <article className="space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{blog.title}</h1>

      {/* Meta */}
      <div className="text-sm text-gray-500 flex gap-4">
        <span>{blog.publishedDate}</span>
        <span>{blog.readTime} min read</span>
        <span>By {blog.author?.name}</span>
      </div>

      {/* Content */}
      <RichTextRenderer content={blog.content} />

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {blog.categories?.map((cat: Category) => (
          <span
            key={cat.id}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {blog.tags?.map((tag: Tag) => (
          <span
            key={tag.id}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </article>
  );
}
