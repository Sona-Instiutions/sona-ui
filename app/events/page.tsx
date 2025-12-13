import { Metadata } from "next";
import { getEvents } from "@/services/server/events.server";
import { EventsPageClient } from "@/components/events/EventsPageClient.component";
import { EVENTS_PAGE_SIZE } from "@/constants/events.constants";
import { EEventType } from "@/types/events.types";

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "Events & News | SCALE",
  description:
    "Stay Connected with SCALE's Academic Excellence and Innovation Journey. Explore student activities, industry collaborations, and campus news.",
  openGraph: {
    title: "Events & News | SCALE",
    description: "Stay Connected with SCALE's Academic Excellence and Innovation Journey.",
    type: "website",
  },
};

export default async function EventsPage() {
  // Fetch initial data for "All Events" to support ISR
  const initialData = await getEvents({
    page: 1,
    pageSize: EVENTS_PAGE_SIZE,
    eventType: EEventType.ALL,
  });

  return (
    <main className='min-h-screen bg-gray-50 pb-20'>
      {/* Hero Section */}
      <section className='bg-blue-900 text-white py-20 md:py-28 relative overflow-hidden'>
        {/* Abstract Background Overlay (Optional - can be an image) */}
        <div className='absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90 z-0' />
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10 z-0" />

        <div className='container mx-auto px-6 relative z-10 text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold mb-6 tracking-tight'>Events & News</h1>
          <p className='text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed'>
            Stay Connected with SCALE&apos;s Academic Excellence and Innovation Journey
          </p>
        </div>
      </section>

      {/* Main Content (Filters + Grid) */}
      <EventsPageClient initialData={initialData} />
    </main>
  );
}
