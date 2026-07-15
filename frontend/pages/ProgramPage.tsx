import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Sparkles, GraduationCap, Check, ArrowRight } from "lucide-react";
import { ProgramSection } from "../components/ProgramSection";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProgramPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Program - TerDig Academy</title>
        <meta
          name="description"
          content="Program Bimbel Calistung TK/PAUD, Bimbel SD, dan Kelas Prompting AI untuk anak. Persiapkan masa depan anak dengan TerDig Academy."
        />
      </Helmet>

      {/* Program Reguler: Calistung & Bimbel SD */}
      <ProgramSection />

      {/* ═══════════════════════════════════════════════
          Program Unggulan AI Section
          ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-5 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-violet-500 rounded-full opacity-5 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full opacity-5 blur-3xl animate-pulse delay-2000" />

          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="ai-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#ai-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-yellow-300" />
              Program Unggulan AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kelas{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Prompting AI
              </span>{" "}
              untuk Anak
            </h2>
            <p className="text-lg text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
              Persiapkan anak menghadapi era AI dengan kemampuan prompting yang tepat —
              dari siswa SD hingga tenaga pendidik.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: Untuk Anak */}
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Prompting untuk Anak
                  </h3>
                  <p className="text-purple-200/60 text-sm">Kelas 4-6 SD (10-12 tahun)</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Belajar berkomunikasi dengan AI secara efektif",
                  "Mengembangkan kreativitas & critical thinking",
                  "Project-based learning dengan AI tools",
                  "Skill masa depan yang essential",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/daftar")}
                className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-lg"
              >
                Daftar Kelas Prompting
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>

            {/* Card 2: Untuk Guru */}
            <Card className="p-8 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Kelas AI untuk Guru & Orang Tua
                  </h3>
                  <p className="text-purple-200/60 text-sm">Guru & Tenaga Pendidik</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "Workshop prompting untuk pendidik",
                  "Cara integrasi AI dalam pembelajaran",
                  "Pendampingan implementasi AI",
                  "Sertifikat kompetensi AI",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate("/daftar")}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold shadow-lg"
              >
                Daftar Workshop
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </div>

          {/* Bottom tagline */}
          <div className="text-center mt-12">
            <p className="text-purple-200/60 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300/70" />
              Didukung oleh teknologi AI terkini untuk pengalaman belajar masa depan
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
