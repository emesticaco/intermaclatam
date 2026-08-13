"use client";

import { useTina } from "tinacms/dist/react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartnerLogos from "@/components/PartnerLogos";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import type { GlobalContent, HomeContent } from "@/types/content";

type TinaProps<T> = {
  query: string;
  variables: object;
  data: T;
};

export default function HomePage({
  home,
  global,
}: {
  home: TinaProps<{ home: HomeContent }>;
  global: TinaProps<{ global: GlobalContent }>;
}) {
  // useTina makes the page live-update inside the Tina editor. Outside the
  // editor it passes the server-rendered data straight through.
  const homeData = useTina(home).data.home;
  const globalData = useTina(global).data.global;

  return (
    <div className="flex flex-col min-h-screen">
      <Header content={globalData?.header} />
      <main className="flex-1">
        <HeroSection content={homeData?.hero} quoting={homeData?.quoting} />
        <PartnerLogos content={homeData?.partners} />
        <FeaturesSection content={homeData?.features} />
        <FAQSection content={homeData?.faq} />
      </main>
      <Footer content={globalData?.footer} />
    </div>
  );
}
