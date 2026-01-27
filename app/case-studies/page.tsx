import type { Metadata } from "next";
import MainBanner from "@/components/common/MainBannerSection.component";
import { CaseStudiesPageClient } from "@/components/case-study/CaseStudiesPageClient.component";
import { getCaseStudies } from "@/services/server/case-studies.server";
import { CASE_STUDY_PAGE_SIZE } from "@/constants/case-study.constants";

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "Success Stories & Case Studies | SCALE",
  description:
    "Explore how SCALE drives innovation, research, and student success through real-world case studies.",
  openGraph: {
    title: "Success Stories & Case Studies | SCALE",
    description:
      "Explore how SCALE drives innovation, research, and student success through real-world case studies.",
    type: "website",
    url: "https://scaleindia.in/case-studies",
    siteName: "SCALE",
  },
};

export default async function CaseStudyListingPage() {
  // Fetch initial data to support ISR
  const initialData = await getCaseStudies({
    page: 1,
    pageSize: CASE_STUDY_PAGE_SIZE,
  });

  return (
    <div className='min-h-screen bg-white'>
      {/* Banner Section */}
      <MainBanner
        title='Success Stories'
        highlight='Impact'
        description='Real-world examples of innovation, research, and industry collaboration at SONA.'
        backgroundImage='/images/contact.webp'
      />

      {/* Case Studies Client Section */}
      <CaseStudiesPageClient initialData={initialData} />
    </div>
  );
}

