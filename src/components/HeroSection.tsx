import { tinaField } from "tinacms/dist/react";
import QuotingTool from "./QuotingTool";
import { Media } from "@/lib/media";
import type { HeroContent, QuotingContent } from "@/types/content";

export default function HeroSection({
  content,
  quoting,
}: {
  content?: HeroContent | null;
  quoting?: QuotingContent | null;
}) {
  return (
    <section className="relative overflow-hidden min-h-[600px] flex items-center">
      {/* Background image - desktop */}
      <div
        className="absolute inset-0 hidden md:block"
        data-tina-field={tinaField(content, "background")}
      >
        <Media
          src={content?.background}
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-[rgba(41,171,226,0.5)] to-transparent" />
      </div>

      {/* Background image - mobile */}
      <div
        className="absolute inset-0 md:hidden"
        data-tina-field={tinaField(content, "backgroundMobile")}
      >
        <Media
          src={content?.backgroundMobile}
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
            <h1
              className="font-['Ubuntu',sans-serif] font-bold text-[48px] leading-[1.2] text-[#f2f2f2]"
              data-tina-field={tinaField(content, "title")}
            >
              {content?.title}
            </h1>
            <p
              className="font-['Ubuntu',sans-serif] font-medium text-[18px] leading-[1.6] text-[#f2f2f2]"
              data-tina-field={tinaField(content, "subtitle")}
            >
              {content?.subtitle}
            </p>
          </div>
          <div className="md:mt-12">
            <QuotingTool content={quoting} />
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-8">
          <div className="flex flex-col gap-4 pt-4">
            <h1
              className="font-['Ubuntu',sans-serif] font-medium text-[36px] leading-[45px] text-white"
              data-tina-field={tinaField(content, "titleMobile")}
            >
              {content?.titleMobile}
            </h1>
            <p
              className="font-['Ubuntu',sans-serif] font-light text-[18px] leading-[28.8px] text-[#d0e4ff]"
              data-tina-field={tinaField(content, "subtitleMobile")}
            >
              {content?.subtitleMobile}
            </p>
          </div>
          <QuotingTool content={quoting} />
        </div>
      </div>
    </section>
  );
}
