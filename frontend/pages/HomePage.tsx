import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/HeroSection";
import { KeunggulanSection } from "../components/KeunggulanSection";
import { ProgramSection } from "../components/ProgramSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { ProgramUnggulanAiSection } from "../components/ProgramUnggulanAiSection";
import { SmartSessionSection } from "../components/SmartSessionSection";
import { FinalCTASection } from "../components/FinalCTASection";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>TerDig Academy - Bimbel Akademik Modern dengan AI</title>
        <meta
          name="description"
          content="Bimbel Akademik Modern untuk SD dengan pendampingan AI Tutor pribadi 24/7. Tutor profesional, laporan progress via WhatsApp setiap 2 minggu, Tes Pemetaan Awal + 1x Trial Class gratis."
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
      {/* 6. KEMITRAAN — TerDig Smart Session untuk Sekolah & Komunitas */}
      <SmartSessionSection />
      {/* 7. ACTION */}
      <FinalCTASection />
    </div>
  );
}