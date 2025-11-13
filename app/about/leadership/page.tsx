import type { Metadata } from "next";
import BreadcrumbBanner from "@/components/common/BreadcrumbBanner";
import CallToActionSection from "@/components/common/CallToActionSection";



export const metadata: Metadata = {
    title: "SONA Institutions | Leadership",
    description:
        "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SONA Institutions | Leadership",
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
            {/* BreadcrumbBanner Section  */}
            <BreadcrumbBanner
                title="Visionary Leadership"
                highlight="Leadership"
                description="Meet the exceptional leaders who guide our institution toward excellence in education, research, and innovation."
                backgroundImage="/images/aboutus-banner.webp"
            />



            {/* CallToActionSection section  */}

            <CallToActionSection
                bgColor="bg-yellow-500"
                heading="Ready to Shape Your Future?"
                description="Join thousands of successful graduates who chose SCALE to transform their dreams into reality. Your journey to excellence starts here."

            />

        </div>
    );
}
