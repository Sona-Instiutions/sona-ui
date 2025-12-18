import { notFound } from "next/navigation";
import { getBlogBySlug, getSidebarData, getRelatedBlogs } from "@/lib/api";
import BlogContent from "@/components/blog/detailed/BlogContent";
import Breadcrumbs from "@/components/blog/detailed/Breadcrumbs";
import Sidebar from "@/components/blog/detailed/Sidebar";
import { Blog } from "@/types/blog";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog: Blog | null = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }
  const bannerImageUrl =
    blog.bannerImage?.formats?.large?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.bannerImage.formats.large.url}`
      : blog.bannerImage?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${blog.bannerImage.url}`
        : undefined;

  // ✅ Sidebar data fetched HERE
  const sidebarData = await getSidebarData();
  // ✅ FETCH RELATED BLOGS
  const relatedBlogs = blog.categories?.[0]
    ? await getRelatedBlogs(
      blog.categories[0].slug,
      blog.slug
    )
    : [];

  return (
    <div>
      <Breadcrumbs
        title={blog.title}
        bannerImage={bannerImageUrl}
        publishedDate={blog.publishedDate ?? blog.publishedAt}
        readTime={blog.readTime}
        author={blog.author}
        category={blog.categories?.[0]}
      />

      <section className="container py-10 grid grid-cols-1 lg:grid-cols-4 gap-10 mx-auto max-w-6xl">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <BlogContent blog={blog} />
        </div>

        {/* Sidebar */}
        <Sidebar
          categories={sidebarData.categories}
          recentPosts={sidebarData.recentPosts}
          tags={sidebarData.tags}
          relatedPosts={relatedBlogs}
        />
      </section>
    </div>
  );
}
