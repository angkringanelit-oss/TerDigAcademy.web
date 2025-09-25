import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Phone, MessageCircle, Calendar, Clock, CheckCircle, Users, Star, Award, Heart, BookOpen, Loader2 } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { SuccessModal } from "../components/SuccessModal";
import { useRegistration } from "../hooks/useRegistration";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";

const consultationTypes = [
  {
    id: "development",
    title: "Konsultasi Perkembangan Anak",
    description: "Diskusi tentang tahap perkembangan dan stimulasi yang tepat untuk anak",
    icon: Heart,
    duration: "30 menit"
  },
  {
    id: "learning",
    title: "Konsultasi Metode Belajar",
    description: "Tips dan strategi belajar yang menyenangkan sesuai usia anak",
    icon: BookOpen,
    duration: "30 menit"
  },
  {
    id: "preparation",
    title: "Persiapan Masuk Sekolah",
    description: "Bimbingan persiapan anak untuk masuk TK, SD, atau jenjang berikutnya",
    icon: Award,
    duration: "45 menit"
  }
];

const timeSlots = [
  "09:00 - 09:30",
  "10:00 - 10:30",
  "11:00 - 11:30",
  "13:00 - 13:30",
  "14:00 - 14:30",
  "15:00 - 15:30",
  "16:00 - 16:30",
  "19:00 - 19:30",
  "20:00 - 20:30"
];

const benefits = [
  "Konsultasi gratis dengan ahli perkembangan anak",
  "Analisis kebutuhan belajar yang personal",
  "Rekomendasi aktivitas dan stimulasi yang tepat",
  "Panduan pemilihan program pembelajaran",
  "Tips parenting dalam mendampingi belajar anak",
  "Tidak ada komitmen atau biaya tersembunyi"
];

const consultants = [
  {
    name: "Dr. Sarah Wijaya, M.Psi",
    title: "Psikolog Anak",
    experience: "15+ tahun",
    specialization: "Perkembangan Anak & Stimulasi",
    rating: 4.9,
    sessions: "2,500+"
  },
  {
    name: "Dra. Maya Sari, M.Pd",
    title: "Ahli Pendidikan Anak",
    experience: "12+ tahun",
    specialization: "Metode Pembelajaran Anak",
    rating: 4.8,
    sessions: "1,800+"
  },
  {
    name: "Prof. Ahmad Rahman",
    title: "Konsultan Pendidikan",
    experience: "10+ tahun",
    specialization: "Persiapan Masuk Sekolah",
    rating: 4.9,
    sessions: "2,200+"
  }
];

export function KonsultasiGratisPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { registerConsultation, isLoading } = useRegistration();
  
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    email: "",
    phone: "",
    childAge: "",
    grade: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    topics: "",
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
      const response = await registerConsultation({
        parentName: formData.parentName,
        childName: formData.childName,
        email: formData.email,
        phone: formData.phone,
        childAge: formData.childAge || undefined,
        grade: formData.grade || undefined,
        consultationType: formData.consultationType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        topics: formData.topics || undefined
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
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        topics: "",
        agreeTerms: false
      });

      toast({
        title: "Konsultasi Berhasil Dijadwalkan!",
        description: response.message,
      });
    } catch (error: any) {
      console.error("Consultation registration error:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar konsultasi. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

  const isFormValid = formData.parentName && formData.childName && formData.email && formData.phone && 
                     formData.consultationType && formData.preferredDate && 
                     formData.preferredTime && formData.agreeTerms;

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
              <h1 className="text-xl font-bold text-gray-900">Konsultasi Gratis</h1>
              <p className="text-sm text-gray-600">Dapatkan bimbingan personal dari ahli perkembangan anak</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
            <Phone className="w-4 h-4 mr-2" />
            100% Gratis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Konsultasi Gratis dengan
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Ahli Perkembangan Anak</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Dapatkan bimbingan personal dari konsultan perkembangan anak berpengalaman. 
            Diskusikan tahap perkembangan, metode belajar, dan persiapan sekolah untuk anak Anda secara gratis!
          </p>
          
          <div className="flex justify-center mb-8">
            <Mascot 
              src={quenChlidImg}
              alt="Quen Chlid - Konsultasi Gratis"
              size="md"
              animation="float"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Consultation Types */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Jenis Konsultasi</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {consultationTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Card 
                      key={type.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        formData.consultationType === type.id 
                          ? 'ring-2 ring-green-500 bg-green-50' 
                          : 'hover:border-green-300'
                      }`}
                      onClick={() => handleInputChange("consultationType", type.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <IconComponent className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                        <Badge className="bg-green-100 text-green-700">
                          <Clock className="w-3 h-3 mr-1" />
                          {type.duration}
                        </Badge>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Registration Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Daftar Konsultasi Gratis</CardTitle>
                <CardDescription>
                  Isi data diri untuk menjadwalkan sesi konsultasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Usia Anak
                      </label>
                      <select 
                        value={formData.childAge}
                        onChange={(e) => handleInputChange("childAge", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none disabled:opacity-50"
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none disabled:opacity-50"
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
                        <option value="belum-sekolah">Belum Sekolah</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Konsultasi *
                      </label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Konsultasi *
                      </label>
                      <select 
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:border-green-500 focus:outline-none disabled:opacity-50"
                        required
                        disabled={isLoading}
                      >
                        <option value="">Pilih waktu</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topik yang Ingin Dibahas
                    </label>
                    <Textarea
                      value={formData.topics}
                      onChange={(e) => handleInputChange("topics", e.target.value)}
                      placeholder="Ceritakan hal-hal yang ingin Anda konsultasikan tentang anak..."
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeTerms", checked as boolean)}
                      disabled={isLoading}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                      Saya setuju dengan{" "}
                      <a href="#" className="text-green-600 hover:underline">Syarat & Ketentuan</a>
                      {" "}dan{" "}
                      <a href="#" className="text-green-600 hover:underline">Kebijakan Privasi</a>
                      {" "}TerDig
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Menjadwalkan...
                      </>
                    ) : (
                      <>
                        <Calendar className="w-5 h-5 mr-2" />
                        Jadwalkan Konsultasi Gratis
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
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
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Consultants */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Konsultan Kami</CardTitle>
                    <CardDescription>
                      Bertemu dengan ahli perkembangan anak berpengalaman
                    </CardDescription>
                  </div>
                  <Mascot 
                    src={starKidsImg}
                    alt="Star Kids"
                    size="sm"
                    animation="float"
                    className="hidden sm:block"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultants.map((consultant, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {consultant.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{consultant.name}</h4>
                        <p className="text-sm text-green-600 font-medium">{consultant.title}</p>
                        <p className="text-xs text-gray-600 mb-2">{consultant.specialization}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{consultant.experience}</span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {consultant.rating}
                          </span>
                          <span>{consultant.sessions} sesi</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Butuh Bantuan?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Hubungi Kami</p>
                      <p className="text-sm opacity-90">+62 21 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm opacity-90">+62 812 3456 7890</p>
                    </div>
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
        type="consultation"
        data={successData}
      />
    </div>
  );
}
