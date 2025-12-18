import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StrapiMedia } from "@/types/blog";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function mediaUrl(media?: StrapiMedia) {
  if (!media?.url) return "/placeholder.jpg";
  return `${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`;
}

