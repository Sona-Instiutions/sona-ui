import { cn } from "@/lib/utils";
import { hasText } from "@/utils/common.utils";

interface AchievementCardProps {
  /** Primary metric displayed prominently (e.g., 15K+) */
  statistic: string;
  /** Card heading describing the metric */
  title: string;
  /** Supporting description text */
  description?: string | null;
  /** Optional className overrides */
  className?: string;
}

/**
 * Visual card presenting a single achievement metric.
 */
export function AchievementCard({ statistic, title, description, className }: AchievementCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl border border-white/60 bg-white/95 p-6 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl sm:p-8",
        className
      )}
    >
      <div className='text-4xl font-extrabold text-amber-500 sm:text-5xl'>{statistic}</div>
      <h3 className='mt-3 text-lg font-semibold text-slate-900 sm:text-xl'>{title}</h3>
      {hasText(description) && <p className='mt-3 text-sm text-slate-600 sm:text-base'>{description}</p>}
    </article>
  );
}

