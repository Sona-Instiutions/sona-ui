import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getRecentBlogs } from "@/services/server/blogs.server";
import { StickyShareButtons } from "@/components/common/StickyShareButtons.component";
import { RichTextRenderer } from "@/components/common/RichTextRenderer.component";
import { AuthorSection } from "@/components/common/AuthorSection.component";
import { CommentSection } from "@/components/common/CommentSection.component";
import { ContentCard } from "@/components/common/ContentCard.component";
import { CategoryBadge } from "@/components/common/CategoryBadge.component";
import { SearchSuggestions } from "@/components/common/SearchSuggestions.component";
import { buildMediaUrl } from "@/utils/common.utils";
import { formatDate } from "@/utils/date.utils";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Fetch recent blogs for sidebar/related
  const recentBlogs = await getRecentBlogs({ limit: 3, excludeId: blog.id });

  const bannerImageUrl = buildMediaUrl(blog.bannerImage);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://sona.edu.in"}/blog/${slug}`;

  return (
    <div className="bg-white min-h-screen">
      <StickyShareButtons title={blog.title} url={shareUrl} />
      
      {/* Hero / Header */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container py-10">
          <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeftIcon className="mr-2" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              {blog.categories?.[0] && (
                <CategoryBadge name={blog.categories[0].name} color={blog.categories[0].color} />
              )}
              <span className="text-sm text-gray-500">{formatDate(blog.publishedDate)}</span>
              {blog.readTime && <span className="text-sm text-gray-400">• {blog.readTime} min read</span>}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {blog.title}
            </h1>
            
            {blog.excerpt && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                {blog.excerpt}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <main className="lg:col-span-8">
          {bannerImageUrl && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-sm">
              <Image 
                src={bannerImageUrl} 
                alt={blog.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-12 text-gray-700">
            {typeof blog.content === 'string' ? (
              <RichTextRenderer content={blog.content} />
            ) : (
              <p className="italic text-gray-500">[Rich Text Block Content not supported in this view yet]</p>
            )}
          </div>

          <div className="border-t border-gray-100 pt-10 mb-10">
            <AuthorSection author={blog.author} />
          </div>

          <div id="comments" className="border-t border-gray-100 pt-10">
            <CommentSection type="blog" documentId={blog.documentId} />
          </div>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Search Widget */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
            <SearchSuggestions type="blog" placeholder="Search articles..." onSearch={() => {}} />
          </div>

          {/* Recent/Related Posts */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              Recent Articles
              <span className="h-px flex-1 bg-gray-100"></span>
            </h3>
            <div className="space-y-6">
              {recentBlogs.map((post) => (
                <ContentCard
                  key={post.id}
                  title={post.title}
                  href={`/blog/${post.slug}`}
                  image={post.thumbnail}
                  date={formatDate(post.publishedDate)}
                  category={post.categories?.[0]}
                  buttonText="Read"
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
