"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionHeader } from "@/components/common/SectionHeader.component";
import { ProgramCard } from "@/components/institute/ProgramCard.component";
import { useProgramByInstitution } from "@/services/client/institution.client";
import { hasText } from "@/utils/common.utils";
import { cn } from "@/lib/utils";

interface InstitutionProgramsProps {
  /** Institution identifier used to fetch programs */
  institutionId?: number | null;
}

const DEFAULT_SECTION_TITLE = "Technology Programs";

const renderLoadingSkeleton = () => {
  const skeletonKeys = ["program-skeleton-1", "program-skeleton-2", "program-skeleton-3"];

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {skeletonKeys.map((key) => (
        <div key={key} className='flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'>
          <div className='mb-5 h-12 w-12 rounded-full bg-slate-200' />
          <div className='space-y-3'>
            <div className='h-5 w-3/4 rounded-full bg-slate-200' />
            <div className='h-4 w-full rounded-full bg-slate-200' />
            <div className='h-4 w-5/6 rounded-full bg-slate-200' />
          </div>
          <div className='mt-auto h-9 w-32 rounded-full bg-slate-200' />
        </div>
      ))}
    </div>
  );
};

/**
 * Institution programs section showing technology offerings in responsive grid.
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
            <div className='prose prose-slate max-w-3xl text-base leading-relaxed text-slate-600 prose-p:my-0 prose-p:text-inherit prose-strong:text-slate-900 prose-ul:list-disc sm:text-lg'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{sectionDescription as string}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className='mt-12'>
          {isDataLoading ? (
            <div className='animate-pulse'>{renderLoadingSkeleton()}</div>
          ) : (
            <div className={cn("grid grid-cols-1 gap-6 sm:gap-8", gridColumnsClass)}>
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
          )}
        </div>
      </div>
    </section>
  );
}

