"use client";

import { useState } from "react";
import Image from "next/image";

const LOCATION_ICON =
  "https://www.figma.com/api/mcp/asset/ef7bbbe2-7f56-418a-acec-bae30ce96bbf";
const CALENDAR_ICON =
  "https://www.figma.com/api/mcp/asset/8a9df95a-f433-43cc-9edd-a8f1e65e1361";
const PASSENGERS_ICON =
  "https://www.figma.com/api/mcp/asset/31da67c5-0f37-4dd1-8e7e-a4572ea7434f";
const ARROW_ICON =
  "https://www.figma.com/api/mcp/asset/8a7ea9aa-cea7-412c-bc59-30a09e0adc86";
const COUPON_ICON =
  "https://www.figma.com/api/mcp/asset/e8bc2160-ec40-45bf-b4c8-58be65090b8c";

export default function QuotingTool() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [passengers, setPassengers] = useState("");
  const [coupon, setCoupon] = useState("");

  return (
    <div className="bg-white border border-[#c0c7d2] rounded-xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Desktop: 4-column row */}
      <div className="hidden md:block p-8">
        <div className="grid grid-cols-4 gap-6 items-end">
          {/* Destination */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              Origen y Destino
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                <Image src={LOCATION_ICON} alt="" fill className="object-contain" />
              </div>
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280] truncate">
                  {destination || "Selecciona un destino"}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              Fechas de Viaje
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5">
                <Image src={CALENDAR_ICON} alt="" fill className="object-contain" />
              </div>
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
                  {dates || "Ida y Vuelta"}
                </span>
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div className="flex flex-col gap-2">
            <label className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              Pasajeros (Edades)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-[22px]">
                <Image src={PASSENGERS_ICON} alt="" fill className="object-contain" />
              </div>
              <div className="bg-[#f8f9ff] flex items-center pl-10 pr-4 py-3 rounded-lg cursor-pointer">
                <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
                  {passengers || "Ej: 25, 32, 5"}
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button className="bg-[#29abe2] flex items-center justify-center gap-2 py-3 rounded-lg font-['Montserrat',sans-serif] font-medium text-[15px] tracking-[0.5px] text-white hover:bg-[#1a9bd0] transition-colors">
            Cotizar Ahora
            <div className="relative h-4 w-4">
              <Image src={ARROW_ICON} alt="" fill className="object-contain" />
            </div>
          </button>
        </div>

        {/* Bottom row: coupon + price */}
        <div className="border-t border-[rgba(192,199,210,0.3)] mt-6 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-5 w-5">
              <Image src={COUPON_ICON} alt="" fill className="object-contain" />
            </div>
            <input
              type="text"
              placeholder="Ingresa cupón de Descuento"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="font-['Montserrat',sans-serif] text-[14px] text-[#6b7280] bg-transparent outline-none placeholder:text-[#6b7280] w-[180px]"
            />
          </div>
          <div className="text-right">
            <p className="font-['Montserrat',sans-serif] text-[14px] text-[#717882]">
              Desde solo
            </p>
            <div className="flex items-end justify-end gap-1">
              <span className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] leading-tight">
                USD 4.50
              </span>
              <span className="font-['Ubuntu',sans-serif] font-medium text-[14px] text-[#005892] mb-1">
                /día
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked form */}
      <div className="md:hidden p-6 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image src={LOCATION_ICON} alt="" fill className="object-contain" />
          </div>
          <h3 className="font-['Ubuntu',sans-serif] font-medium text-[20px] text-[#005892]">
            Cotiza tu Seguro
          </h3>
        </div>

        {/* Origin */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
            Origen
          </label>
          <div className="border border-[#c0c7d2] rounded-lg px-4 py-[19px]">
            <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
              ¿De dónde vienes?
            </span>
          </div>
        </div>

        {/* Destination */}
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
            Destino
          </label>
          <div className="border border-[#c0c7d2] rounded-lg px-4 py-[19px]">
            <span className="font-['Montserrat',sans-serif] text-[16px] text-[#6b7280]">
              ¿A dónde vas?
            </span>
          </div>
        </div>

        {/* Dates row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
              Salida
            </label>
            <div className="border border-[#c0c7d2] rounded-lg p-4 flex items-center justify-between">
              <span className="font-['Montserrat',sans-serif] text-[14px] text-[#181c20]">
                mm/dd/yyyy
              </span>
            </div>
          </div>
          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 font-['Montserrat',sans-serif] font-medium text-[12px] text-[#717882]">
              Regreso
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
          Ver Planes de Cobertura
        </button>
      </div>
    </div>
  );
}
