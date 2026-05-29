import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartnerLogos from "@/components/PartnerLogos";
import FeaturesSection from "@/components/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PartnerLogos />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
