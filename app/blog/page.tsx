import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import BlogListing from "@/components/blog/BlogList";


export const metadata: Metadata = {
  title: "SONA Institutions | Blog",
  description:
    "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SONA Institutions | Contact Us",
    description:
      "Discover SONA Institutions – excellence in education, innovation, and industry collaboration.",
    type: "website",
    url: "https://sona.edu.in/",
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

export default function BlogListingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <MainBanner
        title="Blog"
        highlight="Listing"
        description="Reach our team easily for admissions, partnerships, or general queries—we’re here to assist you."
        backgroundImage="/images/contact.webp"
      />

      {/* BlogListing Section  */}
      <BlogListing />

    </div>
  );
}