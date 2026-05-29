import Image from "next/image";

const ICON_GLOBAL =
  "https://www.figma.com/api/mcp/asset/0c7bf9b5-0042-44af-a8f4-ce07d7db4868";
const ICON_MULTILANG =
  "https://www.figma.com/api/mcp/asset/0ab3ccd5-973f-46a9-aae4-552cca6fe641";
const ICON_DIGITAL =
  "https://www.figma.com/api/mcp/asset/f55a95da-262c-4366-8c91-afcd3f940511";
const ICON_CANCEL =
  "https://www.figma.com/api/mcp/asset/b0c3447b-ff56-4cef-a2d6-755217adaa4b";
const ICON_LUGGAGE =
  "https://www.figma.com/api/mcp/asset/0763390d-c244-4137-9880-74ac6e60a2e3";
const HOSPITAL_IMG =
  "https://www.figma.com/api/mcp/asset/5f6840da-a8c8-4442-9eb4-9ce684493a29";
const ARROW_RIGHT =
  "https://www.figma.com/api/mcp/asset/26da73b3-47ff-464c-b3b8-e7f81519c7b4";

// Mobile bento icons
const ICON_MOBILE_GLOBAL =
  "https://www.figma.com/api/mcp/asset/7b8125dc-0e21-43f6-b4c2-299ece56e458";
const ICON_MOBILE_INSTANT =
  "https://www.figma.com/api/mcp/asset/0ab3ccd5-973f-46a9-aae4-552cca6fe641";
const ICON_MOBILE_SUPPORT =
  "https://www.figma.com/api/mcp/asset/f55a95da-262c-4366-8c91-afcd3f940511";
const ICON_MOBILE_DIGITAL =
  "https://www.figma.com/api/mcp/asset/e8bc2160-ec40-45bf-b4c8-58be65090b8c";

export default function FeaturesSection() {
  return (
    <section className="bg-[#f8f9ff] py-20">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16">
        {/* Heading */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="font-['Ubuntu',sans-serif] font-bold text-[32px] text-[#005892] md:text-[#181c20]">
            <span className="md:hidden">Por qué elegir Intermac</span>
            <span className="hidden md:inline">¿Por qué elegir Intermac LATAM?</span>
          </h2>
          <p className="hidden md:block font-['Montserrat',sans-serif] text-[16px] text-[#404751] max-w-[576px]">
            Más de 20 años brindando soluciones de asistencia global con la tecnología más avanzada del mercado.
          </p>
        </div>

        {/* Desktop Bento Grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {/* Feature 1 – wide */}
          <div className="col-span-2 bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex gap-8 items-center">
            <div className="flex flex-col gap-3 flex-1">
              <div className="relative h-12 w-12">
                <Image src={ICON_GLOBAL} alt="" fill className="object-contain" />
              </div>
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-[#181c20]">
                Red Médica Global
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
                Acceso inmediato a los mejores hospitales y especialistas en más de 150 países, sin copagos ni demoras innecesarias.
              </p>
            </div>
            <div className="relative h-48 w-60 rounded-lg overflow-hidden shrink-0">
              <Image src={HOSPITAL_IMG} alt="Hospital" fill className="object-cover" />
            </div>
          </div>

          {/* Feature 2 – dark blue */}
          <div className="bg-[#005892] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] rounded-xl p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              <div className="relative h-12 w-12">
                <Image src={ICON_MULTILANG} alt="" fill className="object-contain" />
              </div>
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-white">
                Atención Multi-idioma
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[rgba(233,241,255,0.8)] leading-[24px]">
                Te asistimos en tu propio idioma, las 24 horas del día, los 365 días del año. Tu tranquilidad es nuestra prioridad.
              </p>
            </div>
            <button className="flex items-center gap-2 mt-8 text-white font-['Montserrat',sans-serif] text-[16px] hover:opacity-80 transition-opacity">
              Saber más
              <div className="relative h-3 w-[7px]">
                <Image src={ARROW_RIGHT} alt="" fill className="object-contain" />
              </div>
            </button>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3">
            <div className="relative h-12 w-11">
              <Image src={ICON_DIGITAL} alt="" fill className="object-contain" />
            </div>
            <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-[#181c20]">
              Gestión 100% Digital
            </h3>
            <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
              Descargá tu voucher, gestioná reembolsos y pedí asistencia directamente desde nuestra plataforma.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3">
            <div className="relative h-12 w-12">
              <Image src={ICON_CANCEL} alt="" fill className="object-contain" />
            </div>
            <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-[#181c20]">
              Cancelación de Viaje
            </h3>
            <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
              Protección integral ante imprevistos que te obliguen a suspender tus planes antes de partir.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-[#e6e8ef] border border-[rgba(192,199,210,0.3)] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-xl p-6 flex flex-col gap-3">
            <div className="relative h-12 w-10">
              <Image src={ICON_LUGGAGE} alt="" fill className="object-contain" />
            </div>
            <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-[#181c20]">
              Seguro de Equipaje
            </h3>
            <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
              Seguimiento y compensación inmediata en caso de pérdida o demora en la entrega de tus maletas.
            </p>
          </div>
        </div>

        {/* Mobile Bento */}
        <div className="md:hidden flex flex-col gap-5">
          {/* Card 1 – blue */}
          <div className="bg-[#0071b9] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4 min-h-[280px] justify-between">
            <div className="relative h-10 w-10">
              <Image src={ICON_MOBILE_GLOBAL} alt="" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[24px] text-[#e9f1ff]">
                Respaldo Internacional
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[#e9f1ff] leading-[24px] opacity-90">
                Red propia de prestadores en más de 150 países con atención inmediata.
              </p>
            </div>
          </div>

          {/* Card 2 – white */}
          <div className="bg-white border border-[#c0c7d2] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4">
            <div className="relative h-8 w-8">
              <Image src={ICON_MOBILE_INSTANT} alt="" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[20px] text-[#005892]">
                Activación Instantánea
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
                Tu voucher se emite al instante y llega a tu correo en segundos.
              </p>
            </div>
          </div>

          {/* Card 3 – light blue */}
          <div className="bg-[#54c7ff] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex flex-col gap-4">
            <div className="relative h-9 w-9">
              <Image src={ICON_MOBILE_SUPPORT} alt="" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[20px] text-[#00516f]">
                Soporte 24/7
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[#00516f] leading-[24px]">
                Atención humana, rápida y eficiente en tu propio idioma, sin importar la hora.
              </p>
            </div>
          </div>

          {/* Card 4 – white with icon */}
          <div className="bg-white border border-[#c0c7d2] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-2xl p-6 flex gap-6 items-center min-h-[230px]">
            <div className="relative h-14 w-14 shrink-0">
              <Image src={ICON_MOBILE_DIGITAL} alt="" fill className="object-contain" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-['Ubuntu',sans-serif] font-medium text-[20px] text-[#005892]">
                Gestión Digital
              </h3>
              <p className="font-['Montserrat',sans-serif] text-[16px] text-[#404751] leading-[24px]">
                Descarga tus vouchers y gestiona reclamos desde tu panel personal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
