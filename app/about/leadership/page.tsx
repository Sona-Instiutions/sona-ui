import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import LeadershipSection from "@/components/aboutus/leadership/LeaderProfile.component";
import ExecutiveLeadershipSection from "@/components/aboutus/leadership/ExecutiveLeadershipSection.component";
// import CallToActionSection from "@/components/common/CallToActionSection";



export const metadata: Metadata = {
    title: "SCALE | Leadership",
    description:
        "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SCALE | Leadership",
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
