import { cn } from "@/lib/utils";
import { DecoratorLine } from "@/components/common/DecoratorLine.component";
import { SplitTitle } from "@/components/common/SplitTitle.component";
import { hasText } from "@/utils/common.utils";

type SectionHeaderAlignment = "left" | "center";

interface SectionHeaderProps {
  /** Primary section title text */
  title?: string | null;
  /** Optional title prefix */
  titlePrefix?: string | null;
  /** Optional title prefix color */
  titlePrefixColor?: string | null;
  /** Optional title highlight */
  titleHighlight?: string | null;
  /** Optional title highlight color */
  titleHighlightColor?: string | null;
  /** Optional alignment for the header content (default: center) */
  align?: SectionHeaderAlignment;
  /** Additional classes for custom layout adjustments */
  className?: string;
}

const ALIGNMENT_CLASS_MAP: Record<SectionHeaderAlignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

/**
 * Reusable section header featuring the signature SONA decorator line and title.
 */
export function SectionHeader({
  title,
  titlePrefix,
  titlePrefixColor,
  titleHighlight,
  titleHighlightColor,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", ALIGNMENT_CLASS_MAP[align], className)}>
      <DecoratorLine align={align} />
      {hasText(titlePrefix) || hasText(titleHighlight) ? (
        <SplitTitle
          prefix={titlePrefix}
          prefixColor={titlePrefixColor}
          highlight={titleHighlight}
          highlightColor={titleHighlightColor}
          align={align}
          className='text-2xl font-semibold sm:text-3xl md:text-4xl'
          defaultPrefixClassName='text-slate-900'
          defaultHighlightClassName='text-amber-500'
        />
      ) : (
        <h2 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>{title}</h2>
      )}
    </div>
  );
}

