import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getCaseStudyBySlug,
  getRecentCaseStudies,
  getCaseStudyCategories,
  getCaseStudyTags,
} from "@/services/server/case-studies.server";
import { ContentHero } from "@/components/common/ContentHero.component";
import { AuthorSection } from "@/components/common/AuthorSection.component";
import { CommentSection } from "@/components/common/CommentSection.component";
import { ContentSidebar } from "@/components/common/ContentSidebar.component";
import { ContentCard } from "@/components/common/ContentCard.component";
import { ShareButtons } from "@/components/common/ShareButtons.component";
import { StickyShareButtons } from "@/components/common/StickyShareButtons.component";
import { ViewCountTracker } from "@/components/common/ViewCountTracker.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { RECENT_CASE_STUDIES_LIMIT } from "@/constants/case-study.constants";
import { buildMediaUrl } from "@/utils/common.utils";
import { formatDate } from "@/utils/date.utils";

export const revalidate = 600; // 10 minutes

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | SCALE",
    };
  }

  const imageUrl = buildMediaUrl(caseStudy.bannerImage) || buildMediaUrl(caseStudy.thumbnail);

  return {
    title: `${caseStudy.title} | SCALE Case Studies`,
    description: caseStudy.metaDescription || caseStudy.excerpt || `Read case study: ${caseStudy.title}`,
    openGraph: {
      title: caseStudy.metaTitle || caseStudy.title,
      description: caseStudy.metaDescription || caseStudy.excerpt || "",
      images: imageUrl ? [imageUrl] : [],
      type: "article",
      publishedTime: caseStudy.publishedDate || undefined,
      authors: caseStudy.author ? [caseStudy.author.name] : undefined,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Parallel data fetching
  const [caseStudy, recentCaseStudies, categories, tags] = await Promise.all([
    getCaseStudyBySlug(slug),
    getRecentCaseStudies({ limit: RECENT_CASE_STUDIES_LIMIT }),
    getCaseStudyCategories(),
    getCaseStudyTags(),
  ]);

  if (!caseStudy) {
    notFound();
  }

  // Filter out current case study from related if present
  const sidebarRecentCaseStudies = recentCaseStudies.filter((cs) => cs.id !== caseStudy.id);

  // Determine related case studies
  const relatedCaseStudies =
    caseStudy.relatedCaseStudies && caseStudy.relatedCaseStudies.length > 0 ? caseStudy.relatedCaseStudies : [];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Success Stories", href: "/case-studies" },
    { label: caseStudy.title },
  ];

  return (
    <main className='min-h-screen bg-white pb-20'>
      <ViewCountTracker type='case-study' documentId={caseStudy.documentId} />

      <StickyShareButtons title={caseStudy.title} />

      <ContentHero
        type='case-study'
        title={caseStudy.title}
        image={caseStudy.bannerImage}
        breadcrumbs={breadcrumbs}
        categories={caseStudy.categories}
        date={caseStudy.publishedDate}
        author={caseStudy.author}
        viewCount={caseStudy.viewCount}
        readTime={caseStudy.readTime}
        excerpt={caseStudy.excerpt}
      />

      <div className='container mx-auto px-6 py-12 md:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
          {/* Main Content */}
          <div className='lg:col-span-8'>
            {typeof caseStudy.content === "string" ? (
              <MarkdownContent content={caseStudy.content} className='mb-16' />
            ) : (
              <p className='italic text-gray-500 mb-16'>[Rich Text Content]</p>
            )}

            {/* Social Share (Mobile Only) */}
            <div className='py-10 border-y border-gray-100 mb-16 lg:hidden'>
              <ShareButtons title={caseStudy.title} />
            </div>

            {/* Author Bio */}
            {/* <div className='mb-16'>
              <AuthorSection author={caseStudy.author} />
            </div> */}

            {/* Related Case Studies */}
            {relatedCaseStudies.length > 0 && (
              <div className='mb-16'>
                <h3 className='text-2xl font-bold mb-8'>Related Success Stories</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  {relatedCaseStudies.map((related) => (
                    <ContentCard
                      key={related.id}
                      title={related.title}
                      href={`/case-studies/${related.slug}`}
                      image={related.thumbnail || related.bannerImage}
                      date={formatDate(related.publishedDate)}
                      category={related.categories?.[0]}
                      buttonText='View Success Story'
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {caseStudy.showComments && (
              <div className='mt-16 pt-16 border-t border-gray-100'>
                <CommentSection type='case-study' documentId={caseStudy.documentId} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-4'>
            <div className='sticky top-24'>
              <ContentSidebar
                type='case-study'
                recentItems={sidebarRecentCaseStudies}
                categories={categories}
                tags={tags}
                basePath='/case-studies'
                recentTitle='Recent Success Stories'
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
