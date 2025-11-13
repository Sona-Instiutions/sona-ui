import { DecoratorLine } from "@/components/common/DecoratorLine.component";
import { RecognitionCard } from "@/components/institute/RecognitionCard.component";
import { getRecognitionsByInstitution } from "@/services/server/institution.server";
import type { INormalizedRecognitionSection } from "@/types/institution.types";
import { cn } from "@/lib/utils";
import { hasText } from "@/utils/common.utils";

interface InstitutionRecognitionsProps {
  /** Institution identifier used to fetch recognitions */
  institutionId?: number | null;
}

/**
 * Server component wrapper that fetches recognition data.
 */
export async function InstitutionRecognitions({ institutionId }: InstitutionRecognitionsProps) {
  if (!institutionId || institutionId <= 0) {
    return null;
  }

  const recognitionSection = await getRecognitionsByInstitution(institutionId).catch((error) => {
    console.error("Failed to load recognition section", error);
    return null;
  });

  if (!recognitionSection || recognitionSection.recognitions.length === 0) {
    return null;
  }

  return <RecognitionSection recognitionSection={recognitionSection} />;
}

interface RecognitionSectionProps {
  recognitionSection: INormalizedRecognitionSection;
}

function RecognitionSection({ recognitionSection }: RecognitionSectionProps) {
  const cardCount = recognitionSection.recognitions.length;
  const gridColumnsClass = cn(
    "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
    cardCount === 1 && "sm:grid-cols-1",
    cardCount === 2 && "lg:grid-cols-2"
  );

  const containerMaxWidthClass =
    cardCount === 1 ? "max-w-3xl" : cardCount === 2 ? "max-w-4xl" : cardCount === 3 ? "max-w-5xl" : "max-w-6xl";

  const backgroundToken = recognitionSection.backgroundColor;
  const backgroundClassName = backgroundToken && backgroundToken.startsWith("bg-") ? backgroundToken : "";
  const backgroundStyle =
    backgroundToken && !backgroundToken.startsWith("bg-")
      ? {
          backgroundColor: backgroundToken,
        }
      : undefined;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12",
        backgroundClassName || "bg-slate-900"
      )}
      style={backgroundStyle}
    >
      <div className='absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-900/60 to-slate-950/70' aria-hidden />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col items-center gap-8 text-white",
          containerMaxWidthClass
        )}
      >
        <DecoratorLine align='center' gradientClassName='bg-linear-to-r from-transparent via-white/70 to-transparent' />

        {hasText(recognitionSection.title) && (
          <h2 className='text-center text-3xl font-bold leading-tight sm:text-4xl md:text-5xl'>
            {recognitionSection.title}
          </h2>
        )}

        <div className='w-full'>
          <div className={gridColumnsClass}>
            {recognitionSection.recognitions.map((item) => (
              <RecognitionCard key={item.id} icon={item.icon} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
