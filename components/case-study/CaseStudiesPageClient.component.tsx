/**
 * Case Studies Page Client Component
 *
 * Client-side logic for the case studies listing page (search, filtering, pagination).
 */

"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCaseStudiesInfiniteQuery } from "@/services/client/case-studies.client";
import { INormalizedCaseStudy, ICaseStudiesResponse } from "@/types/case-study.types";
import { ContentGrid } from "@/components/common/ContentGrid.component";
import { CASE_STUDY_PAGE_SIZE } from "@/constants/case-study.constants";

interface CaseStudiesPageClientProps {
  initialData: { data: INormalizedCaseStudy[]; meta: ICaseStudiesResponse["meta"] };
}

function CaseStudiesPageContent({ initialData }: CaseStudiesPageClientProps) {
  const searchParams = useSearchParams();

  // Read search from URL or default
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";

  // Query Hook
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useCaseStudiesInfiniteQuery({
    pageSize: CASE_STUDY_PAGE_SIZE,
    search: searchTerm || undefined,
    initialData: !searchTerm ? initialData : undefined,
  });

  // Flatten pages into single array
  const allCaseStudies = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className='container mx-auto px-8 py-16'>
      {/* Header */}
      <div className='flex flex-col items-center mb-16'>
        <h2 className='text-3xl font-bold text-gray-900'>Our Success Stories</h2>
      </div>

      {/* Grid */}
      <ContentGrid
        type='case-study'
        items={allCaseStudies}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}

export function CaseStudiesPageClient(props: CaseStudiesPageClientProps) {
  return (
    <Suspense fallback={<div className='h-96' />}>
      <CaseStudiesPageContent {...props} />
    </Suspense>
  );
}
