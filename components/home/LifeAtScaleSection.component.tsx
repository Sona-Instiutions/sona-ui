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

export default function LifeAtScaleSection() {
  const images = [
    { id: 1, src: "/images/life-1.webp", alt: "Campus Celebration", title: "Cultural Festivals", subtitle: "Celebrating diversity through vibrant cultural events", height: "h-[200px]" },
    { id: 2, src: "/images/img1.webp", alt: "Students Collaboration", title: "Collaborative Learning", subtitle: "Teamwork and creativity at SCALE", height: "h-[260px]" },
    { id: 3, src: "/images/mba-tead-classroom.webp", alt: "Seminar and Workshop", title: "Workshops & Seminars", subtitle: "Learning beyond classrooms", height: "h-[280px]" },
    { id: 4, src: "/images/life-4.webp", alt: "Classroom Learning", title: "Classroom Learning", subtitle: "Interactive and engaging education", height: "h-[260px]" },
    { id: 5, src: "/images/life-5.webp", alt: "Graduation Ceremony", title: "Sports Day", subtitle: "Celebrating student achievements", height: "h-[240px]" },
    { id: 6, src: "/images/img3.webp", alt: "Sports Event", title: "Sports & Fitness", subtitle: "Building champions and teamwork", height: "h-[300px]" },
    { id: 7, src: "/images/img2.webp", alt: "Student Discussion", title: "Student Interaction", subtitle: "Collaborative academic experiences", height: "h-[260px]" },
    { id: 8, src: "/images/img4.webp", alt: "Cultural Dance", title: "Cultural Fest", subtitle: "Celebrating art, culture and unity", height: "h-[200px]" },
  ];

  return (
    <section className="py-4 md:py-10 bg-gray-50">
      <div className="container mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Life at <span className="text-yellow-500">SCALE</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">
          A fully residential ecosystem designed for learning, collaboration, leadership, and high-performance growth.

        </p>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden ">
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000, // 3 seconds delay
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {images.map((img) => (
                <CarouselItem key={img.id} className="basis-full sm:basis-1/2 px-2">
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-md group cursor-pointer w-full h-64`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>

                    {/* Text */}
                    <div className="absolute bottom-0 left-0 p-5 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <h3 className="font-semibold text-lg">{img.title}</h3>
                      <p className="text-sm text-gray-200">{img.subtitle}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows */}
            <div className="flex justify-center gap-4 mt-4">
              <CarouselPrevious className="bg-black/50 text-white left-0" />
              <CarouselNext className="bg-black/50 text-white right-0" />
            </div>
          </Carousel>
        </div>

        {/* DESKTOP MASONRY GRID (unchanged) */}
        <div className="hidden md:block">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance] space-y-4">
            {images.map((img) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-2xl shadow-md group cursor-pointer break-inside-avoid ${img.height}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>

                <div className="absolute bottom-0 left-0 p-5 text-white opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="font-semibold text-lg">{img.title}</h3>
                  <p className="text-sm text-gray-200">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        {/* <button className="mt-4 md:mt-12 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-md transition">
          Explore Campus
        </button> */}

      </div>
    </section>
  );
}
