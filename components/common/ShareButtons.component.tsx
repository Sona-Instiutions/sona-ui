"use client";

import React, { useState } from "react";
import { FacebookLogoIcon, XLogoIcon, LinkedinLogoIcon, LinkIcon, CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { IShareButtonsProps } from "@/types/common.types";

/**
 * Share Buttons Component
 *
 * Renders social media sharing buttons in horizontal or vertical layout.
 * Supports desktop-sticky and mobile-inline usage.
 */
export function ShareButtons({ title, variant = "horizontal", showLabels = true, className }: IShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Get current URL on client-side
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(currentUrl);

  const isVertical = variant === "vertical";

  // Recompute share links whenever currentUrl changes
  const shareLinks = React.useMemo(() => [
    {
      name: "LinkedIn",
      icon: LinkedinLogoIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0A66C2] hover:bg-[#0958a8]",
    },
    {
      name: "X",
      icon: XLogoIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#000000] hover:bg-[#333333]",
    },
    {
      name: "Facebook",
      icon: FacebookLogoIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
    },
  ], [encodedUrl, encodedTitle]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  };

  return (
    <div
      className={cn(
        "flex gap-6",
        isVertical ? "flex-col items-center" : "flex-col sm:flex-row sm:items-center",
        className
      )}
    >
      {showLabels && !isVertical && (
        <span className='text-xs font-bold text-gray-500 uppercase tracking-[0.2em]'>Share this:</span>
      )}

      <div className={cn("flex gap-3", isVertical ? "flex-col gap-2" : "flex-wrap")}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className={cn(
              "flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm",
              isVertical ? "w-10 h-10 rounded-full" : "px-4 py-2 rounded-full",
              link.color,
              "text-white"
            )}
            aria-label={`Share on ${link.name}`}
            title={isVertical ? link.name : undefined}
          >
            <link.icon size={isVertical ? 24 : 18} weight='fill' />
            {showLabels && !isVertical && <span className='hidden lg:inline text-xs font-bold ml-2'>{link.name}</span>}
          </a>
        ))}

        <button
          onClick={copyToClipboard}
          className={cn(
            "flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm border",
            isVertical ? "w-10 h-10 rounded-full" : "px-4 py-2 rounded-full",
            copied
              ? "bg-green-500 text-white border-green-500"
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
          )}
          aria-label='Copy Link'
          title={isVertical ? "Copy Link" : undefined}
        >
          {copied ? (
            <>
              <CheckIcon size={isVertical ? 24 : 18} weight='bold' />
              {showLabels && !isVertical && <span className='text-xs font-bold ml-2'>Copied!</span>}
            </>
          ) : (
            <>
              <LinkIcon size={isVertical ? 24 : 18} weight='bold' />
              {showLabels && !isVertical && <span className='text-xs font-bold ml-2'>Copy Link</span>}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
