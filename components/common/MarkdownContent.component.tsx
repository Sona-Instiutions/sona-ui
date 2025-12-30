"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { buildMediaUrl } from "@/utils/common.utils";
import { cn } from "@/lib/utils";
import React from "react";

export interface MarkdownContentProps {
  /** Markdown string to render */
  content?: string | null;
  /** Optional className applied to wrapper */
  className?: string;
  /** Custom markdown component overrides */
  components?: Components;
}

/**
 * Client-side markdown renderer compatible with React Server Components.
 */
export function MarkdownContent({ content, className, components: customComponents }: MarkdownContentProps) {
  if (!content || content.trim().length === 0) {
    return null;
  }

  const defaultComponents: Components = {
    // Customize links (e.g. for video embedding or external links)
    a: ({ href, children }) => {
      const isYouTube = href?.includes("youtube.com/watch") || href?.includes("youtu.be/");

      if (isYouTube && href) {
        // Simple regex to get ID
        const videoId = href.includes("watch?v=") ? href.split("v=")[1]?.split("&")[0] : href.split("/").pop();

        return (
          <div className='my-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg'>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className='h-full w-full'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        );
      }

      return (
        <a
          href={href}
          className='font-medium text-sky-600 underline underline-offset-4 transition hover:text-sky-700'
          target='_blank'
          rel='noopener noreferrer'
        >
          {children}
        </a>
      );
    },
    // Optimize images using Next.js Image component
    img: ({ src, alt, ...props }) => {
      if (!src || typeof src !== "string") return null;
      // If it's already a full URL, use it. Otherwise, build it.
      const imageUrl = src.startsWith("http") ? src : buildMediaUrl({ url: src });
      if (!imageUrl) return null;

      // Extract className if passed via cloneElement safely
      const customClassName =
        typeof props === "object" && props !== null && "className" in props
          ? (props as { className: string }).className
          : undefined;

      return (
        <Image
          src={imageUrl}
          alt={alt || "Event image"}
          width={1200}
          height={800}
          className={cn(
            "rounded-xl transition-transform duration-300 hover:scale-[1.01]",
            customClassName || "object-contain w-full h-auto"
          )}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
        />
      );
    },
    // Detect "Gallery" behavior in paragraphs
    p: ({ children, ...props }) => {
      // Check if this paragraph only contains images (ignoring whitespace/newlines)
      const childrenArray = React.Children.toArray(children);
      const meaningfulChildren = childrenArray.filter((child) => {
        if (typeof child === "string") return child.trim().length > 0;
        return true;
      });

      const isGallery =
        meaningfulChildren.length > 0 &&
        meaningfulChildren.every((child) => {
          if (!React.isValidElement(child)) return false;
          // React Markdown renders images as 'img' elements or wraps them in other ways
          // depending on plugins/version, but usually they are elements with a src or type img
          // Check if it's an 'img' tag or has a 'src' prop without using 'any'
          return (
            child.type === "img" || (typeof child.props === "object" && child.props !== null && "src" in child.props)
          );
        });

      // If it's a collection of images, render as a fluid grid gallery
      if (isGallery) {
        const totalImages = meaningfulChildren.length;
        const isOdd = totalImages % 2 !== 0;

        return (
          <div className='my-12 grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {meaningfulChildren.map((child, index) => {
              const isLast = index === totalImages - 1;
              const isFullWidth = isLast && isOdd;

              return (
                <div
                  key={index}
                  className={cn(
                    "relative w-full overflow-hidden rounded-xl bg-slate-50",
                    isFullWidth ? "sm:col-span-2 aspect-21/9" : "aspect-3/2"
                  )}
                >
                  {React.cloneElement(child as React.ReactElement<{ className?: string }>, {
                    className: "absolute inset-0 w-full h-full object-cover",
                  })}
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <p className='mb-6 leading-relaxed' {...props}>
          {children}
        </p>
      );
    },
    ...customComponents,
  };

  return (
    <div
      className={cn(
        "prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-img:rounded-xl",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={defaultComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
