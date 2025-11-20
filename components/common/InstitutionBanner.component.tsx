import { STRAPI_SERVER_URL } from "@/constants/app.constants";
import type { IStrapiMedia } from "@/types/common.types";
import { SplitTitle } from "@/components/common/SplitTitle.component";

interface InstitutionBannerProps {
  /** Banner image object from Strapi media (may be null if not configured) */
  image: IStrapiMedia | null;

  /** Optional title prefix */
  titlePrefix?: string | null;

  /** Optional title prefix color */
  titlePrefixColor?: string | null;

  /** Optional title highlight */
  titleHighlight?: string | null;

  /** Optional title highlight color */
  titleHighlightColor?: string | null;

  /** Optional subtitle text for the banner */
  subtitle?: string | null;
}

/**
 * Institution banner hero component with background image and text overlay.
 * Displays a full-width responsive banner with institution name and description.
 */
export function InstitutionBanner({
  image,
  titlePrefix,
  titlePrefixColor,
  titleHighlight,
  titleHighlightColor,
  subtitle,
}: InstitutionBannerProps) {
  // Construct absolute image URL from Strapi media when available
  const normalizedBaseUrl = (STRAPI_SERVER_URL ?? "http://localhost:1337").replace(/\/api\/?$/, "").replace(/\/$/, "");
  const rawImageUrl = image?.url ?? null;
  let imageUrl: string | null = null;

  if (rawImageUrl) {
    imageUrl = rawImageUrl.startsWith("http") ? rawImageUrl : `${normalizedBaseUrl}${rawImageUrl}`;
  }

  // Normalize optional subtitle
  const normalizedSubtitle = subtitle ?? undefined;

  return (
    <section
      className='relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 sm:px-6 md:px-8 lg:px-12'
      style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : undefined}
    >
      {/* Dark overlay for text contrast and readability */}
      <div
        className={`absolute inset-0 ${
          imageUrl
            ? "bg-linear-to-r from-black/40 via-black/30 to-black/20"
            : "bg-linear-to-r from-slate-900 via-slate-800 to-slate-700"
        }`}
      />

      {/* Content container with semantic structure */}
      <div className='relative z-10 flex w-full justify-center'>
        <div className='max-w-3xl space-y-3 text-center sm:space-y-4 md:space-y-5'>
          {/* Main heading */}
          <SplitTitle
            prefix={titlePrefix}
            prefixColor={titlePrefixColor}
            highlight={titleHighlight}
            highlightColor={titleHighlightColor}
            className="text-2xl font-bold text-white md:text-4xl lg:text-5xl"
          />

          {/* Optional subtitle */}
          {normalizedSubtitle && normalizedSubtitle.trim().length > 0 && (
            <p className='text-base font-medium text-white/90 sm:text-lg md:text-xl lg:text-2xl'>
              {normalizedSubtitle}
            </p>
          )}

          {/* Fallback text when banner image is missing */}
          {!imageUrl && (
            <p className='text-sm font-medium text-white/80 sm:text-base'>
              Banner image coming soon. Please upload a banner image in Strapi to showcase this institution.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
