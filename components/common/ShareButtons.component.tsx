/**
 * Share Buttons Component
 *
 * Social media sharing buttons.
 * Uses Phosphor icons.
 */

"use client";

import React from "react";
import { FacebookLogo, TwitterLogo, LinkedinLogo, WhatsappLogo, Link as LinkIcon } from "phosphor-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string; // Full absolute URL
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = [
    {
      name: "Facebook",
      icon: FacebookLogo,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: TwitterLogo,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      icon: LinkedinLogo,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: WhatsappLogo,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:text-green-500",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    }).catch(() => {});
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Share:</span>
      <div className="flex gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-gray-400 transition-colors", link.color)}
            aria-label={`Share on ${link.name}`}
          >
            <link.icon size={24} weight="fill" />
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Copy Link"
        >
          <LinkIcon size={24} weight="bold" />
        </button>
      </div>
    </div>
  );
}

