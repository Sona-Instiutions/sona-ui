"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/Icon.component";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/NavigationMenu.component";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/Sheet.component";

import {
  HEADER_ABOUT_NAV,
  HEADER_HIGHLIGHT_NAV,
  HEADER_PARTNER_LINKS,
  HEADER_PRIMARY_NAV,
  HEADER_SOCIAL_LINKS,
} from "@/constants/navigation.constants";

function HeaderBrand() {
  return (
    <Link href='/' className='flex items-center gap-3 mr-20' aria-label='SCALE home'>
      <span className='flex items-center justify-center bg-linear-to-br bg-white p-2'>
        <Image src='/images/logo.svg' alt='Sona Towers' width='250' height='150' />
      </span>
    </Link>
  );
}

function HeaderTopBar() {
  return (
    <div className='hidden border-b border-blue-700/50 bg-[#2143b5] text-[11px] font-semibold uppercase tracking-wide text-blue-100 sm:block'>
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2'>
        <nav className='flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-blue-50/90'>
          {HEADER_PARTNER_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className='truncate transition hover:text-white'
              target='_blank'
              rel='noreferrer'
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className='flex flex-wrap items-center justify-center gap-2 text-blue-100'>
          <a href='tel:+919442592175' className='flex items-center gap-1 whitespace-nowrap text-xs'>
            <Icon name='phone' className='size-3' />
            <span className='font-semibold hidden sm:inline'>+91 9442592175</span>
          </a>
          <div className='flex items-center gap-3 text-white/80'>
            {HEADER_SOCIAL_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='transition hover:text-white'
                target='_blank'
                rel='noreferrer'
                aria-label={link.label}
              >
                <Icon name={link.iconName} className='size-4' />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderMobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side='left' className='flex h-full flex-col gap-6 bg-[#1a36a2] p-6 text-white'>
        <SheetHeader className='items-start gap-1'>
          <SheetTitle className='text-base font-semibold text-white'>SCALE Navigation</SheetTitle>
          <p className='text-sm text-blue-100'>Explore programs, campus life, and collaboration opportunities.</p>
        </SheetHeader>
        <nav className='flex flex-col gap-4'>
          <Link href='/' onClick={() => setOpen(false)} className='text-sm font-medium text-white'>
            Home
          </Link>
          <div className='flex flex-col gap-2'>
            About Us
            {HEADER_ABOUT_NAV.map((item) => (
              <Link key={item.label} onClick={() => setOpen(false)} href={item.href} className='text-sm ml-4 text-white/90'>
                {item.label}
              </Link>
            ))}
          </div>
          {HEADER_PRIMARY_NAV.filter((item) => item.label !== "Home").map((item) => (
            <Link onClick={() => setOpen(false)} key={item.label} href={item.href} className='text-sm text-white/90'>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className='flex flex-col gap-3 border-t border-blue-300/40 pt-4'>
          <span className='text-xs font-semibold uppercase text-amber-200'>Quick Links</span>
          {HEADER_HIGHLIGHT_NAV.map((item) => (
            <Link onClick={() => setOpen(false)} key={item.label} href={item.href} className='text-sm font-medium text-amber-100'>
              {item.label}
            </Link>
          ))}
          <div className='mt-2 flex flex-col gap-2 text-sm text-blue-100'>
            <a href='tel:+919442592175' className='flex items-center gap-2 font-medium text-white'>
              <Icon name='phone' className='size-4' /> +91 94425 92175
            </a>
            <div className='flex items-center gap-3 text-white/80'>
              {HEADER_SOCIAL_LINKS.map((link) => (
                <Link onClick={() => setOpen(false)} key={link.label} href={link.href} aria-label={link.label} className='transition hover:text-white'>
                  <Icon name={link.iconName} className='size-4' />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='text-white lg:hidden mr-2' aria-label='Open navigation menu'>
          <Icon name='menuIcon' className='size-6' />
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}

function HeaderDesktopNav() {
  return (
    <NavigationMenu className='hidden lg:flex'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href='/' className='text-sm font-medium text-white transition hover:text-white/80'>
              Home
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='text-sm font-medium text-white transition hover:text-white/80'>
            About Us
          </NavigationMenuTrigger>
          <NavigationMenuContent className='w-[420px]'>
            <ul className='grid gap-2 p-4'>
              {HEADER_ABOUT_NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className='block rounded-md p-2 text-sm transition hover:bg-blue-50'>
                    <span className='font-semibold text-blue-900'>{item.label}</span>
                    <p className='text-xs text-gray-600'>{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {HEADER_PRIMARY_NAV.filter((item) => item.label !== "Home").map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink asChild>
              <Link href={item.href} className='mr-6 text-sm font-medium text-white transition hover:text-white/80'>
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuIndicator />
      <NavigationMenuViewport />
    </NavigationMenu>
  );
}

function HeaderHighlightLinks() {
  return (
    <div className='hidden items-center gap-3 text-sm font-semibold lg:flex lg:ml-4'>
      {HEADER_HIGHLIGHT_NAV.map((item, index) => (
        <React.Fragment key={item.label}>
          <Link href={item.href} className='text-amber-300 transition hover:text-amber-200'>
            {item.label}
          </Link>
          {index < HEADER_HIGHLIGHT_NAV.length - 1 ? <span className='text-white/50'>|</span> : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function Header() {
  return (
    <header className='w-full bg-background shadow-sm'>
      <HeaderTopBar />
      <div className='border-b border-blue-900/60 bg-[#1a36a2]'>
        <div className='relative mx-auto flex justify-between max-w-7xl flex-row items-center gap-2 px-4 py-4 text-white after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-blue-400/40'>
          <HeaderBrand />
          <HeaderMobileMenu />
          <div className='items-center gap-1 lg:flex hidden'>
            <HeaderDesktopNav />
            <HeaderHighlightLinks />
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
