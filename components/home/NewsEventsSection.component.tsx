"use client";
import Image from "next/image";
import Link from "next/link";
import { INormalizedEvent } from "@/types/events.types";
import { EVENT_CARD_COLORS } from "@/constants/events.constants";
import { UserCircleIcon } from "@phosphor-icons/react";
import { buildMediaUrl } from "@/utils/common.utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


interface NewsEventProps {
  events: INormalizedEvent[];
}
type MediaFormats = {
  small?: { url: string };
  medium?: { url: string };
};

export default function NewsEvent({ events }: NewsEventProps) {
  const latestEvents = events.slice(0, 4);

  // Hide section completely if no events
  if (!latestEvents.length) {
    return null;
  }

  return (
    <section className="container mx-auto px-6 py-10">
      {/* ===== HEADER ===== */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          News <span className="text-yellow-500">& Events</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">Stay updated with the latest happenings, achievements, and upcoming events at SCALE</p>
      </div>


      {/* ===== MOBILE CAROUSEL ===== */}
      <div className="md:hidden">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
        >
          {/* IMPORTANT: spacing handled here */}
          <CarouselContent className="gap-4 pl-4">
            {latestEvents.map((event, index) => {
              const colorClass =
                EVENT_CARD_COLORS[index % EVENT_CARD_COLORS.length];

              const thumbnail = event.thumbnailImage;
              const featured = event.featuredImage;

              const thumbnailFormats = thumbnail?.formats as MediaFormats | undefined;
              const featuredFormats = featured?.formats as MediaFormats | undefined;

              const selectedImage =
                (thumbnailFormats?.small && { url: thumbnailFormats.small.url }) ||
                thumbnail ||
                (featuredFormats?.medium && { url: featuredFormats.medium.url }) ||
                featured;

              const imageUrl = buildMediaUrl(selectedImage);

              return (
                <CarouselItem key={event.id} className="basis-full">
                  <Link
                    href={`/events/${event.slug}`}
                    className="block overflow-hidden rounded-3xl shadow-lg"
                  >
                    {/* IMAGE */}
                    {imageUrl && (
                      <div className="relative h-[220px]">
                        <Image
                          src={imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* CONTENT */}
                    <div className={`p-6 ${colorClass}`}>
                      <div className="flex items-center gap-2 text-sm opacity-80 mb-3">
                        <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <UserCircleIcon size={24} />
                        </span>
                        {new Date(event.eventDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>

                      <h3 className="text-lg font-bold leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Arrows */}
          <div className="flex justify-center gap-4 mt-4">
            <CarouselPrevious className="bg-black/50 text-white left-0" />
            <CarouselNext className="bg-black/50 text-white right-0" />
          </div>
        </Carousel>
      </div>



      {/* ===== DESKTOP 5 COLUMN GRID ===== */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
        {latestEvents.map((event, index) => {
          const colorClass =
            EVENT_CARD_COLORS[index % EVENT_CARD_COLORS.length];

          const thumbnail = event.thumbnailImage;
          const featured = event.featuredImage;

          const thumbnailFormats = thumbnail?.formats as MediaFormats | undefined;
          const featuredFormats = featured?.formats as MediaFormats | undefined;

          // Determine the best image to use
          const selectedImage =
            (thumbnailFormats?.small ? { url: thumbnailFormats.small.url } : null) ||
            thumbnail ||
            (featuredFormats?.medium ? { url: featuredFormats.medium.url } : null) ||
            featured;

          const imageUrl = buildMediaUrl(selectedImage);

          return (
            <>
              {/* IMAGE CARD - Only render if image exists */}
              <div className="md:grid ">
                {imageUrl && (
                  <Link
                    key={`${event.id}-image`}
                    href={`/events/${event.slug}`}
                    className="group relative h-[200px] overflow-hidden shadow-lg rounded-t-3xl"
                  >
                    <Image
                      src={imageUrl}
                      alt={event.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                )}

                {/* CONTENT CARD - Always render */}
                <Link
                  key={`${event.id}-content`}
                  href={`/events/${event.slug}`}
                  className={`h-[200px] p-8 flex flex-col rounded-b-3xl justify-center shadow-lg transition-transform duration-500 group-hover:scale-105 ${colorClass}`}
                >
                  <div className="flex items-center gap-2 text-sm opacity-80 mb-3">
                    <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <UserCircleIcon size={24} />
                    </span>
                    {new Date(event.eventDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  <h3 className="text-lg font-bold leading-snug">
                    {event.title}
                  </h3>
                </Link>
              </div>
            </>
          );
        })}
      </div>

      {/* ===== CTA ===== */}
      <div className="text-center mt-20">
        <Link href="/events">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-10 py-4 rounded-md transition">
            View All News & Events
          </button>
        </Link>
      </div>
    </section>
  );
}
