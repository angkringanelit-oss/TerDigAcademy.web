import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Star, Quote, Heart, Users, Trophy } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  child_info: string;
  program: string;
  rating: number;
  content: string;
  achievement: string;
  created_at: string;
}

// Helper untuk badge program — fokus akademik
const getProgramBadge = (program: string) => {
  const p = program.toLowerCase();
  if (p.includes("bimbel") || p.includes("akademik") || p.includes("sd")) {
    return { text: program, className: "bg-blue-100 text-blue-700" };
  }
  if (p.includes("calistung") || p.includes("tk") || p.includes("paud")) {
    return { text: program, className: "bg-purple-100 text-purple-700" };
  }
  // Default: program lain dinetralkan
  return { text: "Program Lainnya", className: "bg-gray-100 text-gray-700" };
};

export function TestimonialsPageNew() {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw new Error(error.message);

        // FILTER: Hanya testimoni program akademik, bukan Sanggar Seni Digital
        const filtered = (data || []).filter((t: Testimonial) => {
          const program = t.program?.toLowerCase() || "";
          return !program.includes("sanggar") && !program.includes("seni digital");
        });

        setTestimonials(filtered);
      } catch (err) {
        logger.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <>
      <Helmet>
        <title>Testimoni Orang Tua - TerDig Academy</title>
        <meta
          name="description"
          content="Baca pengalaman orang tua dan siswa yang telah bergabung dengan TerDig Academy. Bimbel akademik digital dengan hasil terbukti."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
        {/* Header */}
        <section className="pt-20 pb-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700">
              Testimoni Orang Tua & Siswa
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cerita{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Sukses
              </span>{" "}
              Keluarga{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500">
                TerDig
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dengarkan pengalaman luar biasa orang tua dan anak-anak yang telah bergabung dengan TerDig Academy
            </p>
          </div>
        </section>

        {/* Mascots */}
        <section className="pb-12 px-4">
          <div className="max-w-4xl mx-auto flex justify-center items-center gap-8 sm:gap-12">
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
            <Heart className="w-8 h-8 text-pink-400 animate-pulse flex-shrink-0" />
            <div className="text-center">
              <Mascot
                src={queenChildMascot}
                alt="Quen Child"
                size="md"
                animation="bounce"
                className="mx-auto mb-3"
              />
              <p className="text-sm text-green-600 font-medium">Teman Berkarya Kreatif</p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">Memuat testimoni...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Belum ada testimoni. Jadilah yang pertama!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => {
                  const badge = getProgramBadge(testimonial.program);
                  return (
                    <Card
                      key={testimonial.id}
                      className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                              {testimonial.child_info && (
                                <p className="text-xs text-gray-500">{testimonial.child_info}</p>
                              )}
                            </div>
                          </div>
                          <Quote className="w-8 h-8 text-blue-200 flex-shrink-0" />
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(testimonial.created_at).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {/* Content */}
                        <p className="text-gray-700 italic mb-4 leading-relaxed">
                          "{testimonial.content}"
                        </p>

                        {/* Program Badge */}
                        <div className="mb-3">
                          <Badge className={`text-xs ${badge.className}`}>{badge.text}</Badge>
                        </div>

                        {/* Achievement */}
                        {testimonial.achievement && (
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{testimonial.achievement}</span>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Users className="w-3 h-3" />
                            Helpful
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Verified Parent
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Mengapa Orang Tua Memilih TerDig Academy?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Dua pilar pendidikan yang memberikan hasil nyata untuk masa depan anak
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Prestasi Akademik */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Prestasi Akademik dengan Star Kids
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <p className="text-gray-700">Metode pembelajaran yang menyenangkan dan efektif</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <p className="text-gray-700">Peningkatan nilai rata-rata 20-30 poin</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
                    <p className="text-gray-700">Guru berpengalaman dan bersertifikat</p>
                  </li>
                </ul>
              </Card>

              {/* Kreativitas Digital */}
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Kreativitas Digital dengan Quen Child
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2"></div>
                    <p className="text-gray-700">Program seni digital yang inovatif dan modern</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2"></div>
                    <p className="text-gray-700">Anak-anak menjadi juara dalam berbagai kompetisi</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2"></div>
                    <p className="text-gray-700">Mempersiapkan skill untuk masa depan digital</p>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Bergabunglah dengan Keluarga Bahagia TerDig!
              </h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Lebih dari 1000 orang tua telah mempercayai TerDig Academy untuk masa depan anak mereka.
                Saatnya giliran Anda!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-semibold"
                  onClick={() => navigate("/daftar")}
                >
                  Daftar Sekarang
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-xl font-semibold"
                  onClick={() => navigate("/program")}
                >
                  Lihat Program
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
