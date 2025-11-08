"use client";

import Image from "next/image";
import { Children, cloneElement, isValidElement, type ReactNode, type ComponentType } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CheckCircle, Lightning, RocketLaunch, Star, UsersThree, Flask, type IconProps } from "phosphor-react";
import type { IAboutInstitute } from "@/types/institution.types";
import { AboutBadge } from "@/components/institute/AboutBadge.component";
import { useAboutInstitute } from "@/services/client/institution.client";
import { buildMediaUrl, hasText } from "@/utils/common.utils";

interface InstitutionAboutProps {
  /** Institution identifier used to fetch about-institute content */
  institutionId?: number | null;
}

type IconComponent = ComponentType<IconProps>;

const BULLET_ICON_MAP: Record<string, IconComponent> = {
  check: CheckCircle,
  checkcircle: CheckCircle,
  checkmark: CheckCircle,
  star: Star,
  lightning: Lightning,
  rocket: RocketLaunch,
  rocketlaunch: RocketLaunch,
  flask: Flask,
  lab: Flask,
  users: UsersThree,
  usersthree: UsersThree,
};

const FALLBACK_BULLET_ICON = CheckCircle;

const markdownComponents: Components = {
  p: ({ children }) => <p className='text-base leading-relaxed text-slate-600 sm:text-lg'>{children}</p>,
  strong: ({ children }) => <strong className='font-semibold text-slate-900'>{children}</strong>,
  em: ({ children }) => <em className='italic text-slate-700'>{children}</em>,
  a: ({ children, href }) => (
    <a href={href} className='font-medium text-sky-600 underline underline-offset-4 transition hover:text-sky-700'>
      {children}
    </a>
  ),
};

const ICON_TOKEN_PATTERNS = [
  /^\s*\[([a-zA-Z0-9_-]+)\]\s*(.*)$/,
  /^\s*::([a-zA-Z0-9_-]+)::\s*(.*)$/,
  /^\s*\{icon:\s*([a-zA-Z0-9_-]+)\}\s*(.*)$/,
] as const;

const extractIconToken = (
  text: string
): {
  iconName?: string;
  remaining: string;
} => {
  for (const pattern of ICON_TOKEN_PATTERNS) {
    const match = text.match(pattern);

    if (match) {
      const [, iconName, remaining = ""] = match;
      return { iconName, remaining: remaining.trimStart() };
    }
  }

  return { remaining: text };
};

const stripIconToken = (nodeChildren: ReactNode[]): { iconName?: string; content: ReactNode[] } => {
  if (nodeChildren.length === 0) {
    return { content: nodeChildren };
  }

  const firstChild = nodeChildren[0];

  if (typeof firstChild === "string") {
    const { iconName, remaining } = extractIconToken(firstChild);

    if (!iconName) {
      return { content: nodeChildren };
    }

    const updatedChildren = [...nodeChildren];
    updatedChildren[0] = remaining;

    return { iconName, content: updatedChildren };
  }

  if (isValidElement(firstChild)) {
    const grandchildren = Children.toArray((firstChild.props as { children?: ReactNode }).children ?? []);

    if (grandchildren.length === 0) {
      return { content: nodeChildren };
    }

    const firstGrandChild = grandchildren[0];

    if (typeof firstGrandChild === "string") {
      const { iconName, remaining } = extractIconToken(firstGrandChild);

      if (!iconName) {
        return { content: nodeChildren };
      }

      const updatedGrandChildren = [...grandchildren];
      updatedGrandChildren[0] = remaining;

      const updatedFirstChild = cloneElement(firstChild, {}, updatedGrandChildren);
      const updatedChildren = [...nodeChildren];
      updatedChildren[0] = updatedFirstChild;

      return { iconName, content: updatedChildren };
    }
  }

  return { content: nodeChildren };
};

const listComponents: Partial<Components> = {
  ul: ({ children }) => <ul className='mt-6 list-none space-y-4'>{children}</ul>,
  li: ({ children }) => {
    const childArray = Children.toArray(children ?? []);
    const { iconName, content } = stripIconToken(childArray);
    const iconKey = iconName?.toLowerCase() ?? "";
    const IconComponent = BULLET_ICON_MAP[iconKey] ?? FALLBACK_BULLET_ICON;

    return (
      <li className='flex items-start gap-3'>
        <span className='mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600'>
          <IconComponent size={20} weight='fill' />
        </span>
        <div className='space-y-1 text-base text-slate-600 sm:text-lg'>{content}</div>
      </li>
    );
  },
};

const hasMeaningfulContent = (about?: IAboutInstitute | null): boolean => {
  if (!about) {
    return false;
  }

  return Boolean(
    hasText(about.title) ||
      hasText(about.description) ||
      hasText(about.bullets) ||
      about.image ||
      hasText(about.badgeText) ||
      hasText(about.badgeValue)
  );
};

/**
 * Institution About section displaying rich content about the institution.
 */
export function InstitutionAbout({ institutionId }: InstitutionAboutProps) {
  const hasValidId = typeof institutionId === "number" && institutionId > 0;
  const {
    data: about,
    isLoading,
    isFetching,
    error,
  } = useAboutInstitute({
    institutionId: hasValidId ? institutionId : null,
  });
  const isDataLoading = isLoading || isFetching;

  if (!hasValidId) {
    return null;
  }

  if (error) {
    console.error("Failed to fetch about section", error);
    return null;
  }

  if (isDataLoading) {
    return (
      <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
        <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-stretch'>
          <div className='flex flex-1 flex-col space-y-4'>
            <div className='h-6 w-48 animate-pulse rounded-full bg-slate-200' />
            <div className='space-y-3'>
              <div className='h-4 w-full animate-pulse rounded-full bg-slate-200' />
              <div className='h-4 w-5/6 animate-pulse rounded-full bg-slate-200' />
              <div className='h-4 w-3/4 animate-pulse rounded-full bg-slate-200' />
            </div>
            <div className='space-y-3'>
              <div className='h-4 w-2/3 animate-pulse rounded-full bg-slate-200' />
              <div className='h-4 w-1/2 animate-pulse rounded-full bg-slate-200' />
            </div>
          </div>
          <div className='relative h-64 w-full animate-pulse rounded-3xl bg-slate-200 sm:h-80 md:h-96' />
        </div>
      </section>
    );
  }

  if (!hasMeaningfulContent(about)) {
    return null;
  }

  const imageUrl = buildMediaUrl(about?.image);
  const imageAlt = about?.image?.alternativeText ?? about?.title ?? "Institution about section image";
  const hasBadge = hasText(about?.badgeText) || hasText(about?.badgeValue);

  return (
    <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-stretch'>
        <div className='flex flex-1 flex-col justify-center space-y-6'>
          {hasText(about?.title) && (
            <div className='flex flex-col items-center gap-3'>
              <span className='inline-block h-1.5 w-32 rounded-full bg-linear-to-r from-transparent via-blue-800 to-transparent shadow-sm' />
              <h2 className='text-center text-2xl font-semibold sm:text-3xl md:text-4xl'>{about?.title}</h2>
            </div>
          )}

          {hasText(about?.description) && (
            <div className='space-y-4'>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {about?.description as string}
              </ReactMarkdown>
            </div>
          )}

          {hasText(about?.bullets) && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{ ...markdownComponents, ...listComponents } as Components}
            >
              {about?.bullets as string}
            </ReactMarkdown>
          )}
        </div>

        {/* Right Column - Image with Badge */}
        {(imageUrl || hasBadge) && (
          <div className='relative flex w-full flex-col items-center justify-center lg:w-1/2'>
            <div className='relative w-full overflow-hidden rounded-3xl bg-slate-100 shadow-lg shadow-black/10 aspect-video'>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  sizes='(min-width: 1024px) 50vw, 100vw'
                  className='object-cover'
                  priority={false}
                  unoptimized
                />
              ) : (
                <div className='flex h-full w-full items-center justify-center bg-slate-200 text-center text-sm font-medium text-slate-600 sm:text-base'>
                  Banner image coming soon
                </div>
              )}
            </div>

            {hasBadge && (
              <div className='absolute -bottom-10 right-[-20px] lg:right-[-40px] lg:bottom-15'>
                <AboutBadge value={about?.badgeValue} text={about?.badgeText} color={about?.badgeColor} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
