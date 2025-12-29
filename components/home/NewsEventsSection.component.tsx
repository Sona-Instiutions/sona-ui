"use client";
import Image from "next/image";
import Link from "next/link";
import { INormalizedEvent } from "@/types/events.types";
import { EVENT_CARD_COLORS } from "@/constants/events.constants";
import { Fragment } from "react";
import { UserCircleIcon } from "@phosphor-icons/react";

interface NewsEventProps {
  events: INormalizedEvent[];
}
type MediaFormats = {
  small?: { url: string };
  medium?: { url: string };
};

export default function NewsEvent({ events }: NewsEventProps) {
  const latestEvents = events.slice(0, 5);

  if (!latestEvents.length) {
    return <p className="text-center text-gray-500">No events found.</p>;
  }

  return (
    <section className="container mx-auto px-6 py-20">
      {/* ===== HEADER ===== */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          News <span className="text-yellow-500">& Events</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-16">Stay updated with the latest happenings, achievements, and upcoming events at SCALE and across the Sona Velliappa Group institutions</p>
      </div>

      {/* ===== 5 COLUMN GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {latestEvents.map((event, index) => {
          const colorClass =
            EVENT_CARD_COLORS[index % EVENT_CARD_COLORS.length];

          const thumbnail = event.thumbnailImage;
          const featured = event.featuredImage;

          const thumbnailFormats = thumbnail?.formats as MediaFormats | undefined;
          const featuredFormats = featured?.formats as MediaFormats | undefined;

          const imageUrl =
            thumbnailFormats?.small?.url ||
            thumbnail?.url ||
            featuredFormats?.medium?.url ||
            featured?.url ||
            "/placeholder.jpg";



          return (
            <Fragment key={event.id}>
              {/* IMAGE CARD */}
              <Link
                key={`${event.id}-image`}
                href={`/events/${event.slug}`}
                className="group relative h-[260px] rounded-3xl overflow-hidden shadow-lg"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                  alt={event.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>


              {/* CONTENT CARD */}
              <Link
                href={`/events/${event.slug}`}
                className={`h-[260px] rounded-3xl p-8 flex flex-col justify-center shadow-lg ${colorClass}`}
              >
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <span className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-xs">
                    <UserCircleIcon size={24} />
                  </span>
                  {new Date(event.eventDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <h3 className="text-lg font-semibold leading-snug">
                  {event.title}
                </h3>
              </Link>
            </Fragment>
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
