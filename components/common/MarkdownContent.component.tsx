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
    // Optimize images using Next.js Image component
    img: ({ src, alt, ...props }) => {
      if (!src) return null;
      const imageUrl = buildMediaUrl({ url: src });
      if (!imageUrl) return null;

      return (
        <span className="relative block w-full my-8 group">
          <Image
            src={imageUrl}
            alt={alt || "Event image"}
            width={1200}
            height={800}
            className="rounded-xl object-cover w-full h-auto transition-transform duration-300 group-hover:scale-[1.01]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </span>
      );
    },
    // Detect "Gallery" behavior in paragraphs
    p: ({ children, ...props }) => {
      // Check if this paragraph only contains images
      const childrenArray = React.Children.toArray(children);
      const hasOnlyImages = childrenArray.length > 0 && childrenArray.every(
        (child) => {
          if (!React.isValidElement(child)) return false;
          // React Markdown renders images as 'img' elements
          return child.type === 'img';
        }
      );

      // If it's a collection of images, render as a fluid flex gallery
      if (hasOnlyImages) {
        return (
          <div className="flex flex-wrap gap-4 my-8 items-start">
            {childrenArray.map((child, index) => (
              <div key={index} className="flex-1 min-w-[300px] max-w-full">
                {child}
              </div>
            ))}
          </div>
        );
      }

      return <p className="mb-6 leading-relaxed" {...props}>{children}</p>;
    },
    ...customComponents,
  };

  return (
    <div className={cn("prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-img:rounded-xl", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={defaultComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

