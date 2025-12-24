import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, getRecentEvents, getEventCategories, getEventTags } from "@/services/server/events.server";
import { EventHero } from "@/components/events/EventHero.component";
import { RichTextRenderer } from "@/components/common/RichTextRenderer.component";
import { EventSidebar } from "@/components/events/EventSidebar.component";
import { RelatedEvents } from "@/components/events/RelatedEvents.component";
import { ShareButtons } from "@/components/common/ShareButtons.component";
import { CommentList } from "@/components/events/CommentList.component";
import { ViewCountTracker } from "@/components/events/ViewCountTracker.component";
import { RECENT_EVENTS_LIMIT } from "@/constants/events.constants";
import { buildMediaUrl } from "@/utils/common.utils";

export const revalidate = 600; // 10 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | SCALE",
    };
  }

  const imageUrl = buildMediaUrl(event.featuredImage) || buildMediaUrl(event.thumbnailImage);

  return {
    title: `${event.title} | SCALE`,
    description: event.metaDescription || event.excerpt || `Event details for ${event.title}`,
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.excerpt || "",
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: event.publishedDate,
      authors: event.author ? [event.author] : undefined,
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Parallel data fetching for efficiency
  const [event, recentEvents, categories, tags] = await Promise.all([
    getEventBySlug(slug),
    getRecentEvents({ limit: RECENT_EVENTS_LIMIT }), // Fetch recent for sidebar
    getEventCategories(),
    getEventTags(),
  ]);

  if (!event) {
    notFound();
  }

  // Filter out current event from recent events if present
  const sidebarRecentEvents = recentEvents.filter((e) => e.id !== event.id);

  // Determine related events (prefer relation, fallback to none for now)
  // Strapi usually returns empty array if no relation. We could implement fallback here if desired.
  const relatedEvents = event.relatedEvents && event.relatedEvents.length > 0 ? event.relatedEvents : [];

  // Full URL for sharing (assumes site domain from env or hardcoded fallback for now)
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://scale.sona.ac.in"}/events/${slug}`;

  return (
    <main className='min-h-screen bg-white pb-20'>
      <ViewCountTracker eventDocumentId={event.documentId} />

      <EventHero event={event} />

      <div className='container mx-auto px-6 py-12 md:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            <article className='mb-12'>
              <RichTextRenderer content={event.content} />
            </article>

            <div className='py-8 border-t border-gray-100 mb-8'>
              <ShareButtons title={event.title} url={shareUrl} />
            </div>

            <RelatedEvents events={relatedEvents} />

            <div className='mt-12 pt-12 border-t border-gray-100'>
              <CommentList eventDocumentId={event.documentId} />
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4 space-y-12'>
            <div className='sticky top-24'>
              <EventSidebar recentEvents={sidebarRecentEvents} categories={categories} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
