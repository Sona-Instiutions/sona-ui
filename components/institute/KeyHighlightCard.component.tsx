"use client";

import { IconBadge } from "@/components/common/IconBadge.component";
import { cn } from "@/lib/utils";
import { applyColorStyle, getColorClassName } from "@/utils/common.utils";
import type { IIconBadge } from "@/types/institution.types";

interface KeyHighlightCardProps {
  title: string;
  titleColor?: string | null;
  description: string;
  icon?: IIconBadge | null;
  className?: string;
}

export function KeyHighlightCard({ title, titleColor, description, icon, className }: KeyHighlightCardProps) {
  const titleStyle = applyColorStyle(titleColor, "#fbbf24");
  const titleClassName = getColorClassName(titleColor, "text-amber-400");

  return (
    <article className={cn("flex items-start gap-4 sm:gap-5", className)}>
      {/* Icon */}
      <div className='shrink-0'>
        <IconBadge
          iconName={icon?.iconName}
          iconColor={icon?.iconColor ?? "#fbbf24"}
          backgroundColor='transparent'
          size='md'
          className='mt-1 p-0'
          weight='regular'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col gap-1.5'>
        <h3 className={cn("text-lg font-bold leading-tight sm:text-xl", titleClassName)} style={titleStyle}>
          {title}
        </h3>
        <p className='text-sm leading-relaxed text-white/80 sm:text-base'>{description}</p>
      </div>
    </article>
  );
}



