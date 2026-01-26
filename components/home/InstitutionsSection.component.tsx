"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function InstitutionsSection() {
  const institutions = [
    {
      id: 1,
      title: "Sona Global Capability Centre ",
      description: "Build, scale, and transform world-class enterprise innovation hubs.",
      image: "/images/gcc.webp",
      link: "/institutions/sona-gcc",
    },
    {
      id: 2,
      title: "Sona School of Business & Management",
      description:
        "India's tech-powered school for globally conscious business leaders.",
      image: "/images/sona_business_school.webp",
      link: "https://pgdm.scaleindia.in/",
    },
    {
      id: 3,
      title: "Sona Tech School",
      description:
        "Day-one-ready talent for global technology ecosystems.",
      image: "/images/sona_tech_school.webp",
      link: "/institutions/sona-tech-school",
    },
    {
      id: 4,
      title: "Sona Finishing School",
      description:
        "12-week bootcamp bridging academic learning and corporate expectations.",
      image: "/images/sona_finishing_school.webp",
      link: "/institutions/sona-finishing-school",
    },
    {
      id: 5,
      title: "AI Consulting",
      description:
        "Ecosystem where AI expertise meets entrepreneurial energy to scale ventures.",
      image: "/images/ai_consulting.webp",
      link: "/institutions/ai-consultancy",
    },
    {
      id: 6,
      title: "Flexi Staffing ",
      description:
        "Scalable, compliant, on-demand workforce solutions for rapid growth.",
      image: "/images/flexi-staffing.webp",
      link: "/institutions/sona-flexi-staffing",
    },

  ];

  return (
    <section className="py-4 md:py-10 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our <span className="text-yellow-500">Verticals</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">A transformational ecosystem powered by six integrated verticals that bridge academia, industry, and innovation to develop world-class talent and scale high-impact enterprises.

        </p>

        {/* Carousel */}

        <Carousel
          className="max-w-6xl mx-auto"
          plugins={[
            Autoplay({
              delay: 3000, // 3 seconds delay
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent className="-ml-4">
            {institutions.map((inst) => (
              <CarouselItem
                key={inst.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer">
                  {/* Background image */}
                  <Image
                    src={inst.image}
                    alt={inst.title}
                    width={400}
                    height={250}
                    className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500" />

                  {/* Text content */}
                  <div className="absolute inset-0 flex flex-col justify-start items-start p-6 text-left text-white">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {inst.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-6 opacity-90">
                      {inst.description}
                    </p>

                    {/* Button — hidden by default, slides up on hover */}
                    <Link
                      href={inst.link}
                      className="
                        absolute bottom-6
                        bg-red-600 hover:bg-red-700 text-white text-sm font-semibold
                        px-4 py-2 rounded-md
                        transition-all duration-500

                        /* MOBILE (default) */
                        opacity-100 translate-y-0

                        /* DESKTOP: hide by default */
                        md:opacity-0 md:translate-y-6

                        /* DESKTOP: show on hover */
                        md:group-hover:opacity-100 md:group-hover:translate-y-0
                      "
                    >
                      Learn More
                    </Link>

                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious className="left-[-2rem] bg-white text-black shadow-md hover:bg-gray-100" />
          <CarouselNext className="right-[-2rem] bg-white text-black shadow-md hover:bg-gray-100" />
        </Carousel>
      </div>
    </section >
  );
}
