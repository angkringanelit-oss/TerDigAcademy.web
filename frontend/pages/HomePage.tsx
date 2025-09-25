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
      <HeroSection />
      {showProducts && <ProductsSection />}
      <ProgramSection />
      <EducationalFeaturesSection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  );
}