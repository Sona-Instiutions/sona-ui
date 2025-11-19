import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection";
import ContactSection from "@/components/contact/ContactSection";
import FindOurCampusSection from "@/components/contact/FindOurCampusSection";

export const metadata: Metadata = {
    title: "SONA Institutions | Contact Us",
    description:
        "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SONA Institutions | Contact Us",
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

export default function AboutPage() {
    // You can later fetch this data from Strapi if needed

    return (
        <div className="min-h-screen bg-white">
            {/* Banner Section */}
            <MainBanner
                title="Contact Us"
                highlight="Us"
                description="Get in touch with SCALE. We're here to help you start your journey towards academic excellence and career success."
                backgroundImage="/images/contact.webp"
            />

            {/* ContactForm Section  */}
            <ContactSection />

            {/* Find Our Campus Section  */}
            <FindOurCampusSection/>

        </div>
    );
}