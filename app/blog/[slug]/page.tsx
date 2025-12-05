import { notFound } from "next/navigation";
import { BLOG_DATA } from "@/data/blogData";
import BlogContent from "@/components/blog/detailed/BlogContent";
import Sidebar from "@/components/blog/detailed/Sidebar";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ← THIS FIXES THE REACT PROMISE ISSUE

  const blog = BLOG_DATA.find((b) => b.slug === slug);
  if (!blog) notFound();

  const related = BLOG_DATA.filter(
    (item) => item.category === blog.category && item.slug !== slug
  );
  return (
    <div className="container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <BlogContent blog={blog} />
      <Sidebar related={related} category={blog.category} />
    </div>
  );
}
