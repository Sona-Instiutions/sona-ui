import { Suspense } from "react";

import { GalleryDisplay } from "@/components/institute/GalleryDisplay.component";
import { SectionHeader } from "@/components/common/SectionHeader.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { getCampusGalleryByInstitution } from "@/services/server/institution.server";
import type { INormalizedCampusGallerySection } from "@/types/institution.types";
import { buildMediaUrl, hasText } from "@/utils/common.utils";

interface InstitutionGalleryProps {
  /** Institution identifier used to fetch gallery data */
  institutionId?: number | null;
}

export async function InstitutionGallery({ institutionId }: InstitutionGalleryProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const galleryPromise = getCampusGalleryByInstitution(institutionId).catch((error) => {
    console.error("Failed to load campus gallery section", error);
    return null;
  });

  return (
    <Suspense fallback={<InstitutionGallerySkeleton />}>
      <GallerySection galleryPromise={galleryPromise} />
    </Suspense>
  );
}

interface GallerySectionProps {
  galleryPromise: Promise<INormalizedCampusGallerySection | null>;
}

async function GallerySection({ galleryPromise }: GallerySectionProps) {
  const section = await galleryPromise;

  if (!section || section.columns.length === 0) {
    return null;
  }

  const backgroundImageUrl = buildMediaUrl(section.backgroundImage);

  return (
    <section className='relative w-full overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      {backgroundImageUrl && (
        <div className='absolute inset-0'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-950/80 to-slate-950/95' />
        </div>
      )}

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10'>
        <div className='flex flex-col items-center gap-5 text-center'>
          <SectionHeader
            titlePrefix={section.titlePrefix}
            titlePrefixColor={section.titlePrefixColor ?? "text-white"}
            titleHighlight={section.titleHighlight}
            titleHighlightColor={section.titleHighlightColor ?? "text-amber-400"}
            align='center'
            className='text-white'
          />
          {hasText(section.description) && (
            <MarkdownContent
              content={section.description}
              className='prose prose-invert max-w-3xl text-base text-white/90 sm:text-lg'
            />
          )}
        </div>

        <GalleryDisplay columns={section.columns} />
      </div>
    </section>
  );
}

function InstitutionGallerySkeleton() {
  return (
    <section className='relative w-full bg-slate-950 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <div className='mx-auto h-10 w-56 animate-pulse rounded-full bg-slate-800 sm:h-12 sm:w-72' />
        <div className='mx-auto h-4 w-full max-w-3xl animate-pulse rounded-full bg-slate-800 sm:h-5' />
        {/* Carousel skeleton - visible below lg breakpoint */}
        <div className='lg:hidden'>
          <div className='flex gap-5 overflow-hidden'>
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className='min-w-0 shrink-0 grow-0 basis-full md:basis-1/2'>
                <div className='aspect-square animate-pulse rounded-3xl bg-slate-800' />
              </div>
            ))}
          </div>
        </div>
        {/* Grid skeleton - visible at lg breakpoint and above */}
        <div className='hidden lg:grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6'>
          {Array.from({ length: 4 }).map((_, colIdx) => (
            <div key={colIdx} className='flex flex-col gap-5'>
              {[0, 1].map((rowIdx) => (
                <div
                  key={`${colIdx}-${rowIdx}`}
                  className='aspect-[4/3] animate-pulse rounded-3xl bg-slate-800 sm:aspect-square'
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

