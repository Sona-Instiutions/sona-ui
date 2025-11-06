import type { IconName } from "@/components/ui/Icon.component";

export interface INavItem {
  label: string;
  href: string;
}

export interface INavGroup extends INavItem {
  description?: string;
}

export interface ISocialLink {
  label: string;
  href: string;
  iconName: IconName;
}

export interface IFooterContactInfo {
  address: string;
  phone: string;
  email: string;
}
