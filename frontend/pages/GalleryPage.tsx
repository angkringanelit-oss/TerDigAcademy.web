import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, MapPin, Trophy, Users, Star, Camera, Palette, 
  Award, Heart, Sparkles, Monitor, Brush
} from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  caption: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  participants: string;
  icon: string;
}

interface Achievement {
  year: string;
  title: string;
  student: string;
  description: string;
}

const upcomingEvents = [
  {
    id: 1,
    title: "Pameran Karya Seni Digital Anak",
    date: "15 Oktober 2024",
    time: "14:00 - 17:00",
    location: "TerDig Academy Hall",
    description: "Showcase karya-karya terbaik siswa Sanggar Seni Digital",
    category: "exhibition",
    participants: "50+ Siswa",
    icon: "Palette"
  },
  {
    id: 2,
    title: "Olimpiade Matematika TerDig",
    date: "22 Oktober 2024", 
    time: "09:00 - 12:00",
    location: "Online & Offline",
    description: "Kompetisi matematika untuk siswa SD dan SMP",
    category: "competition",
    participants: "100+ Siswa",
    icon: "Trophy"
  },
  {
    id: 3,
    title: "Workshop AI Art untuk Orang Tua",
    date: "29 Oktober 2024",
    time: "15:00 - 17:00", 
    location: "TerDig Academy Lab",
    description: "Belajar bersama anak tentang AI dan seni digital",
    category: "workshop",
    participants: "30 Keluarga",
    icon: "Sparkles"
  },
  {
    id: 4,
    title: "Science Fair TerDig Academy",
    date: "5 November 2024",
    time: "08:00 - 16:00",
    location: "TerDig Academy Campus",
    description: "Pameran proyek sains siswa dari berbagai tingkat",
    category: "fair",
    participants: "80+ Siswa",
    icon: "Award"
  }
];

const achievements = [
  {
    year: "2024",
    title: "Juara 1 Lomba Seni Digital Nasional",
    student: "Tim Sanggar Seni Digital",
    description: "5 siswa meraih medali emas"
  },
  {
    year: "2024", 
    title: "100% Siswa Lulus UN dengan Nilai Baik",
    student: "Siswa Bimbel TerDig SMP",
    description: "Rata-rata nilai di atas 85"
  },
  {
    year: "2023",
    title: "Best Innovation Award",
    student: "Program AI Art",
    description: "Penghargaan inovasi pendidikan"
  },
  {
    year: "2023",
    title: "1000+ Siswa Bergabung",
    student: "TerDig Academy",
    description: "Milestone pencapaian siswa"
  }
];

export function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch gallery items from Supabase
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from("gallery")
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        setGalleryItems(data || []);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("Terjadi kesalahan saat memuat data galeri");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Map icon names to actual components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Palette": return Palette;
      case "Trophy": return Trophy;
      case "Sparkles": return Sparkles;
      case "Award": return Award;
      default: return Trophy;
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
            Galeri & Event TerDig Academy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Showcase
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Karya </span>
            &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> Event</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat karya-karya menakjubkan siswa kami dan bergabunglah dalam berbagai event menarik TerDig Academy
          </p>
        </div>

        {/* Mascots Section */}
        <div className="flex justify-center items-center gap-8 mb-16">
          <div className="text-center">
            <Mascot 
              src={starKidsMascot}
              alt="Star Kids"
              size="md"
              animation="float"
              className="mx-auto mb-2"
            />
            <p className="text-sm text-blue-600 font-medium">Prestasi Akademik</p>
          </div>
          <div className="text-center">
            <Mascot 
              src={queenChildMascot}
              alt="Quen Chlid"
              size="md"
              animation="bounce"
              className="mx-auto mb-2"
            />
            <p className="text-sm text-green-600 font-medium">Karya Kreatif</p>
          </div>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-12 h-14">
            <TabsTrigger value="gallery" className="text-lg font-semibold">
              🎨 Galeri Karya
            </TabsTrigger>
            <TabsTrigger value="events" className="text-lg font-semibold">
              📅 Event
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg font-semibold">
              🏆 Prestasi
            </TabsTrigger>
          </TabsList>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Galeri Karya Siswa</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Karya-karya luar biasa dari siswa Bimbel TerDig dan Sanggar Seni Digital
              </p>
            </div>

            {loading && <p className="text-center text-blue-600 font-semibold">Loading...</p>}
            {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {galleryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/api/placeholder/300/200";
                        }}
                      />
                    ) : (
                      <div className="text-center">
                        <Palette className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                        <p className="text-gray-500">Preview Karya</p>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.caption}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Mendatang</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bergabunglah dalam berbagai kegiatan menarik di TerDig Academy
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => {
                const IconComponent = getIconComponent(event.icon);
                return (
                  <Card key={event.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          event.category === "exhibition" ? "bg-purple-100" :
                          event.category === "competition" ? "bg-yellow-100" :
                          event.category === "workshop" ? "bg-green-100" : "bg-blue-100"
                        }`}>
                          <IconComponent className={`w-6 h-6 ${
                            event.category === "exhibition" ? "text-purple-600" :
                            event.category === "competition" ? "text-yellow-600" :
                            event.category === "workshop" ? "text-green-600" : "text-blue-600"
                          }`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <Calendar className="w-4 h-4" />
                            {event.date} • {event.time}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-600">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants}
                        </div>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                        Daftar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prestasi & Pencapaian</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Capaian membanggakan TerDig Academy dan siswa-siswi berprestasi
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-6 mb-8 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-yellow-100 text-yellow-700">{achievement.year}</Badge>
                      <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                    </div>
                    <p className="text-purple-600 font-medium mb-1">{achievement.student}</p>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                  <Star className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Ingin Anak Anda Jadi Berikutnya?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Bergabunglah dengan TerDig Academy dan wujudkan potensi terbaik anak Anda dalam akademik dan kreativitas digital
          </p>
          <Button 
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
            onClick={() => navigate("/#programs")}
          >
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
}