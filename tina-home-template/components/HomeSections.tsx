"use client";

import { useTina } from "tinacms/dist/react";
import HeroSection from "./HeroSection";
import PartnerLogos from "./PartnerLogos";
import FeaturesSection from "./FeaturesSection";
import FAQSection from "./FAQSection";
import type { HomeContent } from "../types/home";

/**
 * The client boundary for the home page.
 *
 * This is where `useTina` is called, which is what makes the page live-update
 * inside the Tina editor — outside the editor it passes the server-rendered
 * data straight through. It must receive the full `{query, variables, data}`
 * envelope from `client.queries.home(...)`, not just `data`.
 *
 * Renders only the home sections. Header and footer belong to a separate
 * `global` collection and are the host project's concern — wrap this in your
 * own layout.
 */

export type TinaProps<T> = {
  query: string;
  variables: object;
  data: T;
};

export default function HomeSections({
  home,
}: {
  home: TinaProps<{ home: HomeContent }>;
}) {
  const data = useTina(home).data.home;

  return (
    <>
      {/* Hero embeds the quoting card, so it takes both slices. */}
      <HeroSection content={data?.hero} quoting={data?.quoting} />
      <PartnerLogos content={data?.partners} />
      <FeaturesSection content={data?.features} />
      <FAQSection content={data?.faq} />
    </>
  );
}
