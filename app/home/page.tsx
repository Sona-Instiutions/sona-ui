import type { Metadata } from "next";
import Image from "next/image";
import StatsSection from "@/components/home/StatsSection";
import AboutSection from "@/components/home/AboutSection";
import LegacySection from "@/components/home/LegacySection";
import WhyChooseSection from "@/components/home/WhyChooseSection";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SONA Institutions | Home",
  description:
    "Welcome to SONA Institutions. Explore our programs, placements, and world-class facilities for engineering, technology, and management education.",
  openGraph: {
    title: "SONA Institutions | Home",
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
  // You can later fetch this data from Strapi if needed
  const banners = [
    {
      id: 1,
      image: "/images/banner-image.webp",
      title: "Believe That's Right For Your Future",
      subtitle:
        "Teach Tomorrow's Technology Today — Your Problem, Our Challenge. Shaping innovators who will transform the world.",
      buttonText: "Get Started Today",
      buttonLink: "#",
    },
    {
      id: 2,
      image: "/images/banner-image.webp",
      title: "Empowering Innovation & Excellence",
      subtitle:
        "Join one of India's top institutions for Engineering, Technology & Management.",
      buttonText: "Explore Programs",
      buttonLink: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image section  */}
      <Carousel className="w-full  mx-auto relative">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="basis-full">
              {/* Background image */}
              <div className="relative w-full h-[543px]">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Text Overlay */}
                <div className="absolute max-w-[1332px] mx-auto inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-left text-white z-10">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
                    {banner.title.split("Future")[0]}
                    <span className="text-yellow-400">Future</span>
                  </h1>
                  <p className="mt-4 text-lg md:text-xl max-w-xl">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.buttonLink}
                    className="mt-6 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition-all"
                  >
                    {banner.buttonText}
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="left-5 bg-black/50 hover:bg-black/70 text-white" />
        <CarouselNext className="right-5 bg-black/50 hover:bg-black/70 text-white" />
      </Carousel>

      {/* Main Usp Section  */}
      <StatsSection />

      {/* About us section  */}
      <AboutSection />

      {/* Lagacy Section  */}
      <LegacySection />

      {/* Why Choose Us  */}
      <div className="why-scale-page">
        <WhyChooseSection />
      </div>

    </div>
  );
}
