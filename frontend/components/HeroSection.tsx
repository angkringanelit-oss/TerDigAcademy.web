import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Star, Users, BookOpen, Palette, Brain, Sparkles } from "lucide-react";
import { Mascot } from "./Mascot";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import quenChlidMascot from "../assets/Quen Child.png";

export function HeroSection() {
  const navigate = useNavigate();

  const handleExploreAcademic = () => {
    console.log('🎓 Navigating to Academic Program - Bimbel TerDig');
    navigate("/program?tab=academic");
  };

  const handleExploreCreative = () => {
    console.log('🎨 Navigating to Creative Program - Sanggar Seni Digital');
    navigate("/program?tab=creative");
  };

  const handleWatchDemo = () => {
    console.log('🤖 Navigating to AI Consultation');
    navigate("/konsultasi-ai");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-8 sm:left-20 w-14 h-14 sm:w-24 sm:h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-16 sm:right-40 w-8 h-8 sm:w-12 sm:h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto mobile-padding pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 responsive-gap items-center min-h-[70vh] sm:min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <Star className="w-3 h-3 sm:w-4 sm:h-4" />
                TerDig Academy - Dua Pilar Pendidikan Terdepan
              </div>

              <h1 className="responsive-hero-heading font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Belajar & Berkarya</span>
                <br />
                untuk Masa Depan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> Digital</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                TerDig Academy menggabungkan <strong>Bimbel TerDig</strong> untuk prestasi akademik dan
                <strong> Sanggar Seni Digital</strong> untuk kreativitas tanpa batas. 
                Bersama Star Kids & Quen Chlid, wujudkan potensi penuh anak Anda!
              </p>
            </div>

            {/* Two Pillars CTA Buttons */}
            <div className="grid gap-3 sm:gap-4 max-w-2xl mx-auto lg:mx-0">
              <Button 
                onClick={handleExploreAcademic}
                size="lg" 
                className="z-10 relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 active:scale-95 active:from-blue-700 active:to-purple-800 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center group active:shadow-md cursor-pointer touch-target"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                type="button"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 group-active:scale-90 transition-transform duration-200" />
                Jelajahi Bimbel TerDig
              </Button>
              <Button 
                onClick={handleExploreCreative}
                size="lg" 
                className="z-10 relative bg-gradient-to-r from-yellow-400 to-green-500 hover:from-yellow-500 hover:to-green-600 active:scale-95 active:from-yellow-600 active:to-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-200 flex items-center justify-center group active:shadow-md cursor-pointer touch-target"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                type="button"
              >
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 group-active:scale-90 transition-transform duration-200" />
                Masuk Sanggar Seni Digital
              </Button>
            </div>

            {/* Demo Button */}
            <div className="flex justify-center lg:justify-start">
              <Button 
                onClick={handleWatchDemo}
                variant="outline" 
                size="lg" 
                className="z-10 relative border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 active:scale-95 active:border-purple-600 active:bg-purple-100 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-base sm:text-lg font-semibold transform transition-all duration-200 group active:shadow-md hover:shadow-lg cursor-pointer touch-target"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                type="button"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:text-purple-600 group-active:scale-90 group-active:text-purple-700 transition-all duration-200" />
                Coba AI Kami
              </Button>
            </div>

            {/* Stats - Updated for TerDig Academy */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">1000+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Siswa Aktif</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">50+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Program Kreatif</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 mr-1 sm:mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Rating Orang Tua</p>
              </div>
            </div>
          </div>

          {/* Right Content - Both Mascots */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8 scale-75 sm:scale-90 md:scale-100">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-blue-400 to-green-400 rounded-full opacity-10 scale-125 animate-pulse"></div>

              {/* Star Kids Mascot - Academic */}
              <div className="relative group">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Bimbel TerDig
                </div>
                <Mascot 
                  src={starKidsMascot}
                  alt="Star Kids - Bimbel TerDig"
                  size="md"
                  animation="float"
                  className="relative z-10 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Star Kids
                </div>
              </div>

              {/* Quen Chlid Mascot - Creative */}
              <div className="relative group">
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Sanggar Seni Digital
                </div>
                <Mascot 
                  src={quenChlidMascot}
                  alt="Quen Chlid - Sanggar Seni Digital"
                  size="md"
                  animation="float"
                  className="relative z-10 sm:w-48 sm:h-48 md:w-64 md:h-64"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Quen Chlid
                </div>
              </div>

              {/* Floating elements around mascots */}
              <div className="absolute top-6 sm:top-10 -left-4 sm:-left-8 bg-yellow-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-300">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute top-10 sm:top-20 -right-4 sm:-right-8 bg-green-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-700">
                <Palette className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute bottom-10 sm:bottom-20 -left-6 sm:-left-12 bg-purple-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-1000">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
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
