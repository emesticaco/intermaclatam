"use client";

import { useState } from "react";
import Image from "next/image";

const CHEVRON_DOWN =
  "https://www.figma.com/api/mcp/asset/26da73b3-47ff-464c-b3b8-e7f81519c7b4";

const faqs = [
  {
    question: "¿Cuándo debo contratar mi asistencia?",
    answer:
      "Lo ideal es contratarla al menos 24 horas antes de tu viaje. Algunos beneficios como la cancelación de viaje requieren ser contratados con mayor antelación.",
    defaultOpen: true,
  },
  {
    question: "¿Qué hago en caso de una emergencia?",
    answer:
      "Comunícate de inmediato con nuestra central de asistencias disponible 24/7. Te guiaremos paso a paso y coordinaremos los servicios que necesites en tu destino.",
  },
  {
    question: "¿Cubre preexistencias médicas?",
    answer:
      "Dependiendo del plan contratado, algunas preexistencias médicas pueden estar cubiertas. Te recomendamos revisar los términos y condiciones del plan seleccionado.",
  },
  // Mobile extras
  {
    question: "¿Qué incluye la cobertura básica?",
    answer:
      "La cobertura básica incluye asistencia médica de urgencia, hospitalización, repatriación y atención 24/7 en tu idioma.",
    mobileOnly: true,
  },
  {
    question: "¿Puedo contratar si ya estoy de viaje?",
    answer:
      "En algunos casos es posible contratar durante el viaje, aunque ciertos beneficios pueden tener un período de carencia. Contáctanos para más información.",
    mobileOnly: true,
  },
  {
    question: "¿Cómo solicito asistencia en destino?",
    answer:
      "Llama a nuestra central de asistencias internacional o usa nuestra plataforma digital para solicitar ayuda desde cualquier parte del mundo.",
    mobileOnly: true,
  },
  {
    question: "¿Cuál es el tiempo de respuesta?",
    answer:
      "Nuestro equipo responde en menos de 5 minutos ante cualquier emergencia, garantizando atención inmediata cuando más lo necesitas.",
    mobileOnly: true,
  },
];

function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-[rgba(192,199,210,0.3)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-['Montserrat',sans-serif] text-[16px] text-[#005892] md:text-[#181c20]">
          {question}
        </span>
        <div
          className={`relative h-[7px] w-3 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <Image src={CHEVRON_DOWN} alt="" fill className="object-contain" />
        </div>
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

export default function FAQSection() {
  const desktopFaqs = faqs.filter((f) => !f.mobileOnly);
  const mobileFaqs = faqs.filter((f) => !f.mobileOnly).concat(faqs.filter((f) => f.mobileOnly));

  return (
    <section className="bg-[#f1f3fa] py-20">
      <div className="max-w-[768px] mx-auto px-6 flex flex-col gap-12">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] md:text-[#181c20]">
            Preguntas Frecuentes
          </h2>
          <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751]">
            <span className="md:hidden">Resolvemos tus dudas sobre nuestras coberturas.</span>
            <span className="hidden md:inline">Todo lo que necesitás saber antes de tu próximo viaje.</span>
          </p>
        </div>

        {/* Desktop FAQs */}
        <div className="hidden md:flex flex-col gap-4">
          {desktopFaqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>

        {/* Mobile FAQs */}
        <div className="md:hidden flex flex-col gap-4">
          {mobileFaqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}
