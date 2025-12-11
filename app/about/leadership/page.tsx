import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import LeadershipSection from "@/components/aboutus/leadership/LeaderProfile";
import ExecutiveLeadershipSection from "@/components/aboutus/leadership/ExecutiveLeadershipSection";
// import CallToActionSection from "@/components/common/CallToActionSection";



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
            {/* Banner Section */}
            <MainBanner
                title="Visionary Leadership"
                highlight="Leadership"
                description="Driving innovation, excellence, and transformative education through strategic vision and industry-aligned leadership."
                backgroundImage="/images/leadership.webp"
            />

            {/* LeadershipSection Section  */}
            <LeadershipSection />

            {/* ExecutiveLeadershipSection Section  */}
            <ExecutiveLeadershipSection />

            {/* CallToActionSection section  */}
            {/* <CallToActionSection
                bgColor="bg-yellow-500"
                heading="Leadership Excellence"
                description=""
                cta1="Meet Our Faculty"
                cta2="Join the Team"
                cta1Link="/contact"
                cta2Link="/contact"

            /> */}

        </div>
    );
}
