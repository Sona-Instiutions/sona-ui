import type { IStrapiMedia } from "@/types/common.types";

/** Icon badge entity providing configurable icon metadata */
export interface IIconBadge {
  /** Unique numeric identifier */
  id: number;

  /** Normalized icon token mapped to Phosphor icons (e.g., "check", "star") */
  iconName: string;

  /** Human-readable label to assist content editors */
  displayName?: string | null;

  /** Optional icon foreground color (any valid CSS color) */
  iconColor?: string | null;

  /** Optional badge background color (any valid CSS color) */
  backgroundColor?: string | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Repeatable bullet item containing markdown text and icon reference */
export interface IBulletItem {
  /** Component identifier emitted by Strapi */
  id: number;

  /** Markdown-enabled bullet text content */
  text: string;

  /** Related icon badge or relation identifier when not populated */
  icon: IIconBadge | number | null;
}

/** About section entity associated with an institution */
export interface IAboutInstitute {
  /** Unique numeric identifier */
  id: number;

  /** Optional title prefix */
  titlePrefix?: string | null;

  /** Optional title prefix color */
  titlePrefixColor?: string | null;

  /** Optional title highlight */
  titleHighlight?: string | null;

  /** Optional title highlight color */
  titleHighlightColor?: string | null;

  /** Markdown-enabled description content */
  description?: string | null;

  /** Markdown-enabled bullet items associated with about section */
  bullets?: IBulletItem[] | null;

  /** Associated hero image */
  image?: IStrapiMedia | null;

  /** Optional badge label (e.g., Job Placement Rate) */
  badgeText?: string | null;

  /** Optional badge value (e.g., 98%) */
  badgeValue?: string | null;

  /** Optional badge color keyword */
  badgeColor?: string | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** API response envelope for about-institute queries */
export interface IAboutInstituteResponse {
  data: IAboutInstitute[];
  meta: Record<string, unknown>;
}

/** Partnership item containing company details */
export interface IPartnershipItem {
  id: number;
  companyName: string;
  companyLogo: IStrapiMedia;
  backgroundColor?: string | null;
}

/** Partnership section entity */
export interface IPartnershipSection {
  id: number;
  titlePrefix: string;
  titlePrefixColor?: string | null;
  titleHighlight: string;
  titleHighlightColor?: string | null;
  description: string;
  backgroundImage: IStrapiMedia;
  partnerships: IPartnershipItem[];
}

/** Normalized partnership section (currently matches raw structure) */
export type INormalizedPartnershipSection = IPartnershipSection;

/** Supported layout variants for gallery tiles */
export type TCampusGalleryLayoutVariant = "square" | "tall" | "wide";

/** Single gallery image item */
export interface ICampusGalleryImage {
  id: number;
  image: IStrapiMedia;
  altText?: string | null;
  layoutVariant?: TCampusGalleryLayoutVariant | null;
}

/** Column grouping exactly two gallery images */
export interface ICampusGalleryColumn {
  id: number;
  order?: number | null;
  images?: ICampusGalleryImage[] | null;
}

/** Campus gallery section entity */
export interface ICampusGallerySection {
  id: number;
  titlePrefix?: string | null;
  titlePrefixColor?: string | null;
  titleHighlight?: string | null;
  titleHighlightColor?: string | null;
  description?: string | null;
  backgroundImage?: IStrapiMedia | null;
  columns?: ICampusGalleryColumn[] | null;
  institution?: number | IInstitution | null;
  createdAt: string;
  updatedAt: string;
}

/** Normalized gallery image item */
export interface INormalizedCampusGalleryImage extends Omit<ICampusGalleryImage, "altText" | "layoutVariant"> {
  altText: string | null;
  layoutVariant: TCampusGalleryLayoutVariant;
}

/** Normalized gallery column grouping */
export interface INormalizedCampusGalleryColumn extends Omit<ICampusGalleryColumn, "images" | "order"> {
  order: number | null;
  images: INormalizedCampusGalleryImage[];
}

/** Normalized campus gallery section */
export interface INormalizedCampusGallerySection
  extends Omit<ICampusGallerySection, "backgroundImage" | "columns" | "titlePrefixColor" | "titleHighlightColor"> {
  backgroundImage: IStrapiMedia | null;
  titlePrefixColor: string | null;
  titleHighlightColor: string | null;
  columns: INormalizedCampusGalleryColumn[];
}

/** Individual FAQ item comprising a question and answer */
export interface IFaqItem {
  /** Unique FAQ identifier */
  id: number;

  /** FAQ question text */
  question: string;

  /** Rich-text answer content */
  answer: string;

  /** Ordering index to allow manual sequencing */
  order?: number | null;
}

/** FAQ section entity */
export interface IFaqSection {
  /** Unique section identifier */
  id: number;

  /** Optional title prefix */
  titlePrefix?: string | null;

  /** Optional color value or class for the prefix */
  titlePrefixColor?: string | null;

  /** Optional highlighted portion of the title */
  titleHighlight?: string | null;

  /** Optional color value or class for the highlight */
  titleHighlightColor?: string | null;

  /** Supporting descriptive copy */
  description?: string | null;

  /** Background image reference */
  backgroundImage?: IStrapiMedia | null;

  /** Related FAQ items */
  faqs?: IFaqItem[] | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Normalized FAQ section */
export interface INormalizedFaqSection
  extends Omit<IFaqSection, "backgroundImage" | "faqs" | "titlePrefixColor" | "titleHighlightColor"> {
  /** Background image normalized to media or null */
  backgroundImage: IStrapiMedia | null;

  /** Title prefix color normalized to string or null */
  titlePrefixColor: string | null;

  /** Title highlight color normalized to string or null */
  titleHighlightColor: string | null;

  /** FAQ array guaranteed */
  faqs: IFaqItem[];
}

/** Institution entity from backend matching Strapi response structure */
export interface IInstitution {
  /** Unique numeric identifier */
  id: number;

  /** URL-friendly identifier derived from name */
  slug: string;

  /** Display name of the institution */
  name: string;

  /** Raw banner image for hero section (may be null when not set) */
  bannerImage?: IStrapiMedia | null;

  /** Raw banner subtitle for hero section (may be null when not set) */
  bannerSubtitle?: string | null;

  /** Optional banner title prefix */
  bannerTitlePrefix?: string | null;

  /** Optional banner title prefix color */
  bannerTitlePrefixColor?: string | null;

  /** Optional banner title highlight */
  bannerTitleHighlight?: string | null;

  /** Optional banner title highlight color */
  bannerTitleHighlightColor?: string | null;

  /** Optional related about-institute entity when populated */
  aboutInstitute?: IAboutInstitute | null;

  /** Optional related program when populated */
  program?: IProgram | null;

  /** Optional achievements section when populated */
  achievements?: IAchievement | null;

  /** Optional key highlight section when populated */
  keyHighlightSection?: IKeyHighlightSection | null;

  /** Optional testimonials section when populated */
  testimonialSection?: ITestimonialSection | null;

  /** Optional partnership section when populated */
  partnershipSection?: IPartnershipSection | null;

  /** Optional campus gallery section when populated */
  campusGallerySection?: ICampusGallerySection | null;

  /** Optional FAQ section when populated */
  faqSection?: IFaqSection | null;

  /** ISO 8601 timestamp of creation */
  createdAt: string;

  /** ISO 8601 timestamp of last update */
  updatedAt: string;
}

/** Normalized institution entity with banner fallbacks applied */
export interface INormalizedInstitution extends Omit<IInstitution, "bannerImage" | "bannerSubtitle"> {
  /** Banner image guaranteed to be set or explicitly null */
  bannerImage: IStrapiMedia | null;

  /** Banner subtitle normalized to string or null */
  bannerSubtitle: string | null;

  /** Banner title prefix normalized to string or null */
  bannerTitlePrefix: string | null;

  /** Banner title prefix color normalized to string or null */
  bannerTitlePrefixColor: string | null;

  /** Banner title highlight normalized to string or null */
  bannerTitleHighlight: string | null;

  /** Banner title highlight color normalized to string or null */
  bannerTitleHighlightColor: string | null;

  /** About section normalized to entity or null */
  aboutInstitute: IAboutInstitute | null;

  /** Related program normalized or null */
  program?: INormalizedProgram | null;

  /** Related value proposition normalized or null */
  valueProposition?: INormalizedValueProposition | null;

  /** Related achievement section normalized or null */
  achievements?: INormalizedAchievement | null;

  /** Related key highlight section normalized or null */
  keyHighlightSection?: INormalizedKeyHighlightSection | null;

  /** Related testimonials section normalized or null */
  testimonialSection?: INormalizedTestimonialSection | null;

  /** Related partnership section normalized or null */
  partnershipSection?: INormalizedPartnershipSection | null;

  /** Related campus gallery section normalized or null */
  campusGallerySection?: INormalizedCampusGallerySection | null;

  /** Related FAQ section normalized or null */
  faqSection?: INormalizedFaqSection | null;
}

/** Program entity describing the overall offering for an institution */
export interface IProgram {
  /** Unique program identifier */
  id: number;

  /** Program title displayed above the sections */
  title: string;

  /** Markdown-enabled program description */
  description?: string | null;

  /** Associated program sections when populated */
  sections?: IProgramSection[] | null;

  /** Related institution reference when populated */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Individual program section describing a specific offering */
export interface IProgramSection {
  /** Unique section identifier */
  id: number;

  /** Section title (e.g., Software Development) */
  title: string;

  /** Optional icon badge relationship */
  icon?: IIconBadge | number | null;

  /** Markdown-enabled section description */
  description?: string | null;

  /** Optional CTA label for learn more link */
  learnMoreText?: string | null;

  /** Optional CTA URL for additional details */
  learnMoreUrl?: string | null;

  /** Flag indicating external link behavior */
  learnMoreIsExternal?: boolean | null;

  /** Ordering index to control display priority */
  order?: number | null;

  /** Creation timestamp (optional for components) */
  createdAt?: string;

  /** Last updated timestamp (optional for components) */
  updatedAt?: string;
}

/** Value proposition item describing a core advantage */
export interface IValuePropositionItem {
  /** Unique item identifier */
  id: number;

  /** Value proposition headline */
  title: string;

  /** Optional color value or class for the title */
  titleColor?: string | null;

  /** Markdown-enabled description content */
  description?: string | null;

  /** Associated icon badge */
  icon?: IIconBadge | number | null;

  /** Optional order to control display priority */
  order?: number | null;

  /** Related value proposition reference */
  valueProposition?: number | IValueProposition | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Value proposition section entity */
export interface IValueProposition {
  /** Unique section identifier */
  id: number;

  /** Optional title prefix (e.g., \"Why Choose\") */
  titlePrefix?: string | null;

  /** Optional color value or class for the title prefix */
  titlePrefixColor?: string | null;

  /** Optional highlighted portion of the title */
  titleHighlight?: string | null;

  /** Optional color value or class for the title highlight */
  titleHighlightColor?: string | null;

  /** Supporting subtitle copy */
  subtitle?: string | null;

  /** Background image for the section */
  backgroundImage?: IStrapiMedia | null;

  /** Related propositions when populated */
  propositions?: IValuePropositionItem[] | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** API response for value proposition queries */
export interface IValuePropositionResponse {
  data: IValueProposition[];
  meta: Record<string, unknown>;
}

/** Normalized value proposition item with defaults applied */
export interface INormalizedValuePropositionItem
  extends Omit<IValuePropositionItem, "description" | "icon" | "titleColor"> {
  /** Markdown description normalized to string */
  description: string;

  /** Icon badge guaranteed to be populated or null */
  icon: IIconBadge | null;

  /** Title color normalized to string or null */
  titleColor: string | null;
}

/** Normalized value proposition section */
export interface INormalizedValueProposition
  extends Omit<IValueProposition, "backgroundImage" | "propositions" | "titlePrefixColor" | "titleHighlightColor"> {
  /** Background image guaranteed or null */
  backgroundImage: IStrapiMedia | null;

  /** Title prefix color normalized to string or null */
  titlePrefixColor: string | null;

  /** Title highlight color normalized to string or null */
  titleHighlightColor: string | null;

  /** Related propositions normalized to an array */
  propositions: INormalizedValuePropositionItem[];
}

/** Key highlight section entity */
export interface IKeyHighlightSection {
  /** Unique section identifier */
  id: number;

  /** Optional title prefix (e.g., "Why Choose") */
  titlePrefix?: string | null;

  /** Optional color value or class for the title prefix */
  titlePrefixColor?: string | null;

  /** Optional highlighted portion of the title */
  titleHighlight?: string | null;

  /** Optional color value or class for the title highlight */
  titleHighlightColor?: string | null;

  /** Markdown-enabled description */
  description?: string | null;

  /** Foreground or feature image for the section */
  image?: IStrapiMedia | null;

  /** Background image for the section */
  backgroundImage?: IStrapiMedia | null;

  /** Related highlights when populated */
  highlights?: IValuePropositionItem[] | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Normalized key highlight section */
export interface INormalizedKeyHighlightSection
  extends Omit<
    IKeyHighlightSection,
    "image" | "backgroundImage" | "highlights" | "titlePrefixColor" | "titleHighlightColor"
  > {
  /** Image guaranteed or null */
  image: IStrapiMedia | null;

  /** Background image guaranteed or null */
  backgroundImage: IStrapiMedia | null;

  /** Title prefix color normalized to string or null */
  titlePrefixColor: string | null;

  /** Title highlight color normalized to string or null */
  titleHighlightColor: string | null;

  /** Related highlights normalized to an array */
  highlights: INormalizedValuePropositionItem[];
}

/** API response for key highlight section queries */
export interface IKeyHighlightSectionResponse {
  data: IKeyHighlightSection[];
  meta: Record<string, unknown>;
}

/** API response for campus gallery section queries */
export interface ICampusGallerySectionResponse {
  data: ICampusGallerySection[];
  meta: Record<string, unknown>;
}

/** API response for FAQ section queries */
export interface IFaqSectionResponse {
  data: IFaqSection[];
  meta: Record<string, unknown>;
}

/** Achievement statistic card */
export interface IAchievementItem {
  /** Unique card identifier */
  id: number;

  /** Primary metric or number (e.g., 15K+) */
  statistic: string;

  /** Card headline */
  title: string;

  /** Supporting description text */
  description?: string | null;

  /** Optional order for manual sorting */
  order?: number | null;

  /** Related achievement section reference */
  achievement?: number | IAchievement | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Achievement section entity */
export interface IAchievement {
  /** Unique section identifier */
  id: number;

  /** Optional title prefix (e.g., Tech School) */
  titlePrefix?: string | null;

  /** Optional color token for title prefix */
  titlePrefixColor?: string | null;

  /** Optional highlighted title segment */
  titleHighlight?: string | null;

  /** Optional color token for title highlight */
  titleHighlightColor?: string | null;

  /** Markdown/HTML enabled description */
  description?: string | null;

  /** Optional recognition section title */
  recognitionTitle?: string | null;

  /** Optional recognition section background color */
  recognitionBackgroundColor?: string | null;

  /** Related achievement cards when populated */
  achievements?: IAchievementItem[] | null;

  /** Related recognition cards when populated */
  recognitions?: IRecognitionItem[] | null;

  /** Related institution reference */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Normalized achievement card */
export interface INormalizedAchievementItem extends Omit<IAchievementItem, "description" | "order" | "achievement"> {
  /** Description normalized to string */
  description: string;

  /** Order normalized to number or null */
  order: number | null;
}

/** Normalized achievement section */
export interface INormalizedAchievement
  extends Omit<
    IAchievement,
    | "achievements"
    | "recognitions"
    | "titlePrefixColor"
    | "titleHighlightColor"
    | "recognitionTitle"
    | "recognitionBackgroundColor"
    | "institution"
  > {
  /** Title prefix color normalized */
  titlePrefixColor: string | null;

  /** Title highlight color normalized */
  titleHighlightColor: string | null;

  /** Description normalized */
  description: string | null;

  /** Array of normalized cards */
  achievements: INormalizedAchievementItem[];

  /** Recognition title normalized */
  recognitionTitle: string | null;

  /** Recognition background color normalized */
  recognitionBackgroundColor: string | null;

  /** Array of normalized recognition cards */
  recognitions: INormalizedRecognitionItem[];
}

/** Recognition card describing awards or partnerships */
export interface IRecognitionItem {
  /** Unique card identifier */
  id: number;

  /** Related icon badge */
  icon?: IIconBadge | number | null;

  /** Recognition title */
  title: string;

  /** Supporting description */
  description?: string | null;

  /** Optional manual order */
  order?: number | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Normalized recognition card */
export interface INormalizedRecognitionItem extends Omit<IRecognitionItem, "icon" | "description" | "order"> {
  /** Icon badge normalized */
  icon: IIconBadge | null;

  /** Description normalized */
  description: string | null;

  /** Order normalized */
  order: number | null;
}

/** Testimonial entity */
/** Testimonial component item */
export interface ITestimonial {
  /** Unique identifier */
  id: number;

  /** Name of the person */
  name: string;

  /** Role/Designation of the person */
  role: string;

  /** Company or Organization */
  company?: string | null;

  /** Testimonial text */
  quote: string;

  /** Rating (1-5) */
  rating: number;

  /** Avatar image */
  avatar?: IStrapiMedia | null;
}

/** Testimonial section entity */
/** Testimonial section entity */
export interface ITestimonialSection {
  /** Unique identifier */
  id: number;

  /** Title prefix */
  titlePrefix?: string | null;

  /** Title prefix color */
  titlePrefixColor?: string | null;

  /** Title highlight */
  titleHighlight?: string | null;

  /** Title highlight color */
  titleHighlightColor?: string | null;

  /** Description */
  description?: string | null;

  /** List of testimonials */
  testimonials?: ITestimonial[] | null;

  /** Related institution */
  institution?: number | IInstitution | null;

  /** Creation timestamp */
  createdAt: string;

  /** Last updated timestamp */
  updatedAt: string;
}

/** Normalized testimonial section */
export interface INormalizedTestimonialSection
  extends Omit<ITestimonialSection, "titlePrefixColor" | "titleHighlightColor" | "testimonials"> {
  /** Title prefix color normalized */
  titlePrefixColor: string | null;

  /** Title highlight color normalized */
  titleHighlightColor: string | null;

  /** Normalized testimonials list */
  testimonials: ITestimonial[];
}

/** Type alias for institution slug with validation */
export type TInstitutionSlug = string & { readonly __brand: "InstitutionSlug" };

/** API response envelope for single institution query */
export interface IInstitutionResponse {
  data: IInstitution | IInstitution[];
  meta: Record<string, unknown>;
}

/** API response envelope for paginated institution queries */
export interface IInstitutionsResponse {
  data: IInstitution[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** API response for program queries */
export interface IProgramsResponse {
  data: IProgram[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** API response for achievement section queries */
export interface IAchievementResponse {
  data: IAchievement[];
  meta: Record<string, unknown>;
}

/** Normalized program section entity with defaulted optional fields */
export interface INormalizedProgramSection
  extends Omit<
    IProgramSection,
    "description" | "learnMoreText" | "learnMoreUrl" | "learnMoreIsExternal" | "order" | "program" | "icon"
  > {
  /** Markdown description normalized to string or null */
  description: string | null;

  /** CTA label guaranteed to be string or null */
  learnMoreText: string | null;

  /** CTA URL guaranteed to be string or null */
  learnMoreUrl: string | null;

  /** External flag normalized to boolean */
  learnMoreIsExternal: boolean;

  /** Order normalized to number or null */
  order: number | null;

  /** Icon badge fully populated or null */
  icon: IIconBadge | null;
}

/** Normalized program entity with related sections */
export interface INormalizedProgram extends Omit<IProgram, "description" | "sections" | "institution"> {
  /** Program description normalized to string or null */
  description: string | null;

  /** Related sections normalized to array */
  sections: INormalizedProgramSection[];
}

/** Standard API error response for consistent error handling */
export interface IApiError {
  message: string;
  status: number;
  details?: Record<string, unknown>;
}
