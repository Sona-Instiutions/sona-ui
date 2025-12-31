import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import CallToActionSection from "@/components/common/CallToActionSection.component";
import IndustryMultiStepForm from "@/components/industry-colab/industrymultistepform.component";
import WhyCollaborate from "@/components/industry-colab/WhyCollaborate.component";
import CollaborationModels from "@/components/industry-colab/CollaborationModels.component";
import SuccessStories from "@/components/industry-colab/SuccessStories.component";

export const metadata: Metadata = {
  title: "SCALE | Industry Colab",
  description:
    "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SCALE | Industry Colab",
    description:
      "Discover SCALE – excellence in education, innovation, and industry collaboration.",
    type: "website",
    url: "https://scaleindia.in/",
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
        title="Partner With Us"
        highlight="Us"
        description="Collaborate with SCALE to access top-tier talent, cutting-edge research, and innovative solutions that drive your business forward"
        backgroundImage="/images/industry_collaboration_banner.webp"
      />
      {/* WhyCollaborate section  */}
      <WhyCollaborate />

      {/* CollaborationModels section  */}
      <CollaborationModels />
      
      {/* SuccessStories section  */}
      {/* <SuccessStories/> */}

      {/* IndustryCollaborationForm section  */}
      <IndustryMultiStepForm />

      {/* CallToActionSection section  */}
      {/* <CallToActionSection
        bgColor="bg-yellow-500"
        heading="Ready to Transform Your Business?"
        description="Join leading organizations worldwide who have accelerated their growth through strategic partnerships with SCALE. Let's create something extraordinary together."
        cta1="Schedule a Consultation"
        cta2="Download Partnership Guide"
        cta1Link="/contact"
        cta2Link="/contact"
      /> */}

    </div>
  );
}