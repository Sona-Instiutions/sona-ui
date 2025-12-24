import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import PioneeringExcellenceSection from "@/components/aboutus/PioneeringExcellenceSection.component";
import SonaVelliappaLegacySection from "@/components/aboutus/SonaVelliappaLegacySection.component";
import TeachingApproachSection from "@/components/aboutus/TeachingApproachSection.component";
import GlobalPartnershipsSection from "@/components/aboutus/GlobalPartnershipsSection.component";
import CallToActionSection from "@/components/common/CallToActionSection.component";

export const metadata: Metadata = {
  title: "SCALE | Home",
  description:
    "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SCALE | Home",
    description:
      "Discover SCALE – excellence in education, innovation, and industry collaboration.",
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
        bgColor="bg-yellow-500"
        heading="Begin Your Journey With SCALE"
        description="Empowering learners with future-ready skills, global certifications, and hands-on expertise to build impactful careers in the world’s most advanced technology ecosystems."
        cta1="Apply for Admission"
        cta2="Schedule Campus Visit"
        cta1Link="/contact"
        cta2Link="/contact"

      />

    </div>
  );
}