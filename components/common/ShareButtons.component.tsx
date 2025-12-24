/**
 * Share Buttons Component
 *
 * Social media sharing buttons.
 * Uses Phosphor icons.
 */

"use client";

import React, { useState } from "react";
import { FacebookLogo, TwitterLogo, LinkedinLogo, WhatsappLogo, Link as LinkIcon, Check } from "phosphor-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string; // Full absolute URL
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FacebookLogo,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#166fe5]",
    },
    {
      name: "Twitter",
      icon: TwitterLogo,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-[#1DA1F2] hover:bg-[#1a91da]",
    },
    {
      name: "LinkedIn",
      icon: LinkedinLogo,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-[#0A66C2] hover:bg-[#0958a8]",
    },
    {
      name: "WhatsApp",
      icon: WhatsappLogo,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "bg-[#25D366] hover:bg-[#20bd5a]",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center gap-6", className)}>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Share this event:</span>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm",
              link.color
            )}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon size={18} weight="fill" />
            <span className="hidden lg:inline">{link.name}</span>
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-sm border",
            copied 
              ? "bg-green-500 text-white border-green-500" 
              : "bg-white text-gray-700 border-gray-200 hover:border-gray-900"
          )}
          aria-label="Copy Link"
        >
          {copied ? (
            <>
              <Check size={18} weight="bold" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon size={18} weight="bold" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

