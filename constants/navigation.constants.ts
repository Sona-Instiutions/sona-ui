import type { IFooterContactInfo, INavGroup, INavItem, ISocialLink } from "@/types/navigation.types";

export const HEADER_PARTNER_LINKS: INavItem[] = [
  { label: "Sona Finishing School", href: "https://www.sona.finishing.school" },
  { label: "Sona Tech School", href: "https://www.sonatech.ac.in" },
  { label: "AI Consultancy", href: "https://www.ai.sonatech.ac.in" },
  { label: "Sona Business School", href: "https://www.sonabusinessschool.com" },
  { label: "Contract to Hire", href: "https://www.sona.contract" },
  { label: "GCC", href: "https://www.sona.gcc" },
];

export const HEADER_SOCIAL_LINKS: ISocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", iconName: "facebookIcon" },
  { label: "Instagram", href: "https://instagram.com", iconName: "instagramIcon" },
  { label: "LinkedIn", href: "https://linkedin.com", iconName: "linkedinIcon" },
  { label: "YouTube", href: "https://youtube.com", iconName: "youtubeIcon" },
];

export const HEADER_PRIMARY_NAV: INavItem[] = [
  { label: "Home", href: "/" },
  { label: "Life @ SCALE", href: "/life" },
  { label: "Placements", href: "/placements" },
  { label: "Contact Us", href: "/contact" },
];

export const HEADER_ABOUT_NAV: INavGroup[] = [
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

export const HEADER_HIGHLIGHT_NAV: INavItem[] = [
  { label: "Admission", href: "/admission" },
  { label: "International Collab", href: "/international-collaborations" },
  { label: "Industry Collaborations", href: "/industry-collaborations" },
];

export const FOOTER_TAGLINE =
  "Shaping tomorrow's innovators today through excellence in education, research, and industry collaboration.";

export const FOOTER_COPYRIGHT = "© 2025 SCALE by Sona Vellappa Group. All rights reserved.";

export const FOOTER_QUICK_LINKS: INavItem[] = [
  { label: "About SCALE", href: "/about" },
  { label: "Industry Collaborations", href: "/industry-collaborations" },
  { label: "Placements", href: "/placements" },
  { label: "Events & News", href: "/events-news" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_INSTITUTIONS: INavItem[] = [
  { label: "Sona Finishing School", href: "https://www.sona.finishing.school" },
  { label: "Sona Tech School", href: "https://www.sonatech.ac.in" },
  { label: "AI Consultancy", href: "https://www.ai.sonatech.ac.in" },
  { label: "Sona Business School", href: "https://www.sonabusinessschool.com" },
  { label: "GCC", href: "https://www.sona.gcc" },
];

export const FOOTER_CONTACT_INFO: IFooterContactInfo = {
  address: "Sona Towers, Millers Road, Vasanth Nagar, Bengaluru, Karnataka 560001",
  phone: "+91 427 230 1234",
  email: "admissions@scale.edu.in",
};

export const FOOTER_SOCIAL_LINKS: ISocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", iconName: "facebookIcon" },
  { label: "LinkedIn", href: "https://linkedin.com", iconName: "linkedinIcon" },
  { label: "Instagram", href: "https://instagram.com", iconName: "instagramIcon" },
  { label: "YouTube", href: "https://youtube.com", iconName: "youtubeIcon" },
];

export const FOOTER_LEGAL_LINKS: INavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
