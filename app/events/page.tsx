import { Metadata } from "next";
import { getEvents } from "@/services/server/events.server";
import { EventsPageClient } from "@/components/events/EventsPageClient.component";
import { EVENTS_PAGE_SIZE } from "@/constants/events.constants";
import { EEventType } from "@/types/events.types";
import MainBanner from "@/components/common/MainBannerSection.component";

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
      {/* Banner Section */}
      <MainBanner
        title='Blog'
        highlight='Insights'
        description='Latest news, research, and stories from our community.'
        backgroundImage='/images/contact.webp'
      />

      {/* Main Content (Filters + Grid) */}
      <EventsPageClient initialData={initialData} />
    </main>
  );
}
