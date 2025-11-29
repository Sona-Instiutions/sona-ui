import { cn } from "@/lib/utils";
import { applyColorStyle, getColorClassName, hasText } from "@/utils/common.utils";

type SplitTitleAlignment = "left" | "center";

interface SplitTitleProps {
  /** Optional prefix text rendered before the highlight */
  prefix?: string | null;
  /** Optional color token or CSS color for the prefix */
  prefixColor?: string | null;
  /** Highlight text rendered after the prefix */
  highlight?: string | null;
  /** Optional color token or CSS color for the highlight */
  highlightColor?: string | null;
  /** Alignment of the heading */
  align?: SplitTitleAlignment;
  /** Additional className overrides */
  className?: string;
  /** Default class applied when no prefix color is supplied */
  defaultPrefixClassName?: string;
  /** Default class applied when no highlight color is supplied */
  defaultHighlightClassName?: string;
}

const ALIGNMENT_CLASS_MAP: Record<SplitTitleAlignment, string> = {
  left: "text-left",
  center: "text-center",
};

const DEFAULT_HEADING_CLASSES = "text-3xl font-bold leading-tight sm:text-4xl md:text-5xl";

/**
 * Renders a split heading composed of a prefix and highlighted segment with flexible color overrides.
 */
export function SplitTitle({
  prefix,
  prefixColor,
  highlight,
  highlightColor,
  align = "center",
  className,
  defaultPrefixClassName = "text-white",
  defaultHighlightClassName = "text-amber-400",
}: SplitTitleProps) {
  if (!hasText(prefix) && !hasText(highlight)) {
    return null;
  }

  const prefixStyle = applyColorStyle(prefixColor);
  const prefixClass = getColorClassName(prefixColor, defaultPrefixClassName);

  const highlightStyle = applyColorStyle(highlightColor);
  const highlightClass = getColorClassName(highlightColor, defaultHighlightClassName);

  return (
    <h2 className={cn(DEFAULT_HEADING_CLASSES, ALIGNMENT_CLASS_MAP[align], className)}>
      {hasText(prefix) && (
        <span className={prefixStyle ? undefined : prefixClass} style={prefixStyle}>
          {prefix}
          {hasText(highlight) ? " " : ""}
        </span>
      )}
      {hasText(highlight) && (
        <span className={highlightStyle ? undefined : highlightClass} style={highlightStyle}>
          {highlight}
        </span>
      )}
    </h2>
  );
}






