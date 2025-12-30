"use client";

import Link from "next/link";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { IconBadge } from "@/components/common/IconBadge.component";
import type { IIconBadge } from "@/types/institution.types";

interface ProgramCardProps {
  /** Program name displayed prominently on the card */
  title: string;
  /** Supporting description outlining program details */
  description: string;
  /** Optional icon name token rendered inside the badge */
  icon?: IIconBadge | null;
  /** Optional CTA label (defaults to "Learn More" when URL provided) */
  learnMoreText?: string | null;
  /** Optional CTA link */
  learnMoreUrl?: string | null;
  /** Indicates if CTA should open in a new tab */
  learnMoreIsExternal?: boolean | null;
  /** Additional card classes */
  className?: string;
}

const CTA_BASE_CLASS =
  "mt-6 inline-flex items-center gap-2 self-start rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";

/**
 * Program card showcasing technology offerings with optional CTA.
 */
export function ProgramCard({
  title,
  description,
  icon,
  learnMoreText,
  learnMoreUrl,
  learnMoreIsExternal,
  className,
}: ProgramCardProps) {
  const hasCta = Boolean(learnMoreUrl);
  const ctaLabel = learnMoreText?.trim() || "Learn More";
  const isExternal = Boolean(learnMoreIsExternal);

  const normalizedDescription = description ?? "";

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <IconBadge
        iconName={icon?.iconName}
        iconColor={icon?.iconColor}
        backgroundColor={icon?.backgroundColor}
        size='lg'
        className='mb-5 shrink-0'
        ariaLabel={icon?.displayName ?? title}
      />

      <div className='flex flex-1 flex-col gap-4'>
        <h3 className='text-xl font-semibold text-slate-900'>{title}</h3>
        <MarkdownContent content={normalizedDescription} className='prose-sm leading-relaxed text-slate-600' />
      </div>

      {hasCta && learnMoreUrl ? (
        isExternal ? (
          <a href={learnMoreUrl} target='_blank' rel='noopener noreferrer' className={CTA_BASE_CLASS}>
            {ctaLabel}
            <ArrowRightIcon size={18} weight='bold' aria-hidden />
          </a>
        ) : (
          <Link href={learnMoreUrl} className={CTA_BASE_CLASS}>
            {ctaLabel}
            <ArrowRightIcon size={18} weight='bold' aria-hidden />
          </Link>
        )
      ) : null}
    </article>
  );
}
