import { Media } from "@/lib/media";
import type { PartnersContent } from "@/types/content";

export default function PartnerLogos({
  content,
}: {
  content?: PartnersContent | null;
}) {
  const logos = (content?.logos ?? []).filter(Boolean);

  return (
    <section className="bg-white md:bg-[#eceef4] py-16 md:py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 items-center">
        <p className="font-['Montserrat',sans-serif] font-medium text-[15px] md:text-[14px] tracking-[1.5px] md:tracking-[1.4px] text-[#717882] text-center uppercase">
          {content?.heading}
        </p>
        <div className="relative flex gap-12 items-center justify-center opacity-50 md:opacity-60 w-full">
          <div
            className="absolute inset-0 bg-white mix-blend-saturation pointer-events-none"
            aria-hidden
          />
          {logos.map((logo, i) => (
            <div
              key={logo?.alt ?? i}
              className="relative shrink-0"
              style={{ width: logo?.width ?? 40, height: logo?.height ?? 40 }}
            >
              <Media
                src={logo?.src}
                alt={logo?.alt}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
