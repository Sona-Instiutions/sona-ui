import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInstitutionBySlug } from "@/services/server/institution.server";
import { IApiError } from "@/types/institution.types";
import { InstitutionBanner } from "@/components/common/InstitutionBanner.component";

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

    const title = `${institution.name} | SONA`;
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
      title: "Institution | SONA",
      description: "Institution details on SONA",
    };
  }
}

/** Async server component rendering institution details from Strapi */
export default async function InstitutionPage({ params }: InstitutionPageProps) {
  const { slug } = await params;

  let institution;

  try {
    // Fetch institution data server-side for optimal performance
    institution = await getInstitutionBySlug(slug);
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
          title={institution.bannerTitle}
          subtitle={institution.bannerSubtitle}
        />

        {/* Institution details section */}
        <section className='w-full py-12 px-4 md:py-16 md:px-8'>
          <div className='max-w-4xl mx-auto'>
            {/* Metadata card */}
            <div className='bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8'>
              <dl className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Institution ID */}
                <div>
                  <dt className='text-sm font-medium text-slate-600 dark:text-slate-400'>Institution ID</dt>
                  <dd className='mt-1 text-lg text-slate-900 dark:text-slate-100'>{institution.id}</dd>
                </div>

                {/* Slug */}
                <div>
                  <dt className='text-sm font-medium text-slate-600 dark:text-slate-400'>URL Slug</dt>
                  <dd className='mt-1 text-lg text-slate-900 dark:text-slate-100'>{institution.slug}</dd>
                </div>

                {/* Created date */}
                <div>
                  <dt className='text-sm font-medium text-slate-600 dark:text-slate-400'>Created</dt>
                  <dd className='mt-1 text-lg text-slate-900 dark:text-slate-100'>
                    {new Date(institution.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>

                {/* Last updated date */}
                <div>
                  <dt className='text-sm font-medium text-slate-600 dark:text-slate-400'>Last Updated</dt>
                  <dd className='mt-1 text-lg text-slate-900 dark:text-slate-100'>
                    {new Date(institution.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Placeholder for additional sections */}
            <div className='space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4'>About This Institution</h2>
                <p className='text-slate-600 dark:text-slate-400'>
                  Additional content sections coming soon. This page will expand with:
                </p>
                <ul className='list-disc list-inside text-slate-600 dark:text-slate-400 mt-3 space-y-2'>
                  <li>Institution overview and history</li>
                  <li>Programs and courses offered</li>
                  <li>Placement statistics and records</li>
                  <li>Campus facilities and infrastructure</li>
                  <li>Contact information and admissions details</li>
                </ul>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
