import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import ContactSection from "@/components/contact/ContactSection.component";
// import FindOurCampusSection from "@/components/contact/FindOurCampusSection";

export const metadata: Metadata = {
    title: "SCALE | Contact Us",
    description:
        "Welcome to SCALE. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
    openGraph: {
        title: "SCALE | Contact Us",
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
                title="Contact Us"
                highlight="Us"
                description="For partnership discussions, talent needs, industry trained resources or ecosystem collaboration opportunities, SCALE welcomes dialogue with international organizations seeking transformational impact in India and beyond."
                backgroundImage="/images/contact_us.webp"
            />

            {/* ContactForm Section  */}
            <ContactSection />

            {/* Find Our Campus Section  */}
            {/* <FindOurCampusSection/> */}

        </div>
    );
}