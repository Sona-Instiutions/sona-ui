"use client";

import { cn } from "@/lib/utils";
import { hasText } from "@/utils/common.utils";
import { SectionHeader } from "@/components/common/SectionHeader.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import { IconBadge } from "@/components/common/IconBadge.component";
import type { INormalizedAchievement } from "@/types/institution.types";
import type { Components } from "react-markdown";

interface InstitutionAchievementsProps {
  /** Data for the achievement section */
  achievementSection: INormalizedAchievement | null;
}

/**
 * Client component that renders the achievement section UI.
 */
export function InstitutionAchievements({ achievementSection }: InstitutionAchievementsProps) {
  if (!achievementSection) {
    return null;
  }

  const hasAchievements = achievementSection.achievements.length > 0;
  const hasRecognitions = achievementSection.recognitions.length > 0;
  const hasPrimaryContent =
    hasAchievements ||
    hasText(achievementSection.titlePrefix) ||
    hasText(achievementSection.titleHighlight) ||
    hasText(achievementSection.description);

  if (!hasPrimaryContent && !hasRecognitions) {
    return null;
  }

  const markdownComponents: Components = {
    strong: ({ children }) => <strong className='font-semibold text-slate-900'>{children}</strong>,
    em: ({ children }) => <em className='italic text-slate-700'>{children}</em>,
    a: ({ children, href }) => (
      <a href={href} className='font-medium text-sky-600 underline underline-offset-4 transition hover:text-sky-700'>
        {children}
      </a>
    ),
  };

  const cardCount = achievementSection.achievements.length;

  const gridColumnsClass = cn(
    "grid grid-cols-1 gap-6 sm:gap-8",
    cardCount === 1 && "sm:grid-cols-1",
    cardCount === 2 && "sm:grid-cols-2 lg:grid-cols-2",
    cardCount === 3 && "sm:grid-cols-2 lg:grid-cols-3",
    cardCount >= 4 && "sm:grid-cols-2 lg:grid-cols-4"
  );

  const containerMaxWidthClass =
    cardCount === 1 ? "max-w-xl" : cardCount === 2 ? "max-w-4xl" : cardCount === 3 ? "max-w-6xl" : "max-w-7xl";

  const recognitionCardCount = achievementSection.recognitions.length;
  const recognitionGridColumnsClass = cn(
    "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
    recognitionCardCount === 1 && "sm:grid-cols-1",
    recognitionCardCount === 2 && "lg:grid-cols-2"
  );

  const recognitionContainerMaxWidthClass =
    recognitionCardCount === 1
      ? "max-w-3xl"
      : recognitionCardCount === 2
      ? "max-w-4xl"
      : recognitionCardCount === 3
      ? "max-w-5xl"
      : "max-w-6xl";

  const recognitionBackgroundToken = achievementSection.recognitionBackgroundColor ?? "";
  const recognitionBackgroundClassName = recognitionBackgroundToken.startsWith("bg-") ? recognitionBackgroundToken : "";
  const recognitionBackgroundStyle =
    recognitionBackgroundToken && !recognitionBackgroundToken.startsWith("bg-")
      ? {
          backgroundColor: recognitionBackgroundToken,
        }
      : undefined;

  return (
    <>
      {hasPrimaryContent && (
        <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
          <div className={cn("mx-auto flex w-full flex-col items-center gap-8", containerMaxWidthClass)}>
            <SectionHeader
              titlePrefix={achievementSection.titlePrefix}
              titlePrefixColor={achievementSection.titlePrefixColor}
              titleHighlight={achievementSection.titleHighlight}
              titleHighlightColor={achievementSection.titleHighlightColor}
            />

            <MarkdownContent
              content={achievementSection.description}
              className='prose prose-slate max-w-3xl text-center text-base leading-relaxed sm:text-lg'
              components={markdownComponents}
            />

            {hasAchievements && (
              <div className='w-full'>
                <div className={gridColumnsClass}>
                  {achievementSection.achievements.map((card) => (
                    <article
                      className={cn(
                        "flex h-full flex-col rounded-3xl border border-white/60 bg-white/95 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl sm:p-8"
                      )}
                      key={card.id}
                    >
                      <div className='text-4xl font-extrabold text-amber-500 sm:text-5xl'>{card.statistic}</div>
                      <h3 className='mt-3 text-lg font-semibold text-slate-900 sm:text-xl'>{card.title}</h3>
                      {hasText(card.description) && (
                        <p className='mt-3 text-sm text-slate-600 sm:text-base'>{card.description}</p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {hasRecognitions && (
        <section
          className={cn(
            "relative w-[80%] mx-auto my-10 rounded-4xl overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12",
            recognitionBackgroundClassName || "bg-slate-900"
          )}
          style={recognitionBackgroundStyle}
        >
          <div
            className='absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-900/60 to-slate-950/70'
            aria-hidden
          />

          <div
            className={cn(
              "relative z-10 mx-auto flex w-full flex-col items-center gap-8 text-white",
              recognitionContainerMaxWidthClass
            )}
          >
            {hasText(achievementSection.recognitionTitle) && (
              <h2 className='text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
                {achievementSection.recognitionTitle}
              </h2>
            )}

            <div className='w-full'>
              <div className={recognitionGridColumnsClass}>
                {achievementSection.recognitions.map((item) => (
                  <article
                    key={item.id}
                    className='flex h-full flex-col items-center justify-start gap-4 text-center text-white'
                  >
                    <IconBadge
                      iconName={item.icon?.iconName}
                      iconColor={item.icon?.iconColor ?? undefined}
                      backgroundColor={item.icon?.backgroundColor ?? undefined}
                      variant='secondary'
                      size='lg'
                      className='border border-white/10'
                    />
                    <h3 className='text-lg font-semibold sm:text-xl'>{item.title}</h3>
                    {hasText(item.description) && (
                      <p className='text-sm text-white/80 sm:text-base'>{item.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
