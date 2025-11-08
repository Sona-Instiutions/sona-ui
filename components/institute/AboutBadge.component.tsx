interface AboutBadgeProps {
  /** Primary value displayed prominently (e.g., 98%) */
  value?: string | null;
  /** Supporting text describing the metric (e.g., Job Placement Rate) */
  text?: string | null;
  /** Optional badge color keyword */
  color?: string | null;
}

const BADGE_COLOR_MAP: Record<string, string> = {
  yellow: "bg-amber-400 text-slate-900",
  gold: "bg-amber-500 text-slate-900",
  blue: "bg-sky-500 text-white",
  navy: "bg-indigo-600 text-white",
  green: "bg-emerald-500 text-white",
  teal: "bg-teal-500 text-white",
  slate: "bg-slate-800 text-white",
  gray: "bg-slate-600 text-white",
};

const DEFAULT_STYLE = "bg-amber-400 text-slate-900";

/**
 * Badge overlay component highlighting institution metrics (e.g., placement rate).
 *
 * @param value - Primary metric value.
 * @param text - Supporting label for the metric.
 * @param color - Optional color keyword mapped to Tailwind classes.
 */
export function AboutBadge({ value, text, color }: AboutBadgeProps) {
  if (!value && !text) {
    return null;
  }

  const badgeClass = BADGE_COLOR_MAP[color?.toLowerCase() ?? ""] ?? DEFAULT_STYLE;

  return (
    <div
      className={`flex min-w-[120px] flex-col items-center rounded-2xl px-5 py-4 shadow-lg shadow-black/10 ${badgeClass}`}
      aria-label={text ?? value ?? "Institution highlight"}
    >
      {value && (
        <span className="text-2xl font-semibold leading-none sm:text-3xl">
          {value}
        </span>
      )}

      {text && (
        <span className="mt-1 text-center text-sm font-medium leading-snug sm:text-base">
          {text}
        </span>
      )}
    </div>
  );
}

