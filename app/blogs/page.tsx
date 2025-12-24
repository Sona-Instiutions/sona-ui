import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import { BlogsPageClient } from "@/components/blog/BlogsPageClient.component";
import { getBlogs } from "@/services/server/blogs.server";
import { BLOG_PAGE_SIZE } from "@/constants/blog.constants";

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "SONA Institutions | Blog",
  description: "Explore insights, news, and updates from SONA Institutions.",
  openGraph: {
    title: "SONA Institutions | Blog",
    description: "Explore insights, news, and updates from SONA Institutions.",
    type: "website",
    url: "https://sona.edu.in/blog",
    siteName: "SONA Institutions",
    images: [
      {
        url: "/images/home-banner.jpg",
        width: 1200,
        height: 630,
        alt: "SONA Institutions Campus",
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
