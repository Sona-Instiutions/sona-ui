"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { IconBadge } from "@/components/common/IconBadge.component";
import { cn } from "@/lib/utils";
import { applyColorStyle, getColorClassName, hasText } from "@/utils/common.utils";
import type { IIconBadge } from "@/types/institution.types";

interface ValuePropositionCardProps {
  /** Headline displayed for the value proposition */
  title: string;
  /** Optional color token/class for the title */
  titleColor?: string | null;
  /** Markdown-supported description */
  description: string;
  /** Icon badge metadata */
  icon?: IIconBadge | null;
  /** Optional container class overrides */
  className?: string;
}

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className='text-base leading-relaxed text-white/90 sm:text-lg'>{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className='font-semibold text-white'>{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => <em className='text-white/90'>{children}</em>,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className='list-disc space-y-2 pl-5 text-left text-white/90'>{children}</ul>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
};

/**
 * Individual value proposition card with icon, colored title, and supporting copy.
 */
export function ValuePropositionCard({ title, titleColor, description, icon, className }: ValuePropositionCardProps) {
  const resolvedDescription = hasText(description) ? description : "";

  const titleStyle = applyColorStyle(titleColor, "#fbbf24");
  const titleClassName = getColorClassName(titleColor, "text-amber-400");

  return (
    <article
      className={cn(
        "flex h-full flex-col items-center gap-4 rounded-3xl bg-black/20 p-6 text-center backdrop-blur-sm transition hover:bg-black/30",
        "sm:p-7 md:p-8",
        className
      )}
    >
      <IconBadge
        iconName={icon?.iconName}
        iconColor={icon?.iconColor ?? "#ffffff"}
        backgroundColor={icon?.backgroundColor ?? "#1e3a8a"}
        size='lg'
        ariaLabel={icon?.displayName ?? title}
        className='shadow-lg shadow-slate-950/30'
      />

      <h3
        className={cn("text-xl font-semibold sm:text-2xl", titleStyle ? undefined : titleClassName)}
        style={titleStyle}
      >
        {title}
      </h3>

      {resolvedDescription && (
        <div className='prose prose-invert prose-p:my-0 prose-strong:text-white prose-ul:list-disc'>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {resolvedDescription}
          </ReactMarkdown>
        </div>
      )}
    </article>
  );
}
