import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInstitutionBySlug, getAchievementsByInstitution } from "@/services/server/institution.server";
import { IApiError } from "@/types/institution.types";
import { InstitutionBanner } from "@/components/common/InstitutionBanner.component";
import { InstitutionAbout } from "@/components/institute/InstitutionAbout.component";
import { InstitutionAchievements } from "@/components/institute/InstitutionAchievements.component";
import { InstitutionKeyHighlights } from "@/components/institute/InstitutionKeyHighlights.component";
import { InstitutionPrograms } from "@/components/institute/InstitutionPrograms.component";
import { InstitutionValueProposition } from "@/components/institute/InstitutionValueProposition.component";
import { InstitutionTestimonials } from "@/components/institute/InstitutionTestimonials.component";
import { InstitutionPartnerships } from "@/components/institute/InstitutionPartnerships.component";
import { InstitutionGallery } from "@/components/institute/InstitutionGallery.component";
import { InstitutionFaq } from "@/components/institute/InstitutionFaq.component";
import CallToActionSection from "@/components/common/CallToActionSection.component";

interface InstitutionPageParams {
  slug: string;
}

interface InstitutionPageProps {
  params: Promise<InstitutionPageParams>;
}

/** Generate dynamic SEO metadata for each institution page */
export async function generateMetadata({ params }: InstitutionPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const institution = await getInstitutionBySlug(slug);

    const title = `${institution.name} | SCALE`;
    const description = `Learn more about ${institution.name} and explore programs, placements, and more.`;
    const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "https://sona.edu.in"}/institutions/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    // Return default metadata if institution fetch fails
    return {
      title: "Institution | SCALE",
      description: "Institution details on SCALE",
    };
  }
}

/** Async server component rendering institution details from Strapi */
export default async function InstitutionPage({ params }: InstitutionPageProps) {
  const { slug } = await params;

  let institution;
  let achievements = null;

  try {
    // Fetch institution data server-side for optimal performance
    institution = await getInstitutionBySlug(slug);

    // Fetch achievements data
    achievements = await getAchievementsByInstitution(institution.id).catch((err) => {
      console.error("Failed to load achievements", err);
      return null;
    });
  } catch (err) {
    // Handle different error types
    const apiError = err as IApiError;

    if (apiError.status === 404) {
      // Show 404 page if institution not found
      notFound();
    }

    // Log error for debugging
    console.error("Error fetching institution:", apiError);

    // Show error page for other failures
    throw new Error(`Failed to load institution: ${apiError.message}`);
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Main content area */}
      <main className='flex-1'>
        {/* Banner section with background image and text overlay */}
        <InstitutionBanner
          image={institution.bannerImage}
          titlePrefix={institution.bannerTitlePrefix || (institution.bannerTitleHighlight ? null : institution.name)}
          titlePrefixColor={institution.bannerTitlePrefixColor}
          titleHighlight={institution.bannerTitleHighlight}
          titleHighlightColor={institution.bannerTitleHighlightColor}
          subtitle={institution.bannerSubtitle}
        />

        {/* About section rendered when content is available */}
        <InstitutionAbout institutionId={institution.id} />

        {/* Programs section showcasing institution offerings */}
        <InstitutionPrograms institutionId={institution.id} />

        {/* Value Proposition section highlighting institutional advantages */}
        <InstitutionValueProposition institutionId={institution.id} />

        {/* Achievements section highlighting institutional metrics */}
        <InstitutionAchievements achievementSection={achievements} />

        {/* Key Highlights section highlighting specific advantages */}
        <InstitutionKeyHighlights institutionId={institution.id} />

        {/* Testimonials section */}
        <InstitutionTestimonials testimonialSection={institution.testimonialSection || null} />

        {/* Partnerships section */}
        <InstitutionPartnerships partnershipSection={institution.partnershipSection || null} />

        {/* Campus gallery section */}
        <InstitutionGallery institutionId={institution.id} />

        {/* FAQ section */}
        <InstitutionFaq institutionId={institution.id} />

        <CallToActionSection
          bgColor='bg-yellow-500'
          heading='Join Our Vision'
          description='Become part of a global journey, shaping innovative solutions and advancing the next century of excellence.'
          cta1='Explore Career Opportunities'
          cta2='Partner With Us'
          cta1Link='/contact'
          cta2Link='/contact'
        />
      </main>
    </div>
  );
}
