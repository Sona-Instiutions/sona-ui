"use client";

import { PlusIcon } from "@phosphor-icons/react";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";

interface FaqAccordionItemProps {
  /** Unique accordion value */
  value: string;
  /** Question text */
  question: string;
  /** Answer markdown content */
  answer: string;
}

/**
 * Accordion item for FAQ sections using shadcn primitives and Phosphor icons.
 */
export function FaqAccordionItem({ value, question, answer }: FaqAccordionItemProps) {
  return (
    <AccordionItem
      value={value}
      className='rounded-3xl border border-slate-200 bg-white px-4 shadow-lg shadow-slate-200/60 sm:px-6'
    >
      <AccordionTrigger className='group gap-6 px-0 text-base font-semibold text-slate-900 no-underline sm:text-lg [&>svg]:hidden'>
        <span className='flex-1 text-left leading-tight'>{question}</span>
        <span className='flex h-10 w-10 items-center justify-center text-amber-400 transition-all group-data-[state=open]:border-amber-200 group-data-[state=open]:bg-amber-50'>
          <PlusIcon
            size={18}
            weight='bold'
            className='transition-transform duration-200 group-data-[state=open]:rotate-45'
          />
        </span>
      </AccordionTrigger>
      <AccordionContent className='text-slate-600'>
        <MarkdownContent content={answer} className='prose max-w-none text-sm text-slate-600 sm:text-base' />
      </AccordionContent>
    </AccordionItem>
  );
}
