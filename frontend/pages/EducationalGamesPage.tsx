// src/pages/EducationalGamesPage.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Play, Star, Zap, Trophy, Heart, Users, RefreshCw } from "lucide-react";
import { GameModal } from "@/components/GameModal";
import starKidsImg from "@/assets/Star Kids.png";
import quenChlidImg from "@/assets/Quen Child.png";
import { supabase } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

// ----------  T Y P E  ----------
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
  rewards: any; // Bisa berupa array atau objek
  features: any; // Bisa berupa array atau objek
  game_url: string;
  embed_url?: string; // Tambahkan properti embed_url
  embed_height?: number; // Tambahkan properti embed_height
  is_published: boolean;
  created_at: string;
}

// ----------  K O N S T A N T A  ----------
const gameCategories = [
  { id: "all", name: "Semua Game", icon: Gamepad2, color: "bg-blue-500" },
  { id: "matematika", name: "Matematika", icon: Zap, color: "bg-green-500" },
  { id: "bahasa", name: "Bahasa", icon: Star, color: "bg-purple-500" },
  { id: "seni", name: "Seni & Kreativitas", icon: Heart, color: "bg-pink-500" },
  { id: "logika", name: "Logika & Puzzle", icon: Trophy, color: "bg-orange-500" },
  { id: "karakter", name: "Karakter", icon: Heart, color: "bg-red-500" }
];

const difficultyColors = {
  Mudah: "bg-green-100 text-green-700 border-green-200",
  Sedang: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Sulit: "bg-red-100 text-red-700 border-red-200"
};

// ----------  H E L P E R  ----------
/* Supabase on-the-fly: 16:9, auto WebP, quality 80% */
const resizeThumb = (url: string) =>
  url.includes("supabase.co")
    ? `${url}?resize=cover&format=auto&quality=80`
    : url;

// ----------  C O M P O N E N T  ----------
export function EducationalGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  // Tambahkan logging untuk debugging
  logger.debug("EducationalGamesPage render:", { games, loading, selectedCategory, selectedDifficulty });

  // Fetch + Realtime
  useEffect(() => {
    logger.debug("EducationalGamesPage useEffect running");
    // Panggil fetchGames tanpa menunggu
    fetchGames();
    
    const channel = supabase
      .channel("games-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "games" }, fetchGames)
      .subscribe();

    // Return cleanup function
    return () => {
      // Membersihkan channel saat komponen di-unmount
      logger.debug("Cleaning up games channel");
      channel.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    logger.debug("Memulai fetch games dari Supabase");
    try {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      logger.debug("Respons dari Supabase:", { data, error });
      
      if (!error && data) {
        logger.debug("Data diterima, memproses:", data.length, "items");
        const parsed: Game[] = data.map((g: any) => {
          // Tangani struktur rewards dan features yang berbeda
          let rewards = [];
          let features = [];
          
          if (Array.isArray(g.rewards)) {
            rewards = g.rewards;
          } else if (g.rewards && typeof g.rewards === 'object') {
            // Jika rewards adalah objek, ubah ke array
            if (g.rewards.badges) {
              rewards = Array.isArray(g.rewards.badges) ? g.rewards.badges : [g.rewards.badges];
            }
          } else if (typeof g.rewards === 'string') {
            // Jika rewards adalah string JSON, parse dulu
            try {
              const parsed = JSON.parse(g.rewards);
              rewards = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
              rewards = [g.rewards];
            }
          }
          
          if (Array.isArray(g.features)) {
            features = g.features;
          } else if (g.features && typeof g.features === 'object') {
            // Jika features adalah objek, ubah ke array
            features = Object.keys(g.features).map(key => `${key}: ${g.features[key]}`);
          } else if (typeof g.features === 'string') {
            // Jika features adalah string JSON, parse dulu
            try {
              const parsed = JSON.parse(g.features);
              features = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
              features = [g.features];
            }
          }
          
          const result = {
            ...g,
            rewards,
            features
          };
          
          logger.debug("Game diproses:", result);
          return result;
        });
        logger.debug("Data diproses, mengatur state:", parsed.length, "items");
        setGames(parsed);
      } else {
        logger.error("Gagal ambil game:", error);
      }
    } catch (err) {
      logger.error("Error fetching games:", err);
    } finally {
      logger.debug("Selesai fetch games");
      setLoading(false);
    }
  };

  // Tambah plays
  const trackPlay = async (gameId: string) => {
    try {
      const { data } = await supabase.from("games").select("plays").eq("id", gameId).single();
      const newPlays = (data?.plays || 0) + 1;
      await supabase.from("games").update({ plays: newPlays }).eq("id", gameId);
      setGames(prev => prev.map(g => (g.id === gameId ? { ...g, plays: newPlays } : g)));
    } catch (err) {
      logger.error("Error tracking play:", err);
    }
  };

  // Filter
  const filtered = games.filter(g =>
    (selectedCategory === "all" || g.category === selectedCategory) &&
    (selectedDifficulty === "all" || g.difficulty === selectedDifficulty)
  );

  // Icon & color helper
  const getIcon = (cat: string) =>
    cat === "matematika" ? Zap : cat === "bahasa" ? Star : Gamepad2;
  const getColor = (cat: string) =>
    cat === "matematika"
      ? "from-blue-400 to-purple-500"
      : cat === "bahasa"
      ? "from-blue-500 to-teal-500"
      : "from-purple-500 to-pink-500";

  // UI Loading
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-5 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data games...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      {/* HERO */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-center text-2xl font-bold text-indigo-700 mb-6">
              🎮 Pilih Game Edukatifmu!
            </h1>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-8">
              <div className="animate-bounce" style={{ animationDuration: "2s" }}>
                <img src={starKidsImg} alt="Star Kids" className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl hover:scale-110 transition-transform" />
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                  Game Edukatif
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                  Belajar sambil bermain dengan game edukatif yang seru dan menantang
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4 text-yellow-500" /> <span>50K+ Pemain Aktif</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                    <Trophy className="w-4 h-4 text-purple-500" /> <span>1000+ Game Dimainkan</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 text-pink-500" /> <span>Rating 4.9/5</span>
                  </div>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDuration: "2s", animationDelay: "1s" }}>
                <img src={quenChlidImg} alt="Quen Child" className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>
        {/* elemen hias */}
        <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-yellow-300 opacity-20 animate-ping"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-pink-300 opacity-20 animate-ping" style={{ animationDelay: "1s" }}></div>
      </section>

      {/* FITUR */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Trophy, title: "Penghargaan", desc: "Dapatkan lencana dan penghargaan untuk setiap pencapaian" },
              { icon: Heart, title: "Belajar Sambil Bermain", desc: "Pengalaman belajar yang menyenangkan dan edukatif" },
              { icon: Star, title: "Tantangan Seru", desc: "Berbagai level tantangan yang menarik dan memotivasi" }
            ].map((f, i) => (
              <div key={i} className="text-center p-6 bg-white/70 rounded-2xl border border-white/20 hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Daftar Game Edukatif</h2>
            <Button onClick={fetchGames} size="sm" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh Data
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Kategori */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-4">Kategori Game</h3>
              <div className="flex flex-wrap gap-3">
                {gameCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`${selectedCategory === cat.id ? cat.color + " text-white" : "hover:" + cat.color + " hover:text-white"} transition-all`}
                    >
                      <Icon className="w-4 h-4 mr-2" /> {cat.name}
                    </Button>
                  );
                })}
              </div>
            </div>
            {/* Kesulitan */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tingkat Kesulitan</h3>
              <div className="flex gap-3">
                {["all", "Mudah", "Sedang", "Sulit"].map((d) => (
                  <Button
                    key={d}
                    variant={selectedDifficulty === d ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(d)}
                  >
                    {d === "all" ? "Semua" : d}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR GAME */}
      <div className="container mx-auto px-4 py-8">
        {filtered.length === 0 && !loading && (
          <p className="text-center text-gray-500">Tidak ada game yang tersedia.</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
          {filtered.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-3 flex flex-col items-center justify-between hover:scale-105"
            >
              <img
                src={resizeThumb(game.thumbnail)}
                alt={game.title}
                className="w-full h-40 object-cover rounded-xl mb-3 border-2 border-indigo-100"
                onError={(e) => (e.currentTarget.src = "/assets/default-thumbnail.png")}
              />
              <h3 className="text-center text-sm font-semibold text-indigo-700 mb-2">
                {game.title}
              </h3>
              <button
                onClick={() => window.open(`/game/play/${game.id}`, "_blank")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-1 rounded-full transition"
              >
                Mainkan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal detail game */}
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}
