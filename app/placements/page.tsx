import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import PlacementStatisticsSection from "@/components/placements/PlacementStatistics.component";
import HowDifferentSection from "@/components/placements/HowDifferent.component";
import HiringPartnersSection from "@/components/placements/HiringPartners.component";
import ProcessFlowSection from "@/components/placements/ProcessFlow.component";
import IndustryGallerySection from "@/components/placements/IndustryGallery.component";
import SuccessStoriesSection from "@/components/placements/SuccessStories.component";
import CallToActionSection from "@/components/common/CallToActionSection.component";

export const metadata: Metadata = {
    title: "SCALE | Placements",
    description:
        "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SCALE | Placements",
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
          title=""
          highlight="Placements"
          description="Built for industry. Ready for the world."
          backgroundImage="/images/placements/placements_banner.webp"
        />

        <PlacementStatisticsSection />
        <HowDifferentSection />
        {/* <HiringPartnersSection /> */}
        <ProcessFlowSection />
        {/* <IndustryGallerySection /> */}
        {/* <SuccessStoriesSection /> */}

        {/* CallToActionSection section  */}
        {/* <CallToActionSection
          bgColor="bg-yellow-500"
          heading="Partner With Us"
          description="Access exceptional talent from SCALE's diverse programs. Our graduates are industry-ready, innovative, and committed to excellence. Join our network of
leading hiring partners."
          cta1="Become a Hiring Partner"
          cta2="Schedule Campus Visit"
          cta1Link="/contact"
          cta2Link="/contact"
        /> */}
      </div>
    );
}