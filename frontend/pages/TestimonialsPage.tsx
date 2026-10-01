import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Heart, ThumbsUp, Users, Trophy } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

// Tipe data untuk testimonial dari database
interface Testimonial {
  id: number;
  name: string;
  role: string;
  child_info: string;
  program: string;
  rating: number;
  content: string;
  avatar_url: string;
  achievement: string;
  created_at: string;
}

export function TestimonialsPage() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          throw new Error(error.message);
        }

        setTestimonials(data || []);
      } catch (err) {
        logger.error("Error fetching testimonials:", err);
        setError("Terjadi kesalahan saat memuat data testimoni");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data testimoni...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Testimoni Sedang Kami Siapkan
          </h1>
          <p className="text-gray-600 mb-8">
            Cerita pengalaman orang tua siswa TerDig Academy akan segera tampil di halaman ini.
            Ingin tahu lebih dulu tentang program kami? Tim kami siap membantu Anda via WhatsApp.
          </p>
          <a
            href="https://wa.me/62895339329650?text=Halo%20TerDig%20Academy%2C%20saya%20ingin%20bertanya%20tentang%20program%20belajar%20untuk%20anak%20saya."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-green-700 transition-colors"
          >
            Chat WhatsApp TerDig Academy
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700">
            Testimoni Orang Tua & Siswa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cerita
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Sukses </span>
            Keluarga
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> TerDig</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dengarkan pengalaman luar biasa orang tua dan anak-anak yang telah bergabung dengan TerDig Academy
          </p>
        </div>

        {/* Mascots */}
        <div className="flex justify-center items-center gap-12 mb-16">
          <div className="text-center">
            <Mascot 
              src={starKidsMascot}
              alt="Star Kids"
              size="md"
              animation="float"
              className="mx-auto mb-3"
            />
            <p className="text-sm text-blue-600 font-medium">Teman Belajar Akademik</p>
          </div>
          <div className="text-4xl text-gray-300">❤️</div>
          <div className="text-center">
            <Mascot 
              src={queenChildMascot}
              alt="Quen Chlid"
              size="md"
              animation="bounce"
              className="mx-auto mb-3"
            />
            <p className="text-sm text-green-600 font-medium">Teman Berkarya Kreatif</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-blue-200" />
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                    <CardDescription className="text-purple-600 font-medium">
                      {testimonial.role} - {testimonial.child_info}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(testimonial.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                <div className="space-y-2">
                  <Badge className={`${
                    testimonial.program.includes("Sanggar") 
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {testimonial.program}
                  </Badge>
                  
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {testimonial.achievement}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Helpful</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Verified Parent
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories Section */}
        <div className="bg-white rounded-2xl p-8 shadow-xl mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mengapa Orang Tua Memilih TerDig Academy?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dua pilar pendidikan yang memberikan hasil nyata untuk masa depan anak
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Prestasi Akademik dengan Star Kids
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Metode pembelajaran yang menyenangkan dan efektif</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Peningkatan nilai rata-rata 20-30 poin</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Guru berpengalaman dan bersertifikat</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-green-700 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Kreativitas Digital dengan Quen Chlid
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Program seni digital yang inovatif dan modern</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Anak-anak menjadi juara dalam berbagai kompetisi</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Mempersiapkan skill untuk masa depan digital</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-4">Bergabunglah dengan Keluarga Bahagia TerDig!</h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Lebih dari 1000 orang tua telah mempercayai TerDig Academy untuk masa depan anak mereka. 
            Saatnya giliran Anda!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
              onClick={() => navigate("/daftar")}
            >
              Daftar Sekarang
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl font-semibold"
              onClick={() => navigate("/#programs")}
            >
              Lihat Program
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}