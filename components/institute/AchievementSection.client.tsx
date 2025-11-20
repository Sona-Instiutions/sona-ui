"use client";

import { AchievementCard } from "@/components/institute/AchievementCard.component";
import { DecoratorLine } from "@/components/common/DecoratorLine.component";
import { SplitTitle } from "@/components/common/SplitTitle.component";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import type { INormalizedAchievement } from "@/types/institution.types";
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

interface AchievementSectionProps {
  achievementSection: INormalizedAchievement;
}

/**
 * Client component that renders the achievement section UI.
 * Must be a client component because it uses MarkdownContent with custom components.
 */
export function AchievementSection({ achievementSection }: AchievementSectionProps) {
  const markdownComponents: Components = {
    strong: ({ children }) => <strong className='font-semibold text-slate-900'>{children}</strong>,
    em: ({ children }) => <em className='italic text-slate-700'>{children}</em>,
    a: ({ children, href }) => (
      <a
        href={href}
        className='font-medium text-sky-600 underline underline-offset-4 transition hover:text-sky-700'
      >
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

  return (
    <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className={cn("mx-auto flex w-full flex-col items-center gap-8", containerMaxWidthClass)}>
        <DecoratorLine />

        <SplitTitle
          prefix={achievementSection.titlePrefix}
          prefixColor={achievementSection.titlePrefixColor}
          highlight={achievementSection.titleHighlight}
          highlightColor={achievementSection.titleHighlightColor}
          defaultPrefixClassName='text-slate-900'
          defaultHighlightClassName='text-amber-500'
        />

        <MarkdownContent
          content={achievementSection.description}
          className='prose prose-slate max-w-3xl text-center text-base leading-relaxed sm:text-lg'
          components={markdownComponents}
        />

        <div className='w-full'>
          <div className={gridColumnsClass}>
            {achievementSection.achievements.map((card) => (
              <AchievementCard
                key={card.id}
                statistic={card.statistic}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




