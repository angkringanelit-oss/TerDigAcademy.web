import { Helmet } from "react-helmet-async";
import { HeroSection } from "../components/HeroSection";
import { ProgramSection } from "../components/ProgramSection";
import { EducationalFeaturesSection } from "../components/EducationalFeaturesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FinalCTASection } from "../components/FinalCTASection";
import { ProductsSection } from "../components/ProductsSection";
import { showProducts } from "../lib/featureFlags";

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>TerDig Academy - Belajar & Berkarya Digital</title>
        <meta
          name="description"
          content="Platform pendidikan digital untuk anak - bimbel akademik & sanggar seni digital."
        />
      </Helmet>
      <HeroSection />
      {showProducts && <ProductsSection />}
      <ProgramSection />
      <EducationalFeaturesSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}