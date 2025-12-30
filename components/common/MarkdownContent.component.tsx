"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { buildMediaUrl } from "@/utils/common.utils";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

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
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

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

      // If we have a custom class (usually from gallery), apply it to the wrapper
      // and make the image absolute to fill it.
      return (
        <div
          className={cn(
            "relative group cursor-pointer overflow-hidden",
            customClassName ? customClassName : "my-8 rounded-xl"
          )}
          onClick={() => setSelectedImage({ url: imageUrl, alt: alt || "" })}
        >
          <Image
            src={imageUrl}
            alt={alt || "Event image"}
            width={1200}
            height={800}
            className={cn(
              "transition-transform duration-500 group-hover:scale-105",
              customClassName
                ? "absolute inset-0 w-full h-full object-cover"
                : "w-full h-auto rounded-xl object-contain"
            )}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
          />
          <div className='absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
            <Maximize2 size={18} />
          </div>
        </div>
      );
    },
    // Detect "Gallery" behavior in paragraphs
    p: ({ children, ...props }) => {
      // Check if this paragraph contains any images
      const childrenArray = React.Children.toArray(children);

      // Recursive helper to find if an element contains an image
      const hasImage = (element: React.ReactNode): boolean => {
        if (!React.isValidElement(element)) return false;
        const eProps = element.props as Record<string, unknown>;
        // Check for 'src' which is the hallmark of an image in our setup
        if (element.type === "img" || "src" in eProps || "imageUrl" in eProps) return true;
        if (eProps.children) {
          return React.Children.toArray(eProps.children as React.ReactNode).some((c) => hasImage(c));
        }
        return false;
      };

      // Group children into "image blocks" and "text blocks"
      const blocks: { isGallery: boolean; nodes: React.ReactNode[] }[] = [];
      let currentNodes: React.ReactNode[] = [];
      let currentIsImage = false;

      childrenArray.forEach((child) => {
        const isWhitespace = typeof child === "string" && child.trim().length === 0;
        const isImg = hasImage(child);

        if (isWhitespace) {
          currentNodes.push(child);
          return;
        }

        if (isImg === currentIsImage) {
          currentNodes.push(child);
        } else {
          if (currentNodes.length > 0) {
            blocks.push({ isGallery: currentIsImage, nodes: currentNodes });
          }
          currentNodes = [child];
          currentIsImage = isImg;
        }
      });
      if (currentNodes.length > 0) {
        blocks.push({ isGallery: currentIsImage, nodes: currentNodes });
      }

      // If a block is identified as a gallery (contains images), render it in a grid
      return (
        <div className='mb-6' {...props}>
          {blocks.map((block, bIdx) => {
            if (block.isGallery) {
              const images = block.nodes.filter((n) => hasImage(n));
              const totalImages = images.length;
              const isOdd = totalImages % 2 !== 0;

              // If only one image in this block, render it normally but with our styling
              if (totalImages === 1) {
                return (
                  <div key={bIdx} className='relative w-full aspect-21/9 overflow-hidden rounded-xl'>
                    {React.cloneElement(images[0] as React.ReactElement<{ className?: string }>, {
                      className: "absolute inset-0 w-full h-full",
                    })}
                  </div>
                );
              }

              return (
                <div key={bIdx} className='my-12 grid grid-cols-1 gap-6 sm:grid-cols-2'>
                  {images.map((child, index) => {
                    const isLast = index === totalImages - 1;
                    const isFullWidth = isLast && isOdd;

                    return (
                      <div
                        key={index}
                        className={cn(
                          "relative w-full overflow-hidden rounded-xl",
                          isFullWidth ? "sm:col-span-2 aspect-21/9" : "aspect-3/2"
                        )}
                      >
                        {React.cloneElement(child as React.ReactElement<{ className?: string }>, {
                          className: "absolute inset-0 w-full h-full",
                        })}
                      </div>
                    );
                  })}
                </div>
              );
            }

            // Normal text block
            return (
              <span key={bIdx} className='leading-relaxed'>
                {block.nodes}
              </span>
            );
          })}
        </div>
      );
    },
    ...customComponents,
  };

  return (
    <>
      <div
        className={cn(
          "prose max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-h3:text-xl prose-h4:text-lg prose-img:rounded-xl",
          className
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={defaultComponents}>
          {content}
        </ReactMarkdown>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className='max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent shadow-none flex items-center justify-center'>
          <DialogTitle className='sr-only'>Expanded Image</DialogTitle>
          {selectedImage && (
            <div className='relative w-full h-full flex items-center justify-center'>
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt || "Event image preview"}
                width={1920}
                height={1080}
                className='max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl'
                priority
              />
              <button
                onClick={() => setSelectedImage(null)}
                className='fixed top-6 right-6 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all hover:scale-110 z-60'
                aria-label='Close preview'
              >
                <X size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
