import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import PioneeringExcellenceSection from "@/components/aboutus/PioneeringExcellenceSection";
import SonaVelliappaLegacySection from "@/components/aboutus/SonaVelliappaLegacySection";
import TeachingApproachSection from "@/components/aboutus/TeachingApproachSection";
import GlobalPartnershipsSection from "@/components/aboutus/GlobalPartnershipsSection";
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

export default function AboutPage() {
  // You can later fetch this data from Strapi if needed

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <MainBanner
        title="About SCALE"
        highlight="SCALE"
        description="Where future-ready talent meets global technology demands"
        backgroundImage="/images/aboutus-banner.webp"
      />

      {/* PioneeringExcellenceSection Section  */}
      <PioneeringExcellenceSection />

      {/* SonaVelliappaLegacySection Section  */}
      <SonaVelliappaLegacySection />

      {/* TeachingApproachSection Section  */}
      <TeachingApproachSection />

      {/* GlobalPartnershipsSection Section  */}
      <GlobalPartnershipsSection />

      {/* CallToActionSection section  */}
      <CallToActionSection
        bgColor="bg-red-700"
        heading="Begin Your Journey With Sona Tech School"
        description="pe your future with us. Experience excellence, innovation, and global opportunities."
        cta1="Apply for Admission"
        cta2="Schedule Campus Visit"
        cta1Link="#apply"
        cta2Link="#visit"

      />

    </div>
  );
}