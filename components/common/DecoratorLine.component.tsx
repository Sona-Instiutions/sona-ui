import { cn } from "@/lib/utils";

type DecoratorAlignment = "left" | "center";

interface DecoratorLineProps {
  /** Alignment relative to parent container */
  align?: DecoratorAlignment;
  /** Optional override for gradient/background classes */
  gradientClassName?: string;
  /** Optional inline styles for custom colors */
  style?: React.CSSProperties;
  /** Additional className overrides */
  className?: string;
}

const ALIGNMENT_CLASS_MAP: Record<DecoratorAlignment, string> = {
  left: "",
  center: "mx-auto",
};

const DEFAULT_GRADIENT = "bg-linear-to-r from-transparent via-blue-800 to-transparent";

/**
 * Reusable decorative line used across SONA sections.
 */
export function DecoratorLine({
  align = "center",
  gradientClassName,
  style,
  className,
}: DecoratorLineProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-1.5 w-32 rounded-full shadow-sm",
        gradientClassName ?? DEFAULT_GRADIENT,
        ALIGNMENT_CLASS_MAP[align],
        className
      )}
      style={style}
    />
  );
}






