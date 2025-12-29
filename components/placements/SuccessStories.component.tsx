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

const stories = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Software Engineer",
    company: "Google India",
    image: "/images/testimonials/priya.jpg",
    quote:
      "SCALE’s rigorous curriculum and industry exposure prepared me exceptionally well for Google’s challenging interview process. The placement team’s guidance was invaluable in securing my dream job.",
  },
  {
    id: 2,
    name: "Arjun Patel",
    role: "Data Scientist",
    company: "Microsoft",
    image: "/images/testimonials/arjun.jpg",
    quote:
      "The practical projects and research opportunities at SCALE gave me a competitive edge. Microsoft recognized my skills immediately, and I’m now working on cutting-edge AI solutions.",
  },
  {
    id: 3,
    name: "Kavya Reddy",
    role: "Product Manager",
    company: "Amazon",
    image: "/images/testimonials/kavya.jpg",
    quote:
      "SCALE’s emphasis on innovation and entrepreneurship shaped my product thinking. The placement process was smooth, and I landed my role at Amazon with a package that exceeded expectations.",
  },
  {
    id: 4,
    name: "Rohit Kumar",
    role: "Security Analyst",
    company: "Meta",
    image: "/images/testimonials/rohit.jpg",
    quote:
      "The cybersecurity specialization at SCALE is world-class. Meta’s security team was impressed with my technical depth and hands-on experience from real-world projects.",
  },
  {
    id: 5,
    name: "Ananya Singh",
    role: "ML Engineer",
    company: "Tesla",
    image: "/images/testimonials/ananya.jpg",
    quote:
      "Working on autonomous vehicle AI at Tesla was my dream. SCALE’s advanced AI curriculum and research projects made that dream a reality with an incredible compensation package.",
  },
  {
    id: 6,
    name: "Vikram Joshi",
    role: "Cloud Architect",
    company: "Netflix",
    image: "/images/testimonials/vikram.jpg",
    quote:
      "Netflix’s cloud infrastructure fascinated me during my studies at SCALE. The placement team connected me with the right opportunity, and I’m now architecting solutions for millions of users.",
  },
];

export default function SuccessStories() {
  return (
    <section className="w-full py-20 bg-[#f9fafb]">
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== Heading ===== */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Success <span className="text-yellow-500">Stories</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Hear from our accomplished graduates who have made their mark in
            leading companies across the globe
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
              {stories.map((story) => (
                <CarouselItem
                  key={story.id}
                  className="basis-full sm:basis-1/2 px-2"
                >
                  <StoryCard {...story} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Bottom Arrows */}
            <div className="flex justify-center gap-6 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
            {/* <div className="flex justify-center gap-4 mt-6">
              <CarouselPrevious />
              <CarouselNext />
            </div> */}
          </Carousel>
        </div>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              {...story}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Card Component ===== */

function StoryCard({
  name,
  role,
  company,
  image,
  quote,
}: {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-yellow-500 font-medium">{role}</p>
          <p className="text-xs text-gray-500">{company}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed italic">“{quote}”</p>
    </div>
  );
}
