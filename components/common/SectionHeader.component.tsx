import { cn } from "@/lib/utils";

type SectionHeaderAlignment = "left" | "center";

interface SectionHeaderProps {
  /** Primary section title text */
  title: string;
  /** Optional alignment for the header content (default: center) */
  align?: SectionHeaderAlignment;
  /** Additional classes for custom layout adjustments */
  className?: string;
}

const LINE_BASE_CLASS =
  "inline-block h-1.5 w-32 rounded-full bg-linear-to-r from-transparent via-blue-800 to-transparent shadow-sm";

const ALIGNMENT_CLASS_MAP: Record<SectionHeaderAlignment, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const LINE_ALIGNMENT_MAP: Record<SectionHeaderAlignment, string> = {
  left: "",
  center: "mx-auto",
};

/**
 * Reusable section header featuring the signature SONA decorator line and title.
 */
export function SectionHeader({ title, align = "center", className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", ALIGNMENT_CLASS_MAP[align], className)}>
      <span className={cn(LINE_BASE_CLASS, LINE_ALIGNMENT_MAP[align])} aria-hidden />
      <h2 className='text-2xl font-semibold sm:text-3xl md:text-4xl'>{title}</h2>
    </div>
  );
}

