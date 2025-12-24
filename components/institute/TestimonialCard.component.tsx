"use client";

import { buildMediaUrl } from "@/utils/common.utils";
import Image from "next/image";
import { StarIcon } from "@phosphor-icons/react";
import { ITestimonial } from "@/types/institution.types";

interface ITestimonialCardProps {
  testimonial: ITestimonial;
}

export const TestimonialCard = ({ testimonial }: ITestimonialCardProps) => {
  const { name, role, company, quote, rating, avatar } = testimonial;
  const avatarUrl = buildMediaUrl(avatar);
  return (
    <div className='flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md border border-gray-100'>
      <div className='mb-6 flex items-center gap-4'>
        <div className='relative h-14 w-14 overflow-hidden rounded-full bg-gray-100'>
          {avatarUrl ? (
            <Image src={avatarUrl} alt={name} fill className='object-cover' />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-primary-50 text-xl font-bold text-primary-600'>
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className='font-bold text-gray-900'>{name}</h4>
          <p className='text-sm text-gray-500'>
            {role}
            {company && <span className='ml-1'>at {company}</span>}
          </p>
        </div>
      </div>

      {rating && (
        <div className='mb-4 flex gap-1'>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} weight='fill' className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`} />
          ))}
        </div>
      )}

      <p className='text-gray-600 leading-relaxed'>&quot;{quote}&quot;</p>
    </div>
  );
};
