import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, Users, Brain, Trophy, Clock, Star, ArrowRight, Gamepad2, Heart, Zap, Bot, Target, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Paket TK/PAUD",
    description: "Program belajar menyenangkan untuk anak usia 3-6 tahun",
    price: "Rp 149.000",
    period: "/bulan",
    features: [
      "Video pembelajaran interaktif dengan animasi",
      "Permainan edukatif untuk motorik halus",
      "Pengenalan huruf, angka, dan warna",
      "Cerita dongeng dan lagu anak",
      "Aktivitas mewarnai dan menggambar",
      "Laporan perkembangan untuk orang tua"
    ],
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    popular: false,
    ageGroup: "3-6 tahun"
  },
  {
    id: 2,
    title: "Paket SD Kelas 1-3",
    description: "Fondasi pembelajaran yang kuat untuk kelas awal SD",
    price: "Rp 199.000",
    period: "/bulan",
    features: [
      "Video pembelajaran sesuai kurikulum SD",
      "Latihan soal dengan gambar menarik",
      "Belajar membaca, menulis, dan berhitung",
      "Permainan edukatif interaktif",
      "Konsultasi dengan guru berpengalaman",
      "Progress tracking untuk orang tua"
    ],
    icon: BookOpen,
    gradient: "from-blue-500 to-purple-600",
    popular: true,
    ageGroup: "6-9 tahun"
  },
  {
    id: 3,
    title: "Paket SD Kelas 4-6",
    description: "Persiapan menuju jenjang yang lebih tinggi",
    price: "Rp 249.000",
    period: "/bulan",
    features: [
      "Materi lengkap semua mata pelajaran SD",
      "Latihan soal persiapan ujian sekolah",
      "Video eksperimen sains sederhana",
      "Bimbingan tugas dan PR",
      "Live class dengan guru profesional",
      "Simulasi ujian dan tryout"
    ],
    icon: Trophy,
    gradient: "from-green-500 to-teal-600",
    popular: false,
    ageGroup: "9-12 tahun"
  },
  {
    id: 4,
    title: "Paket Prompting AI",
    description: "Belajar berkomunikasi efektif dengan AI untuk anak",
    price: "Rp 299.000",
    period: "/bulan",
    features: [
      "Pengenalan AI yang ramah untuk anak",
      "Teknik bertanya yang tepat kepada AI",
      "Cara membuat prompt yang jelas dan efektif",
      "Etika dan keamanan dalam menggunakan AI",
      "Praktik langsung dengan AI tutor",
      "Proyek kreatif menggunakan AI"
    ],
    icon: Bot,
    gradient: "from-purple-500 to-indigo-600",
    popular: false,
    ageGroup: "8-12 tahun",
    isNew: true
  },
  {
    id: 5,
    title: "Trik Belajar Cepat dengan AI",
    description: "Metode pembelajaran super efektif dengan bantuan AI",
    price: "Rp 349.000",
    period: "/bulan",
    features: [
      "Strategi belajar personal dengan AI",
      "Teknik mengingat cepat dengan AI",
      "Cara membuat ringkasan otomatis",
      "AI sebagai tutor personal 24/7",
      "Analisis gaya belajar dengan AI",
      "Optimasi waktu belajar dengan AI"
    ],
    icon: Zap,
    gradient: "from-orange-500 to-red-600",
    popular: false,
    ageGroup: "10-12 tahun",
    isNew: true
  }
];

const learningModes = [
  {
    icon: Video,
    title: "Video Interaktif",
    description: "Pembelajaran melalui video animasi yang menarik dan mudah dipahami anak"
  },
  {
    icon: Gamepad2,
    title: "Game Edukatif",
    description: "Belajar sambil bermain dengan game yang dirancang khusus untuk anak"
  },
  {
    icon: Users,
    title: "Live Class",
    description: "Kelas langsung dengan guru berpengalaman dan interaksi real-time"
  },
  {
    icon: Bot,
    title: "AI Tutor",
    description: "Bimbingan personal 24/7 dari AI yang ramah dan sabar untuk anak"
  },
  {
    icon: Target,
    title: "Adaptive Learning",
    description: "Pembelajaran yang menyesuaikan dengan kecepatan dan gaya belajar anak"
  },
  {
    icon: Lightbulb,
    title: "Project Based",
    description: "Belajar melalui proyek nyata yang mengembangkan kreativitas anak"
  }
];

export function ProductsSection() {
  const navigate = useNavigate();

  const handleSelectPackage = () => {
    navigate("/paket-lengkap");
  };

  const handleConsultation = () => {
    navigate("/konsultasi-gratis");
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto mobile-padding">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            Paket Pembelajaran Anak
          </Badge>
          <h2 className="responsive-heading font-bold text-gray-900 mb-4 sm:mb-6">
            Pilih Paket Sesuai
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Usia Anak</span>
          </h2>
          <p className="responsive-text text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Program pembelajaran yang dirancang khusus sesuai tahap perkembangan anak, 
            dari TK/PAUD hingga SD kelas 6 dengan metode yang menyenangkan dan teknologi AI terdepan.
          </p>
        </div>

        {/* Learning Modes */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Mode Pembelajaran</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Berbagai cara belajar yang menyenangkan dan efektif untuk anak
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 responsive-gap mb-8 sm:mb-12">
            {learningModes.map((mode, index) => {
              const IconComponent = mode.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-target">
                  <CardContent className="p-3 sm:p-4 md:p-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-xs sm:text-sm">{mode.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed hidden sm:block">{mode.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="responsive-grid-1-2-3 responsive-gap max-w-7xl mx-auto">
          {products.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card 
                key={product.id} 
                className={`relative overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 touch-target ${
                  product.popular ? 'border-blue-500 shadow-xl scale-[1.02] sm:scale-105' : 'border-gray-200'
                }`}
              >
                {product.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">
                    Terpopuler
                  </div>
                )}
                
                {product.isNew && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">
                    Baru!
                  </div>
                )}
                
                <CardHeader className="text-center pb-3 sm:pb-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{product.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600">{product.description}</CardDescription>
                  <Badge className="mx-auto bg-yellow-100 text-yellow-700 mt-2 text-xs sm:text-sm">
                    {product.ageGroup}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{product.price}</span>
                      <span className="text-sm sm:text-base text-gray-600 ml-1">{product.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 sm:space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    onClick={handleSelectPackage}
                    className={`w-full py-2.5 sm:py-3 font-semibold text-sm sm:text-base md:text-lg rounded-xl transition-all duration-300 group touch-target ${
                      product.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                        : product.isNew
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    Pilih Paket
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
            Masih bingung memilih paket yang tepat untuk anak? Konsultasikan dengan tim kami
          </p>
          <Button 
            onClick={handleConsultation}
            variant="outline" 
            size="lg" 
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base touch-target"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Konsultasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
