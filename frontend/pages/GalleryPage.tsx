// src/pages/GalleryPage.tsx
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Trophy, Users, Palette, Award, Star, Eye } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

// Import initialization function
import "../init-supabase-gallery";

// ----------  T Y P E  ----------
type GalleryItem = {
  id: string; // Ubah dari number ke string karena UUID
  title: string;
  description: string;
  category: "karya" | "event" | "prestasi" | "Pameran"; // Tambahkan "Pameran"
  image_url: string;
  event_date?: string;
  time?: string;
  location?: string;
  author_name?: string;
  author_age?: number;
  participants?: string;
  year?: string;
  icon?: string;
  tags?: string[];
  is_featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
};

// ----------  H E L P E R  ----------
/* Supabase on-the-fly: 16:9, auto WebP, quality 80% */
const resizeImage = (url: string) => {
    return url.includes("supabase.co")
      ? `${url}?resize=cover&format=auto&quality=80`
      : url;
  };

// ----------  K O M P O N E N T  ----------
// Modal untuk menampilkan gambar penuh
function ImageViewModal({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <span className="text-2xl">&times;</span>
        </button>
        <img
          src={item.image_url}
          alt={item.title}
          className="max-w-full max-h-[90vh] object-contain"
        />
        <div className="mt-4 bg-white p-4 rounded-lg">
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryUnified({ category }: { category: "karya" | "event" | "prestasi" | "Workshop" | "Pameran" }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .eq("category", category)
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(error.message);
        }

        setItems(data || []);
      } catch (err: any) {
        console.error("Error in GalleryUnified:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Palette": return Palette;
      case "Trophy": return Trophy;
      case "Award": return Award;
      default: return Trophy;
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => {
          const IconComponent = getIcon(item.icon);
          return (
            <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-0 hover:shadow-2xl transition-all hover:-translate-y-2">
              {/* 16:9 PERFECT – tanpa crop */}
              <div className="w-full aspect-video rounded-t-lg overflow-hidden relative">
                <img
                  src={resizeImage(item.image_url)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60";
                  }}
                />
                {/* Tombol View untuk melihat gambar penuh */}
                <button
                  onClick={() => setSelectedItem(item)}
                  className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300"
                >
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <Eye className="w-6 h-6 text-gray-800" />
                  </div>
                </button>
              </div>

              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>

              {/* Metadata sesuai kategori */}
              <div className="px-6 pb-4 space-y-2 text-sm text-gray-600">
                {item.category === "event" && (
                  <>
                    {item.event_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> 
                        {new Date(item.event_date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </div>
                    )}
                    {item.participants && (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> {item.participants}
                      </div>
                    )}
                  </>
                )}

                {item.category === "karya" && item.author_name && (
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4" /> 
                    {item.author_name} 
                    {item.author_age && `(${item.author_age} th)`}
                  </div>
                )}

                {item.category === "prestasi" && item.year && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" /> {item.year}
                  </div>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal untuk menampilkan gambar penuh */}
      <ImageViewModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}

// ----------  H A L A M A N  L E N G K A P  ----------
export function GalleryPage() {
  const navigate = useNavigate();
  


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

        {/* Mascots */}
        <div className="flex justify-center items-center gap-8 mb-16">
          <div className="text-center">
            <Mascot src={starKidsImg} alt="Star Kids" size="md" animation="float" className="mx-auto mb-2" />
            <p className="text-sm text-blue-600 font-medium">Prestasi Akademik</p>
          </div>
          <div className="text-center">
            <Mascot src={quenChlidImg} alt="Quen Chlid" size="md" animation="bounce" className="mx-auto mb-2" />
            <p className="text-sm text-green-600 font-medium">Karya Kreatif</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="workshop" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12 h-14">
            <TabsTrigger value="gallery" className="text-lg font-semibold">🎨 Galeri Karya</TabsTrigger>
            <TabsTrigger value="workshop" className="text-lg font-semibold">📅 Workshop</TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg font-semibold">🏆 Prestasi</TabsTrigger>
            <TabsTrigger value="exhibition" className="text-lg font-semibold">🖼️ Pameran</TabsTrigger>
          </TabsList>

          {/* Content */}
          <TabsContent value="gallery" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Galeri Karya Siswa</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Karya-karya luar biasa dari siswa Bimbel TerDig dan Sanggar Seni Digital</p>
            </div>
            <GalleryUnified category="karya" />
          </TabsContent>

          <TabsContent value="workshop" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Workshop Digital Art</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Bergabunglah dalam berbagai kegiatan menarik di TerDig Academy</p>
            </div>
            <GalleryUnified category="Workshop" />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Prestasi & Pencapaian</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Capaian membanggakan TerDig Academy dan siswa-siswi berprestasi</p>
            </div>
            <GalleryUnified category="prestasi" />
          </TabsContent>

          <TabsContent value="exhibition" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pameran Karya</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Karya-karya terbaik dari siswa TerDig Academy</p>
            </div>
            <GalleryUnified category="Pameran" />
          </TabsContent>
        </Tabs>

        {/* CTA */}
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