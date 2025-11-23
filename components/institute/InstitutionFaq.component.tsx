import { Suspense } from "react";

import { SectionHeader } from "@/components/common/SectionHeader.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { Accordion } from "@/components/ui/accordion";
import { FaqAccordionItem } from "@/components/institute/FaqAccordionItem.component";
import { getFaqSectionByInstitution } from "@/services/server/institution.server";
import { hasText } from "@/utils/common.utils";
import type { INormalizedFaqSection } from "@/types/institution.types";

interface InstitutionFaqProps {
  /** Institution identifier used to fetch FAQ data */
  institutionId?: number | null;
}

/**
 * Server component wrapper that fetches FAQ data for an institution.
 */
export async function InstitutionFaq({ institutionId }: InstitutionFaqProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const faqPromise = getFaqSectionByInstitution(institutionId).catch((error) => {
    console.error("Failed to load FAQ section", error);
    return null;
  });

  return (
    <Suspense fallback={<InstitutionFaqSkeleton />}>
      <FaqSectionContent faqPromise={faqPromise} />
    </Suspense>
  );
}

interface FaqSectionContentProps {
  faqPromise: Promise<INormalizedFaqSection | null>;
}

async function FaqSectionContent({ faqPromise }: FaqSectionContentProps) {
  const section = await faqPromise;

  if (!section || section.faqs.length === 0) {
    return null;
  }

  const midpoint = Math.ceil(section.faqs.length / 2);
  const leftColumn = section.faqs.slice(0, midpoint);
  const rightColumn = section.faqs.slice(midpoint);

  const columns = [leftColumn, rightColumn].filter((column, index) => column.length > 0 || index === 0);

  return (
    <section className='relative w-full overflow-hidden bg-white px-4 pb-12 pt-6 sm:px-6 sm:pb-16 sm:pt-10 md:px-8 lg:px-12'>
      <div className='pointer-events-none absolute inset-x-0 -top-16 h-24 bg-white sm:-top-24 sm:h-32' aria-hidden />
      <div className='relative mx-auto flex w-full max-w-7xl flex-col gap-10'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <SectionHeader
            titlePrefix={section.titlePrefix}
            titlePrefixColor={section.titlePrefixColor}
            titleHighlight={section.titleHighlight}
            titleHighlightColor={section.titleHighlightColor}
            align='center'
          />
          {hasText(section.description) && (
            <MarkdownContent
              content={section.description}
              className='prose max-w-3xl text-base text-slate-600 sm:text-lg'
            />
          )}
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {columns.map((items, columnIndex) => (
            <Accordion key={`faq-column-${columnIndex}`} type='single' collapsible className='space-y-4'>
              {items.map((faq) => (
                <FaqAccordionItem
                  key={faq.id}
                  value={`faq-${columnIndex}-${faq.id}`}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstitutionFaqSkeleton() {
  return (
    <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-3 w-32 animate-pulse rounded-full bg-slate-200' />
          <div className='h-10 w-72 animate-pulse rounded-full bg-slate-200 sm:h-12 sm:w-96' />
          <div className='h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-200 sm:h-5' />
        </div>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          {[0, 1].map((column) => (
            <div key={column} className='space-y-4'>
              {[0, 1, 2].map((row) => (
                <div
                  key={`${column}-${row}`}
                  className='space-y-3 rounded-3xl border border-slate-200 bg-slate-100/70 p-5'
                >
                  <div className='h-5 w-3/4 animate-pulse rounded-full bg-slate-200' />
                  <div className='h-4 w-full animate-pulse rounded-full bg-slate-200' />
                  <div className='h-4 w-2/3 animate-pulse rounded-full bg-slate-200' />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
