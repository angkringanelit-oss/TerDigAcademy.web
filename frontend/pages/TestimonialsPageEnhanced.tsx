import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Quote,
  Heart,
  Users,
  Trophy,
  Play,
  Check,
  Shield,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Bot,
} from "lucide-react";
import { Mascot } from "../components/Mascot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

// ─── Types ───────────────────────────────────────────
interface Testimonial {
  id: number;
  name: string;
  role: string;
  child_info: string;
  program: string;
  rating: number;
  content: string;
  achievement: string;
  created_at: string;
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

// ─── Custom Hook: Scroll-triggered animation ────────
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Animated Counter ────────────────────────────────
function AnimatedCounter({ end, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Helper: Program Badge ───────────────────────────
const getProgramBadge = (program: string) => {
  const p = program.toLowerCase();
  // Filter tegas: Sanggar Seni & sejenisnya jadi "Program Lainnya"
  if (p.includes("sanggar") || p.includes("seni")) {
    return { text: "Program Lainnya", className: "bg-gray-100 text-gray-600 border-gray-200" };
  }
  if (p.includes("bimbel") || p.includes("akademik") || p.includes("sd")) {
    return { text: program, className: "bg-blue-100 text-blue-700 border-blue-200" };
  }
  if (p.includes("calistung") || p.includes("tk") || p.includes("paud")) {
    return { text: program, className: "bg-purple-100 text-purple-700 border-purple-200" };
  }
  return { text: "Program Lainnya", className: "bg-gray-100 text-gray-600 border-gray-200" };
};

// ─── Statistics Data ─────────────────────────────────
const statsData = [
  { icon: Users, end: 8, suffix: "", label: "Anak per Kelas", displayValue: "5–8", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: BookOpen, end: 3, suffix: "", label: "Program Unggulan", displayValue: "3", color: "text-yellow-500", bg: "bg-yellow-50" },
  { icon: MessageCircle, end: 2, suffix: "x", label: "Laporan per Bulan ke Orang Tua", displayValue: "2x", color: "text-green-600", bg: "bg-green-50" },
  { icon: Sparkles, end: 1, suffix: "x", label: "Trial Class Gratis + Tes Pemetaan Awal", displayValue: "1x", color: "text-pink-500", bg: "bg-pink-50" },
];

// ─── Trust Badges Data ───────────────────────────────
const trustBadges = [
  { name: "SD Negeri", icon: BookOpen },
  { name: "TK Harapan", icon: Award },
  { name: "PAUD Cerdas", icon: Sparkles },
  { name: "MI Terpadu", icon: Shield },
  { name: "SDIT Al-Falah", icon: BookOpen },
  { name: "TK Islam", icon: Award },
];

// ─── Reusable: Fade-in Section Wrapper ───────────────
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────
export function TestimonialsPageEnhanced() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("id", { ascending: false })
          .limit(6);

        if (error) throw new Error(error.message);

        // Filter: hanya program akademik (skip Sanggar Seni Digital)
        const filtered = (data || []).filter((t: Testimonial) => {
          const program = t.program?.toLowerCase() || "";
          const content = t.content?.toLowerCase() || "";
          return !program.includes("sanggar") && 
                 !program.includes("seni") &&
                 !content.includes("sanggar") &&
                 !content.includes("seni digital");
        });

        setTestimonials(filtered);
      } catch (err) {
        logger.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ─── Render ──────────────────────────────────────────
  return (
    <>
      <Helmet>
        <title>Testimoni Orang Tua - TerDig Academy</title>
        <meta
          name="description"
          content="Baca pengalaman nyata orang tua dan siswa yang telah merasakan manfaat belajar di TerDig Academy. Bimbel akademik digital dengan hasil terbukti."
        />
        <meta property="og:title" content="Testimoni Orang Tua - TerDig Academy" />
        <meta
          property="og:description"
          content="Baca pengalaman nyata orang tua dan siswa yang telah merasakan manfaat belajar di TerDig Academy."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* ═══════════════════════════════════════════════
            1. HEADER SECTION
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="pt-24 pb-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 text-sm font-medium shadow-lg animate-pulse">
              ✨ Testimoni Orang Tua & Siswa
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Cerita{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                Sukses
              </span>{" "}
              Keluarga{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500">
                TerDig
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ribuan orang tua telah mempercayakan pendidikan anak-anak mereka kepada TerDig Academy.
              <br className="hidden sm:block" />
              Simak pengalaman mereka dan rasakan sendiri perbedaannya!
            </p>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {["A", "B", "C", "D"][i - 1]}
                  </div>
                ))}
              </div>
              <span className="font-medium">
                Bergabung dengan <strong className="text-purple-600">keluarga</strong> TerDig Academy lainnya
              </span>
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            2. MASCOT SECTION
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="pb-8 px-4" delay={150}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-white/80">
              <div className="flex justify-center items-center gap-6 sm:gap-12">
                {/* Star Kids */}
                <div className="text-center flex-1">
                  <Mascot
                    src={starKidsMascot}
                    alt="Star Kids"
                    size="md"
                    animation="float"
                    className="mx-auto mb-3"
                  />
                  <p className="text-sm font-semibold text-blue-600">Teman Belajar Akademik</p>
                  <p className="text-xs text-gray-500 mt-0.5">Calistung & Bimbel SD</p>
                </div>

                {/* Heart Divider */}
                <div className="flex flex-col items-center gap-2">
                  <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
                  <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-pink-200 to-transparent"></div>
                  <span className="hidden sm:block text-[10px] font-medium text-pink-400 uppercase tracking-widest">
                    &
                  </span>
                </div>

                {/* Quen Child */}
                <div className="text-center flex-1">
                  <Mascot
                    src={queenChildMascot}
                    alt="Quen Child"
                    size="md"
                    animation="bounce"
                    className="mx-auto mb-3 [animation-duration:3s]"
                  />
                  <p className="text-sm font-semibold text-green-600">Teman Berkarya Kreatif</p>
                  <p className="text-xs text-gray-500 mt-0.5">Kreativitas Digital</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            3. STATISTICS SECTION
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="py-12 px-4" delay={300}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                TerDig Academy dalam Angka
              </h2>
              <p className="text-gray-600">
                Fakta tentang cara belajar di TerDig Academy
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className={`${stat.bg} rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white/60`}
                  >
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white shadow-sm mb-4 ${stat.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className={`text-3xl sm:text-4xl font-extrabold mb-1 ${stat.color}`}>
                      {stat.displayValue ? (
                        stat.displayValue
                      ) : (
                        <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            4. TESTIMONIALS GRID
            ═══════════════════════════════════════════════ */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <FadeInSection>
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 px-4 py-1.5">
                  💬 Testimoni Terbaru
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Apa Kata Mereka?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Pengalaman nyata dari orang tua yang telah merasakan perubahan positif pada anak-anak mereka
                </p>
              </div>
            </FadeInSection>

            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
                <p className="text-gray-600 mt-6 text-lg">Memuat testimoni...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16 bg-white/60 rounded-2xl backdrop-blur-sm">
                <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Belum ada testimoni. Jadilah yang pertama!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((testimonial, idx) => {
                  const badge = getProgramBadge(testimonial.program);
                  return (
                    <FadeInSection key={testimonial.id} delay={idx * 100}>
                      <Card className="group relative overflow-hidden border-2 border-gray-100 hover:border-purple-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white">
                        {/* Gradient top bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                        <CardContent className="p-6">
                          {/* Quote Icon */}
                          <div className="absolute top-6 right-6 text-purple-100 group-hover:text-purple-200 transition-colors">
                            <Quote className="w-10 h-10" />
                          </div>

                          {/* User Info */}
                          <div className="flex items-center gap-4 mb-5">
                            <div className="relative">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-0.5">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                  <Users className="w-6 h-6 text-purple-600" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 truncate">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600 truncate">{testimonial.role}</p>
                              {testimonial.child_info && (
                                <p className="text-xs text-gray-500 truncate">{testimonial.child_info}</p>
                              )}
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 transition-all duration-300 ${
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400 scale-100"
                                    : "text-gray-200 scale-90"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(testimonial.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="relative mb-5">
                            <p className="text-gray-700 leading-relaxed italic text-sm">
                              "{testimonial.content.length > 200
                                ? testimonial.content.slice(0, 200) + "..."
                                : testimonial.content}"
                            </p>
                          </div>

                          {/* Divider */}
                          <div className="border-t border-gray-100 pt-4 space-y-3">
                            {/* Program Badge */}
                            <div className="flex items-center gap-2">
                              <Badge className={`text-xs border ${badge.className}`}>
                                {badge.text}
                              </Badge>
                            </div>

                            {/* Achievement */}
                            {testimonial.achievement && (
                              <div className="flex items-center gap-2 text-sm">
                                <Trophy className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{testimonial.achievement}</span>
                              </div>
                            )}

                            {/* Card Footer */}
                            <div className="flex items-center justify-between pt-2">
                              <span className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-purple-600 cursor-pointer transition-colors">
                                <Heart className="w-3.5 h-3.5" />
                                Helpful
                              </span>
                              <Badge variant="outline" className="text-[10px] text-green-700 border-green-200 bg-green-50">
                                ✓ Verified Parent
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </FadeInSection>
                  );
                })}
              </div>
            )}

            {/* Load more indicator */}
            {!loading && testimonials.length > 0 && (
              <FadeInSection className="text-center mt-10">
                <p className="text-gray-500 text-sm">
                  Menampilkan {testimonials.length} testimoni terbaru
                </p>
              </FadeInSection>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            5. VIDEO TESTIMONIALS (Placeholder)
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 px-4 py-1.5">
                🎥 Video Testimoni
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Lihat Pengalaman Mereka
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Saksikan langsung bagaimana TerDig Academy mengubah cara belajar anak-anak menjadi lebih menyenangkan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 aspect-video cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                        <Play className="w-7 h-7 text-purple-600 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white font-semibold text-sm">Kisah Sukses #{i}</p>
                    <p className="text-white/70 text-xs mt-0.5">Orang tua berbagi pengalaman</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
                🎬 Video lengkap akan segera hadir. Nantikan update dari kami!
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            6. WHY CHOOSE US (Enhanced)
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-green-100 to-teal-100 text-teal-700 px-4 py-1.5">
                🌟 Mengapa TerDig?
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Mengapa Orang Tua Memilih Kami?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dua pilar pendidikan yang memberikan hasil nyata untuk masa depan anak
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {/* Prestasi Akademik */}
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Prestasi Akademik dengan Star Kids</h3>
                <ul className="space-y-4">
                  {[
                    "Metode pembelajaran yang menyenangkan dan efektif",
                    "Peningkatan nilai rata-rata 20-30 poin",
                    "Guru berpengalaman dan bersertifikat",
                    "Kurikulum terintegrasi dengan standar nasional",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Teknologi Pembelajaran Modern */}
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-green-100 hover:border-green-300">
                <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Teknologi Pembelajaran Modern dengan AI Tutor</h3>
                <ul className="space-y-4">
                  {[
                    "AI Tutor pribadi 24/7 sesuai Kurikulum Merdeka",
                    "Laporan perkembangan via WhatsApp real-time",
                    "Metode belajar interaktif & menyenangkan",
                    "Terintegrasi dengan standar pendidikan nasional",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            7. TRUST BADGES
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="py-16 px-4 bg-gray-50/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-1.5 border border-gray-200">
                🏫 Dipercaya Oleh
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Mitra Sekolah & Lembaga Pendidikan
              </h2>
              <p className="text-gray-600">
                Orang tua dari berbagai sekolah mempercayakan pendidikan anak-anak mereka kepada TerDig Academy
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 sm:gap-6">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className="group bg-white rounded-xl p-4 sm:p-5 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border border-gray-100"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-50 transition-colors">
                      <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 group-hover:text-gray-900 transition-colors">
                      {badge.name}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-500 text-sm">
                ...dan masih banyak lagi sekolah lainnya yang telah bergabung
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* ═══════════════════════════════════════════════
            8. CTA SECTION (Enhanced)
            ═══════════════════════════════════════════════ */}
        <FadeInSection className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>

              {/* Content */}
              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-300 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  Bergabunglah dengan{" "}
                  <span className="text-yellow-300">Keluarga Bahagia</span>{" "}
                  TerDig!
                </h2>
                <p className="text-purple-100 text-lg mb-4 max-w-2xl mx-auto">
                  Berikan pengalaman belajar yang hangat dan terpantau untuk masa depan anak Anda bersama TerDig Academy.
                </p>
                <p className="text-purple-200 text-sm mb-10 max-w-xl mx-auto">
                  🌟 Tes Pemetaan Awal + 1x Trial Class gratis • 🎯 Kelas kecil maks 5–8 anak • 📊 Laporan progress via WhatsApp setiap 2 minggu
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse hover:animate-none"
                    onClick={() => navigate("/daftar")}
                  >
                    Daftar Sekarang
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/80 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-bold text-base"
                    onClick={() =>
                      window.open(
                        "https://wa.me/62895339329650?text=Halo%20TerDig%20Academy!%20Saya%20tertarik%20dengan%20program%20bimbel%20akademik%20dan%20ingin%20tahu%20lebih%20lanjut.",
                        "_blank"
                      )
                    }
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </>
  );
}
