import Image from "next/image";
import QuotingTool from "./QuotingTool";

const HERO_BG =
  "https://www.figma.com/api/mcp/asset/baf53c16-ff84-4d8c-88b8-0ba8e0d9adf9";

const HERO_BG_MOBILE =
  "https://www.figma.com/api/mcp/asset/9c46f678-5c3c-4952-a7a3-9c9b85f115a8";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background image - desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={HERO_BG}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[rgba(41,171,226,0.5)] to-transparent" />
      </div>

      {/* Background image - mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={HERO_BG_MOBILE}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(29,29,27,0.95)] via-[rgba(0,88,146,0.62)] to-[#001b2c]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-12">
        {/* Desktop: side-by-side heading + quoting tool */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col gap-6 pt-8">
            <h1 className="font-['Ubuntu',sans-serif] font-bold text-[48px] leading-[1.2] text-[#f2f2f2]">
              Tu seguridad no tiene fronteras.
            </h1>
            <p className="font-['Ubuntu',sans-serif] font-medium text-[18px] leading-[1.6] text-[#f2f2f2]">
              Protegemos tus viajes en todo el mundo con asistencia médica integral y soporte 24/7. Cotizá ahora tu tranquilidad.
            </p>
          </div>
          <div className="md:mt-12">
            <QuotingTool />
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex flex-col gap-4 pt-4">
            <h1 className="font-['Ubuntu',sans-serif] font-medium text-[36px] leading-[45px] text-white">
              Viaja con la tranquilidad de estar protegido.
            </h1>
            <p className="font-['Ubuntu',sans-serif] font-light text-[18px] leading-[28.8px] text-[#d0e4ff]">
              Asistencia al viajero 24/7 con respaldo global en cada paso de tu aventura.
            </p>
          </div>
          <QuotingTool />
        </div>
      </div>
    </section>
  );
}
