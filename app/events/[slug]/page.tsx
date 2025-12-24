import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEventBySlug, getRecentEvents, getEventCategories, getEventTags } from "@/services/server/events.server";
import { EventHero } from "@/components/events/EventHero.component";
import { AuthorSection } from "@/components/common/AuthorSection.component";
import { RichTextRenderer } from "@/components/common/RichTextRenderer.component";
import { EventSidebar } from "@/components/events/EventSidebar.component";
import { ContentCard } from "@/components/common/ContentCard.component";
import { ShareButtons } from "@/components/common/ShareButtons.component";
import { StickyShareButtons } from "@/components/common/StickyShareButtons.component";
import { CommentSection } from "@/components/common/CommentSection.component";
import { ViewCountTracker } from "@/components/events/ViewCountTracker.component";
import { RECENT_EVENTS_LIMIT } from "@/constants/events.constants";
import { buildMediaUrl } from "@/utils/common.utils";
import { formatDate } from "@/utils/date.utils";

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
      authors: typeof event.author === "string" ? [event.author] : event.author ? [event.author.name] : undefined,
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

  // Determine related events
  const relatedEvents = event.relatedEvents && event.relatedEvents.length > 0 ? event.relatedEvents : [];

  // Full URL for sharing
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "https://scale.sona.ac.in"}/events/${slug}`;

  return (
    <main className='min-h-screen bg-white pb-20'>
      <ViewCountTracker eventDocumentId={event.documentId} />

      <StickyShareButtons title={event.title} url={shareUrl} />

      <EventHero event={event} />

      <div className='container mx-auto px-6 py-12 md:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            <article className='prose prose-lg max-w-none mb-16 prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900'>
              {/* Handle potential string vs blocks for content */}
              {typeof event.content === 'string' ? (
                <RichTextRenderer content={event.content} />
              ) : (
                <p className="italic text-gray-500">[Rich Text Block Content]</p>
              )}
            </article>

            {/* Social Share (Mobile Only) */}
            <div className='py-10 border-y border-gray-100 mb-16 lg:hidden'>
              <ShareButtons title={event.title} url={shareUrl} />
            </div>

            {/* Author Bio */}
            <div className="mb-16">
              <AuthorSection author={event.author} />
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-8">Related Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedEvents.map(related => (
                    <ContentCard
                      key={related.id}
                      title={related.title}
                      href={`/events/${related.slug}`}
                      image={related.thumbnailImage}
                      date={formatDate(related.eventDate)}
                      category={related.categories?.[0]}
                      buttonText="View Event"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className='mt-16 pt-16 border-t border-gray-100'>
              <CommentSection type="event" documentId={event.documentId} />
            </div>
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            <div className='sticky top-24'>
              <EventSidebar recentEvents={sidebarRecentEvents} categories={categories} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
