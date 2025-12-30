"use client";

import Image from "next/image";
import { MarkdownContent } from "@/components/common/MarkdownContent.component";
import type { IAboutInstitute } from "@/types/institution.types";
import { AboutBadge } from "@/components/institute/AboutBadge.component";
import { useAboutInstitute } from "@/services/client/institution.client";
import { buildMediaUrl, hasText } from "@/utils/common.utils";
import { SectionHeader } from "@/components/common/SectionHeader.component";
import { IconBadge } from "@/components/common/IconBadge.component";

interface InstitutionAboutProps {
  /** Institution identifier used to fetch about-institute content */
  institutionId?: number | null;
}

const hasMeaningfulContent = (about?: IAboutInstitute | null): boolean => {
  if (!about) {
    return false;
  }

  return Boolean(
    hasText(about.titlePrefix) ||
      hasText(about.titleHighlight) ||
      hasText(about.description) ||
      (Array.isArray(about.bullets) && about.bullets.length > 0) ||
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
  const fallbackTitle = [about?.titlePrefix, about?.titleHighlight].filter((t) => t?.trim()).join(" ");
  const imageAlt = about?.image?.alternativeText ?? (fallbackTitle || "Institution about section image");
  const hasBadge = hasText(about?.badgeText) || hasText(about?.badgeValue);

  return (
    <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-stretch'>
        <div className='flex flex-1 flex-col justify-center space-y-6'>
          {(hasText(about?.titlePrefix) || hasText(about?.titleHighlight)) && (
            <SectionHeader
              titlePrefix={about?.titlePrefix}
              titlePrefixColor={about?.titlePrefixColor}
              titleHighlight={about?.titleHighlight}
              titleHighlightColor={about?.titleHighlightColor}
            />
          )}

          {hasText(about?.description) && (
            <div className='space-y-4'>
              <MarkdownContent content={about?.description as string} />
            </div>
          )}

          {Array.isArray(about?.bullets) && about?.bullets.length > 0 && (
            <ul className='mt-6 list-none space-y-4'>
              {about.bullets.map((bullet) => {
                const { icon } = bullet;
                const bulletIcon = typeof icon === "number" ? null : icon;

                return (
                  <li key={bullet.id ?? bullet.text} className='flex items-start gap-3'>
                    <IconBadge
                      iconName={bulletIcon?.iconName}
                      iconColor={bulletIcon?.iconColor}
                      backgroundColor={bulletIcon?.backgroundColor}
                      size='md'
                      className='mt-1 shrink-0'
                      variant='primary'
                      ariaLabel={bulletIcon?.displayName ?? bulletIcon?.iconName ?? undefined}
                    />
                    <div className='space-y-1 text-base text-slate-600 sm:text-lg'>
                      <MarkdownContent content={bullet.text} />
                    </div>
                  </li>
                );
              })}
            </ul>
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
              <div className='absolute -bottom-10 right-[-20px] lg:right-[-40px] lg:-bottom-15'>
                <AboutBadge value={about?.badgeValue} text={about?.badgeText} color={about?.badgeColor} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
