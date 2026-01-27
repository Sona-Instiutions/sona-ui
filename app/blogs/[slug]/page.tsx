import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getBlogBySlug, getRecentBlogs, getBlogCategories, getBlogTags } from "@/services/server/blogs.server";
import { ContentHero } from "@/components/common/ContentHero.component";
import { AuthorSection } from "@/components/common/AuthorSection.component";
import { CommentSection } from "@/components/common/CommentSection.component";
import { ContentSidebar } from "@/components/common/ContentSidebar.component";
import { ContentCard } from "@/components/common/ContentCard.component";
import { ShareButtons } from "@/components/common/ShareButtons.component";
import { StickyShareButtons } from "@/components/common/StickyShareButtons.component";
import { ViewCountTracker } from "@/components/common/ViewCountTracker.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { RECENT_BLOGS_LIMIT } from "@/constants/blog.constants";
import { buildMediaUrl } from "@/utils/common.utils";
import { formatDate } from "@/utils/date.utils";

export const revalidate = 600; // 10 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | SCALE",
    };
  }

  const imageUrl = buildMediaUrl(blog.bannerImage) || buildMediaUrl(blog.thumbnail);

  return {
    title: `${blog.title} | SCALE`,
    description: blog.metaDescription || blog.excerpt || `Read ${blog.title} on SCALE Blog`,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt || "",
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: blog.publishedDate,
      authors: blog.author ? [blog.author.name] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Parallel data fetching
  const [blog, recentBlogs, categories, tags] = await Promise.all([
    getBlogBySlug(slug),
    getRecentBlogs({ limit: RECENT_BLOGS_LIMIT }),
    getBlogCategories(),
    getBlogTags(),
  ]);

  if (!blog) {
    notFound();
  }

  // Filter out current blog from recent blogs
  const sidebarRecentBlogs = recentBlogs.filter((b) => b.id !== blog.id);

  // Related blogs (from blog data or fallback to recent)
  const relatedBlogs =
    blog.relatedBlogs && blog.relatedBlogs.length > 0
      ? blog.relatedBlogs
      : [];

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Blog", href: "/blogs" }, { label: blog.title }];

  return (
    <main className='min-h-screen bg-white pb-20'>
      <ViewCountTracker type='blog' documentId={blog.documentId} />

      <StickyShareButtons title={blog.title} />

      <ContentHero
        type='blog'
        title={blog.title}
        image={blog.bannerImage}
        breadcrumbs={breadcrumbs}
        categories={blog.categories}
        date={blog.publishedDate}
        author={blog.author}
        viewCount={blog.viewCount}
        readTime={blog.readTime}
        excerpt={blog.excerpt}
      />

      <div className='container mx-auto max-w-6xl py-12 md:py-20 px-6 sm:px-10 md:px-10 lg:px-0 '>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            {typeof blog.content === "string" ? (
              <MarkdownContent content={blog.content} className='mb-16' />
            ) : (
              <p className='italic text-gray-500 mb-16'>[Rich Text Content]</p>
            )}

            {/* Social Share (Mobile Only) */}
            <div className='py-10 border-y border-gray-100 mb-16 lg:hidden'>
              <ShareButtons title={blog.title} />
            </div>

            {/* Author Bio */}
            {/* <div className='mb-16'>
              <AuthorSection author={blog.author} />
            </div> */}

            {/* Related Blogs */}
            {relatedBlogs.length > 0 && (
              <div className='mb-16'>
                <h3 className='text-2xl font-bold mb-8'>Related Articles</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {relatedBlogs.map((related) => (
                    <ContentCard
                      key={related.id}
                      title={related.title}
                      href={`/blogs/${related.slug}`}
                      image={related.thumbnail || related.bannerImage}
                      date={formatDate(related.publishedDate)}
                      category={related.categories?.[0]}
                      buttonText='Read Article'
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {blog.showComments && (
              <div className='mt-16 pt-16 border-t border-gray-100'>
                <CommentSection type='blog' documentId={blog.documentId} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            <div className='sticky top-24'>
              <ContentSidebar
                type='blog'
                recentItems={sidebarRecentBlogs}
                categories={categories}
                tags={tags}
                basePath='/blogs'
                recentTitle='Recent Articles'
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
