import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import AboutVisionSection from "@/components/aboutus/aboutvision/AboutVision.component";
import AboutCoreValuesSection from "@/components/aboutus/aboutvision/AboutCoreValues.component";
import CallToActionSection from "@/components/common/CallToActionSection";



export const metadata: Metadata = {
  title: "SONA Institutions | About Vision",
  description:
    "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SONA Institutions | Milestone",
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
        {/* Banner Section */}
        <MainBanner
          title="Vision, Mission and "
          highlight="Core Values"
          description="Discover the foundational principles that drive our commitment to educational excellence and innovation"
          backgroundImage="/images/aboutus-banner.webp"
        />

        {/* About Vision Mission Section  */}
        <AboutVisionSection />

        {/* About Core Values Section  */}
        <AboutCoreValuesSection />

        {/* CallToActionSection section  */}
        <CallToActionSection
          bgColor="bg-yellow-500"
          heading="Join Our Vision"
          description="Be part of an institution that's shaping the future of education and innovation. Experience the transformative power of our values-driven approach to learning and discovery."
          cta1="Explore Programs"
          cta2="Schedule Visit"
          cta1Link="#apply"
          cta2Link="#visit"
        />
      </div>
    );
}
