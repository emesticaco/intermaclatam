import Image from "next/image";
import Link from "next/link";

const LOGO_WHITE_TAGLINE =
  "https://www.figma.com/api/mcp/asset/3bd01d6a-2504-420f-a5bc-582890e42db2";
const ICON_FACEBOOK =
  "https://www.figma.com/api/mcp/asset/ef7bbbe2-7f56-418a-acec-bae30ce96bbf";
const ICON_INSTAGRAM =
  "https://www.figma.com/api/mcp/asset/8a9df95a-f433-43cc-9edd-a8f1e65e1361";

const footerLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
  { label: "Preguntas Frecuentes", href: "#" },
  { label: "Contacto", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2d3136]">
      {/* Desktop layout */}
      <div className="hidden md:flex max-w-[1200px] mx-auto px-6 py-12 items-center justify-between">
        {/* Left: logo + tagline */}
        <div className="flex flex-col gap-4">
          <div className="relative h-12 w-36">
            <Image src={LOGO_WHITE_TAGLINE} alt="Intermac LATAM" fill className="object-contain object-left" />
          </div>
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] max-w-[320px] leading-[24px]">
            Expertos en asistencia internacional al viajero. Brindamos soporte global con calidez humana.
          </p>
        </div>

        {/* Right: nav + copyright */}
        <div className="flex flex-col gap-6 items-end">
          <nav className="flex gap-6 items-center">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-['Montserrat',sans-serif] text-[14px] text-[#e0e2e9] hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="font-['Montserrat',sans-serif] text-[14px] text-[#e0e2e9]">
            © 2024 Intermac LATAM. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden px-6 py-12 flex flex-col gap-8 items-center">
        {/* Logo */}
        <div className="relative h-16 w-52">
          <Image src={LOGO_WHITE_TAGLINE} alt="Intermac LATAM" fill className="object-contain" />
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] leading-[24px]">
            © 2024 Intermac LATAM.
          </p>
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] leading-[24px]">
            Todos los derechos reservados.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-8">
            <Link href="#" className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] hover:text-white transition-colors">
              Términos
            </Link>
          </div>
          <div className="flex gap-8">
            <Link href="#" className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] hover:text-white transition-colors">
              Preguntas Frecuentes
            </Link>
            <Link href="#" className="font-['Montserrat',sans-serif] text-[16px] text-[#e0e2e9] hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 items-center">
          <div className="relative h-5 w-5">
            <Image src={ICON_FACEBOOK} alt="Facebook" fill className="object-contain" />
          </div>
          <div className="relative h-5 w-[18px]">
            <Image src={ICON_INSTAGRAM} alt="Instagram" fill className="object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
