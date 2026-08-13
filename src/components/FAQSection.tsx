"use client";

import { useState } from "react";
import type { FaqContent, FaqItem } from "@/types/content";

function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question?: string | null;
  answer?: string | null;
  defaultOpen?: boolean | null;
}) {
  const [open, setOpen] = useState(Boolean(defaultOpen));

  return (
    <div className="bg-white border border-[rgba(192,199,210,0.3)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-['Montserrat',sans-serif] text-[16px] text-[#005892] md:text-[#181c20]">
          {question}
        </span>
        <span
          className={`shrink-0 text-[#005892] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && answer && (
        <div className="border-t border-[rgba(192,199,210,0.2)] px-6 py-4">
          <p className="font-['Montserrat',sans-serif] text-[14px] text-[#404751] leading-[19.6px]">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection({
  content,
}: {
  content?: FaqContent | null;
}) {
  const faqs = (content?.items ?? []).filter(Boolean) as FaqItem[];

  const desktopFaqs = faqs.filter((f) => !f.mobileOnly);
  const mobileFaqs = desktopFaqs.concat(faqs.filter((f) => f.mobileOnly));

  return (
    <section className="bg-[#f1f3fa] py-20">
      <div className="max-w-[768px] mx-auto px-6 flex flex-col gap-12">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] md:text-[#181c20]">
            {content?.heading}
          </h2>
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751]">
            <span className="md:hidden">{content?.subheadingMobile}</span>
            <span className="hidden md:inline">{content?.subheading}</span>
          </p>
        </div>

        {/* Desktop FAQs */}
        <div className="hidden md:flex flex-col gap-4">
          {desktopFaqs.map((faq, i) => (
            <FAQItem
              key={faq.question ?? i}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={faq.defaultOpen}
            />
          ))}
        </div>

        {/* Mobile FAQs */}
        <div className="md:hidden flex flex-col gap-4">
          {mobileFaqs.map((faq, i) => (
            <FAQItem
              key={faq.question ?? i}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={faq.defaultOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
