import { hasText } from "@/utils/common.utils";
import type { INormalizedTestimonialSection } from "@/types/institution.types";
import { TestimonialCard } from "./TestimonialCard.component";
import { SectionHeader } from "../common/SectionHeader.component";

interface InstitutionTestimonialsProps {
  testimonialSection: INormalizedTestimonialSection | null;
}

export function InstitutionTestimonials({ testimonialSection }: InstitutionTestimonialsProps) {
  if (!testimonialSection || !testimonialSection.testimonials || testimonialSection.testimonials.length === 0) {
    return null;
  }

  const { titlePrefix, titlePrefixColor, titleHighlight, titleHighlightColor, subtitle, testimonials } =
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
        <div className='flex flex-col items-center gap-4 text-center'>
          {hasText(subtitle) && <p className='max-w-3xl text-base text-slate-600 sm:text-lg md:text-xl'>{subtitle}</p>}
        </div>

        {/* Testimonials Grid */}
        <div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
