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
      name: "Priya Sharma",
      year: "Class of 2019",
      role: "Senior Software Engineer, Google",
      image: "/images/alumni/priya.jpg",
      quote:
        "SCALE didn’t just give me a degree; it gave me the confidence to innovate. The hands-on projects and industry mentorship prepared me for the challenges at Google. I’m now leading AI initiatives that impact millions of users globally.",
    },
    {
      id: 2,
      name: "Arjun Patel",
      year: "Class of 2018",
      role: "Founder & CEO, TechVenture Solutions",
      image: "/images/alumni/arjun.jpg",
      quote:
        "The entrepreneurship ecosystem at SCALE was incredible. From ideation to funding, every step was supported. Today, my startup has raised $50M and employs over 200 people. The journey started in SCALE’s incubation center.",
    },
    {
      id: 3,
      name: "Dr. Meera Krishnan",
      year: "Class of 2017",
      role: "Lead Researcher, ISRO",
      image: "/images/alumni/meera.jpg",
      quote:
        "My research at SCALE on satellite technology directly contributed to my role in Chandrayaan-3 mission. The rigorous training and research opportunities here shaped my career in space exploration. Proud to be a SCALE alumna.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* ===== Heading ===== */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="w-20 h-[2px] bg-[#002D72] mx-auto mb-4 rounded-sm" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Alumni <span className="text-yellow-500">Success Stories</span>
          </h2>
          <p className="mt-4 text-gray-600">
            Hear from our distinguished graduates who are making a difference in
            their fields and communities worldwide.
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
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={alumni.image}
            alt={alumni.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

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
