"use client";

import { useState } from "react";
import type { QuotingContent } from "@/types/content";

/**
 * Form-field icons are UI chrome rather than editable content, so they are
 * inline SVGs. The original Figma asset URLs for these slots were dead and
 * mismapped (the "location" pin pointed at the Facebook icon, the "calendar"
 * at the Instagram icon), so these are stand-ins for the real design icons.
 */
function IconLocation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 18s6-5.05 6-9a6 6 0 1 0-12 0c0 3.95 6 9 6 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <rect
        x="2.75"
        y="4.75"
        width="14.5"
        height="12.5"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2.75 8.5h14.5M6.5 2.75v4M13.5 2.75v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPassengers({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 16" fill="none" className={className}>
      <circle cx="7" cy="5" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M1.75 14.5c0-2.9 2.35-4.5 5.25-4.5s5.25 1.6 5.25 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 2.5a3 3 0 0 1 0 5.5M16.5 10.4c2.1.5 3.75 1.9 3.75 4.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 8h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCoupon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M2.75 8V5.75a1 1 0 0 1 1-1h12.5a1 1 0 0 1 1 1V8a2 2 0 0 0 0 4v2.25a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1V12a2 2 0 0 0 0-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function QuotingTool({
  content,
}: {
  content?: QuotingContent | null;
}) {
  const [coupon, setCoupon] = useState("");

  return (
    <div className="bg-white border border-[#c0c7d2] rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Desktop: 4-column row */}
      <div className="hidden md:block p-8">
        <div className="grid grid-cols-4 gap-6 items-end">
          {/* Destination */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              {content?.destinationLabel}
            </label>
            <div className="relative">
              <IconLocation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717882]" />
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280] truncate">
                  {content?.destinationPlaceholder}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              {content?.datesLabel}
            </label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717882]" />
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
                  {content?.datesPlaceholder}
                </span>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              {content?.passengersLabel}
            </label>
            <div className="relative">
              <IconPassengers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-[22px] text-[#717882]" />
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
                  {content?.passengersPlaceholder}
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-[#29abe2] flex items-center justify-center gap-2 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-white hover:bg-[#1a9bd0] transition-colors">
            {content?.ctaLabel}
            <IconArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Bottom row: coupon + price */}
        <div className="border-t border-[rgba(192,199,210,0.3)] mt-6 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCoupon className="h-5 w-5 text-[#717882]" />
            <input
              type="text"
              placeholder={content?.couponPlaceholder ?? ""}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="font-['Montserrat',sans-serif] text-[14px] text-[#6b7280] bg-transparent outline-none placeholder:text-[#6b7280] w-[180px]"
            />
          </div>
          <div className="text-right">
            <p className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              {content?.priceLabel}
            </p>
            <div className="flex items-end justify-end gap-1">
              <span className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] leading-tight">
                {content?.priceAmount}
              </span>
              <span className="font-['Ubuntu',sans-serif] font-medium text-[14px] text-[#005892] mb-1">
                {content?.priceUnit}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked form */}
      <div className="md:hidden p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <IconLocation className="h-5 w-5 text-[#005892]" />
          <h3 className="font-['Ubuntu',sans-serif] font-medium text-[20px] text-[#005892]">
            {content?.titleMobile}
          </h3>
        </div>

        {/* Origin */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
            {content?.originLabel}
          </label>
          <div className="border border-[#c0c7d2] rounded-lg px-4 py-[19px]">
            <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
              {content?.originPlaceholder}
            </span>
          </div>
        </div>

        {/* Destination */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
            {content?.destinationLabelMobile}
          </label>
          <div className="border border-[#c0c7d2] rounded-lg px-4 py-[19px]">
            <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
              {content?.destinationPlaceholderMobile}
            </span>
          </div>
        </div>

        {/* Dates row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
              {content?.departureLabel}
            </label>
            <div className="border border-[#c0c7d2] rounded-lg p-4 flex items-center justify-between">
              <span className="font-['Montserrat',sans-serif] text-[14px] text-[#181c20]">
                mm/dd/yyyy
              </span>
            </div>
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
              {content?.returnLabel}
            </label>
            <div className="border border-[#c0c7d2] rounded-lg p-4 flex items-center justify-between">
              <span className="font-['Montserrat',sans-serif] text-[14px] text-[#181c20]">
                mm/dd/yyyy
              </span>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <button className="bg-[#54c7ff] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] py-4 rounded-lg font-['Ubuntu',sans-serif] font-medium text-[16px] text-[#00516f] text-center hover:bg-[#3db9f5] transition-colors">
          {content?.ctaLabelMobile}
        </button>
      </div>
    </div>
  );
}
