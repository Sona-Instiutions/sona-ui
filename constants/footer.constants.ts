import type { IFooterContactInfo, IFooterLink, IFooterSocialLink } from "@/types/footer.types";

const FOOTER_TAGLINE = "Shaping tomorrow's innovators today through excellence in education, research, and industry collaboration.";

const FOOTER_COPYRIGHT = "© 2025 SCALE by Sona Vellappa Group. All rights reserved.";

const FOOTER_QUICK_LINKS: IFooterLink[] = [
  { label: "About SCALE", href: "/about" },
  { label: "Industry Collaborations", href: "/industry-collaborations" },
  { label: "Placements", href: "/placements" },
  { label: "Events & News", href: "/events-news" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

const FOOTER_INSTITUTIONS: IFooterLink[] = [
  { label: "Sona Finishing School", href: "https://www.sona.finishing.school" },
  { label: "Sona Tech School", href: "https://www.sonatech.ac.in" },
  { label: "AI Consultancy", href: "https://www.ai.sonatech.ac.in" },
  { label: "Sona Business School", href: "https://www.sonabusinessschool.com" },
  { label: "GCC", href: "https://www.sona.gcc" },
];

const FOOTER_CONTACT_INFO: IFooterContactInfo = {
  address: "Sona Towers, Millers Road, Vasanth Nagar, Bengaluru, Karnataka 560001",
  phone: "+91 427 230 1234",
  email: "admissions@scale.edu.in",
};

const FOOTER_SOCIAL_LINKS: IFooterSocialLink[] = [
  { label: "Facebook", href: "https://facebook.com", iconName: "facebookIcon" },
  { label: "LinkedIn", href: "https://linkedin.com", iconName: "linkedinIcon" },
  { label: "Instagram", href: "https://instagram.com", iconName: "instagramIcon" },
  { label: "YouTube", href: "https://youtube.com", iconName: "youtubeIcon" },
];

const FOOTER_LEGAL_LINKS: IFooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export {
  FOOTER_CONTACT_INFO,
  FOOTER_COPYRIGHT,
  FOOTER_INSTITUTIONS,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TAGLINE,
};

