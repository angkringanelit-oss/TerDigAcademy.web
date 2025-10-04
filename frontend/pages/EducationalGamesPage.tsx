import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Play, Star, Zap, Trophy, Heart, Plus, Edit, Trash2 } from "lucide-react";
import { GameModal } from "../components/GameModal";
import { GameFormModal } from "../components/GameFormModal";
import MathQuiz from "../src/games/MathQuiz";
import WordDetective from "../src/games/WordDetective";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";
import { supabase } from "../src/lib/supabaseClient";

// Tipe data untuk game dari database
interface DatabaseGame {
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
  game_url: string;
  source: string;
  created_at: string;
}

// Tipe data untuk game yang akan ditampilkan
interface Game {
  id: string;
  title: string;
  category: string;
  component: React.ComponentType;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  difficulty: string;
  age_group: string;
  players: string;
  duration: string;
  rating: number;
  plays: number;
  thumbnail: string;
  mascot: string;
  game_url: string;
  source: string;
}

const gameComponents: Record<string, { component: React.ComponentType, icon: React.ComponentType<any>, color: string }> = {
  "math-quiz": {
    component: MathQuiz,
    icon: Zap,
    color: "from-blue-400 to-purple-500"
  },
  "word-detective": {
    component: WordDetective,
    icon: Star,
    color: "from-blue-500 to-teal-500"
  }
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

export function EducationalGamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Untuk mode admin (edit/delete)
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingGame, setEditingGame] = useState<DatabaseGame | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      // Mengambil data dari tabel games di Supabase
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Mengonversi data dari database ke format yang digunakan di UI
      const formattedGames: Game[] = data.map((game: DatabaseGame) => {
        // Menentukan komponen game berdasarkan kategori atau ID
        const gameId = getGameIdFromCategory(game.category);
        const gameInfo = gameComponents[gameId] || gameComponents["math-quiz"]; // Default ke math-quiz jika tidak ditemukan
        
        return {
          id: game.id,
          title: game.title,
          category: game.category,
          component: gameInfo.component,
          icon: gameInfo.icon,
          color: gameInfo.color,
          description: game.description,
          difficulty: game.difficulty,
          age_group: game.age_group,
          players: game.players,
          duration: game.duration,
          rating: game.rating,
          plays: game.plays,
          thumbnail: game.thumbnail,
          mascot: game.mascot,
          game_url: game.game_url,
          source: game.source
        };
      });

      // Jika tidak ada data dari database, gunakan data default
      if (formattedGames.length === 0) {
        setGames(getDefaultGames());
      } else {
        setGames(formattedGames);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching games:", err);
      setError("Gagal memuat data games. Menampilkan data default.");
      // Jika terjadi error, gunakan data default
      setGames(getDefaultGames());
      setLoading(false);
    }
  };

  const getDefaultGames = (): Game[] => {
    return [
      {
        id: "math-quiz",
        title: "Math Pop Quiz",
        category: "Matematika",
        component: MathQuiz,
        icon: Zap,
        color: "from-blue-400 to-purple-500",
        description: "Uji kemampuan matematikamu dengan serangkaian soal yang menantang!",
        difficulty: "Sedang",
        age_group: "6-12 tahun",
        players: "1",
        duration: "10-15 menit",
        rating: 4.8,
        plays: 1500,
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        mascot: "Star Kids",
        game_url: "https://wordwall.net/resource/12345/math-quiz",
        source: "wordwall"
      },
      {
        id: "word-detective",
        title: "Word Detective: Tebak Kata Kosmik",
        category: "Bahasa",
        component: WordDetective,
        icon: Star,
        color: "from-blue-500 to-teal-500",
        description: "Jelajahi dunia kosmik sambil belajar kosakata baru dalam bahasa Indonesia!",
        difficulty: "Mudah",
        age_group: "5-10 tahun",
        players: "1-4",
        duration: "15-20 menit",
        rating: 4.9,
        plays: 2200,
        thumbnail: "https://img.youtube.com/vi/4GuqkCXf2z0/hqdefault.jpg",
        mascot: "Quen Child",
        game_url: "https://wordwall.net/resource/67890/word-detective",
        source: "wordwall"
      }
    ];
  };

  const getGameIdFromCategory = (category: string): string => {
    // Mapping kategori ke ID game
    const categoryMap: Record<string, string> = {
      "Matematika": "math-quiz",
      "Bahasa": "word-detective"
    };
    
    return categoryMap[category] || "math-quiz";
  };

  // Fungsi untuk menambahkan game baru
  const addGame = async (newGame: any) => {
    try {
      const { data, error } = await supabase
        .from('games')
        .insert([newGame])
        .select();

      if (error) throw error;

      // Refresh daftar games
      fetchGames();
      return { success: true, data };
    } catch (err) {
      console.error("Error adding game:", err);
      return { success: false, error: (err as Error).message || "Unknown error" };
    }
  };

  // Fungsi untuk memperbarui game
  const updateGame = async (id: string, updatedGame: any) => {
    try {
      const { data, error } = await supabase
        .from('games')
        .update(updatedGame)
        .eq('id', id)
        .select();

      if (error) throw error;

      // Refresh daftar games
      fetchGames();
      return { success: true, data };
    } catch (err) {
      console.error("Error updating game:", err);
      return { success: false, error: (err as Error).message || "Unknown error" };
    }
  };

  // Fungsi untuk menghapus game
  const deleteGame = async (id: string) => {
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh daftar games
      fetchGames();
      return { success: true };
    } catch (err) {
      console.error("Error deleting game:", err);
      return { success: false, error: (err as Error).message || "Unknown error" };
    }
  };

  const openGameModal = (game: Game) => {
    setSelectedGame(game);
  };

  const closeGameModal = () => {
    setSelectedGame(null);
  };

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  const openFormModal = (game?: DatabaseGame) => {
    setEditingGame(game || null);
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setEditingGame(null);
  };

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
            
            {/* Tombol Admin Mode */}
            <div className="mt-4">
              <Button 
                onClick={toggleAdminMode}
                className={`${isAdmin ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
              >
                {isAdmin ? 'Keluar Mode Admin' : 'Masuk Mode Admin'}
              </Button>
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
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {/* Tombol tambah game (hanya muncul di mode admin) */}
        {isAdmin && (
          <div className="mb-6">
            <Button 
              onClick={() => openFormModal()}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Game Baru
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <Card key={game.id} className="group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 overflow-hidden transform hover:-translate-y-2">
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
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${game.color}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Attractive Game Cover */}
                    <div className={`relative bg-gradient-to-br ${game.color} rounded-xl h-40 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
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

                    {/* Informasi tambahan game (hanya muncul di mode admin) */}
                    {isAdmin && (
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Rating: {game.rating} | Dimainkan: {game.plays}x</p>
                        <p>Kesulitan: {game.difficulty} | Usia: {game.age_group}</p>
                        <p>Durasi: {game.duration} | Pemain: {game.players}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white group-hover:shadow-lg transition-all duration-300"
                        onClick={() => openGameModal(game)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Mainkan
                      </Button>
                      
                      {/* Tombol edit dan hapus (hanya muncul di mode admin) */}
                      {isAdmin && (
                        <>
                          <Button 
                            variant="outline"
                            size="icon"
                            onClick={() => openFormModal(game as unknown as DatabaseGame)}
                            className="border-purple-300 text-purple-600 hover:bg-purple-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline"
                            size="icon"
                            onClick={async () => {
                              if (window.confirm(`Apakah Anda yakin ingin menghapus game "${game.title}"?`)) {
                                const result = await deleteGame(game.id);
                                if (result.success) {
                                  alert("Game berhasil dihapus");
                                } else {
                                  alert(`Gagal menghapus game: ${result.error}`);
                                }
                              }
                            }}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <GameModal game={selectedGame} onClose={closeGameModal} />
      {showFormModal && (
        <GameFormModal 
          game={editingGame} 
          onClose={closeFormModal} 
          onSave={addGame}
          onUpdate={updateGame}
        />
      )}
    </div>
  );
}