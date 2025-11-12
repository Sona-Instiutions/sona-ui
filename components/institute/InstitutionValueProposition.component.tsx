import { Suspense } from "react";

import { ValuePropositionCard } from "@/components/institute/ValuePropositionCard.component";
import { cn } from "@/lib/utils";
import { buildMediaUrl, applyColorStyle, getColorClassName, hasText } from "@/utils/common.utils";
import { getValuePropositionByInstitution } from "@/services/server/institution.server";
import type { INormalizedValueProposition } from "@/types/institution.types";

interface InstitutionValuePropositionProps {
  /** Institution identifier used to look up the value proposition */
  institutionId?: number | null;
}

/**
 * Server component wrapper that fetches value proposition data.
 * Rendered through Suspense to enable streaming fallbacks when necessary.
 */
export async function InstitutionValueProposition({ institutionId }: InstitutionValuePropositionProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const valuePropositionPromise = getValuePropositionByInstitution(institutionId).catch((error) => {
    console.error("Failed to load value proposition section", error);
    return null;
  });

  return (
    <Suspense fallback={<InstitutionValuePropositionSkeleton />}>
      <ValuePropositionSection valuePropositionPromise={valuePropositionPromise} />
    </Suspense>
  );
}

interface ValuePropositionSectionProps {
  valuePropositionPromise: Promise<INormalizedValueProposition | null>;
}

async function ValuePropositionSection({ valuePropositionPromise }: ValuePropositionSectionProps) {
  const valueProposition = await valuePropositionPromise;

  if (!valueProposition || valueProposition.propositions.length === 0) {
    return null;
  }

  const backgroundUrl = buildMediaUrl(valueProposition.backgroundImage);
  const titlePrefixStyle = applyColorStyle(valueProposition.titlePrefixColor, "white");
  const titleHighlightStyle = applyColorStyle(valueProposition.titleHighlightColor, "#fbbf24");
  const titlePrefixClass = getColorClassName(valueProposition.titlePrefixColor, "text-white");
  const titleHighlightClass = getColorClassName(valueProposition.titleHighlightColor, "text-amber-400");

  const propositionCount = valueProposition.propositions.length;

  const gridColumnsClass = cn(
    "grid grid-cols-1 gap-8 sm:grid-cols-2",
    propositionCount === 1 && "sm:grid-cols-1",
    propositionCount === 2 && "lg:grid-cols-2",
    propositionCount === 3 && "lg:grid-cols-3",
    propositionCount === 4 && "lg:grid-cols-4",
    propositionCount >= 5 && "lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
  );

  const containerMaxWidthClass =
    propositionCount === 1
      ? "max-w-3xl"
      : propositionCount === 2
      ? "max-w-5xl"
      : propositionCount === 3
      ? "max-w-6xl"
      : "max-w-7xl";

  return (
    <section
      className={cn(
        "relative isolate w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12",
        backgroundUrl ? "bg-cover bg-center bg-no-repeat" : "bg-linear-to-r from-slate-900 via-slate-800 to-slate-900"
      )}
      style={backgroundUrl ? { backgroundImage: `url('${backgroundUrl}')` } : undefined}
    >
      <div
        className={cn(
          "absolute inset-0 transition-colors",
          backgroundUrl ? "bg-linear-to-r from-black/60 via-black/45 to-black/35" : "bg-slate-950/85"
        )}
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col items-center gap-10 text-white",
          containerMaxWidthClass
        )}
      >
        {(hasText(valueProposition.titlePrefix) || hasText(valueProposition.titleHighlight)) && (
          <h2 className='text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
            {hasText(valueProposition.titlePrefix) && (
              <span className={cn(titlePrefixStyle ? undefined : titlePrefixClass)} style={titlePrefixStyle}>
                {valueProposition.titlePrefix}
                {hasText(valueProposition.titleHighlight) ? " " : ""}
              </span>
            )}
            {hasText(valueProposition.titleHighlight) && (
              <span className={cn(titleHighlightStyle ? undefined : titleHighlightClass)} style={titleHighlightStyle}>
                {valueProposition.titleHighlight}
              </span>
            )}
          </h2>
        )}

        {hasText(valueProposition.subtitle) && (
          <p className='max-w-3xl text-center text-base text-white/85 sm:text-lg md:text-xl'>
            {valueProposition.subtitle}
          </p>
        )}

        <div className={cn("w-full", containerMaxWidthClass)}>
          <div className={gridColumnsClass}>
            {valueProposition.propositions.map((proposition) => (
              <ValuePropositionCard
                key={proposition.id}
                title={proposition.title}
                titleColor={proposition.titleColor}
                description={proposition.description}
                icon={proposition.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InstitutionValuePropositionSkeleton() {
  return (
    <section className='w-full bg-slate-900 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-6xl flex-col items-center gap-8'>
        <div className='h-10 w-72 animate-pulse rounded-full bg-slate-700 sm:h-12 sm:w-96' />
        <div className='h-4 w-full max-w-2xl animate-pulse rounded-full bg-slate-700 sm:h-5' />
        <div className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {[0, 1, 2, 3].map((key) => (
            <div
              key={`value-proposition-skeleton-${key}`}
              className='flex flex-col items-center gap-4 rounded-3xl bg-slate-800/60 p-6 sm:p-7'
            >
              <div className='h-12 w-12 rounded-full bg-slate-700' />
              <div className='h-6 w-40 rounded-full bg-slate-700' />
              <div className='h-4 w-full rounded-full bg-slate-700' />
              <div className='h-4 w-5/6 rounded-full bg-slate-700' />
              <div className='h-4 w-2/3 rounded-full bg-slate-700' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
