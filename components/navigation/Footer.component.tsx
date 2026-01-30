"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Icon } from "@/components/ui/Icon.component";
import {
  FOOTER_CONTACT_INFO,
  FOOTER_COPYRIGHT,
  FOOTER_INSTITUTIONS,
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_TAGLINE,
} from "@/constants/navigation.constants";

function FooterBrand() {
  return (
    <div className='flex flex-col gap-4'>
      <Link href='/' className='flex items-center gap-3' aria-label='SCALE home'>
        <span className='flex bg-white items-center justify-center bg-linear-to-br p-2'>
          <span className='text-center text-lg font-bold'>
            <Image
              src="/images/logo.svg"
              alt="Sona Towers"
              width="200"
              height="100"
            />
          </span>
        </span>
       
      </Link>
      <p className='text-sm leading-relaxed text-blue-100'>{FOOTER_TAGLINE}</p>
      <div className='flex items-center gap-4 pt-2'>
        {FOOTER_SOCIAL_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className='flex items-center justify-center h-10 w-10 rounded-full bg-blue-400/20 text-blue-100 transition hover:bg-blue-400/40 hover:text-white'
            target='_blank'
            rel='noreferrer'
            aria-label={link.label}
          >
            <Icon name={link.iconName} className='size-5' />
          </Link>
        ))}
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-sm font-semibold uppercase tracking-wide text-amber-300'>Quick Links</h3>
      <nav className='flex flex-col gap-3'>
        {FOOTER_QUICK_LINKS.map((link) => (
          <Link key={link.label} href={link.href} className='text-sm text-blue-100 transition hover:text-white'>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterInstitutions() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-sm font-semibold uppercase tracking-wide text-amber-300'>Institutions</h3>
      <nav className='flex flex-col gap-3'>
        {FOOTER_INSTITUTIONS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className='text-sm text-blue-100 transition hover:text-white'
            target='_blank'
            rel='noreferrer'
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterContact() {
  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-sm font-semibold uppercase tracking-wide text-amber-300'>Contact Info</h3>
      <div className='flex flex-col gap-3 text-sm text-blue-100'>
        <p className='leading-relaxed'>{FOOTER_CONTACT_INFO.address}</p>
        <a
          href={`tel:${FOOTER_CONTACT_INFO.phone.replace(/\s+/g, "")}`}
          className='flex items-center gap-3 transition hover:text-white'
        >
          <Icon name='phone' className='size-4 shrink-0' />
          <span>{FOOTER_CONTACT_INFO.phone}</span>
        </a>
        <a href={`mailto:${FOOTER_CONTACT_INFO.email}`} className='flex items-center gap-2 transition hover:text-white'>
          <span>✉</span>
          <span>{FOOTER_CONTACT_INFO.email}</span>
        </a>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className='border-t border-blue-500/30 pt-6 mt-8'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-xs text-blue-200'>{FOOTER_COPYRIGHT}</p>
        <nav className='flex flex-wrap gap-4 text-xs'>
          {FOOTER_LEGAL_LINKS.map((link, index) => (
            <React.Fragment key={link.label}>
              <Link href={link.href} className='text-blue-200 transition hover:text-white'>
                {link.label}
              </Link>
              {index < FOOTER_LEGAL_LINKS.length - 1 ? <span className='text-blue-400/50'>|</span> : null}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className='w-full bg-[#1a36a2]'>
      <div className='mx-auto max-w-6xl px-4 py-8 text-white sm:py-12'>
        <div className='grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <FooterBrand />
          <FooterLinks />
          <FooterInstitutions />
          <FooterContact />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}

export { Footer };
