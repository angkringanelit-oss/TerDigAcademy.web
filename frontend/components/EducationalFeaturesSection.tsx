import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Gamepad2, BookOpen, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Mascot } from "./Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";

export function EducationalFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Belajar Jadi Lebih Seru!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nikmati pengalaman belajar yang interaktif dan menyenangkan dengan video edukatif dan game pembelajaran yang dirancang khusus untuk anak
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Video Education Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      Video & Animasi Edukasi
                    </h3>
                    <p className="text-gray-600">Konten visual interaktif</p>
                  </div>
                </div>
                <Mascot 
                  src={starKidsImg}
                  alt="Star Kids"
                  size="md"
                  animation="float"
                  className="hidden sm:block"
                />
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Video pembelajaran interaktif dengan narasi profesional</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Animasi berkualitas tinggi yang mudah dipahami</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Progress tracking untuk pantau kemajuan belajar</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    <span>50+ Video</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
                <Link to="/video-edukasi">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white group/btn">
                    Jelajahi Video
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Educational Games Card */}
          <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      Game Edukatif
                    </h3>
                    <p className="text-gray-600">Belajar sambil bermain</p>
                  </div>
                </div>
                <Mascot 
                  src={quenChlidImg}
                  alt="Quen Chlid"
                  size="md"
                  animation="float"
                  className="hidden sm:block"
                />
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Game interaktif untuk berbagai mata pelajaran</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Sistem reward dan achievement yang memotivasi</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Multiplayer mode untuk belajar bersama teman</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Gamepad2 className="w-4 h-4" />
                    <span>30+ Game</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>4.8 Rating</span>
                  </div>
                </div>
                <Link to="/game-edukatif">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white group/btn">
                    Main Sekarang
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <p className="text-gray-600">Video ditonton</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">100K+</div>
              <p className="text-gray-600">Game dimainkan</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <p className="text-gray-600">Anak lebih suka belajar</p>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-yellow-600 mb-2">4.9</div>
              <p className="text-gray-600">Rating dari orang tua</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}