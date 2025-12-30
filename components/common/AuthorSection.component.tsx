/**
 * Author Section Component
 *
 * Displays author information at the end of an article.
 */

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedinLogoIcon, TwitterLogoIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { buildMediaUrl } from "@/utils/common.utils";
import { IStrapiMedia } from "@/types/common.types";

export interface IAuthorProfile {
  name: string;
  role?: string;
  bio?: string;
  image?: IStrapiMedia | null;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

interface AuthorSectionProps {
  author: string | IAuthorProfile | null;
}

export function AuthorSection({ author }: AuthorSectionProps) {
  if (!author) return null;

  // Handle both string and object formats
  const isObject = typeof author !== "string";
  const name = isObject ? author.name : author;
  const role = isObject ? author.role : null;
  const bio = isObject ? author.bio : null;
  const imageUrl = isObject && author.image ? buildMediaUrl(author.image) : null;
  const linkedin = isObject ? author.linkedin : null;
  const twitter = isObject ? author.twitter : null;
  const email = isObject ? author.email : null;

  return (
    <section className='bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start border border-gray-100'>
      {/* Avatar */}
      <div className='relative w-24 h-24 shrink-0 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm'>
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className='object-cover' />
        ) : (
          <span className='text-3xl font-bold text-blue-600'>{name.charAt(0).toUpperCase()}</span>
        )}
      </div>

      {/* Content */}
      <div className='flex-1 text-center md:text-left'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3'>
          <div>
            <h4 className='text-xl font-bold text-gray-900'>{name}</h4>
            {role && <p className='text-sm text-blue-600 font-medium'>{role}</p>}
          </div>

          {/* Social Links */}
          <div className='flex items-center justify-center md:justify-end gap-3 text-gray-400'>
            {linkedin && (
              <Link href={linkedin} target='_blank' className='hover:text-blue-700 transition-colors'>
                <LinkedinLogoIcon size={20} weight='fill' />
              </Link>
            )}
            {twitter && (
              <Link href={twitter} target='_blank' className='hover:text-sky-500 transition-colors'>
                <TwitterLogoIcon size={20} weight='fill' />
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} className='hover:text-gray-900 transition-colors'>
                <EnvelopeIcon size={20} weight='fill' />
              </Link>
            )}
          </div>
        </div>

        {bio ? (
          <p className='text-gray-600 leading-relaxed text-sm md:text-base'>{bio}</p>
        ) : (
          <p className='text-gray-500 italic text-sm'>No biography provided for this author.</p>
        )}
      </div>
    </section>
  );
}


