import Link from "next/link";
import { Media } from "@/lib/media";
import type { FooterContent } from "@/types/content";

export default function Footer({ content }: { content?: FooterContent | null }) {
  const links = (content?.links ?? []).filter(Boolean);
  const social = (content?.social ?? []).filter(Boolean);

  return (
    <footer className="bg-[#2d3136]">
      {/* Desktop layout */}
      <div className="hidden md:flex max-w-[1200px] mx-auto px-6 py-12 items-center justify-between">
        {/* Left: logo + tagline */}
        <div className="flex flex-col gap-4">
          <div className="relative h-12 w-36">
            <Media
              src={content?.logo}
              alt="Intermac LATAM"
              className="object-contain object-left"
            />
          </div>
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] max-w-[320px] leading-[24px]">
            {content?.tagline}
          </p>
        </div>

        {/* Right: nav + copyright */}
        <div className="flex flex-col gap-6 items-end">
          <nav className="flex gap-6 items-center">
            {links.map((link, i) => (
              <Link
                key={link?.label ?? i}
                href={link?.href ?? "#"}
                className="font-['Montserrat',sans-serif] text-[14px] text-[#e0e2e9] hover:text-white transition-colors whitespace-nowrap"
              >
                {link?.label}
              </Link>
            ))}
          </nav>
          <p className="font-['Montserrat',sans-serif] text-[14px] text-[#e0e2e9]">
            {content?.copyright}
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden px-6 py-12 flex flex-col gap-8 items-center">
        {/* Logo */}
        <div className="relative h-16 w-52">
          <Media
            src={content?.logo}
            alt="Intermac LATAM"
            className="object-contain"
          />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] leading-[24px]">
            {content?.copyright}
          </p>
        </div>

        {/* Links — two per row, matching the design */}
        <div className="flex flex-col items-center gap-4">
          {chunk(links, 2).map((row, i) => (
            <div key={i} className="flex gap-8">
              {row.map((link, j) => (
                <Link
                  key={link?.label ?? j}
                  href={link?.href ?? "#"}
                  className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] hover:text-white transition-colors"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-4 items-center">
          {social.map((item, i) => (
            <Link
              key={item?.name ?? i}
              href={item?.href ?? "#"}
              className="relative h-5 w-5"
              aria-label={item?.name ?? undefined}
            >
              <Media
                src={item?.icon}
                alt={item?.name}
                className="object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}
