import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FinalCTASection() {
  const navigate = useNavigate();

  const handleDaftar = () => {
    navigate("/daftar");
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-5 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-16 h-16 sm:w-20 sm:h-20 bg-white opacity-5 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-20 h-20 sm:w-28 sm:h-28 bg-white opacity-5 rounded-full animate-pulse delay-2000" />
        <div className="absolute bottom-10 right-10 w-12 h-12 sm:w-16 sm:h-16 bg-white opacity-5 rounded-full animate-pulse delay-500" />

        {/* Abstract pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Siap Memulai Perjalanan{" "}
            <span className="text-yellow-200">Belajar Anak?</span>
          </h2>

          {/* Sub-heading */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            Daftar trial gratis 7 hari untuk Program Calistung atau Bimbel SD.
            Tanpa komitmen. Buktikan sendiri manfaatnya.
          </p>

          {/* CTA Button */}
          <Button
            onClick={handleDaftar}
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 font-bold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 touch-target"
          >
            Daftar Trial Gratis
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Micro text */}
          <p className="mt-6 text-white/60 text-sm">
            Tanpa komitmen. Mulai sekarang!
          </p>
        </div>
      </div>
    </section>
  );
}
