import type { INavGroup, INavItem, ISocialLink } from "./header.types";

const PARTNER_LINKS: INavItem[] = [
  { label: "Sona Finishing School", href: "https://www.sona.finishing.school" },
  { label: "Sona Tech School", href: "https://www.sonatech.ac.in" },
  { label: "AI Consultancy", href: "https://www.ai.sonatech.ac.in" },
  { label: "Sona Business School", href: "https://www.sonabusinessschool.com" },
  { label: "Contract to Hire", href: "https://www.sona.contract" },
  { label: "GCC", href: "https://www.sona.gcc" },
];

const SOCIAL_LINKS: ISocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", iconName: "facebookIcon" },
  { label: "Instagram", href: "https://instagram.com", iconName: "instagramIcon" },
  { label: "LinkedIn", href: "https://linkedin.com", iconName: "linkedinIcon" },
  { label: "YouTube", href: "https://youtube.com", iconName: "youtubeIcon" },
];

const PRIMARY_NAV: INavItem[] = [
  { label: "Home", href: "/" },
  { label: "Life @ SCALE", href: "/life" },
  { label: "Placements", href: "/placements" },
  { label: "Contact Us", href: "/contact" },
];

const ABOUT_NAV: INavGroup[] = [
  {
    label: "Leadership",
    href: "/about/leadership",
    description: "Meet the team building SCALE for tomorrow",
  },
  {
    label: "Vision & Mission",
    href: "/about/vision",
    description: "Understand our guiding principles and aspirations",
  },
  {
    label: "Campus",
    href: "/about/campus",
    description: "Explore state-of-the-art facilities and labs",
  },
];

const HIGHLIGHT_NAV: INavItem[] = [
  { label: "Admission", href: "/admission" },
  { label: "International Collab", href: "/international-collaborations" },
  { label: "Industry Collaborations", href: "/industry-collaborations" },
];

export { ABOUT_NAV, HIGHLIGHT_NAV, PARTNER_LINKS, PRIMARY_NAV, SOCIAL_LINKS };
