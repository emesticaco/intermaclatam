import { Media } from "@/lib/media";
import type { FeatureItem, FeaturesContent } from "@/types/content";

/**
 * The desktop bento grid gives each slot its own treatment, so the styling is
 * keyed by position. Editors can reword or reorder the five cards in Tina;
 * adding a sixth falls back to the plain white card style.
 */
const DESKTOP_SLOTS = [
  {
    card: "col-span-2 bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex gap-8 items-center",
    title: "text-[#181c20]",
    body: "text-[#404751]",
    icon: "h-12 w-12",
    withImage: true,
  },
  {
    card: "bg-[#005892] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] rounded-xl p-6 flex flex-col justify-between",
    title: "text-white",
    body: "text-[rgba(233,241,255,0.8)]",
    icon: "h-12 w-12",
    withImage: false,
  },
  {
    card: "bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3",
    title: "text-[#181c20]",
    body: "text-[#404751]",
    icon: "h-12 w-11",
    withImage: false,
  },
  {
    card: "bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3",
    title: "text-[#181c20]",
    body: "text-[#404751]",
    icon: "h-12 w-12",
    withImage: false,
  },
  {
    card: "bg-[#e6e8ef] border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3",
    title: "text-[#181c20]",
    body: "text-[#404751]",
    icon: "h-12 w-10",
    withImage: false,
  },
];

const MOBILE_SLOTS = [
  {
    card: "bg-[#0071b9] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4 min-h-[280px] justify-between",
    title: "text-[24px] text-[#e9f1ff]",
    body: "text-[#e9f1ff] opacity-90",
    icon: "h-10 w-10",
    inline: false,
  },
  {
    card: "bg-white border border-[#c0c7d2] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4",
    title: "text-[20px] text-[#005892]",
    body: "text-[#404751]",
    icon: "h-8 w-8",
    inline: false,
  },
  {
    card: "bg-[#54c7ff] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4",
    title: "text-[20px] text-[#00516f]",
    body: "text-[#00516f]",
    icon: "h-9 w-9",
    inline: false,
  },
  {
    card: "bg-white border border-[#c0c7d2] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex gap-6 items-center min-h-[230px]",
    title: "text-[20px] text-[#005892]",
    body: "text-[#404751]",
    icon: "h-14 w-14 shrink-0",
    inline: true,
  },
];

export default function FeaturesSection({
  content,
}: {
  content?: FeaturesContent | null;
}) {
  const items = (content?.items ?? []).filter(Boolean) as FeatureItem[];
  const itemsMobile = (content?.itemsMobile ?? []).filter(
    Boolean
  ) as FeatureItem[];

  return (
    <section className="bg-[#f8f9ff] py-20">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] md:text-[#181c20]">
            <span className="md:hidden">{content?.headingMobile}</span>
            <span className="hidden md:inline">{content?.heading}</span>
          </h2>
          <p className="hidden md:block font-['Montserrat',sans-serif] text-[16px] text-[#404751] max-w-[576px]">
            {content?.subheading}
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {items.map((item, i) => {
            const slot = DESKTOP_SLOTS[i] ?? DESKTOP_SLOTS[2];

            const heading = (
              <div className="flex flex-col gap-3">
                <div className={`relative ${slot.icon}`}>
                  <Media src={item.icon} className="object-contain" />
                </div>
                <h3
                  className={`font-['Ubuntu',sans-serif] font-medium text-[24px] ${slot.title}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-['Montserrat',sans-serif] text-[16px] leading-[24px] ${slot.body}`}
                >
                  {item.body}
                </p>
              </div>
            );

            return (
              <div key={item.title ?? i} className={slot.card}>
                {slot.withImage ? (
                  <>
                    <div className="flex flex-col gap-3 flex-1">
                      <div className={`relative ${slot.icon}`}>
                        <Media src={item.icon} className="object-contain" />
                      </div>
                      <h3
                        className={`font-['Ubuntu',sans-serif] font-medium text-[24px] ${slot.title}`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`font-['Montserrat',sans-serif] text-[16px] leading-[24px] ${slot.body}`}
                      >
                        {item.body}
                      </p>
                    </div>
                    {item.image && (
                      <div className="relative h-48 w-60 rounded-lg overflow-hidden shrink-0">
                        <Media
                          src={item.image}
                          alt={item.title}
                          className="object-cover"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {heading}
                    {item.ctaLabel && (
                      <a
                        href={item.ctaHref ?? "#"}
                        className="flex items-center gap-2 mt-8 text-white font-['Montserrat',sans-serif] text-[16px] hover:opacity-80 transition-opacity"
                      >
                        {item.ctaLabel}
                      </a>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Bento */}
        <div className="md:hidden flex flex-col gap-5">
          {itemsMobile.map((item, i) => {
            const slot = MOBILE_SLOTS[i] ?? MOBILE_SLOTS[1];

            const icon = (
              <div className={`relative ${slot.icon}`}>
                <Media src={item.icon} className="object-contain" />
              </div>
            );

            const text = (
              <div className="flex flex-col gap-2">
                <h3
                  className={`font-['Ubuntu',sans-serif] font-medium ${slot.title}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`font-['Montserrat',sans-serif] text-[16px] leading-[24px] ${slot.body}`}
                >
                  {item.body}
                </p>
              </div>
            );

            return (
              <div key={item.title ?? i} className={slot.card}>
                {icon}
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
