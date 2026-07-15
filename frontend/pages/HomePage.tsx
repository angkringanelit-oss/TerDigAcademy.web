import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/HeroSection";
import { KeunggulanSection } from "../components/KeunggulanSection";
import { ProgramSection } from "../components/ProgramSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ProgramUnggulanAiSection } from "../components/ProgramUnggulanAiSection";
import { FinalCTASection } from "../components/FinalCTASection";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>TerDig Academy - Bimbel Akademik Modern dengan AI</title>
        <meta
          name="description"
          content="Bimbel Akademik Modern untuk SD dengan pendampingan AI Tutor pribadi 24/7. Tutor profesional, laporan progress via WhatsApp, trial gratis 7 hari."
        />
      </Helmet>
      {/* 1. ATTENTION */}
      <HeroSection />
      {/* 2. INTEREST */}
      <KeunggulanSection />
      {/* 3. DESIRE — Program Reguler */}
      <ProgramSection />
      {/* 4. DESIRE — Social Proof */}
      <TestimonialsSection />
      {/* 5. DESIRE — Program Unggulan AI */}
      <ProgramUnggulanAiSection />
      {/* 6. ACTION */}
      <FinalCTASection />
    </div>
  );
}