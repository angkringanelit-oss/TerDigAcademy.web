import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Users, Star, Filter, Search, BookOpen, Palette, Calculator, Globe, Heart, Trophy } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";

const categories = [
  { id: "all", name: "Semua", icon: BookOpen, color: "bg-blue-500" },
  { id: "akademik", name: "Akademik", icon: Calculator, color: "bg-green-500" },
  { id: "kreatif", name: "Kreatif", icon: Palette, color: "bg-purple-500" },
  { id: "karakter", name: "Karakter", icon: Heart, color: "bg-pink-500" },
  { id: "sains", name: "Sains", icon: Globe, color: "bg-blue-600" }
];

const videoData = [
  {
    id: 1,
    title: "Matematika Dasar: Penjumlahan dan Pengurangan",
    description: "Belajar konsep dasar matematika dengan cara yang menyenangkan",
    duration: "15 menit",
    level: "SD Kelas 1-3",
    category: "akademik",
    thumbnail: "/api/placeholder/300/200",
    views: 1250,
    rating: 4.8,
    interactive: true,
    mascot: "Star Kids"
  },
  {
    id: 2,
    title: "Menggambar Digital: Teknik Dasar",
    description: "Pelajari teknik menggambar digital untuk pemula",
    duration: "20 menit",
    level: "Semua Umur",
    category: "kreatif",
    thumbnail: "/api/placeholder/300/200",
    views: 980,
    rating: 4.9,
    interactive: true,
    mascot: "Quen Chlid"
  },
  {
    id: 3,
    title: "Berbagi dan Peduli Sesama",
    description: "Cerita animasi tentang pentingnya berbagi dengan teman",
    duration: "10 menit",
    level: "TK-SD",
    category: "karakter",
    thumbnail: "/api/placeholder/300/200",
    views: 2100,
    rating: 4.7,
    interactive: false,
    mascot: "Star Kids"
  },
  {
    id: 4,
    title: "Eksplorasi Tata Surya",
    description: "Jelajahi planet-planet di tata surya kita",
    duration: "25 menit",
    level: "SD Kelas 4-6",
    category: "sains",
    thumbnail: "/api/placeholder/300/200",
    views: 1560,
    rating: 4.8,
    interactive: true,
    mascot: "Star Kids"
  },
  {
    id: 5,
    title: "Membuat Animasi Sederhana",
    description: "Tutorial step-by-step membuat animasi pertama",
    duration: "30 menit",
    level: "SMP",
    category: "kreatif",
    thumbnail: "/api/placeholder/300/200",
    views: 750,
    rating: 4.6,
    interactive: true,
    mascot: "Quen Chlid"
  },
  {
    id: 6,
    title: "Bahasa Inggris: Percakapan Sehari-hari",
    description: "Praktik percakapan bahasa Inggris dengan situasi nyata",
    duration: "18 menit",
    level: "SD Kelas 4-6",
    category: "akademik",
    thumbnail: "/api/placeholder/300/200",
    views: 1890,
    rating: 4.9,
    interactive: true,
    mascot: "Star Kids"
  }
];

export function VideoEducationPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videoData.filter(video => {
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-8">
              <Mascot 
                src={starKidsImg}
                alt="Star Kids"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Video & Animasi Edukasi
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Belajar jadi lebih seru dengan video interaktif dan animasi edukatif yang dirancang khusus untuk anak
                </p>
              </div>
              <Mascot 
                src={quenChlidImg}
                alt="Quen Chlid"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Play className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Video Interaktif</h3>
                <p className="text-gray-600 text-sm">Video yang dapat berinteraksi langsung dengan anak</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Kualitas Premium</h3>
                <p className="text-gray-600 text-sm">Animasi berkualitas tinggi dengan narasi profesional</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Progress Tracking</h3>
                <p className="text-gray-600 text-sm">Pantau kemajuan belajar anak secara real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`${selectedCategory === category.id ? category.color + " text-white" : "hover:" + category.color + " hover:text-white"} transition-all duration-300`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari video..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Interactive Badge */}
                  {video.interactive && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      Interaktif
                    </Badge>
                  )}
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {video.duration}
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {video.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">{video.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {video.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Users className="w-4 h-4" />
                      {video.views.toLocaleString()} views
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {video.mascot === "Star Kids" ? "SK" : "QC"}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{video.mascot}</span>
                    </div>
                    
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                      Tonton
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Video tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Mulai Petualangan Belajar Hari Ini!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Bergabunglah dengan ribuan anak yang telah merasakan pengalaman belajar yang menyenangkan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                Daftar Sekarang
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold">
                Lihat Semua Video
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}