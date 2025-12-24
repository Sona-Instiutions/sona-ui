'use client';

import { createElement, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  CheckCircleIcon,
  FlaskIcon,
  LightningIcon,
  RocketLaunchIcon,
  StarIcon,
  UsersThreeIcon,
  BriefcaseIcon,
  UserCircleGearIcon,
  UserSwitchIcon,
  GlobeIcon,
  LightbulbFilamentIcon,
  MapPinLineIcon,
  MedalIcon,
  CpuIcon,
  ChalkboardTeacherIcon,
  BuildingsIcon,
  HandshakeIcon,
  type IconProps,
  type IconWeight,
} from "@phosphor-icons/react";

type IconComponent = ComponentType<IconProps>;

type IconBadgeVariant = "primary" | "secondary" | "neutral";
type IconBadgeSize = "sm" | "md" | "lg";

const ICON_COMPONENT_MAP: Record<string, IconComponent> = {
  check: CheckCircleIcon,
  checkcircle: CheckCircleIcon,
  checkmark: CheckCircleIcon,
  star: StarIcon,
  lightning: LightningIcon,
  rocket: RocketLaunchIcon,
  rocketlaunch: RocketLaunchIcon,
  flask: FlaskIcon,
  lab: FlaskIcon,
  users: UsersThreeIcon,
  usersthree: UsersThreeIcon,
  briefcase: BriefcaseIcon,
  usercircleGear: UserCircleGearIcon,
  userswitch: UserSwitchIcon,
  lightbulbfilament: LightbulbFilamentIcon,
  globe: GlobeIcon,
  mappinLine: MapPinLineIcon,
  medal: MedalIcon,
  cpu: CpuIcon,
  chalkboardteacher: ChalkboardTeacherIcon,
  buildings: BuildingsIcon,
  handshake:HandshakeIcon ,
};

const FALLBACK_ICON = CheckCircleIcon;

const VARIANT_CLASS_MAP: Record<IconBadgeVariant, string> = {
  primary: "bg-sky-100 text-sky-600",
  secondary: "bg-slate-900 text-white",
  neutral: "bg-slate-200 text-slate-700",
};

const SIZE_CLASS_MAP: Record<IconBadgeSize, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-12 w-12",
};

const ICON_SIZE_MAP: Record<IconBadgeSize, number> = {
  sm: 18,
  md: 20,
  lg: 28,
};

export interface IconBadgeProps {
  /** Icon name token mapped to Phosphor icons (e.g., "check", "star") */
  iconName?: string | null;
  /** Visual style variant */
  variant?: IconBadgeVariant;
  /** Badge size preset */
  size?: IconBadgeSize;
  /** Icon weight passed to Phosphor icon */
  weight?: IconWeight;
  /** Optional aria label for accessibility (otherwise treated as decorative) */
  ariaLabel?: string;
  /** Additional wrapper classes */
  className?: string;
  /** Additional classes for the icon element */
  iconClassName?: string;
  /** Custom icon color overriding variant styles */
  iconColor?: string | null;
  /** Custom background color overriding variant styles */
  backgroundColor?: string | null;
}

const getIconComponent = (iconName?: string | null): IconComponent => {
  if (!iconName) {
    return FALLBACK_ICON;
  }

  const normalized = iconName.toLowerCase().replace(/\s+/g, "");
  return ICON_COMPONENT_MAP[normalized] ?? FALLBACK_ICON;
};

/**
 * Circular icon badge used across institution sections for consistent visual cues.
 */
export function IconBadge({
  iconName,
  variant = "primary",
  size = "md",
  weight = "fill",
  ariaLabel,
  className,
  iconClassName,
  iconColor,
  backgroundColor,
}: IconBadgeProps) {
  const IconComponent = getIconComponent(iconName);
  const iconSize = ICON_SIZE_MAP[size];
  const useCustomColors = Boolean(iconColor || backgroundColor);
  const wrapperStyle = useCustomColors
    ? {
        backgroundColor: backgroundColor ?? undefined,
        color: iconColor ?? undefined,
      }
    : undefined;
  const iconElement = createElement(IconComponent, {
    size: iconSize,
    weight,
    className: cn("shrink-0", iconClassName),
    color: iconColor ?? undefined,
  });

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full",
        useCustomColors ? null : VARIANT_CLASS_MAP[variant],
        SIZE_CLASS_MAP[size],
        className
      )}
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={wrapperStyle}
    >
      {iconElement}
    </span>
  );
}
