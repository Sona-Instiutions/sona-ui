import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import AboutVisionSection from "@/components/aboutus/aboutvision/AboutVision.component";
import AboutCoreValuesSection from "@/components/aboutus/aboutvision/AboutCoreValues.component";
// import CallToActionSection from "@/components/common/CallToActionSection";



export const metadata: Metadata = {
  title: "SCALE | About Vision",
  description:
    "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SCALE | Milestone",
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

export default function HomePage() {

    return (
      <div className="min-h-screen bg-white">
        {/* Banner Section */}
        <MainBanner
          title="Vision, Mission and "
          highlight="Core Values"
          description="Empowering global businesses through innovation, integrity, and a century-long legacy of excellence."
          backgroundImage="/images/vision.webp"
        />

        {/* About Vision Mission Section  */}
        <AboutVisionSection />

        {/* About Core Values Section  */}
        <AboutCoreValuesSection />

        {/* CallToActionSection section  */}
        {/* <CallToActionSection
          bgColor="bg-yellow-500"
          heading="Join Our Vision"
          description="Become part of a global journey, shaping innovative solutions and advancing the next century of excellence."
          cta1="Explore Career Opportunities"
          cta2="Partner With Us"
          cta1Link="/contact"
          cta2Link="/contact"
        /> */}
      </div>
    );
}
