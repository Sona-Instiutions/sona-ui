import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import CallToActionSection from "@/components/common/CallToActionSection";
import IndustryCollaborationForm from "@/components/industry-colab/IndustryCollaborationForm";
import WhyCollaborate from "@/components/industry-colab/WhyCollaborate";
import CollaborationModels from "@/components/industry-colab/CollaborationModels";
import SuccessStories from "@/components/industry-colab/SuccessStories";

export const metadata: Metadata = {
  title: "SONA Institutions | Industry Colab",
  description:
    "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SONA Institutions | Industry Colab",
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
        title="Partner With Us"
        highlight="Us"
        description="Where future-ready talent meets global technology demands"
        backgroundImage="/images/aboutus-banner.webp"
      />
      {/* WhyCollaborate section  */}
      <WhyCollaborate />

      {/* CollaborationModels section  */}
      <CollaborationModels />
      
      {/* SuccessStories section  */}
      <SuccessStories/>

      {/* IndustryCollaborationForm section  */}
      <IndustryCollaborationForm />

      {/* CallToActionSection section  */}
      <CallToActionSection
        bgColor="bg-yellow-500"
        heading="Ready to Transform Your Business?"
        description="Join leading organizations worldwide who have accelerated their growth through strategic partnerships with SCALE. Let's create something extraordinary together."
        cta1="Schedule a Consultation"
        cta2="Download Partnership Guide"
        cta1Link="/contact"
        cta2Link="/contact"

      />

    </div>
  );
}