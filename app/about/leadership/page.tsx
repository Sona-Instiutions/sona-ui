import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import LeadershipSection from "@/components/aboutus/leadership/LeaderProfile";
import ExecutiveLeadershipSection from "@/components/aboutus/leadership/ExecutiveLeadershipSection";
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
            <MainBanner
                title="Visionary Leadership"
                highlight="Leadership"
                description="Meet the exceptional leaders who guide our institution toward excellence in education, research, and innovation."
                backgroundImage="/images/aboutus-banner.webp"
            />

            {/* LeadershipSection Section  */}
            <LeadershipSection />

            {/* ExecutiveLeadershipSection Section  */}
            <ExecutiveLeadershipSection />

            {/* CallToActionSection section  */}
            <CallToActionSection
                bgColor="bg-yellow-500"
                heading="Leadership Excellence"
                description="Experience the difference that visionary leadership makes. Join an institution where excellence is not just an aspiration, but a daily reality guided by exceptional leaders."
                cta1="Meet Our Faculty"
                cta2="Join Our Team"
                cta1Link="#apply"
                cta2Link="#visit"

            />

        </div>
    );
}
