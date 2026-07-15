import { Button } from "@/components/ui/button";
import { Star, Users, BookOpen, Sparkles, GraduationCap, Brain } from "lucide-react";
import { Mascot } from "./Mascot";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import quenChlidMascot from "../assets/Quen Child.png";

export function HeroSection() {
  const navigate = useNavigate();

  const handleDaftarBimbel = () => {
    navigate("/daftar");
  };

  const handleCobaAITutor = () => {
    navigate("/konsultasi-ai");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-8 sm:left-20 w-14 h-14 sm:w-24 sm:h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-16 sm:right-40 w-8 h-8 sm:w-12 sm:h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
                Bimbel Akademik Modern berbasis AI
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  Bimbel Akademik Modern
                </span>
                <br />
                dengan Pendampingan{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  AI Pribadi
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Metode belajar yang menyenangkan untuk siswa TK/PAUD &amp; SD, dipandu tutor
                profesional dan dibantu teknologi AI. Laporan progress otomatis
                ke orang tua via WhatsApp.
              </p>
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto lg:mx-0">
              <Button
                onClick={handleDaftarBimbel}
                size="lg"
                className="z-10 relative flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-95 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center group cursor-pointer touch-target"
                style={{ WebkitTapHighlightColor: "transparent" }}
                type="button"
              >
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Daftar Bimbel Sekarang
              </Button>
              <Button
                onClick={handleCobaAITutor}
                variant="outline"
                size="lg"
                className="z-10 relative flex-1 border-2 border-purple-400 text-purple-700 hover:bg-purple-50 hover:border-purple-500 active:scale-95 px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transform transition-all duration-200 flex items-center justify-center group cursor-pointer touch-target shadow-sm hover:shadow-md"
                style={{ WebkitTapHighlightColor: "transparent" }}
                type="button"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-500 group-hover:scale-110 transition-transform duration-200" />
                Coba AI Tutor Gratis
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8">
              <div className="text-center px-2">
                <div className="flex flex-col items-center">
                  <Users className="w-5 h-5 sm:w-7 sm:h-7 text-indigo-500 mb-1" />
                  <span className="text-2xl sm:text-4xl font-bold text-indigo-600">500+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Siswa Aktif</p>
              </div>
              <div className="text-center px-2">
                <div className="flex flex-col items-center">
                  <Brain className="w-5 h-5 sm:w-7 sm:h-7 text-purple-500 mb-1" />
                  <span className="text-2xl sm:text-4xl font-bold text-purple-600">98%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Tingkat Kepuasan</p>
              </div>
              <div className="text-center px-2">
                <div className="flex flex-col items-center">
                  <Star className="w-5 h-5 sm:w-7 sm:h-7 text-amber-500 mb-1" />
                  <span className="text-2xl sm:text-4xl font-bold text-amber-600">4.9</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Rating Orang Tua</p>
              </div>
            </div>
          </div>

          {/* Right Content - Both Mascots */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8 scale-75 sm:scale-90 md:scale-100">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-400 rounded-full opacity-10 scale-125 animate-pulse"></div>

              {/* Star Kids Mascot - Teman Belajar */}
              <div className="relative group">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Teman Belajar
                </div>
                <Mascot
                  src={starKidsMascot}
                  alt="Star Kids - Teman Belajar Bimbel"
                  size="md"
                  animation="float"
                  className="relative z-10 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-100 text-indigo-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Star Kids
                </div>
              </div>

              {/* Quen Child Mascot - AI Tutor Assistant */}
              <div className="relative group">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  AI Tutor Assistant
                </div>
                <Mascot
                  src={quenChlidMascot}
                  alt="Quen Child - AI Tutor Assistant"
                  size="md"
                  animation="float"
                  className="relative z-10 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-100 text-purple-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Quen Child
                </div>
              </div>

              {/* Floating elements around mascots */}
              <div className="absolute top-6 sm:top-10 -left-4 sm:-left-8 bg-indigo-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-300" aria-label="Belajar">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute top-10 sm:top-20 -right-4 sm:-right-8 bg-purple-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-700" aria-label="AI">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute bottom-10 sm:bottom-20 -left-6 sm:-left-12 bg-pink-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-1000" aria-label="Progress">
                <Star className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 sm:h-16 md:h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}