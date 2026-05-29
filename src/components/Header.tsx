"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const LOGO_WHITE =
  "https://www.figma.com/api/mcp/asset/3bd01d6a-2504-420f-a5bc-582890e42db2";

const PHONE_ICON =
  "https://www.figma.com/api/mcp/asset/8a7ea9aa-cea7-412c-bc59-30a09e0adc86";

const HAMBURGER_ICON =
  "https://www.figma.com/api/mcp/asset/7b8125dc-0e21-43f6-b4c2-299ece56e458";

const navLinks = [
  { label: "Asistencias", href: "#" },
  { label: "Coberturas", href: "#" },
  { label: "Promociones", href: "#" },
  { label: "Preguntas", href: "#" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#0071b9] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-11 w-36">
            <Image
              src={LOGO_WHITE}
              alt="Intermac LATAM"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-4 items-center">
          <button className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] px-4 py-2 rounded-lg hover:text-white transition-colors">
            Ingresar
          </button>
          <button className="bg-[#d9e021] shadow-[0px_0px_7.5px_rgba(217,224,33,0.4)] flex gap-2 items-center px-6 py-3 rounded-full font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#1d1d1b] whitespace-nowrap hover:bg-[#c8d01e] transition-colors">
            <div className="relative h-[18px] w-[17px]">
              <Image src={PHONE_ICON} alt="" fill className="object-contain" />
            </div>
            Central de Asistencias
          </button>
        </div>

        {/* Mobile: Call button + Hamburger */}
        <div className="flex md:hidden gap-4 items-center">
          <button className="bg-[#d9e021] shadow-[0px_0px_7.5px_rgba(217,224,33,0.4)] flex gap-2 items-center px-5 py-3 rounded-full font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#1d1d1b] hover:bg-[#c8d01e] transition-colors">
            <div className="relative h-[18px] w-[17px]">
              <Image src={PHONE_ICON} alt="" fill className="object-contain" />
            </div>
            Llamar
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col items-center justify-center text-white"
            aria-label="Menú"
          >
            <div className="relative h-4 w-6">
              <Image src={HAMBURGER_ICON} alt="" fill className="object-contain" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0071b9] border-t border-[#005fa0] px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-[#f2f2f2] py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button className="font-['Montserrat',sans-serif] font-medium text-[15px] text-[#f2f2f2] py-2 text-left">
            Ingresar
          </button>
        </div>
      )}
    </header>
  );
}
