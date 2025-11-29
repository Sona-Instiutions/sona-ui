"use client";

import { INormalizedPartnershipSection } from "@/types/institution.types";
import { PartnershipCard } from "./PartnershipCard.component";
import { SectionHeader } from "../common/SectionHeader.component";
import { MarkdownContent } from "../common/MarkdownContent.component";
import { buildMediaUrl } from "@/utils/common.utils";
import Image from "next/image";

interface InstitutionPartnershipsProps {
  partnershipSection: INormalizedPartnershipSection | null;
}

export function InstitutionPartnerships({ partnershipSection }: InstitutionPartnershipsProps) {
  if (!partnershipSection || !partnershipSection.partnerships || partnershipSection.partnerships.length === 0) {
    return null;
  }

  const {
    titlePrefix,
    titlePrefixColor,
    titleHighlight,
    titleHighlightColor,
    description,
    backgroundImage,
    partnerships,
  } = partnershipSection;
  const backgroundImageUrl = buildMediaUrl(backgroundImage);

  return (
    <section className='relative w-full overflow-hidden bg-slate-900 px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12'>
      {/* Background Image with Overlay */}
      {backgroundImageUrl && (
        <div className='absolute inset-0 z-0'>
          <Image
            src={backgroundImageUrl}
            alt='Partnerships Background'
            fill
            className='object-cover opacity-98'
            priority={false}
          />
          <div className='absolute inset-0 bg-linear-to-r from-black/40 via-black/30 to-black/20' />
        </div>
      )}

      <div className='relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12'>
        <div className='flex flex-col items-center gap-6 text-center'>
          <SectionHeader
            titlePrefix={titlePrefix}
            titlePrefixColor={titlePrefixColor || "text-white"}
            titleHighlight={titleHighlight}
            titleHighlightColor={titleHighlightColor || "text-yellow-400"}
            align='center'
          />

          <div className='max-w-3xl text-lg text-slate-300 sm:text-xl'>
            <MarkdownContent content={description} className='text-slate-300' />
          </div>
        </div>

        {/* Partnerships Grid */}
        <div className='grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {partnerships.map((partnership) => (
            <PartnershipCard key={partnership.id} partnership={partnership} />
          ))}
        </div>
      </div>
    </section>
  );
}
