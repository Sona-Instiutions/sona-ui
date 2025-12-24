import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import AboutMilestoneSection from "@/components/aboutus/milestone/AboutMilestone.component";
// import CallToActionSection from "@/components/common/CallToActionSection";



export const metadata: Metadata = {
  title: "SCALE | Milestone",
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
          title="Our "
          highlight="Milestones"
          description=""
          backgroundImage="/images/milestone.webp"
        />

        {/* About Milestones Section  */}
        <AboutMilestoneSection />

        {/* CallToActionSection section  */}
        {/* <CallToActionSection
          bgColor="bg-yellow-500"
          heading="Explore Our Institutions"
          description="Discover the diverse academic programs and world-class facilities that make SCALE a leader in higher education. Join thousands of students who have transformed their lives through our innovative learning experiences."
          cta1="View All Programs"
          cta2="Campus Tour"
          cta1Link="/contact"
          cta2Link="/contact"
        /> */}
      </div>
    );
}
