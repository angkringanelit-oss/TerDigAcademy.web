import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Heart, ThumbsUp, Users, Trophy } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

const testimonials = [
  {
    id: 1,
    name: "Ibu Sarah",
    child: "Anya (8 tahun)",
    program: "Sanggar Seni Digital",
    rating: 5,
    content: "Anya sekarang sangat excited buat belajar seni digital! Dia yang dulu cuma suka coret-coret di kertas, sekarang bisa bikin digital art yang amazing. Quen Chlid benar-benar jadi teman belajar yang menyenangkan untuk dia.",
    achievement: "Juara 1 Lomba Seni Digital Anak",
    date: "2 bulan yang lalu",
    image: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Bapak Rudi",
    child: "Budi (10 tahun)",
    program: "Bimbel TerDig",
    rating: 5,
    content: "Matematika Budi naik drastis dari 65 ke 92! Metode belajar di TerDig Academy benar-benar efektif. Star Kids membuat belajar jadi fun, anak jadi tidak takut lagi sama pelajaran matematika.",
    achievement: "Ranking 1 di kelas",
    date: "1 bulan yang lalu", 
    image: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Ibu Devi",
    child: "Citra (16 tahun)",
    program: "AI Art & Advanced",
    rating: 5,
    content: "Program AI Art di TerDig Academy luar biasa! Citra yang dulu hanya suka menggambar manual, sekarang mahir menggunakan AI untuk create artwork yang stunning. Dia bahkan sudah dapat job freelance!",
    achievement: "Finalist Kompetisi AI Art Nasional",
    date: "3 minggu yang lalu",
    image: "/api/placeholder/60/60"
  },
  {
    id: 4,
    name: "Ibu Linda",
    child: "Doni (12 tahun)",
    program: "Bimbel TerDig SMP",
    rating: 5,
    content: "Doni sekarang sangat percaya diri dengan pelajaran IPA. Eksperimen-eksperimen yang diajarkan sangat menarik dan mudah dipahami. Gurunya juga sabar dan supportive banget.",
    achievement: "Best Science Project",
    date: "2 minggu yang lalu",
    image: "/api/placeholder/60/60"
  },
  {
    id: 5,
    name: "Bapak Eko",
    child: "Farah (14 tahun)",
    program: "Desain Grafis SMP",
    rating: 5,
    content: "Farah sekarang bisa bikin poster dan logo sendiri! Skill desain grafinya berkembang pesat sejak ikut program di Sanggar Seni Digital. Quen Chlid memberikan inspirasi dan motivasi yang luar biasa.",
    achievement: "Portfolio terbaik di kelasnya",
    date: "1 minggu yang lalu",
    image: "/api/placeholder/60/60"
  },
  {
    id: 6,
    name: "Ibu Ani",
    child: "Gita (6 tahun)",
    program: "TK/PAUD",
    rating: 5,
    content: "Gita jadi semangat banget belajar huruf dan angka! Metode pembelajaran yang fun dan interaktif membuat dia cepat bisa baca tulis. Star Kids jadi teman favoritnya sekarang.",
    achievement: "Lulus TK dengan nilai terbaik",
    date: "1 bulan yang lalu",
    image: "/api/placeholder/60/60"
  }
];

const stats = [
  {
    icon: Users,
    number: "1000+",
    label: "Orang Tua Puas",
    color: "text-blue-600"
  },
  {
    icon: Star,
    number: "4.9/5",
    label: "Rating Rata-rata",
    color: "text-yellow-500"
  },
  {
    icon: Trophy,
    number: "95%",
    label: "Peningkatan Prestasi",
    color: "text-green-600"
  },
  {
    icon: Heart,
    number: "98%",
    label: "Recommend ke Teman",
    color: "text-pink-500"
  }
];

export function TestimonialsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700">
            Testimoni Orang Tua & Siswa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cerita
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Sukses </span>
            Keluarga
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> TerDig</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dengarkan pengalaman luar biasa orang tua dan anak-anak yang telah bergabung dengan TerDig Academy
          </p>
        </div>

        {/* Mascots */}
        <div className="flex justify-center items-center gap-12 mb-16">
          <div className="text-center">
            <Mascot 
              src={starKidsMascot}
              alt="Star Kids"
              size="md"
              animation="float"
              className="mx-auto mb-3"
            />
            <p className="text-sm text-blue-600 font-medium">Teman Belajar Akademik</p>
          </div>
          <div className="text-4xl text-gray-300">❤️</div>
          <div className="text-center">
            <Mascot 
              src={queenChildMascot}
              alt="Quen Chlid"
              size="md"
              animation="bounce"
              className="mx-auto mb-3"
            />
            <p className="text-sm text-green-600 font-medium">Teman Berkarya Kreatif</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-blue-200" />
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-purple-600 font-medium">
                      Orang tua {testimonial.child}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">{testimonial.date}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="space-y-2">
                  <Badge className={`${
                    testimonial.program.includes("Sanggar") 
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {testimonial.program}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {testimonial.achievement}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Helpful</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Verified Parent
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Orang Tua Memilih TerDig Academy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dua pilar pendidikan yang memberikan hasil nyata untuk masa depan anak
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Prestasi Akademik dengan Star Kids
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Metode pembelajaran yang menyenangkan dan efektif</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Peningkatan nilai rata-rata 20-30 poin</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Guru berpengalaman dan bersertifikat</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Kreativitas Digital dengan Quen Chlid
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Program seni digital yang inovatif dan modern</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Anak-anak menjadi juara dalam berbagai kompetisi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Mempersiapkan skill untuk masa depan digital</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Bergabunglah dengan Keluarga Bahagia TerDig!</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Lebih dari 1000 orang tua telah mempercayai TerDig Academy untuk masa depan anak mereka. 
            Saatnya giliran Anda!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              onClick={() => navigate("/konsultasi-gratis")}
            >
              Konsultasi Gratis
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl font-semibold"
              onClick={() => navigate("/#programs")}
            >
              Lihat Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}