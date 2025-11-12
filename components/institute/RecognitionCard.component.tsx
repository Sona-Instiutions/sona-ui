import { IconBadge } from "@/components/common/IconBadge.component";
import type { IIconBadge } from "@/types/institution.types";
import { hasText } from "@/utils/common.utils";

interface RecognitionCardProps {
  /** Icon metadata sourced from Strapi */
  icon: IIconBadge | null;
  /** Recognition title */
  title: string;
  /** Supporting description copy */
  description?: string | null;
}

/**
 * Card component highlighting a single recognition or award.
 */
export function RecognitionCard({ icon, title, description }: RecognitionCardProps) {
  const ariaLabel = icon?.displayName ?? icon?.iconName ?? undefined;

  return (
    <article className='flex h-full flex-col items-center justify-start gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 text-center text-white shadow-xl shadow-slate-950/20 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl sm:p-8'>
      <IconBadge
        iconName={icon?.iconName}
        iconColor={icon?.iconColor ?? undefined}
        backgroundColor={icon?.backgroundColor ?? undefined}
        variant='secondary'
        size='lg'
        ariaLabel={ariaLabel ?? undefined}
        className='border border-white/10'
      />
      <h3 className='text-lg font-semibold sm:text-xl'>{title}</h3>
      {hasText(description) && <p className='text-sm text-white/80 sm:text-base'>{description}</p>}
    </article>
  );
}
