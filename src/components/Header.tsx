"use client";

import { useState } from "react";
import Link from "next/link";
import { Media } from "@/lib/media";
import type { HeaderContent } from "@/types/content";

export default function Header({ content }: { content?: HeaderContent | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = (content?.navLinks ?? []).filter(Boolean);

  return (
    <header className="bg-[#0071b9] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-11 w-36">
            <Media
              src={content?.logo}
              alt={content?.logoAlt ?? "Intermac LATAM"}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <Link
              key={link?.label ?? i}
              href={link?.href ?? "#"}
              className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] hover:text-white transition-colors"
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] px-4 py-2 rounded-lg hover:text-white transition-colors">
            {content?.loginLabel}
          </button>
          <a
            href={content?.ctaHref ?? "#"}
            className="bg-[#d9e021] shadow-[0px_0px_7.5px_rgba(217,224,33,0.4)] flex gap-2 items-center px-6 py-3 rounded-full font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#1d1d1b] whitespace-nowrap hover:bg-[#c8d01e] transition-colors"
          >
            <div className="relative h-[18px] w-[17px]">
              <Media src={content?.phoneIcon} className="object-contain" />
            </div>
            {content?.ctaLabel}
          </a>
        </div>

        {/* Mobile: Call button + Hamburger */}
        <div className="flex md:hidden gap-4 items-center">
          <a
            href={content?.ctaHref ?? "#"}
            className="bg-[#d9e021] shadow-[0px_0px_7.5px_rgba(217,224,33,0.4)] flex gap-2 items-center px-5 py-3 rounded-full font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#1d1d1b] hover:bg-[#c8d01e] transition-colors"
          >
            <div className="relative h-[18px] w-[17px]">
              <Media src={content?.phoneIcon} className="object-contain" />
            </div>
            {content?.ctaLabelMobile}
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center text-white"
            aria-label="Menú"
          >
            <div className="relative h-4 w-6">
              <Media src={content?.menuIcon} className="object-contain" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0071b9] border-t border-[#005fa0] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <Link
              key={link?.label ?? i}
              href={link?.href ?? "#"}
              className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link?.label}
            </Link>
          ))}
          <button className="font-['Montserrat',sans-serif] font-medium text-[15px] text-[#f2f2f2] py-2 text-left">
            {content?.loginLabel}
          </button>
        </div>
      )}
    </header>
  );
}
