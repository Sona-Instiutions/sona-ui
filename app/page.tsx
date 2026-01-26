import type { Metadata } from "next";
import HeroCarousel from "@/components/home/HeroCarousel.component";
import StatsSection from "@/components/home/StatsSection.component";
import AboutSection from "@/components/home/AboutSection.component";
import LegacySection from "@/components/home/LegacySection.component";
import WhyChooseSection from "@/components/home/WhyChooseSection.component";
import CollaborateSection from "@/components/home/CollaborateSection.component";
import InstitutionsSection from "@/components/home/InstitutionsSection.component";
import LifeAtScaleSection from "@/components/home/LifeAtScaleSection.component";
import NewsEventsSection from "@/components/home/NewsEventsSection.component";
import StudentStoriesSection from "@/components/home/StudentStoriesSection.component";
import IndustryLeadersSection from "@/components/home/IndustryLeadersSection.component";
import LatestBlogsSection from "@/components/home/LatestBlogsSection.component";
import { getBlogs } from "@/services/server/blogs.server";
import CallToActionSection from "@/components/common/CallToActionSection.component";
import { getEvents } from "@/services/server/events.server";

// ISR: Revalidate every 10 minutes (same as events page)
export const revalidate = 600;

const blogsResponse = await getBlogs({
  page: 1,
  pageSize: 10, // fetch more, UI will limit
});
const blogs = blogsResponse.data; // fetch all blogs
export const metadata: Metadata = {
  title: "SCALE | Home",
  description:
    "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SCALE | Home",
    description: "Discover SCALE – excellence in education, innovation, and industry collaboration.",
    type: "website",
    url: "https://sona.edu.in/",
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

export default async  function HomePage() {
 const response = await getEvents({
    page: 1,
    pageSize: 9,
  });

  // ✅ IMPORTANT FIX
  const events = response?.data ?? [];
  return (
    <div className='min-h-screen bg-white'>
      {/* Hero image section  */}
      <HeroCarousel />

      {/* Main Usp Section  */}
      <StatsSection />

      {/* About us section  */}
      <AboutSection />

      {/* Lagacy Section  */}
      <LegacySection />

      {/* Why Choose Us  */}
      <div className='why-scale-page'>
        <WhyChooseSection />
      </div>

      {/* Collaborate Section  */}
      <CollaborateSection />

      {/* InstitutionsSection section   */}
      <InstitutionsSection />

      {/* LifeAtScaleSection section  */}
      <LifeAtScaleSection />

      {/* NewsEventsSection section  */}
      {events.length > 0 && <NewsEventsSection events={events}/>}

      {/* StudentStoriesSection section  */}
      <StudentStoriesSection />

      {/* IndustryLeadersSection section  */}
      <IndustryLeadersSection />

      {/* LatestBlogsSection section  */}
      <LatestBlogsSection blogs={blogs} />

      {/* CallToActionSection section  */}

      <CallToActionSection
        bgColor='bg-yellow-500'
        heading='Ready to Transform Your Career?'
        description='Join our tech-driven business school designed to shape innovators, leaders, and global achievers.'
        cta1="Apply for admission"
        cta2="Schedule a campus visit"
        cta1Link="/contact"
        cta2Link="/contact"
      />
    </div>
  );
}
