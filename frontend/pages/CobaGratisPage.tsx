import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CheckCircle, Star, Play, Users, BookOpen, Clock, Gift, Heart, Gamepad2, Loader2 } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { SuccessModal } from "../components/SuccessModal";
import { useRegistration } from "../hooks/useRegistration";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { logger } from "@/lib/logger";

const freeFeatures = [
  {
    icon: Play,
    title: "100+ Video Pembelajaran",
    description: "Video interaktif dengan animasi menarik untuk anak"
  },
  {
    icon: Gamepad2,
    title: "50 Permainan Edukatif",
    description: "Game belajar yang menyenangkan dan mendidik"
  },
  {
    icon: Users,
    title: "1x Live Class Trial",
    description: "Ikuti kelas langsung dengan guru berpengalaman"
  },
  {
    icon: Heart,
    title: "Laporan Perkembangan",
    description: "Pantau progress belajar anak secara detail"
  }
];

const benefits = [
  "Tidak ada biaya tersembunyi",
  "Bisa dibatalkan kapan saja",
  "Tes Pemetaan Awal + 1x Trial Class gratis",
  "Dukungan customer service 24/7",
  "Laporan perkembangan anak",
  "Konsultasi dengan guru"
];

export function CobaGratisPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerTrial, isLoading } = useRegistration();
  
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    email: "",
    phone: "",
    childAge: "",
    grade: "",
    agreeTerms: false
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await registerTrial({
        parentName: formData.parentName,
        childName: formData.childName,
        email: formData.email,
        phone: formData.phone,
        childAge: formData.childAge,
        grade: formData.grade || undefined
      });

      setSuccessData(response);
      setShowSuccessModal(true);
      
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

      toast({
        title: "Pendaftaran Berhasil!",
        description: response.message,
      });
    } catch (error: any) {
      logger.error("Registration error:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  const isFormValid = formData.parentName && formData.childName && formData.email && formData.phone && formData.childAge && formData.agreeTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
              <h1 className="text-xl font-bold text-gray-900">Coba Gratis 7 Hari</h1>
              <p className="text-sm text-gray-600">Rasakan pengalaman belajar terbaik untuk anak tanpa biaya</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Hero */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                <Gift className="w-4 h-4 mr-2" />
                100% Gratis
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Anak Mulai Belajar
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Gratis</span>
                <br />
                Hari Ini!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Mulai dengan Tes Pemetaan Awal untuk memetakan kemampuan anak, lalu ikuti 1x Trial Class gratis tanpa biaya apa pun.
                Rasakan sendiri suasana belajar di TerDig Academy sebelum Ayah/Bunda memutuskan!
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {freeFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Yang Anda Dapatkan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Mascot */}
            <div className="flex justify-center lg:hidden">
              <Mascot 
                src="/images/star-kids-mascot.png"
                alt="Star Kids - Coba Gratis"
                size="lg"
                animation="bounce"
              />
            </div>
          </div>

          {/* Right Content - Registration Form */}
          <div className="space-y-8">
            {/* Mascot for desktop */}
            <div className="hidden lg:flex justify-center">
              <Mascot 
                src="/images/star-kids-mascot.png"
                alt="Star Kids - Coba Gratis"
                size="lg"
                animation="bounce"
              />
            </div>

            {/* Registration Form */}
            <Card className="shadow-xl border-2 border-gray-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Daftar Sekarang</CardTitle>
                <CardDescription>
                  Isi data diri untuk mendaftar Tes Pemetaan Awal + 1x Trial Class gratis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Orang Tua *
                      </label>
                      <Input
                        value={formData.parentName}
                        onChange={(e) => handleInputChange("parentName", e.target.value)}
                        placeholder="Masukkan nama orang tua"
                        className="border-2 border-gray-200 focus:border-blue-500"
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
                        className="border-2 border-gray-200 focus:border-blue-500"
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
                        className="border-2 border-gray-200 focus:border-blue-500"
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
                        className="border-2 border-gray-200 focus:border-blue-500"
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
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50"
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
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none disabled:opacity-50"
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
                      <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a>
                      {" "}dan{" "}
                      <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>
                      {" "}TerDig
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Mendaftar...
                      </>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        Mulai Trial Class Gratis
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500">
                    Dengan mendaftar, anak Anda akan mendapatkan Tes Pemetaan Awal dan 1x Trial Class gratis
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Timer */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Penawaran Terbatas!</span>
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Hanya tersisa 50 slot trial gratis untuk hari ini
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">12</div>
                    <div className="text-xs">Jam</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">34</div>
                    <div className="text-xs">Menit</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">56</div>
                    <div className="text-xs">Detik</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-2">
                    <div className="text-lg font-bold">50</div>
                    <div className="text-xs">Slot</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="trial"
        data={successData}
      />
    </div>
  );
}