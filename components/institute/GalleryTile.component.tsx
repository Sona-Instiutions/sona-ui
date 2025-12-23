import Image from "next/image";

import { cn } from "@/lib/utils";
import { buildMediaUrl } from "@/utils/common.utils";
import type { INormalizedCampusGalleryImage } from "@/types/institution.types";

interface GalleryTileProps {
  image: INormalizedCampusGalleryImage;
  priority?: boolean;
  className?: string;
}

const VARIANT_CLASS_MAP: Record<INormalizedCampusGalleryImage["layoutVariant"], string> = {
  square: "aspect-[4/3] sm:aspect-square",
  tall: "aspect-[3/4] sm:aspect-[2/3]",
  wide: "aspect-[5/4] sm:aspect-[4/3]",
};

export function GalleryTile({ image, priority = false, className }: GalleryTileProps) {
  const imageUrl = buildMediaUrl(image.image);

  if (!imageUrl) {
    return null;
  }

  // Only apply variant classes if className doesn't contain aspect ratio classes
  const hasAspectRatio = className?.includes("aspect-");
  const variantClasses = hasAspectRatio ? "" : VARIANT_CLASS_MAP[image.layoutVariant] ?? VARIANT_CLASS_MAP.square;

  return (
    <div
      className={cn(
        "group relative isolate w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg shadow-black/20",
        "transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30",
        variantClasses,
        className
      )}
    >
      <Image
        src={imageUrl}
        alt={image.altText || "Campus life photo"}
        fill
        className='object-cover transition-transform duration-700 group-hover:scale-[1.03]'
        sizes='(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw'
        priority={priority}
      />
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-900/0 to-slate-900/40' />
    </div>
  );
}

