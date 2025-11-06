import { FacebookLogo, InstagramLogo, LinkedinLogo, List, Phone, YoutubeLogo } from "phosphor-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const icons = {
  phone: Phone,
  facebookIcon: FacebookLogo,
  instagramIcon: InstagramLogo,
  linkedinIcon: LinkedinLogo,
  youtubeIcon: YoutubeLogo,
  menuIcon: List,
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
