import { cn } from "@/lib/utils";
import { DecoratorLine } from "@/components/common/DecoratorLine.component";

type SectionHeaderAlignment = "left" | "center";

interface SectionHeaderProps {
  /** Primary section title text */
  title: string;
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
export function SectionHeader({ title, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", ALIGNMENT_CLASS_MAP[align], className)}>
      <DecoratorLine align={align} />
      <h2 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>{title}</h2>
    </div>
  );
}

