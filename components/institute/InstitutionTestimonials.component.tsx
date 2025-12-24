import type { INormalizedTestimonialSection } from "@/types/institution.types";
import { TestimonialCard } from "./TestimonialCard.component";
import { SectionHeader } from "../common/SectionHeader.component";
import { MarkdownContent } from "../common/MarkdownContent.component";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface InstitutionTestimonialsProps {
  testimonialSection: INormalizedTestimonialSection | null;
}

export function InstitutionTestimonials({ testimonialSection }: InstitutionTestimonialsProps) {
  if (!testimonialSection || !testimonialSection.testimonials || testimonialSection.testimonials.length === 0) {
    return null;
  }

  const { titlePrefix, titlePrefixColor, titleHighlight, titleHighlightColor, description, testimonials } =
    testimonialSection;
  return (
    <section className='w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12'>
      <SectionHeader
        titlePrefix={titlePrefix}
        titlePrefixColor={titlePrefixColor}
        titleHighlight={titleHighlight}
        titleHighlightColor={titleHighlightColor}
        align='center'
      />
      <div className='mx-auto flex w-full max-w-7xl flex-col items-center gap-10'>
        <div className='flex flex-col items-center gap-4 text-center mt-4'>
          <MarkdownContent content={description} className='max-w-3xl text-base text-slate-600 sm:text-lg md:text-xl' />
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          className='w-full'
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className='-ml-6'>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className='pl-6 basis-full md:basis-1/2 lg:basis-1/3'>
                <div className='h-full py-2'>
                  <TestimonialCard testimonial={testimonial} />
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
    </section>
  );
}
