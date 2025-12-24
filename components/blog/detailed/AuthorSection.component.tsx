"use client";
import Link from "next/link";
import { Author } from "@/types/blog.types";
import { LinkedinLogoIcon, XLogoIcon, EnvelopeIcon } from "@phosphor-icons/react";

export default function AuthorSection({ author }: { author?: Author | null }) {
  if (!author) return null;

  const bioText = author.bio?.[0]?.children?.[0]?.text ?? "";

  return (
    <section className='mt-16 border-t pt-8'>
      <div className='flex gap-6'>
        {/* Avatar placeholder */}
        <div className='w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold'>
          {author.name?.charAt(0)}
        </div>

        {/* Content */}
        <div className='flex-1'>
          <h4 className='text-lg font-semibold text-gray-900'>{author.name}</h4>

          {author.role && <p className='text-sm text-gray-500 mb-2'>{author.role}</p>}

          {bioText && <p className='text-sm text-gray-600 mb-4 leading-relaxed'>{bioText}</p>}

          {/* Social Icons */}
          <div className='flex gap-4 text-gray-600'>
            {author.linkedin && (
              <Link href={author.linkedin} target='_blank'>
                <LinkedinLogoIcon weight='bold' size={20} />
              </Link>
            )}

            {author.twitter && (
              <Link href={author.twitter} target='_blank'>
                <XLogoIcon weight='bold' size={20} />
              </Link>
            )}

            {author.email && (
              <Link href={`mailto:${author.email}`}>
                <EnvelopeIcon weight='bold' size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
