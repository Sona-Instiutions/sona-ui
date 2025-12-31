import type { IFooterContactInfo, INavGroup, INavItem, ISocialLink } from "@/types/navigation.types";

export const HEADER_PARTNER_LINKS: INavItem[] = [
  { label: "GCC", href: "/institutions/sona-gcc" },
  { label: "Sona Business School", href: "https://pgdm.scaleindia.in/" },
  { label: "Sona finishing School", href: "/institutions/sona-finishing-school" },
  { label: "Sona Tech School", href: "/institutions/sona-tech-school" },
  { label: "AI Consultancy", href: "/institutions/ai-consultancy" },
  { label: "Flexi Staffing", href: "/institutions/sona-flexi-staffing" },
];

export const HEADER_SOCIAL_LINKS: ISocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/scale_blr", iconName: "instagramIcon" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/scale-sona-centre-for-advanced-learning-entrepreneurship/",
    iconName: "linkedinIcon",
  },
  { label: "YouTube", href: "https://youtube.com/@scale-blr", iconName: "youtubeIcon" },
  { label: "X", href: "https://www.instagram.com/scale_blr", iconName: "xlogoIcon" },
];

export const HEADER_PRIMARY_NAV: INavItem[] = [
  { label: "Home", href: "/" },
  { label: "Life @ SCALE", href: "/life-at-scale" },
  // { label: "Case Studies", href: "/case-studies" },
  { label: "Placements", href: "/placements" },
  { label: "Contact Us", href: "/contact" },
];

export const HEADER_ABOUT_NAV: INavGroup[] = [
  {
    label: "About SCALE",
    href: "/about",
    description: " ",
  },
  {
    label: "Vision, Mission & Core Values",
    href: "/about/vision",
    description: " ",
  },
  {
    label: "SCALE Leadership",
    href: "/about/leadership",
    description: "",
  },
  {
    label: "Chairman's Message",
    href: "/about/leadership#chairman-message",
    description: "",
  },
  {
    label: "Vice Chairman's Message",
    href: "/about/leadership#vice-chairman-message",
    description: "",
  },
  {
    label: "Milestone",
    href: "/about/milestone",
    description: " ",
  },
];

export const HEADER_HIGHLIGHT_NAV: INavItem[] = [{ label: "Industry Collaboration ", href: "/industry-colab" }];

export const FOOTER_TAGLINE =
  "Shaping tomorrow's innovators today through excellence in education, research, and industry collaboration.";

export const FOOTER_COPYRIGHT = "© 2025 SCALE by Sona Valliappa Group. All rights reserved.";

export const FOOTER_QUICK_LINKS: INavItem[] = [
  { label: "About SCALE", href: "/about" },
  { label: "Industry Collaborations", href: "/industry-colab" },
  { label: "Placements", href: "/placements" },
  { label: "Events & News", href: "/events" },
  { label: "Blogs", href: "/blogs" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact Us", href: "/contact" },
];

export const FOOTER_INSTITUTIONS: INavItem[] = [
  { label: "GCC", href: "/institutions/sona-gcc" },
  { label: "Sona Business School", href: "https://www.sonabusinessschool.com/ " },
  { label: "Sona finishing School", href: "/institutions/sona-finishing-school" },
  { label: "Sona Tech School", href: "/institutions/sona-tech-school" },
  { label: "AI Consultancy", href: "/institutions/ai-consultancy" },
  { label: "Flexi Staffing", href: "/institutions/sona-flexi-staffing" },
];

export const FOOTER_CONTACT_INFO: IFooterContactInfo = {
  address: "#43/1A , Billekempanahalli Village, Bidadi Hobli, Ramnagara Taluk, Karnataka – 562109, India.",
  phone: "+91 944 259 2175",
  email: "info@scaleindia.in",
};

export const FOOTER_SOCIAL_LINKS: ISocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/scale-sona-centre-for-advanced-learning-entrepreneurship/",
    iconName: "linkedinIcon",
  },
  { label: "Instagram", href: "https://www.instagram.com/scale_blr", iconName: "instagramIcon" },
  { label: "YouTube", href: "https://youtube.com/@scale-blr", iconName: "youtubeIcon" },
  { label: "X", href: "https://www.instagram.com/scale_blr", iconName: "xlogoIcon" },
];

export const FOOTER_LEGAL_LINKS: INavItem[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];
