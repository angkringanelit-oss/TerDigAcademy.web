import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Gift, Clock, Users, Star, BookOpen, Palette } from "lucide-react";
import { Mascot } from "./Mascot";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

// 🎯 Target waktu: 12 hari dari sekarang
const TARGET_DATE = new Date(Date.now() + 12 * 24 * 60 * 60 * 1000);

function useCountdown(target: Date) {
  const [time, setTime] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setTime(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const seconds = Math.floor((time / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function FinalCTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      toast({ title: "Email tidak valid", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: "Selamat! Anda mendapat akses 7 hari gratis." });
      setEmail("");
      // Navigate to program page
      navigate("/program");
    } catch (error) {
      toast({ title: "Gagal mendaftar. Coba lagi.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-yellow-400 via-blue-500 to-green-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-6 sm:top-10 left-4 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-8 sm:right-20 w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 bg-white opacity-5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-8 sm:left-20 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 bg-white opacity-5 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 sm:bottom-40 right-4 sm:right-10 w-10 h-10 sm:w-15 sm:h-15 md:w-20 md:h-20 bg-white opacity-5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto mobile-padding relative z-10">
        <div className="grid lg:grid-cols-2 responsive-gap items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm text-xs sm:text-sm">
              <Gift className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Penawaran Terbatas
            </Badge>

            <h2 className="responsive-hero-heading font-bold text-white mb-4 sm:mb-6 leading-tight">
              Bergabung dengan
              <br />
              <span className="text-blue-100">TerDig Academy</span>
              <span className="text-yellow-200"> Sekarang!</span>
            </h2>

            <p className="responsive-text text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Bergabunglah dengan keluarga TerDig Academy yang telah membuktikan keunggulan dua pilar pendidikan: 
              prestasi akademik dan kreativitas digital. Dapatkan akses gratis selama 7 hari!
            </p>

            {/* Countdown */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-200" />
                <span className="text-white font-semibold text-sm sm:text-base">Penawaran terbatas berakhir dalam:</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-white">{String(days).padStart(2, "0")}</div>
                  <div className="text-xs sm:text-sm text-white/80">Hari</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-white">{String(hours).padStart(2, "0")}</div>
                  <div className="text-xs sm:text-sm text-white/80">Jam</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-white">{String(minutes).padStart(2, "0")}</div>
                  <div className="text-xs sm:text-sm text-white/80">Menit</div>
                </div>
                <div className="bg-white/20 rounded-lg p-2 sm:p-3">
                  <div className="text-lg sm:text-2xl font-bold text-white">{String(seconds).padStart(2, "0")}</div>
                  <div className="text-xs sm:text-sm text-white/80">Detik</div>
                </div>
              </div>
            </div>

            {/* Email Signup */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <Input
                  placeholder="Masukkan email Anda..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm text-sm sm:text-base"
                  required
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base touch-target"
                >
                  {loading ? "Mendaftar..." : "Daftar Gratis"}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-white/80">* Tidak ada biaya tersembunyi. Bisa dibatalkan kapan saja.</p>
            </form>

            {/* Updated Benefits for TerDig Academy */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
                <span className="text-white/90 text-sm sm:text-base">1000+ Siswa</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
                <span className="text-white/90 text-sm sm:text-base">Rating 4.9</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200" />
                <span className="text-white/90 text-sm sm:text-base">Gratis 7 Hari</span>
              </div>
            </div>
          </div>

          {/* Right Content - Both Mascots */}
          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative flex items-center gap-3 sm:gap-4 md:gap-6 scale-75 sm:scale-90 md:scale-100">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-125"></div>
              
              {/* Star Kids */}
              <div className="relative">
                <Mascot
                  src={starKidsMascot}
                  alt="Star Kids - Bimbel TerDig"
                  size="md"
                  animation="float"
                  className="relative z-10"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Star Kids
                </div>
              </div>
              
              {/* Quen Chlid */}
              <div className="relative">
                <Mascot
                  src={queenChildMascot}
                  alt="Quen Chlid - Sanggar Seni Digital"
                  size="md"
                  animation="bounce"
                  className="relative z-10"
                />
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium">
                  Quen Chlid
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-6 sm:top-10 -left-4 sm:-left-8 bg-blue-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-300">
                <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute top-10 sm:top-20 -right-4 sm:-right-8 bg-green-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-700">
                <Palette className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute bottom-8 sm:bottom-16 -left-6 sm:-left-12 bg-yellow-400 text-white p-2 sm:p-3 rounded-full shadow-lg animate-bounce delay-1000">
                <Star className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}
