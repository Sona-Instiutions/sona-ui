"use client";

import { useEffect, useRef } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function BannerCarousel() {
  // ✅ removed { banners }
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const nextButton = carouselRef.current.querySelector("[data-carousel-next]") as HTMLElement;
      nextButton?.click();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const banners = [
    {
      id: 1,
      image: "/images/banner-1.webp",
      title: "Believe That's Right For Your Future",
      subtitle:
        "Teach Tomorrow's Technology Today — Your Problem, Our Challenge. Shaping innovators who will transform the world.",
      buttonText: "Get Started Today",
      buttonLink: "#",
    },
    
  ];

  return (
    <div ref={carouselRef} className='w-full mx-auto relative'>
      <Carousel className='w-full'>
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className='basis-full'>
              <div className='relative w-full h-[543px]'>
                <Image src={banner.image} alt={banner.title} fill priority className='object-cover' />
                <div className='absolute inset-0 bg-black/40' />
                <div className='absolute max-w-[1332px] mx-auto inset-0 flex flex-col justify-center items-start px-6 sm:px-10 md:px-20 text-left text-white z-10'>
                  <h1 className='font-roboto leading-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold max-w-2xl'>
                    {banner.title.split("Future")[0]}
                    <span className='text-yellow-400'>Future</span>
                  </h1>

                  <p className='mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl'>{banner.subtitle}</p>

                  {/* <Link
                    href={banner.buttonLink}
                    className='mt-6 bg-yellow-400 text-black font-semibold px-5 sm:px-6 md:px-8 py-2 sm:py-3 rounded-md hover:bg-yellow-500 transition-all text-sm sm:text-base md:text-lg'
                  >
                    {banner.buttonText}
                  </Link> */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrows container for mobile ONLY */}
        <div className=' absolute bottom-15 left-18 flex gap-3 md:hidden z-50'>
          <CarouselPrevious className='bg-black/50 text-white size-8' data-carousel-prev />
          <CarouselNext className='bg-black/50 text-white size-8' data-carousel-next />
        </div>

        {/* Desktop arrows (visible only on md and above) */}
        <CarouselPrevious
          className='hidden md:flex left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white z-50 pointer-events-auto'
          data-carousel-prev
        />

        <CarouselNext
          className='hidden md:flex right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white z-50 pointer-events-auto'
          data-carousel-next
        />
      </Carousel>
    </div>
  );
}
