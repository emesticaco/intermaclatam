import Image from "next/image";

const logos = [
  {
    src: "https://www.figma.com/api/mcp/asset/ab14c96b-0e1b-428c-bdab-3be1053edfb9",
    alt: "Partner 1",
    w: 44,
    h: 36,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/add28748-d9bf-45fb-95b5-ba5c1153791b",
    alt: "Partner 2",
    w: 32,
    h: 40,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/b9e217cf-87ec-44cc-8884-ecad85dd851a",
    alt: "Partner 3",
    w: 32,
    h: 40,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/0c7bf9b5-0042-44af-a8f4-ce07d7db4868",
    alt: "Partner 4",
    w: 44,
    h: 40,
  },
  {
    src: "https://www.figma.com/api/mcp/asset/bf38a5bc-433d-4e0c-b4b3-d59814a3ac2e",
    alt: "Partner 5",
    w: 32,
    h: 40,
  },
];

export default function PartnerLogos() {
  return (
    <section className="bg-white md:bg-[#eceef4] py-16 md:py-12">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 items-center">
        <p className="font-['Montserrat',sans-serif] font-medium text-[15px] md:text-[14px] tracking-[1.5px] md:tracking-[1.4px] text-[#717882] text-center uppercase">
          EMPRESAS QUE CONFÍAN EN NOSOTROS
        </p>
        <div className="relative flex gap-12 items-center justify-center opacity-50 md:opacity-60 w-full">
          <div className="absolute inset-0 bg-white mix-blend-saturation pointer-events-none" aria-hidden />
          {logos.map((logo) => (
            <div
              key={logo.alt}
              className="relative shrink-0"
              style={{ width: logo.w, height: logo.h }}
            >
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
