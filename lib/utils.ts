import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { IStrapiMedia } from "@/types/common.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mediaUrl(media?: IStrapiMedia | null) {
  if (!media?.url) return "/placeholder.jpg";
  if (media.url.startsWith("http")) return media.url;
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
}
