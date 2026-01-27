import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import { BlogsPageClient } from "@/components/blog/BlogsPageClient.component";
import { getBlogs } from "@/services/server/blogs.server";
import { BLOG_PAGE_SIZE } from "@/constants/blog.constants";

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "SCALE | Blog",
  description: "Explore insights, news, and updates from SCALE.",
  openGraph: {
    title: "SCALE | Blog",
    description: "Explore insights, news, and updates from SCALE.",
    type: "website",
    url: "https://scaleindia.in/blogs",
    siteName: "SCALE",
    images: [
      {
        url: "/images/home-banner.jpg",
        width: 1200,
        height: 630,
        alt: "SCALE Campus",
      },
    ],
  },
};

export default async function BlogListingPage() {
  // Fetch initial data to support ISR
  const initialData = await getBlogs({
    page: 1,
    pageSize: BLOG_PAGE_SIZE,
  });

  return (
    <div className='min-h-screen bg-white'>
      {/* Banner Section */}
      <MainBanner
        title='Blog'
        highlight='Insights'
        description='Latest news, research, and stories from our community.'
        backgroundImage='/images/contact.webp'
      />

      {/* Blogs Client Section */}
      <BlogsPageClient initialData={initialData} />
    </div>
  );
}
