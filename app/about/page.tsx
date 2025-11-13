import type { Metadata } from "next";
import AboutBanner from "@/components/aboutus/AboutBanner";

export const metadata: Metadata = {
  title: "SONA Institutions | Home",
  description:
    "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SONA Institutions | Home",
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

export default function AboutPage() {
  // You can later fetch this data from Strapi if needed

  return (
    <div className="min-h-screen bg-white">
      {/* AboutBanner section */}
      <AboutBanner />
    </div>
  );
}