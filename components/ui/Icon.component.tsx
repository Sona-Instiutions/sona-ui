'use client';

import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon, ListIcon, PhoneIcon, YoutubeLogoIcon, XLogoIcon  } from "@phosphor-icons/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const icons = {
  phone: PhoneIcon,
  facebookIcon: FacebookLogoIcon,
  instagramIcon: InstagramLogoIcon,
  linkedinIcon: LinkedinLogoIcon,
  youtubeIcon: YoutubeLogoIcon,
  menuIcon: ListIcon,
  xlogoIcon:XLogoIcon,
};

type IconName = keyof typeof icons;

type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  className?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  size?: number;
};

function Icon({ name, className, weight = "bold", size = 20, ...props }: IconProps) {
  const IconComponent = icons[name];

  return <IconComponent weight={weight} className={cn("size-6", className)} aria-hidden {...props} size={size} />;
}

export { Icon };
export type { IconName };
