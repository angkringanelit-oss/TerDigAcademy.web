import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

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
}

export function TestimonialsSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from("testimonials")
          .select("*");

        if (error) {
          throw new Error(error.message);
        }

        setTestimonials(data || []);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Terjadi kesalahan saat memuat data testimoni");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {loading && <p className="text-center text-blue-600 font-semibold">Loading...</p>}
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 hover:from-yellow-200 hover:to-green-200">
            Testimoni Keluarga TerDig Academy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cerita
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Sukses </span>
            dari
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> Dua Pilar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ribuan keluarga telah merasakan keunggulan dua pilar TerDig Academy. 
            Dari prestasi akademik hingga karya seni digital yang membanggakan - simak pengalaman mereka!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative overflow-hidden border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-blue-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Program Badge */}
                <div className="mb-4">
                  <Badge className={`text-xs ${
                    testimonial.program?.includes("Sanggar") || testimonial.program?.includes("AI Art") || testimonial.program?.includes("Desain")
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {testimonial.program}
                  </Badge>
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.split(' ')[1]?.charAt(0) || testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.child_info}</p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    🏆 {testimonial.achievement}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Updated Stats for TerDig Academy */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
            <p className="text-gray-600">Kepuasan Orang Tua</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1000+</div>
            <p className="text-gray-600">Siswa Aktif</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">35+</div>
            <p className="text-gray-600">Program Tersedia</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">4.9</div>
            <p className="text-gray-600">Rating Orang Tua</p>
          </div>
        </div>
      </div>
    </section>
  );
}