import type { IconName } from "@/components/ui/Icon.component";

export interface IFooterLink {
  label: string;
  href: string;
}

export interface IFooterContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface IFooterSocialLink {
  label: string;
  href: string;
  iconName: IconName;
}

