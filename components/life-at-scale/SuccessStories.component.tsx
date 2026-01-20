"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function AlumniSuccessStoriesSection() {
  const alumni = [
    {
      id: 1,
      name: "Aarav Mehta",
      year: "",
      role: "",
      image: "/images/life-at-scale/testimonials.webp",
      quote:
        "I’m excited to join SCALE because it feels less like a traditional campus and more like an innovation ecosystem. The blend of AI, industry exposure, and entrepreneurship is exactly what I was looking for to build a future-ready career.",
    },
    {
      id: 2,
      name: "Nandini Rao",
      year: "",
      role: "",
      image: "/images/life-at-scale/testimonials.webp",
      quote:
        "What attracted me to SCALE is the ‘by the industry, for the industry’ approach. Knowing that learning here is shaped by real CXOs, startups, and global enterprises makes me confident that I’ll be industry-ready from day one.",
    },
    {
      id: 3,
      name: "Karthik Srinivasan",
      year: "",
      role: "",
      image: "/images/life-at-scale/testimonials.webp",
      quote:
        "SCALE represents opportunity beyond classrooms—hackathons, startup incubation, global exposure, and real-world problem solving. I’m genuinely looking forward to being part of a campus where ideas turn into impact.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* ===== Heading ===== */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Voices of the <span className="text-yellow-500">Next Generation</span>
          </h2>
          <p className="mt-4 text-gray-600">
          Hear from aspiring students who are excited to begin their journey at SCALE—drawn by industry-led learning, innovation culture, and global opportunities.
          </p>
        </div>

        {/* ===== MOBILE / TABLET CAROUSEL ===== */}
        <div className="md:hidden">
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {alumni.map((a) => (
                <CarouselItem
                  key={a.id}
                  className="basis-full sm:basis-1/2 px-2"
                >
                  <AlumniCard alumni={a} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Bottom arrows (same pattern as Placements page) */}
            <div className="flex justify-center gap-6 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {alumni.map((a) => (
            <AlumniCard
              key={a.id}
              alumni={a}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= Card ================= */

function AlumniCard({
  alumni,
}: {
  alumni: {
    name: string;
    year: string;
    role: string;
    image: string;
    quote: string;
  };
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-8 text-center h-full">
      {/* Avatar */}
      {/* <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={alumni.image}
            alt={alumni.name}
            fill
            className="object-cover"
          />
        </div>
      </div> */}

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900">{alumni.name}</h3>

      {/* Year */}
      <p className="text-sm font-semibold text-yellow-500 mt-1">
        {alumni.year}
      </p>

      {/* Role */}
      <p className="text-sm text-gray-500 mt-1">{alumni.role}</p>

      {/* Quote */}
      <p className="mt-6 text-sm text-gray-600 leading-relaxed italic">
        “{alumni.quote}”
      </p>

      {/* Stars */}
      <div className="flex justify-center mt-6 gap-1 text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    </div>
  );
}
