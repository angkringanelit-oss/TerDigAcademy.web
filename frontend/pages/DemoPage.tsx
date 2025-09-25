import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, BookOpen, Users, Brain, Video, FileText, Trophy, Star, Clock, CheckCircle, Heart, Gamepad2 } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";

const demoVideos = [
  {
    id: "hero",
    title: "Pengenalan TerDig untuk Anak",
    description: "Lihat bagaimana TerDig membantu anak belajar dengan menyenangkan",
    duration: "3:45",
    thumbnail: "/images/demo-hero.jpg",
    category: "overview"
  },
  {
    id: "tk-learning",
    title: "Pembelajaran TK/PAUD",
    description: "Demo aktivitas belajar untuk anak usia 3-6 tahun",
    duration: "5:20",
    thumbnail: "/images/demo-tk.jpg",
    category: "features"
  },
  {
    id: "sd-learning",
    title: "Pembelajaran SD",
    description: "Demo materi dan aktivitas untuk anak SD kelas 1-6",
    duration: "6:15",
    thumbnail: "/images/demo-sd.jpg",
    category: "features"
  },
  {
    id: "games",
    title: "Permainan Edukatif",
    description: "Lihat berbagai game belajar yang menyenangkan",
    duration: "4:30",
    thumbnail: "/images/demo-games.jpg",
    category: "features"
  },
  {
    id: "ai-tutor",
    title: "AI Tutor Ramah Anak",
    description: "Demo fitur AI tutor yang disesuaikan untuk anak",
    duration: "3:10",
    thumbnail: "/images/demo-ai-kids.jpg",
    category: "features"
  },
  {
    id: "parent-dashboard",
    title: "Dashboard Orang Tua",
    description: "Pantau perkembangan belajar anak dengan mudah",
    duration: "4:45",
    thumbnail: "/images/demo-parent.jpg",
    category: "features"
  },
  {
    id: "success",
    title: "Kisah Sukses Anak",
    description: "Testimoni nyata dari orang tua dan anak",
    duration: "6:45",
    thumbnail: "/images/demo-success-kids.jpg",
    category: "testimonials"
  }
];

const features = [
  {
    icon: Video,
    title: "Video Pembelajaran Interaktif",
    description: "Video dengan animasi menarik yang disesuaikan untuk anak"
  },
  {
    icon: Gamepad2,
    title: "Permainan Edukatif",
    description: "Game belajar yang menyenangkan dan mendidik"
  },
  {
    icon: Brain,
    title: "AI Tutor Ramah Anak",
    description: "Bantuan belajar AI yang disesuaikan untuk anak"
  },
  {
    icon: Heart,
    title: "Pembelajaran Berkarakter",
    description: "Mengembangkan karakter positif sambil belajar"
  },
  {
    icon: Users,
    title: "Live Class Interaktif",
    description: "Kelas langsung dengan guru yang berpengalaman mengajar anak"
  },
  {
    icon: Star,
    title: "Laporan Perkembangan",
    description: "Pantau progress belajar anak secara detail"
  }
];

export function DemoPage() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [activeTab, setActiveTab] = useState("overview");

  const filteredVideos = demoVideos.filter(video => 
    activeTab === "all" || video.category === activeTab
  );

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
              <h1 className="text-xl font-bold text-gray-900">Demo TerDig</h1>
              <p className="text-sm text-gray-600">Lihat langsung bagaimana anak belajar dengan TerDig</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            <Play className="w-4 h-4 mr-2" />
            Demo Interaktif
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Rasakan Pengalaman
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Belajar Anak</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Jelajahi semua fitur dan layanan TerDig yang dirancang khusus untuk anak. 
            Lihat sendiri mengapa ribuan orang tua memilih TerDig sebagai partner belajar anak mereka.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Video */}
            <Card className="overflow-hidden shadow-xl">
              <div className="relative aspect-video bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-colors">
                    <Play className="w-10 h-10 ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-100">{selectedVideo.description}</p>
                  <Badge className="mt-3 bg-white/20 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {selectedVideo.duration}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Video Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Video Demo</CardTitle>
                <CardDescription>
                  Pilih kategori untuk melihat demo fitur yang berbeda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Fitur</TabsTrigger>
                    <TabsTrigger value="testimonials">Testimoni</TabsTrigger>
                    <TabsTrigger value="all">Semua</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredVideos.map((video) => (
                        <Card 
                          key={video.id}
                          className={`cursor-pointer transition-all hover:shadow-lg ${
                            selectedVideo.id === video.id ? 'ring-2 ring-purple-500' : ''
                          }`}
                          onClick={() => setSelectedVideo(video)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1 truncate">
                                  {video.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {video.description}
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                  {video.duration}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mascot */}
            <Card>
              <CardContent className="p-6 text-center">
                <Mascot 
                  src="/images/star-kids-mascot.png"
                  alt="Star Kids - Demo Guide"
                  size="md"
                  animation="bounce"
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Halo! Saya Star Kids
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Aku akan memandu kamu menjelajahi semua fitur keren TerDig untuk anak!
                </p>
                <Button 
                  onClick={() => navigate("/coba-gratis")}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Coba Gratis Sekarang
                </Button>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Fitur Unggulan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Mengapa Pilih TerDig?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">500K+ anak belajar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">5K+ video pembelajaran</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">98% kepuasan orang tua</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Rating 4.9/5 dari pengguna</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Siap Memulai Perjalanan Belajar Anak?
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Setelah melihat demo, saatnya memberikan yang terbaik untuk anak. 
                Daftar sekarang dan dapatkan akses gratis selama 7 hari!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/coba-gratis")}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Mulai Gratis 7 Hari
                </Button>
                <Button 
                  onClick={() => navigate("/konsultasi-gratis")}
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                >
                  Konsultasi Gratis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
