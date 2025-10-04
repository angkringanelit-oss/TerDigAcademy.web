import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Users, Star, Search, BookOpen, Palette, Calculator, Globe, Heart, Trophy } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Video = {
  id: number;
  title: string;
  description: string;
  video_url: string;
  thumbnail: string;
  category: string;
  duration?: string;
  level?: string;
  views?: number;
  rating?: number;
  interactive?: boolean;
  mascot?: string;
};

const categoryOptions = [
  { value: "Semua", label: "Semua" },
  { value: "Akademik", label: "Akademik" },
  { value: "Kreatif", label: "Kreatif" },
  { value: "Karakter", label: "Karakter" },
  { value: "Sains", label: "Sains" }
];

export function VideoEducationPage() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Ambil data dari Supabase
  const fetchVideos = async () => {
    setLoading(true);
    let query = supabase.from("videos").select("*").order("created_at", { ascending: false });

    if (selectedCategory !== "Semua") {
      query = query.eq("category", selectedCategory);
    }

    // Tambahkan pencarian jika ada query
    if (searchQuery.trim() !== "") {
      query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching videos:", error);
    } else {
      setVideos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, [selectedCategory, searchQuery]);

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
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari video..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : videos.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Video tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Card key={video.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={video.thumbnail || "/api/placeholder/300/200"} 
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
                      {video.duration || "N/A"}
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {video.title}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm text-gray-600">{video.rating || 0}</span>
                      </div>
                    </div>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {video.level || "Semua Umur"}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Users className="w-4 h-4" />
                        {(video.views || 0).toLocaleString()} views
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {video.mascot === "Star Kids" ? "SK" : video.mascot === "Quen Chlid" ? "QC" : "T"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{video.mascot || "TerDig Academy"}</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        onClick={() => setSelectedVideo(video)}
                      >
                        Tonton
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                onClick={() => navigate("/#programs")}
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Player */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4 px-2">{selectedVideo.title}</h2>
            <div className="aspect-video">
              <iframe
                className="w-full h-[400px] rounded-lg"
                src={selectedVideo.video_url}
                title={selectedVideo.title}
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 px-2">
              <p className="text-gray-700">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}