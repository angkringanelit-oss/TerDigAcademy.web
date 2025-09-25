import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle, Star, Trophy, Users, BookOpen, Video, Brain, Clock, Gift, Crown, Zap, Heart, Gamepad2, Bot, Target, Lightbulb, Loader2, X } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { SuccessModal } from "../components/SuccessModal";
import { useRegistration } from "../hooks/useRegistration";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: "tk-paud",
    name: "TK/PAUD",
    price: "149.000",
    originalPrice: "199.000",
    period: "/bulan",
    description: "Program belajar menyenangkan untuk anak usia 3-6 tahun",
    icon: Heart,
    gradient: "from-pink-500 to-rose-500",
    ageGroup: "3-6 tahun",
    features: [
      "Video pembelajaran interaktif dengan animasi",
      "100+ Permainan edukatif untuk motorik halus",
      "Pengenalan huruf, angka, dan warna",
      "Cerita dongeng dan lagu anak",
      "Aktivitas mewarnai dan menggambar",
      "Laporan perkembangan untuk orang tua",
      "Konsultasi dengan guru PAUD",
      "Akses mobile app khusus anak"
    ]
  },
  {
    id: "sd-awal",
    name: "SD Kelas 1-3",
    price: "199.000",
    originalPrice: "299.000",
    period: "/bulan",
    description: "Fondasi pembelajaran yang kuat untuk kelas awal SD",
    icon: BookOpen,
    gradient: "from-blue-500 to-purple-500",
    popular: true,
    ageGroup: "6-9 tahun",
    features: [
      "Semua fitur TK/PAUD",
      "Video pembelajaran sesuai kurikulum SD",
      "1,000+ Latihan soal dengan gambar menarik",
      "Belajar membaca, menulis, dan berhitung",
      "200+ Permainan edukatif interaktif",
      "2x Live class per minggu",
      "Konsultasi dengan guru SD berpengalaman",
      "Progress tracking untuk orang tua",
      "Bimbingan PR dan tugas sekolah"
    ]
  },
  {
    id: "sd-atas",
    name: "SD Kelas 4-6",
    price: "249.000",
    originalPrice: "349.000",
    period: "/bulan",
    description: "Persiapan menuju jenjang yang lebih tinggi",
    icon: Trophy,
    gradient: "from-green-500 to-teal-500",
    ageGroup: "9-12 tahun",
    features: [
      "Semua fitur SD Kelas 1-3",
      "Materi lengkap semua mata pelajaran SD",
      "2,000+ Latihan soal persiapan ujian sekolah",
      "Video eksperimen sains sederhana",
      "3x Live class per minggu",
      "Bimbingan tugas dan PR intensif",
      "Simulasi ujian dan tryout",
      "Persiapan masuk SMP favorit",
      "Konsultasi akademik personal",
      "Sertifikat kelulusan"
    ]
  },
  {
    id: "prompting-ai",
    name: "Prompting AI",
    price: "299.000",
    originalPrice: "399.000",
    period: "/bulan",
    description: "Belajar berkomunikasi efektif dengan AI untuk anak",
    icon: Bot,
    gradient: "from-purple-500 to-indigo-500",
    ageGroup: "8-12 tahun",
    isNew: true,
    features: [
      "Pengenalan AI yang ramah untuk anak",
      "Teknik bertanya yang tepat kepada AI",
      "Cara membuat prompt yang jelas dan efektif",
      "Etika dan keamanan dalam menggunakan AI",
      "Praktik langsung dengan AI tutor",
      "Proyek kreatif menggunakan AI",
      "Workshop interaktif dengan AI",
      "Sertifikat AI Literacy untuk anak",
      "Panduan orang tua mendampingi anak dengan AI"
    ]
  },
  {
    id: "ai-learning",
    name: "Trik Belajar Cepat dengan AI",
    price: "349.000",
    originalPrice: "449.000",
    period: "/bulan",
    description: "Metode pembelajaran super efektif dengan bantuan AI",
    icon: Zap,
    gradient: "from-orange-500 to-red-500",
    ageGroup: "10-12 tahun",
    isNew: true,
    features: [
      "Strategi belajar personal dengan AI",
      "Teknik mengingat cepat dengan AI",
      "Cara membuat ringkasan otomatis",
      "AI sebagai tutor personal 24/7",
      "Analisis gaya belajar dengan AI",
      "Optimasi waktu belajar dengan AI",
      "Speed learning techniques",
      "Memory palace dengan AI",
      "Adaptive learning path",
      "Performance analytics real-time"
    ]
  }
];

const learningModes = [
  {
    icon: Video,
    title: "Video Interaktif",
    description: "Pembelajaran melalui video animasi yang menarik dan mudah dipahami anak",
    features: ["Animasi 3D", "Subtitle", "Kuis interaktif", "Replay unlimited"]
  },
  {
    icon: Gamepad2,
    title: "Game Edukatif",
    description: "Belajar sambil bermain dengan game yang dirancang khusus untuk anak",
    features: ["Level progresif", "Reward system", "Multiplayer", "Achievement badges"]
  },
  {
    icon: Users,
    title: "Live Class",
    description: "Kelas langsung dengan guru berpengalaman dan interaksi real-time",
    features: ["Kelas kecil", "Interaksi 2-arah", "Recording tersedia", "Q&A session"]
  },
  {
    icon: Bot,
    title: "AI Tutor",
    description: "Bimbingan personal 24/7 dari AI yang ramah dan sabar untuk anak",
    features: ["Respons instant", "Personalisasi", "Voice interaction", "Progress tracking"]
  },
  {
    icon: Target,
    title: "Adaptive Learning",
    description: "Pembelajaran yang menyesuaikan dengan kecepatan dan gaya belajar anak",
    features: ["Assessment otomatis", "Path personal", "Difficulty adjustment", "Smart recommendations"]
  },
  {
    icon: Lightbulb,
    title: "Project Based",
    description: "Belajar melalui proyek nyata yang mengembangkan kreativitas anak",
    features: ["Proyek kreatif", "Portfolio digital", "Peer collaboration", "Showcase platform"]
  }
];

const subjects = [
  { name: "Bahasa Indonesia", icon: "📚", videos: "500+", exercises: "1,000+", ageGroup: "all" },
  { name: "Matematika", icon: "🔢", videos: "600+", exercises: "1,200+", ageGroup: "all" },
  { name: "Bahasa Inggris", icon: "🌍", videos: "400+", exercises: "800+", ageGroup: "all" },
  { name: "IPA/Sains", icon: "🔬", videos: "300+", exercises: "600+", ageGroup: "sd" },
  { name: "IPS", icon: "🌏", videos: "250+", exercises: "500+", ageGroup: "sd" },
  { name: "Seni & Kreativitas", icon: "🎨", videos: "200+", exercises: "400+", ageGroup: "all" },
  { name: "Pendidikan Karakter", icon: "❤️", videos: "150+", exercises: "300+", ageGroup: "all" },
  { name: "Motorik & Gerak", icon: "🤸", videos: "100+", exercises: "200+", ageGroup: "tk" },
  { name: "AI & Teknologi", icon: "🤖", videos: "200+", exercises: "400+", ageGroup: "ai" },
  { name: "Critical Thinking", icon: "🧠", videos: "180+", exercises: "350+", ageGroup: "ai" }
];

const testimonials = [
  {
    name: "Ibu Sarah Dewi",
    grade: "Orang Tua Anak TK B",
    content: "Anak saya jadi lebih semangat belajar! Video-videonya lucu dan mudah dipahami. Sekarang dia sudah bisa mengenal huruf dan angka dengan baik.",
    rating: 5,
    achievement: "Anak lancar membaca"
  },
  {
    name: "Bapak Ahmad Rizki",
    grade: "Orang Tua Anak SD Kelas 2",
    content: "Platform yang sangat membantu! Anak saya yang tadinya kesulitan matematika, sekarang jadi suka berhitung. Metode pembelajarannya benar-benar cocok untuk anak.",
    rating: 5,
    achievement: "Nilai matematika naik"
  },
  {
    name: "Ibu Maya Sari",
    grade: "Orang Tua Anak SD Kelas 5",
    content: "Persiapan ujian sekolah jadi lebih mudah dengan bank soal dan simulasi ujian. Anak saya jadi lebih percaya diri menghadapi ujian.",
    rating: 5,
    achievement: "Lulus dengan nilai bagus"
  },
  {
    name: "Bapak Doni Pratama",
    grade: "Orang Tua Anak SD Kelas 6",
    content: "Paket AI Learning sangat membantu anak saya belajar lebih efisien. Dia sekarang bisa belajar mandiri dengan bantuan AI tutor yang ramah.",
    rating: 5,
    achievement: "Belajar mandiri dengan AI"
  }
];

export function PaketLengkapPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerPackage, isLoading } = useRegistration();
  
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    email: "",
    phone: "",
    childAge: "",
    grade: "",
    agreeTerms: false
  });

  const getDiscountedPrice = (price: string) => {
    if (billingCycle === "yearly") {
      const monthlyPrice = parseInt(price.replace(".", ""));
      const yearlyPrice = monthlyPrice * 10; // 2 months free
      return yearlyPrice.toLocaleString("id-ID");
    }
    return price;
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowRegistrationForm(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.parentName || !formData.childName || !formData.email || !formData.phone || !formData.childAge || !formData.agreeTerms) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi dan setujui syarat & ketentuan",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPackage) {
      toast({
        title: "Paket Belum Dipilih",
        description: "Silakan pilih paket terlebih dahulu",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await registerPackage({
        parentName: formData.parentName,
        childName: formData.childName,
        email: formData.email,
        phone: formData.phone,
        childAge: formData.childAge,
        grade: formData.grade || undefined,
        packageType: selectedPackage,
        billingCycle
      });

      setSuccessData(response);
      setShowSuccessModal(true);
      setShowRegistrationForm(false);
      
      // Reset form
      setFormData({
        parentName: "",
        childName: "",
        email: "",
        phone: "",
        childAge: "",
        grade: "",
        agreeTerms: false
      });
      setSelectedPackage(null);

      toast({
        title: "Pendaftaran Paket Berhasil!",
        description: response.message,
      });
    } catch (error: any) {
      console.error("Package registration error:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar paket. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Paket Lengkap</h1>
              <p className="text-sm text-gray-600">Pilih paket yang sesuai dengan usia dan kebutuhan anak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Trophy className="w-4 h-4 mr-2" />
            Paket Pembelajaran Anak
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Investasi Terbaik untuk
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Masa Depan Anak</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Program pembelajaran yang dirancang khusus sesuai tahap perkembangan anak, 
            dari TK/PAUD hingga SD kelas 6 dengan metode yang menyenangkan dan teknologi AI terdepan.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingCycle === "monthly" ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
              Bulanan
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                billingCycle === "yearly" ? "bg-purple-600" : "bg-gray-300"
              }`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
              }`} />
            </button>
            <span className={`text-sm ${billingCycle === "yearly" ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
              Tahunan
            </span>
            {billingCycle === "yearly" && (
              <Badge className="bg-green-100 text-green-700">
                Hemat 2 Bulan!
              </Badge>
            )}
          </div>
        </div>

        {/* Learning Modes */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mode Pembelajaran
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai cara belajar yang menyenangkan dan efektif untuk anak
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learningModes.map((mode, index) => {
              const IconComponent = mode.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{mode.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{mode.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {mode.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card 
                key={pkg.id}
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  pkg.popular 
                    ? 'border-purple-500 shadow-xl scale-105' 
                    : selectedPackage === pkg.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-sm font-semibold">
                    Terpopuler
                  </div>
                )}
                
                {pkg.isNew && (
                  <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-sm font-semibold">
                    Baru!
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.gradient} flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-600">{pkg.description}</CardDescription>
                  <Badge className="mx-auto bg-yellow-100 text-yellow-700 mt-2">
                    {pkg.ageGroup}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-2 mb-2">
                      <span className="text-sm text-gray-500 line-through">Rp {pkg.originalPrice}</span>
                      <Badge className="bg-red-100 text-red-700">
                        {Math.round((1 - parseInt(pkg.price.replace(".", "")) / parseInt(pkg.originalPrice.replace(".", ""))) * 100)}% OFF
                      </Badge>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">Rp {getDiscountedPrice(pkg.price)}</span>
                      <span className="text-gray-600 ml-1">{billingCycle === "yearly" ? "/tahun" : pkg.period}</span>
                    </div>
                    {billingCycle === "yearly" && (
                      <p className="text-sm text-green-600 mt-1">
                        Setara Rp {Math.round(parseInt(getDiscountedPrice(pkg.price).replace(/\./g, "")) / 12).toLocaleString("id-ID")}/bulan
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageSelect(pkg.id);
                    }}
                    className={`w-full py-3 font-semibold text-lg rounded-xl transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl' 
                        : pkg.isNew
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl'
                        : selectedPackage === pkg.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {selectedPackage === pkg.id ? "Daftar Paket Ini" : "Pilih Paket"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Subjects Coverage */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mata Pelajaran yang Tersedia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kurikulum lengkap yang disesuaikan dengan tahap perkembangan anak
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{subject.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{subject.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{subject.videos} video</p>
                    <p>{subject.exercises} aktivitas</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Testimoni Orang Tua
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengar langsung dari orang tua yang telah merasakan manfaat program kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-purple-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic text-sm">"{testimonial.content}"</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600">{testimonial.grade}</p>
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {testimonial.achievement}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">
                  Siap Memberikan yang Terbaik untuk Anak?
                </h3>
                <p className="text-purple-100 mb-6">
                  Bergabunglah dengan ribuan orang tua yang telah mempercayakan pendidikan anak mereka kepada TerDig
                </p>
                <Button 
                  onClick={() => setShowRegistrationForm(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Mulai Sekarang
                </Button>
              </div>
              <div className="flex justify-center">
                <Mascot 
                  src="/images/star-kids-mascot.png"
                  alt="Star Kids - Paket Premium"
                  size="md"
                  animation="float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showRegistrationForm && selectedPackageData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRegistrationForm(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${selectedPackageData.gradient} flex items-center justify-center`}>
                  <selectedPackageData.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Daftar Paket {selectedPackageData.name}</CardTitle>
                <CardDescription className="mt-2">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      Rp {getDiscountedPrice(selectedPackageData.price)}
                    </span>
                    <span className="text-gray-600">
                      {billingCycle === "yearly" ? "/tahun" : selectedPackageData.period}
                    </span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    {selectedPackageData.ageGroup}
                  </Badge>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Orang Tua *
                  </label>
                  <Input
                    value={formData.parentName}
                    onChange={(e) => handleInputChange("parentName", e.target.value)}
                    placeholder="Masukkan nama orang tua"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Anak *
                  </label>
                  <Input
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                    placeholder="Masukkan nama anak"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="nama@email.com"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor WhatsApp *
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Usia Anak *
                  </label>
                  <select 
                    value={formData.childAge}
                    onChange={(e) => handleInputChange("childAge", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none disabled:opacity-50"
                    required
                    disabled={isLoading}
                  >
                    <option value="">Pilih usia anak</option>
                    <option value="3">3 tahun</option>
                    <option value="4">4 tahun</option>
                    <option value="5">5 tahun</option>
                    <option value="6">6 tahun</option>
                    <option value="7">7 tahun</option>
                    <option value="8">8 tahun</option>
                    <option value="9">9 tahun</option>
                    <option value="10">10 tahun</option>
                    <option value="11">11 tahun</option>
                    <option value="12">12 tahun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenjang Pendidikan
                  </label>
                  <select 
                    value={formData.grade}
                    onChange={(e) => handleInputChange("grade", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <option value="">Pilih jenjang</option>
                    <option value="tk-a">TK A</option>
                    <option value="tk-b">TK B</option>
                    <option value="paud">PAUD</option>
                    <option value="sd-1">SD Kelas 1</option>
                    <option value="sd-2">SD Kelas 2</option>
                    <option value="sd-3">SD Kelas 3</option>
                    <option value="sd-4">SD Kelas 4</option>
                    <option value="sd-5">SD Kelas 5</option>
                    <option value="sd-6">SD Kelas 6</option>
                  </select>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-purple-600 hover:underline">Syarat & Ketentuan</a>
                    {" "}dan{" "}
                    <a href="#" className="text-purple-600 hover:underline">Kebijakan Privasi</a>
                    {" "}TerDig
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowRegistrationForm(false)}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className={`flex-1 bg-gradient-to-r ${selectedPackageData.gradient} hover:opacity-90 text-white`}
                    disabled={isLoading || !formData.agreeTerms}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Mendaftar...
                      </>
                    ) : (
                      "Daftar Paket"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="package"
        data={successData}
      />
    </div>
  );
}
