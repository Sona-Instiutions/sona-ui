"use client";

import { buildMediaUrl } from "@/utils/common.utils";
import Image from "next/image";
import { IPartnershipItem } from "@/types/institution.types";
import type { CSSProperties } from "react";

interface IPartnershipCardProps {
  partnership: IPartnershipItem;
}

const clampChannelValue = (value: number): number => Math.max(0, Math.min(255, Math.round(value)));

const hexToRgb = (value: string): [number, number, number] | null => {
  const sanitized = value.trim().replace("#", "");
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(sanitized)) {
    return null;
  }

  const normalized =
    sanitized.length === 3
      ? sanitized
          .split("")
          .map((char) => char + char)
          .join("")
      : sanitized;

  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
};

const rgbStringToTuple = (value: string): [number, number, number] | null => {
  const match = value
    .trim()
    .match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i);

  if (!match) {
    return null;
  }

  return [
    clampChannelValue(Number(match[1])),
    clampChannelValue(Number(match[2])),
    clampChannelValue(Number(match[3])),
  ];
};

const resolveRgbTuple = (value?: string | null): [number, number, number] | null => {
  if (!value || value.trim().length === 0) {
    return null;
  }

  return hexToRgb(value) ?? rgbStringToTuple(value);
};

const DEFAULT_CARD_STYLES: CSSProperties = {
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  boxShadow: "0 25px 55px rgba(15, 23, 42, 0.35)",
};

const buildCardStyles = (color?: string | null): CSSProperties => {
  const rgbTuple = resolveRgbTuple(color);

  if (!rgbTuple) {
    return DEFAULT_CARD_STYLES;
  }

  const [r, g, b] = rgbTuple;

  return {
    background: `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.28), rgba(${r}, ${g}, ${b}, 0.08))`,
    border: `1px solid rgba(${r}, ${g}, ${b}, 0.45)`,
    boxShadow: `0 30px 70px rgba(${r}, ${g}, ${b}, 0.28)`,
  };
};

export const PartnershipCard = ({ partnership }: IPartnershipCardProps) => {
  const { companyName, companyLogo, backgroundColor } = partnership;
  const logoUrl = buildMediaUrl(companyLogo);
  const overlayStyles = buildCardStyles(backgroundColor);

  return (
    <div
      className='group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-transparent p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
      style={{
        ...overlayStyles,
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Overlay gradient on hover */}
      <div className='absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      <div className='relative z-10 mb-4 flex h-16 w-16 items-center justify-center'>
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={companyName}
            fill
            sizes='64px'
            className='object-contain transition-transform duration-300 group-hover:scale-110'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white'>
            {companyName.charAt(0)}
          </div>
        )}
      </div>

      <h4 className='relative z-10 text-center font-medium text-white/90 group-hover:text-white'>{companyName}</h4>
    </div>
  );
};
