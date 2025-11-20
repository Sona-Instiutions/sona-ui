import type { Metadata } from "next";
import HeroCarousel from "@/components/home/HeroCarousel";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import LegacySection from "@/components/home/LegacySection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import CollaborateSection from "@/components/home/CollaborateSection";
import InstitutionsSection from "@/components/home/InstitutionsSection";
import LifeAtScaleSection from "@/components/home/LifeAtScaleSection";
import NewsEventsSection from "@/components/home/NewsEventsSection";
import StudentStoriesSection from "@/components/home/StudentStoriesSection";
import IndustryLeadersSection from "@/components/home/IndustryLeadersSection";
import LatestBlogsSection from "@/components/home/LatestBlogsSection";
import CallToActionSection from "@/components/common/CallToActionSection";



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

export default function HomePage() {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero image section  */}
      <HeroCarousel/>

      {/* Main Usp Section  */}
      <StatsSection />

      {/* About us section  */}
      <AboutSection />

      {/* Lagacy Section  */}
      <LegacySection />

      {/* Why Choose Us  */}
      <div className="why-scale-page">
        <WhyChooseSection />
      </div>

      {/* Collaborate Section  */}
      <CollaborateSection />
      
      {/* InstitutionsSection section   */}
      <InstitutionsSection />
      
      {/* LifeAtScaleSection section  */}
      <LifeAtScaleSection />
      
      {/* NewsEventsSection section  */}
      <NewsEventsSection />
      
      {/* StudentStoriesSection section  */}
      <StudentStoriesSection />
      
      {/* IndustryLeadersSection section  */}
      <IndustryLeadersSection />
      
      {/* LatestBlogsSection section  */}
      <LatestBlogsSection />
      
      {/* CallToActionSection section  */}

      <CallToActionSection
        bgColor="bg-yellow-500"
        heading="Ready to Shape Your Future?"
        description="Join thousands of successful graduates who chose SCALE to transform their dreams into reality. Your journey to excellence starts here."
        
      />

    </div>
  );
}
