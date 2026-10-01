import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MessageCircle, Sparkles } from "lucide-react";

const keunggulanData = [
  {
    icon: GraduationCap,
    title: "Tutor Profesional & Bersertifikat",
    description:
      "Pengajar berpengalaman dengan pemahaman mendalam tentang kurikulum SD dan psikologi perkembangan anak.",
    gradient: "from-blue-500 to-purple-600",
    delay: "0",
  },
  {
    icon: MessageCircle,
    title: "Laporan Progress via WhatsApp",
    description:
      "Orang tua menerima laporan perkembangan anak secara berkala via WhatsApp setiap 2 minggu.",
    gradient: "from-green-500 to-teal-500",
    delay: "150",
  },
  {
    icon: Sparkles,
    title: "AI Tutor Pribadi 24/7",
    description:
      "Asisten AI yang siap membantu pertanyaan pelajaran kapan saja, dengan materi sesuai kurikulum SD.",
    gradient: "from-purple-500 to-pink-500",
    delay: "300",
  },
];

export function KeunggulanSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Mengapa{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              TerDig Academy
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami menggabungkan pendekatan akademik modern dengan teknologi AI
            untuk memberikan pengalaman belajar terbaik bagi putra-putri Anda.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {keunggulanData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Gradient top bar */}
                <div
                  className={`h-2 w-full bg-gradient-to-r ${item.gradient}`}
                />

                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
