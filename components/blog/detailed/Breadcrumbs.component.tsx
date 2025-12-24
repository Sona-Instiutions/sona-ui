"use client";
import Link from "next/link";
import Image from "next/image";
import { CalendarBlankIcon, UserIcon, ClockIcon, TagIcon } from "@phosphor-icons/react";

type BreadcrumbsProps = {
  title: string;
  bannerImage?: string;

  publishedDate?: string;
  readTime?: number;
  author?: {
    name: string;
  };
  category?: {
    name: string;
    slug: string;
  };
};

export default function Breadcrumbs({
  title,
  bannerImage,
  publishedDate,
  readTime,
  author,
  category,
}: BreadcrumbsProps) {
  const items = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    category
      ? {
          label: category.name,
          href: `/blog/category/${category.slug}`,
        }
      : null,
  ].filter(Boolean) as { label: string; href?: string }[];

  return (
    <section className='relative w-full h-[360px] overflow-hidden'>
      {/* Background Image */}
      {bannerImage && <Image src={bannerImage} alt={title} fill priority className='object-cover object-center' />}

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/65' />

      {/* Content */}
      <div className='relative z-10 h-full flex items-center mx-auto max-w-6xl'>
        <div className='px-6 text-white w-full'>
          {/* Breadcrumbs */}
          <nav className='mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70'>
            {items.map((item, index) => (
              <span key={index} className='flex items-center gap-2'>
                {item.href ? (
                  <Link href={item.href} className='hover:text-white transition'>
                    {item.label}
                  </Link>
                ) : (
                  <span className='text-white font-medium'>{item.label}</span>
                )}
                {index < items.length - 1 && <span className='text-white/40'>›</span>}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className='text-3xl md:text-5xl font-bold leading-tight max-w-4xl mb-4'>{title}</h1>

          {/* Meta Info */}
          <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80'>
            {publishedDate && (
              <div className='flex items-center gap-2'>
                <CalendarBlankIcon weight='bold' size={18} />
                <span>
                  {new Date(publishedDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {author?.name && (
              <div className='flex items-center gap-2'>
                <UserIcon weight='bold' size={24} />
                <span>{author.name}</span>
              </div>
            )}

            {readTime && (
              <div className='flex items-center gap-2'>
                <ClockIcon weight='bold' size={24} />
                <span>{readTime} min read</span>
              </div>
            )}

            {category?.name && (
              <div className='flex items-center gap-2'>
                <TagIcon weight='bold' size={24} />
                <span>{category.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
