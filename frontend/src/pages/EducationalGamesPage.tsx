import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Play, Star, Zap, Trophy, Heart } from "lucide-react";
import { GameModal } from "../../components/GameModal";
import MathQuiz from "../games/MathQuiz";
import WordDetective from "../games/WordDetective";
import starKidsImg from "../../assets/Star Kids.png";
import quenChlidImg from "../../assets/Quen Child.png";
import { supabase } from "../lib/supabaseClient";

// Tipe data untuk game dari database
interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  age_group: string;
  players: string;
  duration: string;
  rating: number;
  plays: number;
  thumbnail: string;
  mascot: string;
  rewards: string[];
  features: string[];
  component?: React.ComponentType; // Optional untuk kompatibilitas
}

export function EducationalGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setGames(data);
    } else {
      console.error("Gagal ambil data game:", error);
    }
    setLoading(false);
  };

  const openGameModal = (game: Game) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  const features = [
    {
      icon: Trophy,
      title: "Penghargaan",
      description: "Dapatkan lencana dan penghargaan untuk setiap pencapaian"
    },
    {
      icon: Heart,
      title: "Belajar Sambil Bermain",
      description: "Pengalaman belajar yang menyenangkan dan edukatif"
    },
    {
      icon: Star,
      title: "Tantangan Seru",
      description: "Berbagai level tantangan yang menarik dan memotivasi"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data games...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Hero Section with Animated Mascots */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="hidden lg:block animate-bounce hover:animate-pulse transition-all duration-300" style={{ animationDelay: '0s', animationDuration: '2s' }}>
                <img 
                  src={starKidsImg} 
                  alt="Star Kids" 
                  className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4 animate-pulse">
                  Game Edukatif
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                  Belajar sambil bermain dengan game edukatif yang seru dan menantang
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-6">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>50K+ Pemain Aktif</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <span>1000+ Game Dimainkan</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-pink-500" />
                    <span>Rating 4.9/5</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block animate-bounce hover:animate-pulse transition-all duration-300" style={{ animationDelay: '1s', animationDuration: '2s' }}>
                <img 
                  src={quenChlidImg} 
                  alt="Quen Child" 
                  className="w-32 h-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-yellow-300 opacity-20 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-pink-300 opacity-20 animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 rounded-full bg-purple-300 opacity-20 animate-ping" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center p-6 bg-white/70 rounded-2xl border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Game Edukatif</h2>
          <Button onClick={fetchGames} size="sm">Refresh</Button>
        </div>
        
        {games.length === 0 && !loading && (
          <p className="text-center text-gray-500">Tidak ada game yang tersedia saat ini.</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => {
            // Menentukan ikon berdasarkan kategori
            const IconComponent = game.category === 'matematika' ? Zap : 
                                 game.category === 'bahasa' ? Star : 
                                 Gamepad2;
            
            // Menentukan warna berdasarkan kategori
            const colorClass = game.category === 'matematika' ? 'from-blue-400 to-purple-500' :
                              game.category === 'bahasa' ? 'from-blue-500 to-teal-500' :
                              'from-purple-500 to-pink-500';
            
            return (
              <Card key={game.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors leading-tight">
                        {game.title}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                          {game.category}
                        </span>
                      </CardDescription>
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Attractive Game Cover */}
                    <div className={`relative bg-gradient-to-br ${colorClass} rounded-xl h-40 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white animate-pulse"></div>
                        <div className="absolute bottom-6 right-4 w-16 h-16 rounded-full bg-yellow-300 animate-ping"></div>
                        <div className="absolute top-8 right-8 w-6 h-6 rounded-full bg-white animate-pulse"></div>
                        <div className="absolute bottom-12 left-6 w-10 h-10 rounded-full bg-yellow-300 animate-ping"></div>
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border-2 border-white/30 inline-block mb-2 hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">
                          <Star className="w-8 h-8 text-yellow-300 fill-current" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{game.title}</h3>
                        <p className="text-purple-100 text-sm">Klik untuk mulai bermain!</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{game.rating}</span>
                      </div>
                      <span>{game.plays.toLocaleString()} dimainkan</span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">{game.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {game.rewards.slice(0, 3).map((reward, index) => (
                        <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          {reward}
                        </span>
                      ))}
                      {game.rewards.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          +{game.rewards.length - 3}
                        </span>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white group-hover:shadow-lg transition-all duration-300"
                      onClick={() => openGameModal(game)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Mainkan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <GameModal game={selectedGame} onClose={closeGameModal} />
    </div>
  );
}