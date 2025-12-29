import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import StudentActivitiesSection from "@/components/lifeatscale/StudentActivities.component";
import CampusGallerySection from "@/components/lifeatscale/CampusGallery.component";
import InteractiveLabsSection from "@/components/lifeatscale/InteractiveLabsSection.component";
import SuccessStoriesSection from "@/components/lifeatscale/SuccessStories.component";
import ExploreInstitutions from "@/components/lifeatscale/ExploreInstitutions.component";

export const metadata: Metadata = {
    title: "SCALE | Life at Scale",
    description:
        "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SCALE | Life at Scale",
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
                title="Life @ "
                highlight="Scale"
                description="Experience the Vibrant campus culture where innovation meets tradition and dreams become reality"
                backgroundImage="/images/contact_us.webp"
            />

            <StudentActivitiesSection />
            <CampusGallerySection />
            <SuccessStoriesSection />
            <InteractiveLabsSection />
            <ExploreInstitutions />           

        </div>
    );
}