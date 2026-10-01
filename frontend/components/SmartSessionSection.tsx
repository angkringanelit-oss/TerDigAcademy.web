import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Film,
  Search,
  Bot,
  CheckCircle2,
  MessageCircle,
  Mail,
  Clock,
  Wallet,
} from "lucide-react";

const activities = [
  {
    icon: Film,
    title: "Film Animasi Interaktif",
    description:
      "Anak menonton dan terlibat dalam petualangan \u201CStar, Quen, dan Misteri Monster Layar\u201D \u2014 kisah seru tentang menggunakan gawai dengan bijak.",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    icon: Search,
    title: "Aktivitas Detektif Cilik",
    description:
      "Anak bergerak aktif memecahkan misi dan petunjuk di sekitar ruangan, melatih keberanian, kerja sama, dan fokus tanpa layar.",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    icon: Bot,
    title: "Demo Langsung QuenBot AI",
    description:
      "Anak menyaksikan dan mencoba bertanya langsung kepada QuenBot, asisten AI ramah anak dari TerDig, dipandu fasilitator di depan kelas.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const points = [
  {
    icon: Clock,
    text: "Durasi menyesuaikan jenjang: TK/PAUD \u00B140 menit dan SD \u00B175 menit.",
  },
  {
    icon: Wallet,
    text: "Kontribusi Rp15.000 per anak, dibayar orang tua langsung ke TerDig Academy via QRIS/transfer \u2014 sekolah tidak mengurus pembayaran maupun SPJ.",
  },
  {
    icon: CheckCircle2,
    text: "Seluruh peralatan kegiatan (proyektor, layar, dan perangkat suara) dibawa dan disiapkan oleh tim TerDig.",
  },
  {
    icon: CheckCircle2,
    text: "Partisipasi bersifat sukarela; anak yang tidak ikut tetap belajar bersama guru kelas seperti biasa.",
  },
  {
    icon: CheckCircle2,
    text: "Setiap anak pulang membawa Sertifikat Detektif Cilik dan voucher Tes Pemetaan Awal + 1x Trial Class gratis.",
  },
];

const WA_PROPOSAL_URL =
  "https://wa.me/62895339329650?text=Halo%20TerDig%20Academy%2C%20saya%20dari%20sekolah%2Fkomunitas%20ingin%20meminta%20Proposal%20Kerjasama%20TerDig%20Smart%20Session.";

export function SmartSessionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-emerald-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-16 w-36 h-36 bg-teal-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-16 right-16 w-28 h-28 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800">
            Program Kemitraan Sekolah
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              Sekolah &amp; Komunitas
            </span>
          </h2>
          <p className="text-xl font-semibold text-gray-800 max-w-3xl mx-auto mb-4">
            TerDig Smart Session — “Bijak Berteknologi: dari Penonton Pasif
            menjadi Kreator Aktif”
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sesi edukasi interaktif yang kami bawa langsung ke sekolah Anda:
            anak belajar membatasi gawai dan berani berkreasi, tanpa sekolah
            perlu menyiapkan peralatan atau mengurus administrasi pembayaran.
          </p>
        </div>

        {/* Activities */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-14">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <Card
                key={index}
                className="border-2 border-transparent hover:border-teal-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${activity.gradient} flex items-center justify-center`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Details + CTA */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Detail Pelaksanaan */}
          <Card className="bg-white border-2 border-teal-100">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                Detail Pelaksanaan
              </h3>
              <ul className="space-y-4">
                {points.map((point, index) => {
                  const IconComponent = point.icon;
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <IconComponent className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 leading-relaxed">
                        {point.text}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 p-6 sm:p-8 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full" />
            <div className="absolute -bottom-12 -left-8 w-36 h-36 bg-white opacity-10 rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">
                Hadirkan Smart Session di Sekolah Anda
              </h3>
              <p className="text-white/85 mb-8 leading-relaxed">
                Minta proposal kerjasama resmi kami — berisi rundown kegiatan,
                skema kontribusi, dan perlindungan data orang tua — lalu
                jadwalkan sesi perdananya bersama tim TerDig.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={WA_PROPOSAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white text-teal-700 font-bold px-6 py-3 shadow-lg hover:bg-teal-50 transition-all duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat WhatsApp
                </a>
                <a
                  href="mailto:terdig.official@gmail.com?subject=Permintaan%20Proposal%20Kerjasama%20TerDig%20Smart%20Session"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 text-white font-bold px-6 py-3 hover:bg-white/15 transition-all duration-200"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Minta Proposal Kerjasama
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
