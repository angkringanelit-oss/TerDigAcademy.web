import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, Video, Users, Brain, Trophy, Clock, Star, ArrowRight, 
  Gamepad2, Heart, Zap, Bot, Target, Lightbulb, Palette, Camera, 
  Brush, Monitor, Smartphone, Headphones, Music, Film
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "./Mascot";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import quenChlidMascot from "../assets/Quen Child.png";

const academicPrograms = [
  {
    id: 1,
    title: "TK/PAUD",
    description: "Fondasi calistung dengan pendekatan bermain",
    price: "Rp 149.000",
    period: "/bulan",
    features: [
      "Pengenalan huruf A-Z dengan animasi",
      "Belajar angka 1-20 melalui permainan",
      "Latihan menulis dan motorik halus", 
      "Cerita dongeng edukatif",
      "Aktivitas mewarnai interaktif",
      "Laporan perkembangan mingguan"
    ],
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    ageGroup: "3-6 tahun",
    popular: false
  },
  {
    id: 2,
    title: "SD Kelas 1-6",
    description: "Akademik dasar dengan metode fun learning",
    price: "Rp 199.000", 
    period: "/bulan",
    features: [
      "Matematika dasar dengan visual menarik",
      "Bahasa Indonesia: membaca & menulis",
      "IPA sederhana dengan eksperimen",
      "Bahasa Inggris dasar",
      "Konsultasi guru berpengalaman",
      "Tugas interaktif harian"
    ],
    icon: BookOpen,
    gradient: "from-blue-500 to-purple-600",
    ageGroup: "6-12 tahun",
    popular: true
  },
  {
    id: 3,
    title: "SMP Kelas 7-9",
    description: "Persiapan ujian dengan AI support",
    price: "Rp 249.000",
    period: "/bulan", 
    features: [
      "Matematika tingkat SMP",
      "IPA (Fisika, Kimia, Biologi)",
      "Bahasa Indonesia & Inggris",
      "IPS (Sejarah, Geografi)",
      "Try out rutin & analisis",
      "Bimbingan persiapan UN"
    ],
    icon: Trophy,
    gradient: "from-green-500 to-teal-600",
    ageGroup: "12-15 tahun",
    popular: false
  },
  {
    id: 4,
    title: "Prompting AI",
    description: "Menguasai seni berkomunikasi dengan AI",
    price: "Rp 179.000",
    period: "/bulan",
    features: [
      "Dasar-dasar prompt engineering",
      "Teknik prompt yang efektif",
      "Menggunakan ChatGPT untuk belajar",
      "AI tools untuk produktivitas",
      "Etika penggunaan AI dalam belajar",
      "Project praktik dengan AI assistant"
    ],
    icon: Bot,
    gradient: "from-cyan-500 to-blue-600",
    ageGroup: "10-18 tahun",
    popular: false,
    isNew: true
  },
  {
    id: 5,
    title: "Kelas Trik Belajar cepat dengan AI",
    description: "Strategi belajar modern dengan bantuan AI",
    price: "Rp 199.000",
    period: "/bulan",
    features: [
      "Teknik speed learning dengan AI",
      "AI untuk membuat catatan otomatis",
      "Quiz generator dengan ChatGPT",
      "Mind mapping dengan AI tools",
      "Personalisasi gaya belajar dengan AI",
      "Time management & study planner AI"
    ],
    icon: Lightbulb,
    gradient: "from-yellow-500 to-orange-600",
    ageGroup: "12-18 tahun",
    popular: false,
    isNew: true
  }
];

const creativePrograms = [
  {
    id: 1,
    title: "Seni Digital TK-SD",
    description: "Kreativitas dasar dengan teknologi digital",
    price: "Rp 179.000",
    period: "/bulan",
    features: [
      "Mewarnai digital dengan tablet",
      "Menggambar sederhana digital",
      "Pengenalan warna & bentuk",
      "Story telling dengan gambar",
      "Animasi sederhana",
      "Gallery karya anak online"
    ],
    icon: Palette,
    gradient: "from-yellow-400 to-orange-500",
    ageGroup: "5-12 tahun",
    popular: true
  },
  {
    id: 2,
    title: "Desain Grafis SMP",
    description: "Fundamental desain & digital art",
    price: "Rp 229.000",
    period: "/bulan",
    features: [
      "Adobe Photoshop dasar",
      "Illustrator untuk pemula",
      "Typography & layout design",
      "Digital painting teknik",
      "Logo design sederhana",
      "Portfolio digital"
    ],
    icon: Monitor,
    gradient: "from-purple-500 to-indigo-600",
    ageGroup: "12-15 tahun",
    popular: false
  },
  {
    id: 3,
    title: "AI Art & Advanced SMA",
    description: "Seni digital tingkat lanjut dengan AI",
    price: "Rp 299.000",
    period: "/bulan",
    features: [
      "AI image generation tools",
      "Advanced digital painting",
      "Motion graphics dasar",
      "3D modeling introduction",
      "Brand identity design",
      "Portofolio profesional"
    ],
    icon: Bot,
    gradient: "from-cyan-500 to-blue-600",
    ageGroup: "15-18 tahun",
    popular: false,
    isNew: true
  },
  {
    id: 4,
    title: "Video & Multimedia",
    description: "Produksi konten kreatif digital",
    price: "Rp 259.000",
    period: "/bulan",
    features: [
      "Video editing dengan Premiere",
      "After Effects animation",
      "Photography basics",
      "Sound design dasar",
      "Social media content",
      "Youtube channel creation"
    ],
    icon: Film,
    gradient: "from-red-500 to-pink-600",
    ageGroup: "13-18 tahun",
    popular: false
  }
];

interface ProgramSectionProps {
  initialTab?: string | null;
}

export function ProgramSection({ initialTab }: ProgramSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("academic");
  const navigate = useNavigate();

  // Set initial tab if provided
  useEffect(() => {
    if (initialTab && (initialTab === "academic" || initialTab === "creative")) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleSelectProgram = (type: string) => {
    navigate(`/konsultasi-gratis?program=${type}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 hover:from-yellow-200 hover:to-green-200">
            Dua Pilar TerDig Academy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pilih Jalur
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Akademik </span>
            atau
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> Kreatif</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            TerDig Academy menawarkan dua jalur pembelajaran yang dapat dipilih sesuai minat dan bakat anak. 
            Bimbel TerDig untuk prestasi akademik dan Sanggar Seni Digital untuk mengasah kreativitas.
          </p>
        </div>

        {/* Mascot Guides */}
        <div className="flex justify-center items-center gap-12 mb-12">
          <div className="text-center group">
            <Mascot 
              src={starKidsMascot}
              alt="Star Kids"
              size="md"
              animation="float"
              className="mx-auto mb-3 group-hover:scale-110 transition-transform"
            />
            <h3 className="font-bold text-blue-600">Star Kids</h3>
            <p className="text-sm text-gray-600">Teman Belajar Akademik</p>
          </div>
          <div className="text-4xl text-gray-300">+</div>
          <div className="text-center group">
            <Mascot 
              src={quenChlidMascot}
              alt="Quen Chlid"
              size="md"
              animation="float"
              className="mx-auto mb-3 group-hover:scale-110 transition-transform"
            />
            <h3 className="font-bold text-green-600">Quen Chlid</h3>
            <p className="text-sm text-gray-600">Teman Berkarya Kreatif</p>
          </div>
        </div>

        {/* Program Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 h-14">
            <TabsTrigger 
              value="academic" 
              className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BookOpen className="w-5 h-5" />
              Bimbel TerDig
            </TabsTrigger>
            <TabsTrigger 
              value="creative"
              className="flex items-center gap-2 text-lg font-semibold data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Palette className="w-5 h-5" />
              Sanggar Seni Digital
            </TabsTrigger>
          </TabsList>

          {/* Academic Programs Tab */}
          <TabsContent value="academic" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-2">🎓 Jalur Akademik - Bimbel TerDig</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Program bimbingan belajar komprehensif dari TK/PAUD hingga SMP dengan metode pembelajaran yang menyenangkan. Dilengkapi dengan kelas AI modern untuk mempersiapkan masa depan digital.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academicPrograms.map((program) => {
                const IconComponent = program.icon;
                return (
                  <Card 
                    key={program.id}
                    className={`relative overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                      program.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'
                    }`}
                  >
                    {program.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
                        Terpopuler
                      </div>
                    )}
                    
                    {program.isNew && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold">
                        Baru!
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${program.gradient} flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{program.title}</CardTitle>
                      <CardDescription className="text-gray-600">{program.description}</CardDescription>
                      <Badge className="mx-auto bg-blue-100 text-blue-700 mt-2">
                        {program.ageGroup}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-gray-900">{program.price}</span>
                          <span className="text-gray-600 ml-1">{program.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        onClick={() => handleSelectProgram("academic")}
                        className={`w-full py-3 font-semibold text-lg rounded-xl transition-all duration-300 group ${
                          program.popular 
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                            : program.isNew
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        Pilih Program
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Creative Programs Tab */}
          <TabsContent value="creative" className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-green-700 mb-2">🎨 Jalur Kreatif - Sanggar Seni Digital</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Program kreativitas digital dari TK hingga SMA untuk mengembangkan bakat seni dan teknologi anak
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {creativePrograms.map((program) => {
                const IconComponent = program.icon;
                return (
                  <Card 
                    key={program.id}
                    className={`relative overflow-hidden border-2 hover:border-green-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                      program.popular ? 'border-green-500 shadow-xl scale-105' : 'border-gray-200'
                    }`}
                  >
                    {program.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 text-sm font-semibold">
                        Terpopuler
                      </div>
                    )}
                    
                    {program.isNew && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold">
                        Baru!
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${program.gradient} flex items-center justify-center`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">{program.title}</CardTitle>
                      <CardDescription className="text-gray-600">{program.description}</CardDescription>
                      <Badge className="mx-auto bg-green-100 text-green-700 mt-2">
                        {program.ageGroup}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="flex items-baseline justify-center">
                          <span className="text-4xl font-bold text-gray-900">{program.price}</span>
                          <span className="text-gray-600 ml-1">{program.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {program.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        onClick={() => handleSelectProgram("creative")}
                        className={`w-full py-3 font-semibold text-lg rounded-xl transition-all duration-300 group ${
                          program.popular 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl' 
                            : program.isNew
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gradient-to-r from-yellow-400 to-green-500 hover:from-yellow-500 hover:to-green-600 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        Pilih Program
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Masih bingung memilih program yang tepat untuk anak? Konsultasikan dengan tim kami
          </p>
          <Button 
            onClick={() => navigate("/konsultasi-gratis")}
            variant="outline" 
            size="lg" 
            className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold"
          >
            <Users className="w-5 h-5 mr-2" />
            Konsultasi Gratis
          </Button>
        </div>
      </div>
    </section>
  );
}