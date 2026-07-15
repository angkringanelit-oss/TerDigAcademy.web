import { useState, useEffect } from "react";
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
import { logger } from "@/lib/logger";

// Import mascot images
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";

// Define consultation types
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

// Log consultation types for debugging
logger.debug("Consultation types defined:", consultationTypes);

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
  
  logger.debug("useRegistration hook:", { registerConsultation, isLoading });
  
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
  
  // Log initial form data
  useEffect(() => {
    logger.debug("Initial form data:", formData);
    logger.debug("ConsultationTypes available:", consultationTypes);
  }, []);

  logger.debug("Current form data:", formData);
  logger.debug("Is loading:", isLoading);
  
  // Log when component mounts
  useEffect(() => {
    logger.info("KonsultasiGratisPage component mounted");
  }, []);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    logger.debug("handleInputChange called:", { field, value });
    logger.debug("Previous form data:", formData);
    
    // Special check for consultationType
    if (field === "consultationType") {
      logger.debug("Special handling for consultationType");
      logger.debug("Value being set:", value);
      logger.debug("Type of value:", typeof value);
      
      // Check if value is valid
      if (value && typeof value === 'string' && value.length > 0) {
        logger.debug("consultationType value is valid");
      } else {
        logger.debug("consultationType value is invalid");
        logger.debug("Value:", value);
        logger.debug("Type:", typeof value);
        if (value === null) logger.debug("Value is null");
        if (value === undefined) logger.debug("Value is undefined");
        if (value === '') logger.debug("Value is empty string");
      }
      
      // Additional validation
      logger.debug("ConsultationTypes array for validation:", consultationTypes);
      const isValidType = consultationTypes.some(type => type.id === value);
      logger.debug("Is valid consultation type:", isValidType);
      if (!isValidType) {
        logger.debug("Invalid consultation type selected");
      }
    }
    
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      logger.debug("New form data:", newData);
      
      // Special handling for consultationType to ensure it's being set correctly
      if (field === "consultationType") {
        logger.debug("Special handling for consultationType:", value);
        logger.debug("Type of value:", typeof value);
      }
      
      return newData;
    });
    logger.debug("Form data after setFormData call:", formData); // This will show the old value due to React's async nature
    
    // Additional logging after state update
    setTimeout(() => {
      if (field === "consultationType") {
        logger.debug("ConsultationType after state update:", formData.consultationType);
      }
    }, 0);
  };

  // Calculate isFormValid inside useEffect to ensure it updates properly
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Special logging for consultationType to understand why it might be failing validation
    logger.debug("ConsultationType value:", formData.consultationType);
    logger.debug("ConsultationType trimmed:", formData.consultationType.trim());
    logger.debug("Is consultationType valid:", formData.consultationType.trim() !== '');
    
    // Additional detailed check for consultationType
    if (formData.consultationType) {
      logger.debug("ConsultationType exists:", true);
      logger.debug("ConsultationType length:", formData.consultationType.length);
      logger.debug("ConsultationType type:", typeof formData.consultationType);
    } else {
      logger.debug("ConsultationType exists:", false);
    }
    
    // Check if consultationType has changed from previous render
    logger.debug("Checking consultationType change");
    
    const validationResults = {
      parentName: formData.parentName.trim() !== '',
      childName: formData.childName.trim() !== '',
      email: formData.email.trim() !== '',
      phone: formData.phone.trim() !== '',
      consultationType: formData.consultationType.trim() !== '',
      preferredDate: formData.preferredDate.trim() !== '',
      preferredTime: formData.preferredTime.trim() !== '',
      agreeTerms: formData.agreeTerms === true
    };
    
    const isValid = Object.values(validationResults).every(Boolean);
    
    setIsFormValid(isValid);
    
    logger.debug("Form field values:", {
      parentName: formData.parentName,
      childName: formData.childName,
      email: formData.email,
      phone: formData.phone,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      agreeTerms: formData.agreeTerms
    });
    
    logger.debug("Form validation:", validationResults);
    logger.debug("Overall form valid:", isValid);
    
    // Log button state
    logger.debug("Button state - isFormValid:", isValid, "isLoading:", isLoading, "disabled:", !isValid || isLoading);
    
    // Log which fields are invalid
    if (!isValid) {
      const invalidFields = Object.entries(validationResults)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
      logger.debug("Invalid fields:", invalidFields);
      
      // Special check for consultationType
      if (!validationResults.consultationType) {
        logger.debug("ConsultationType specific check - value:", formData.consultationType, "type:", typeof formData.consultationType);
      }
    } else {
      logger.debug("All fields are valid, button should be enabled");
    }
    
    // Additional check for consultationType specifically
    if (formData.consultationType && formData.consultationType.trim() !== '') {
      logger.debug("ConsultationType is set and not empty");
    } else {
      logger.debug("ConsultationType is empty or not set");
      
      // Additional detailed logging for consultationType
      logger.debug("Detailed consultationType check:");
      logger.debug("- Value:", formData.consultationType);
      logger.debug("- Type:", typeof formData.consultationType);
      logger.debug("- Length:", formData.consultationType ? formData.consultationType.length : 'undefined');
      if (formData.consultationType) {
        logger.debug("- Is string:", typeof formData.consultationType === 'string');
        logger.debug("- Trimmed length:", formData.consultationType.trim().length);
      }
    }
    
    // Additional debug logging
    logger.debug("ConsultationTypes array:", consultationTypes);
    logger.debug("Current consultationType in formData:", formData.consultationType);
    
    // Check if the selected consultationType exists in the consultationTypes array
    if (formData.consultationType) {
      const selectedType = consultationTypes.find(type => type.id === formData.consultationType);
      if (selectedType) {
        logger.debug("Selected consultation type found in array:", selectedType);
      } else {
        logger.debug("Selected consultation type NOT found in array");
        logger.debug("Available types:", consultationTypes.map(t => t.id));
      }
    }
  }, [formData, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    logger.info("Form submit handler called");
    logger.debug("Form data:", formData);
    logger.debug("Is form valid:", isFormValid);
    logger.debug("Register consultation function:", registerConsultation);
    
    // Log individual form field values
    logger.debug("Form field values:", {
      parentName: formData.parentName,
      childName: formData.childName,
      email: formData.email,
      phone: formData.phone,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      agreeTerms: formData.agreeTerms
    });
    
    // Tambahkan try-catch untuk menangkap error yang mungkin terjadi
    try {
      if (!isFormValid) {
        toast({
          title: "Form Tidak Lengkap",
          description: "Mohon lengkapi semua field yang wajib diisi",
          variant: "destructive"
        });
        return;
      }

      // Tambahkan logging sebelum memanggil registerConsultation
      logger.debug("Calling registerConsultation with data:", {
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

      logger.debug("Calling registerConsultation");
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

      logger.debug("Registration response:", response);
      
      if (response && response.success) {
        logger.success("Registration successful");
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
      } else {
        logger.debug("Registration failed without error");
        toast({
          title: "Pendaftaran Gagal",
          description: response?.message || "Terjadi kesalahan saat mendaftar konsultasi. Silakan coba lagi.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      logger.error("Caught error in handleSubmit:", error);
      toast({
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan saat mendaftar konsultasi. Silakan coba lagi.",
        variant: "destructive"
      });
    }
  };

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
                      onClick={() => {
                        logger.debug("Consultation type selected:", type.id);
                        logger.debug("Current formData before update:", formData);
                        logger.debug("Setting consultationType to:", type.id);
                        
                        // Additional check to ensure the value is being passed correctly
                        if (type.id) {
                          logger.debug("Type ID exists and is not empty");
                        } else {
                          logger.debug("Type ID is empty or undefined");
                        }
                        
                        // Log the consultation type object
                        logger.debug("Consultation type object:", type);
                        
                        handleInputChange("consultationType", type.id);
                        // Log the updated form data after a short delay to see the change
                        setTimeout(() => {
                          logger.debug("FormData after setting consultationType:", formData);
                          logger.debug("ConsultationType in formData:", formData.consultationType);
                        }, 0);
                      }}
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
              {/* Debug information for consultationType */}
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Debug Info:</strong> Selected consultation type: {formData.consultationType || 'None'}
                </p>
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
                <form 
                  onSubmit={(e) => {
                    logger.debug("Form submit event triggered");
                    logger.debug("Event object:", e);
                    handleSubmit(e);
                  }} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Orang Tua *
                      </label>
                      <Input
                        value={formData.parentName}
                        onChange={(e) => {
                          logger.debug("Parent name changed:", e.target.value);
                          logger.debug("Setting parentName to:", e.target.value);
                          handleInputChange("parentName", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Child name changed:", e.target.value);
                          logger.debug("Setting childName to:", e.target.value);
                          handleInputChange("childName", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Email changed:", e.target.value);
                          logger.debug("Setting email to:", e.target.value);
                          handleInputChange("email", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Phone changed:", e.target.value);
                          logger.debug("Setting phone to:", e.target.value);
                          handleInputChange("phone", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Child age selected:", e.target.value);
                          logger.debug("Setting childAge to:", e.target.value);
                          handleInputChange("childAge", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Grade selected:", e.target.value);
                          logger.debug("Setting grade to:", e.target.value);
                          handleInputChange("grade", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Date selected:", e.target.value);
                          logger.debug("Setting preferredDate to:", e.target.value);
                          handleInputChange("preferredDate", e.target.value);
                        }}
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
                        onChange={(e) => {
                          logger.debug("Time selected:", e.target.value);
                          logger.debug("Setting preferredTime to:", e.target.value);
                          handleInputChange("preferredTime", e.target.value);
                        }}
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
                      onChange={(e) => {
                        logger.debug("Topics changed:", e.target.value);
                        logger.debug("Setting topics to:", e.target.value);
                        handleInputChange("topics", e.target.value);
                      }}
                      placeholder="Ceritakan hal-hal yang ingin Anda konsultasikan tentang anak..."
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => {
                        logger.debug("Checkbox changed:", checked);
                        logger.debug("Checkbox type:", typeof checked);
                        // The Radix UI Checkbox returns 'true' when checked, 'false' when unchecked
                        const booleanValue = checked === true;
                        logger.debug("Setting agreeTerms to:", booleanValue);
                        handleInputChange("agreeTerms", booleanValue);
                      }}
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
                  
                  {/* Informasi tambahan setelah tombol */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Apabila Konsultasi lambat merespon, Hubungi Kami melalui Whatsapp Admin akan segera Kami tanggapi.
                    </p>
                  </div>
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
                <Button 
                  className="w-full bg-white text-green-600 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                  onClick={() => window.open('https://wa.me/62895339329650', '_blank')}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat WhatsApp Admin
                </Button>
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