import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const programs = [
  {
    id: "calistung",
    badge: "Fase Fondasi",
    title: "Program Calistung TerDig",
    description:
      "Persiapan matang memasuki SD dengan metode bermain sambil belajar. Fokus pada Membaca, Menulis, dan Berhitung (Calistung) yang menyenangkan, serta pengenalan konsep dasar dan motorik.",
    icon: BookOpen,
    gradient: "from-orange-500 to-pink-500",
    badgeColor: "bg-orange-100 text-orange-800",
    ageGroup: "TK/PAUD (3-6 tahun)",
    btnText: "Daftar Calistung",
    features: [
      "Metode Fun Learning & Game-based",
      "Kelas kecil (maks 5–8 anak)",
      "Laporan perkembangan via WhatsApp setiap 2 minggu",
    ],
  },
  {
    id: "bimbel-sd",
    badge: "Fase A, B, & C",
    title: "Bimbel Akademik TerDig",
    isPopular: true,
    description:
      "Pendampingan belajar komprehensif untuk siswa SD Kelas 1-6. Memperkuat pemahaman konsep, persiapan ujian, dan kebiasaan belajar mandiri dibantu AI Tutor.",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-purple-600",
    badgeColor: "bg-indigo-100 text-indigo-800",
    ageGroup: "SD Kelas 1-6 (6-12 tahun)",
    btnText: "Daftar Bimbel SD",
    features: [
      "Kurikulum disesuaikan dengan Fase A/B/C",
      "Bimbingan PR dan Persiapan Ujian",
      "AI Tutor Pribadi & Rapor via WhatsApp",
    ],
  },
];

export function ProgramSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-orange-100 to-purple-100 text-indigo-700">
            Program Unggulan TerDig
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pilih{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Program
            </span>{" "}
            Sesuai Tahapan Belajar
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dari Calistung untuk TK/PAUD hingga pendampingan akademik untuk SD
            — semua didukung metode belajar modern dan AI Tutor pribadi.
          </p>
        </div>

        {/* Program Cards — Grid 2 kolom */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <Card
                key={program.id}
                className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border h-full flex flex-col ${
                  program.isPopular ? 'border-indigo-300 ring-2 ring-indigo-200' : 'border-gray-200'
                }`}
              >
                {/* Popular badge */}
                {program.isPopular && (
                  <div className="absolute top-4 right-4 z-20">
                    <Badge className="bg-amber-400 text-amber-900 border-0 shadow-md flex items-center gap-1 px-3 py-1">
                      <Star className="w-3 h-3 fill-amber-900" />
                      Paling Populer
                    </Badge>
                  </div>
                )}

                {/* Gradient top bar */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${program.gradient}`}
                />

                <CardHeader className="text-center pb-3">
                  {/* Badge */}
                  <Badge
                    className={`self-center mb-3 ${program.badgeColor} border-0`}
                  >
                    {program.badge}
                  </Badge>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${program.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-xl font-bold">
                    {program.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {program.description}
                  </CardDescription>
                  <Badge className="mt-3 bg-indigo-100 text-indigo-700">
                    {program.ageGroup}
                  </Badge>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <ul className="mt-2 space-y-3 text-sm text-gray-700 flex-1">
                    {program.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-2 h-2 mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => navigate("/daftar")}
                    className={`mt-6 w-full bg-gradient-to-r ${program.gradient} hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300 text-white font-bold`}
                  >
                    {program.btnText}{" "}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>


      </div>
    </section>
  );
}