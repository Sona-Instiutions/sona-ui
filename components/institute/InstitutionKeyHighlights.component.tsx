import { Suspense } from "react";
import Image from "next/image";
import { KeyHighlightCard } from "@/components/institute/KeyHighlightCard.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { cn } from "@/lib/utils";
import { buildMediaUrl, applyColorStyle, getColorClassName, hasText } from "@/utils/common.utils";
import { getKeyHighlightsByInstitution } from "@/services/server/institution.server";
import type { INormalizedKeyHighlightSection } from "@/types/institution.types";

interface InstitutionKeyHighlightsProps {
  /** Institution identifier used to fetch key highlights data */
  institutionId?: number | null;
}

/**
 * Server component wrapper that fetches key highlights data.
 * Rendered through Suspense to enable streaming fallbacks when necessary.
 */
export async function InstitutionKeyHighlights({ institutionId }: InstitutionKeyHighlightsProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const highlightsPromise = getKeyHighlightsByInstitution(institutionId).catch((error) => {
    console.error("Failed to load key highlights section", error);
    return null;
  });

  return (
    <Suspense fallback={<InstitutionKeyHighlightsSkeleton />}>
      <KeyHighlightSection highlightsPromise={highlightsPromise} />
    </Suspense>
  );
}

interface KeyHighlightSectionProps {
  highlightsPromise: Promise<INormalizedKeyHighlightSection | null>;
}

async function KeyHighlightSection({ highlightsPromise }: KeyHighlightSectionProps) {
  const section = await highlightsPromise;

  if (!section || section.highlights.length === 0) {
    return null;
  }

  const imageUrl = buildMediaUrl(section.image);
  const backgroundUrl = buildMediaUrl(section.backgroundImage);

  // Colors for main title
  const prefixStyle = applyColorStyle(section.titlePrefixColor, "white");
  const prefixClass = getColorClassName(section.titlePrefixColor, "text-white");
  const highlightStyle = applyColorStyle(section.titleHighlightColor, "#fbbf24");
  const highlightClass = getColorClassName(section.titleHighlightColor, "text-amber-400");

  return (
    <section
      className='relative w-full overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'
      style={
        backgroundUrl
          ? { backgroundImage: `url('${backgroundUrl}')`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {/* Background overlay if image is present, otherwise simple bg */}
      {backgroundUrl && <div className='absolute inset-0 bg-linear-to-r from-black/40 via-black/30 to-black/20' />}

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16'>
        <div className='flex w-full flex-col gap-10'>
          {/* Title Row */}
          <div className='flex flex-col items-center gap-4 text-center'>
            <h2 className='text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
              {hasText(section.titlePrefix) && (
                <span className={cn(prefixClass)} style={prefixStyle}>
                  {section.titlePrefix}{" "}
                </span>
              )}
              {hasText(section.titleHighlight) && (
                <span className={cn(highlightClass)} style={highlightStyle}>
                  {section.titleHighlight}
                </span>
              )}
            </h2>
            {hasText(section.description) && (
              <MarkdownContent
                content={section.description}
                className='prose prose-invert max-w-3xl text-base text-white/80 sm:text-lg'
              />
            )}
          </div>

          {/* Content Row: Image + List */}
          <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12'>
            {/* Image Side */}
            <div className='relative mx-auto aspect-video w-full max-w-lg overflow-hidden rounded-3xl bg-slate-900 lg:mx-0 shadow-xl shadow-black/20'>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={section.titleHighlight || "Key Highlights"}
                  fill
                  className='object-cover'
                  sizes='(min-width: 1024px) 50vw, 100vw'
                  unoptimized
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center text-slate-700'>
                  <span className='text-sm font-medium'>No Image Available</span>
                </div>
              )}
            </div>

            {/* List Side */}
            <div className='flex flex-col gap-8'>
              {section.highlights.map((item) => (
                <KeyHighlightCard
                  key={item.id}
                  title={item.title}
                  titleColor={item.titleColor}
                  description={item.description}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstitutionKeyHighlightsSkeleton() {
  return (
    <section className='w-full bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-10'>
        <div className='flex flex-col items-center gap-4'>
          <div className='h-10 w-72 animate-pulse rounded-full bg-slate-800 sm:h-12 sm:w-96' />
          <div className='h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-800 sm:h-5' />
        </div>
        <div className='grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12'>
          <div className='aspect-square w-full animate-pulse rounded-3xl bg-slate-800' />
          <div className='flex flex-col gap-8'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='flex items-start gap-4'>
                <div className='h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-800' />
                <div className='flex w-full flex-col gap-2'>
                  <div className='h-6 w-48 animate-pulse rounded-full bg-slate-800' />
                  <div className='h-4 w-full animate-pulse rounded-full bg-slate-800' />
                  <div className='h-4 w-2/3 animate-pulse rounded-full bg-slate-800' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
