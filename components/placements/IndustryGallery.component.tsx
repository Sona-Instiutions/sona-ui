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

const images = [
  { id: 1, src: "/images/industry-visits/1.jpg" },
  { id: 2, src: "/images/industry-visits/2.jpg" },
  { id: 3, src: "/images/industry-visits/3.jpg" },
  { id: 4, src: "/images/industry-visits/4.jpg" },
  { id: 5, src: "/images/industry-visits/5.jpg" },
  { id: 6, src: "/images/industry-visits/6.jpg" },
  { id: 7, src: "/images/industry-visits/7.jpg" },
  { id: 8, src: "/images/industry-visits/8.jpg" },
];

export default function IndustryVisitsGallery() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== Heading ===== */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Industry <span className="text-yellow-500">Visits Gallery</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
            Experience our dynamic industry partnerships through exclusive
            visits, workshops, and collaborative sessions with leading companies
          </p>
        </div>

        {/* ===== MOBILE / TABLET CAROUSEL ===== */}
        <div className="md:hidden mb-20">
          <Carousel
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: true,
              }),
            ]}
          >
            <CarouselContent>
              {images.map((img) => (
                <CarouselItem
                  key={img.id}
                  className="basis-full sm:basis-1/2 px-2"
                >
                  <div className="relative h-56 overflow-hidden rounded-xl">
                    <Image
                      src={img.src}
                      alt={`Industry visit ${img.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Bottom Arrows */}
            <div className="flex justify-center gap-6 mt-8">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-20">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative h-56 overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={`Industry visit ${img.id}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="bg-blue-900 rounded-3xl px-6 md:px-16 py-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Join Our Next Industry Visit
          </h3>

          <p className="mt-4 max-w-2xl mx-auto text-blue-100 text-sm md:text-base">
            Experience cutting-edge technology and innovation firsthand. Our
            industry visits provide unparalleled learning opportunities with
            global leaders.
          </p>

          <button className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-100">
            Register for Industry Visits
          </button>
        </div>
      </div>
    </section>
  );
}
