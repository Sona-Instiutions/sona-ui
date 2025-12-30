"use client";

import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { SectionHeader } from "@/components/common/SectionHeader.component";
import { ProgramCard } from "@/components/institute/ProgramCard.component";
import { useProgramByInstitution } from "@/services/client/institution.client";
import { hasText } from "@/utils/common.utils";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface InstitutionProgramsProps {
  /** Institution identifier used to fetch programs */
  institutionId?: number | null;
}

const DEFAULT_SECTION_TITLE = "Technology Programs";

const renderSkeletonCard = () => (
  <div className='flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
    <div className='mb-5 h-12 w-12 rounded-full bg-slate-200' />
    <div className='space-y-3'>
      <div className='h-5 w-3/4 rounded-full bg-slate-200' />
      <div className='h-4 w-full rounded-full bg-slate-200' />
      <div className='h-4 w-5/6 rounded-full bg-slate-200' />
    </div>
    <div className='mt-auto h-9 w-32 rounded-full bg-slate-200' />
  </div>
);

const renderLoadingSkeleton = (sectionCount: number) => {
  const skeletonKeys = ["program-skeleton-1", "program-skeleton-2", "program-skeleton-3"];
  const gridColumnsClass =
    sectionCount >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : sectionCount === 2 ? "md:grid-cols-2" : "";

  return (
    <>
      {/* Carousel skeleton - visible below lg breakpoint */}
      <div className='lg:hidden'>
        <div className='flex gap-6 overflow-hidden'>
          {skeletonKeys.map((key) => (
            <div key={key} className='min-w-0 shrink-0 grow-0 basis-full md:basis-1/2'>
              {renderSkeletonCard()}
            </div>
          ))}
        </div>
      </div>
      {/* Grid skeleton - visible at lg breakpoint and above */}
      <div className={cn("hidden lg:grid grid-cols-1 gap-6 sm:gap-8", gridColumnsClass)}>
        {skeletonKeys.map((key) => (
          <div key={key}>{renderSkeletonCard()}</div>
        ))}
      </div>
    </>
  );
};

/**
 * Institution programs section showing technology offerings in responsive carousel (small/medium devices) and grid (large devices).
 */
export function InstitutionPrograms({ institutionId }: InstitutionProgramsProps) {
  const hasValidId = typeof institutionId === "number" && institutionId > 0;

  const {
    data: program,
    isLoading,
    isFetching,
    error,
  } = useProgramByInstitution({
    institutionId: hasValidId ? institutionId : null,
  });

  if (!hasValidId) {
    return null;
  }

  if (error) {
    console.error("Failed to fetch program data", error);
    return null;
  }

  const isDataLoading = isLoading || isFetching;
  const sections = program?.sections ?? [];
  const sectionCount = sections.length;

  if (!isDataLoading && (!program || sectionCount === 0)) {
    return null;
  }

  const gridColumnsClass =
    sectionCount >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : sectionCount === 2 ? "md:grid-cols-2" : "";

  const containerWidthClass =
    sectionCount === 1 ? "lg:max-w-3xl" : sectionCount === 2 ? "lg:max-w-5xl" : "lg:max-w-6xl";

  const sectionTitle = hasText(program?.title) ? (program?.title as string) : DEFAULT_SECTION_TITLE;
  const sectionDescription = program?.description ?? null;

  return (
    <section className='w-full bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className={cn("mx-auto w-full", containerWidthClass)}>
        <div className='flex flex-col items-center gap-6 text-center'>
          <SectionHeader title={sectionTitle} />
          {hasText(sectionDescription) && (
            <MarkdownContent content={sectionDescription as string} className='max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg' />
          )}
        </div>

        <div className='mt-12'>
          {isDataLoading ? (
            <div className='animate-pulse'>{renderLoadingSkeleton(sectionCount)}</div>
          ) : (
            <>
              {/* Carousel - visible below lg breakpoint */}
              <div className='lg:hidden'>
                <Carousel
                  className='w-full'
                  opts={{
                    align: "start",
                  }}
                >
                  <CarouselContent className='-ml-6'>
                    {sections.map((programSection) => (
                      <CarouselItem key={programSection.id} className='pl-6 basis-full md:basis-1/2'>
                        <div className='h-full py-2'>
                          <ProgramCard
                            title={programSection.title}
                            description={programSection.description ?? ""}
                            icon={programSection.icon}
                            learnMoreText={programSection.learnMoreText}
                            learnMoreUrl={programSection.learnMoreUrl ?? undefined}
                            learnMoreIsExternal={programSection.learnMoreIsExternal ?? undefined}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation Arrows */}
                  <div className='mt-8 flex justify-center gap-4 relative'>
                    <CarouselPrevious className='static translate-y-0 bg-black/50 text-white hover:bg-black/70 border-none' />
                    <CarouselNext className='static translate-y-0 bg-black/50 text-white hover:bg-black/70 border-none' />
                  </div>
                </Carousel>
              </div>

              {/* Grid - visible at lg breakpoint and above */}
              <div className={cn("hidden lg:grid grid-cols-1 gap-6 sm:gap-8", gridColumnsClass)}>
                {sections.map((programSection) => (
                  <ProgramCard
                    key={programSection.id}
                    title={programSection.title}
                    description={programSection.description ?? ""}
                    icon={programSection.icon}
                    learnMoreText={programSection.learnMoreText}
                    learnMoreUrl={programSection.learnMoreUrl ?? undefined}
                    learnMoreIsExternal={programSection.learnMoreIsExternal ?? undefined}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

