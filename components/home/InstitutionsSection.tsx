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

export default function InstitutionsSection() {
  const institutions = [
    {
      id: 1,
      title: "Sona Tech School",
      description:
        "Empowering learners with future-ready engineering, digital technologies, and research-driven education.",
      image: "/images/school-1.webp",
      link: "#",
    },
    {
      id: 2,
      title: "Sona Finishing School",
      description:
        "Industry-aligned training that builds employability, communication skills, and professional readiness.",
      image: "/images/school-2.webp",
      link: "#",
    },
    {
      id: 3,
      title: "Sona Business School",
      description:
        "Tech-powered management programs grounded in industry guidance and global exposure.",
      image: "/images/school-3.webp",
      link: "#",
    },
     {
      id: 3,
      title: "Sona Business School",
      description:
        "Tech-powered management programs grounded in industry guidance and global exposure.",
      image: "/images/school-4.webp",
      link: "#",
    },
  ];

  return (
    <section className="py-7 md:py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Our <span className="text-yellow-500">Institutions</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          A group ecosystem delivering technology, business, and finishing-school excellence.

        </p>

        {/* Carousel */}
        <Carousel className="max-w-6xl mx-auto">
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
                      className="absolute bottom-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-500"
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
    </section>
  );
}
