"use client";

import { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function BannerCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // 👉 Banner Data
  const banners = [
    {
      id: 1,
      image: "/images/home-banner.webp",
      title: [
        "By the Industry",
        "For the Industry",
        "To the Industry"
      ],
      subtitle:
        " Tomorrow's technology today — Shaping innovators who will transform the world",
      buttonText: "Get Started Today",
      buttonLink: "#",
    },
  ];

  // 👉 Auto-slide only if more than 1 banner
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const nextBtn = carouselRef.current.querySelector(
        "[data-carousel-next]"
      ) as HTMLElement;
      nextBtn?.click();
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div ref={carouselRef} className="w-full mx-auto relative">
      <Carousel className="w-full">
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="basis-full">
              <div className="relative w-full h-[543px]">
                {/* Background Image */}
                <Image
                  src={banner.image}
                  alt={Array.isArray(banner.title) ? banner.title.join(" ") : banner.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Text Content */}
                <div className="absolute inset-0 max-w-[1332px] mx-auto flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 text-left text-white z-10">
                  <h1 className="font-roboto leading-none font-bold max-w-2xl text-[40px] sm:text-[50px] md:text-[60px] lg:text-[72px] space-y-1">
                    {banner.title.map((line, i) => {
                      const isLast = i === banner.title.length - 1; // last line
                      if (!isLast) {
                        return <div key={i}>{line}</div>;
                      }

                      // Only color the last "industry"
                      const parts = line.split("industry");

                      return (
                        <div key={i}>
                          {/* {parts[0]} */}
                          <span className="text-yellow-400">To the Industry</span>
                          {parts[1] ?? ""}
                        </div>
                      );
                    })}
                  </h1>

                  {/* Subtitle (Split into 2 lines) */}
                  {banner.subtitle && (
                    <div className="mt-4 leading-tight">
                      {(() => {
                        const [top, bottom] = banner.subtitle.split(" — ");

                        return (
                          <>
                            {/* First line: 30px bold */}
                            <p className="font-bold text-[30px]">{top}</p>

                            {/* Second line: 24px normal */}
                            {bottom && <p className="text-[24px] mt-1">{bottom}</p>}
                          </>
                        );
                      })()}
                    </div>
                  )}

                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ------------------------------------------------------------------ */}
        {/* ARROWS → Show ONLY if more than 1 banner */}
        {/* ------------------------------------------------------------------ */}
        {banners.length > 1 && (
          <>
            {/* Mobile Arrows */}
            <div className="absolute bottom-10 left-8 flex gap-3 md:hidden z-50">
              <CarouselPrevious
                className="bg-black/50 text-white size-8 rounded-full"
                data-carousel-prev
              />
              <CarouselNext
                className="bg-black/50 text-white size-8 rounded-full"
                data-carousel-next
              />
            </div>

            {/* Desktop Arrows */}
            <CarouselPrevious
              className="hidden md:flex left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white z-50 rounded-full size-10"
              data-carousel-prev
            />

            <CarouselNext
              className="hidden md:flex right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white z-50 rounded-full size-10"
              data-carousel-next
            />
          </>
        )}
      </Carousel>
    </div>
  );
}
