import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const aiPrograms = [
  {
    id: "prompting-anak",
    badge: "Untuk Siswa SD",
    title: "Kelas Prompting untuk Anak",
    description:
      "Ajari anak berkomunikasi efektif dengan AI. Kembangkan kreativitas, literasi digital, dan kemampuan problem-solving sejak dini.",
    icon: Bot,
    gradient: "from-violet-500 to-purple-600",
    features: [
      "Teknik bertanya yang tepat kepada AI",
      "Membuat cerita & gambar dengan AI",
      "Etika dan keamanan digital",
      "Proyek kreatif mingguan",
      "Sertifikat kelulusan",
    ],
    ageGroup: "Kelas 4-6 SD (10-12 tahun)",
    btnText: "Daftar Kelas Prompting",
  },
  {
    id: "ai-guru",
    badge: "Untuk Pendidik",
    title: "Kelas AI untuk Guru",
    description:
      "Tingkatkan kualitas pengajaran dengan teknologi AI. Pelajari cara mengintegrasikan AI ke dalam kurikulum dan administrasi pembelajaran.",
    icon: Brain,
    gradient: "from-emerald-500 to-teal-600",
    features: [
      "Prompt engineering untuk materi ajar",
      "Otomatisasi administrasi guru",
      "AI untuk asesmen & evaluasi siswa",
      "Personalized learning dengan AI",
      "Komunitas praktisi AI pendidikan",
    ],
    ageGroup: "Guru & Tenaga Pendidik",
    btnText: "Daftar Kelas Guru",
  },
];

export function ProgramUnggulanAiSection() {
  const navigate = useNavigate();

  return (
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
            Kuasai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Teknologi AI
            </span>{" "}
            Sejak Dini
          </h2>
          <p className="text-lg text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
            Program eksklusif yang dirancang untuk mempersiapkan generasi
            melek AI — dari siswa SD hingga tenaga pendidik.
          </p>
        </div>

        {/* AI Program Cards — Grid 2 kolom */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {aiPrograms.map((program) => {
            const IconComponent = program.icon;
            return (
              <Card
                key={program.id}
                className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 h-full flex flex-col group"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                />

                {/* Gradient top bar */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${program.gradient}`}
                />

                <CardHeader className="text-center pb-3">
                  {/* Badge */}
                  <Badge
                    className={`self-center mb-3 bg-gradient-to-r ${program.gradient} text-white border-0`}
                  >
                    {program.badge}
                  </Badge>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${program.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-xl font-bold text-white">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-purple-200/70">
                    {program.description}
                  </CardDescription>
                  <Badge className="mt-3 bg-white/10 text-purple-200 border border-white/10">
                    {program.ageGroup}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <ul className="mt-2 space-y-3 text-sm text-purple-200/80 flex-1">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span
                          className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 bg-gradient-to-r ${program.gradient}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate("/daftar")}
                    className={`mt-6 w-full bg-gradient-to-r ${program.gradient} hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-bold group/btn`}
                  >
                    {program.btnText}{" "}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
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
  );
}
