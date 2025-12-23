"use client";

import { GalleryTile } from "@/components/institute/GalleryTile.component";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { INormalizedCampusGallerySection } from "@/types/institution.types";

interface GalleryDisplayProps {
  columns: INormalizedCampusGallerySection["columns"];
}

/**
 * Client component for displaying gallery images in carousel (small/medium) or grid (large) layout.
 */
export function GalleryDisplay({ columns }: GalleryDisplayProps) {
  // Flatten all images from all columns for carousel display with priority tracking
  const allImagesWithPriority = columns.flatMap((column, columnIndex) =>
    column.images.map((image, imageIndex) => ({
      image,
      priority: columnIndex === 0 && imageIndex < 2,
    }))
  );

  return (
    <>
      {/* Carousel - visible below lg breakpoint */}
      <div className='lg:hidden w-full'>
        <Carousel
          className='w-full'
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className='-ml-5'>
            {allImagesWithPriority.map(({ image, priority }) => (
              <CarouselItem key={image.id} className='pl-5 basis-full md:basis-1/2'>
                <div className='h-full py-2'>
                  <GalleryTile image={image} priority={priority} className='aspect-square' />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Arrows */}
          <div className='mt-8 flex justify-center gap-4 relative'>
            <CarouselPrevious className='static translate-y-0 bg-black/50 text-white hover:bg-black/70 border-none' />
            <CarouselNext className='static translate-y-0 bg-black/50 text-white hover:bg-black/70 border-none' />
          </div>
        </Carousel>
      </div>

      {/* Grid - visible at lg breakpoint and above */}
      <div className='hidden lg:grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8'>
        {columns.map((column, columnIndex) => (
          <div key={column.id} className='flex flex-col gap-5'>
            {column.images.map((image, index) => (
              <GalleryTile key={image.id} image={image} priority={columnIndex === 0 && index < 2} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

