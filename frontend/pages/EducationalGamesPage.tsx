import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Trophy, Users, Star, Play, Brain, Palette, Calculator, Heart, Zap, Crown, Target, Timer } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";

const gameCategories = [
  { id: "all", name: "Semua Game", icon: Gamepad2, color: "bg-blue-500" },
  { id: "matematika", name: "Matematika", icon: Calculator, color: "bg-green-500" },
  { id: "bahasa", name: "Bahasa", icon: Brain, color: "bg-purple-500" },
  { id: "seni", name: "Seni & Kreativitas", icon: Palette, color: "bg-pink-500" },
  { id: "logika", name: "Logika & Puzzle", icon: Target, color: "bg-orange-500" },
  { id: "karakter", name: "Karakter", icon: Heart, color: "bg-red-500" }
];

const gamesData = [
  {
    id: 1,
    title: "Petualangan Angka Ajaib",
    description: "Bantu Star Kids mengumpulkan angka-angka untuk menyelesaikan misi matematika",
    category: "matematika",
    difficulty: "Mudah",
    ageGroup: "6-9 tahun",
    players: 1,
    duration: "15-20 menit",
    rating: 4.8,
    plays: 15420,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Star Kids",
    rewards: ["Lencana Matematika", "Poin XP", "Sertifikat"],
    features: ["Suara Narasi", "Animasi Interaktif", "Progress Tracking"]
  },
  {
    id: 2,
    title: "Studio Desain Quen Chlid",
    description: "Buat karya seni digital bersama Quen Chlid dalam studio kreatif yang penuh warna",
    category: "seni",
    difficulty: "Mudah",
    ageGroup: "5-12 tahun",
    players: 1,
    duration: "30-45 menit",
    rating: 4.9,
    plays: 12890,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Quen Chlid",
    rewards: ["Galeri Digital", "Tools Premium", "Badge Seniman"],
    features: ["Editor Drag & Drop", "Template Kreatif", "Export Hasil"]
  },
  {
    id: 3,
    title: "Kata-kata Berkekuatan",
    description: "Game puzzle kata yang melatih kosakata dan kemampuan berbahasa Indonesia",
    category: "bahasa",
    difficulty: "Sedang",
    ageGroup: "7-12 tahun",
    players: 1,
    duration: "10-15 menit",
    rating: 4.7,
    plays: 18750,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Star Kids",
    rewards: ["Kamus Digital", "Poin Bahasa", "Gelar Penulis"],
    features: ["Kosakata Baru", "Hint Cerdas", "Level Adaptif"]
  },
  {
    id: 4,
    title: "Teka-teki Logika Ruang",
    description: "Asah kemampuan berpikir logis dengan puzzle ruang 3D yang menantang",
    category: "logika",
    difficulty: "Sulit",
    ageGroup: "9-15 tahun",
    players: 1,
    duration: "20-30 menit",
    rating: 4.6,
    plays: 8930,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Star Kids",
    rewards: ["Master Logika", "Brain Power", "Genius Medal"],
    features: ["3D Visualization", "Hint System", "Time Challenge"]
  },
  {
    id: 5,
    title: "Kebun Karakter",
    description: "Tanam dan rawat nilai-nilai karakter positif dalam kebun virtual yang indah",
    category: "karakter",
    difficulty: "Mudah",
    ageGroup: "4-10 tahun",
    players: 1,
    duration: "25-35 menit",
    rating: 4.9,
    plays: 21450,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Quen Chlid",
    rewards: ["Kebun Pribadi", "Karakter Badge", "Story Book"],
    features: ["Daily Missions", "Character Stories", "Value Learning"]
  },
  {
    id: 6,
    title: "Turnamen Matematika",
    description: "Kompetisi matematika real-time dengan pemain lain dari seluruh Indonesia",
    category: "matematika",
    difficulty: "Sedang",
    ageGroup: "8-14 tahun",
    players: "1-4",
    duration: "15-25 menit",
    rating: 4.8,
    plays: 25670,
    thumbnail: "/api/placeholder/300/200",
    mascot: "Star Kids",
    rewards: ["Trophy Online", "Ranking Points", "Champion Badge"],
    features: ["Multiplayer Mode", "Live Ranking", "Voice Chat"]
  }
];

const difficultyColors = {
  "Mudah": "bg-green-100 text-green-700 border-green-200",
  "Sedang": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Sulit": "bg-red-100 text-red-700 border-red-200"
};

export function EducationalGamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredGames = gamesData.filter(game => {
    const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || game.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-8">
              <Mascot 
                src={starKidsImg}
                alt="Star Kids"
                size="xl"
                animation="float"
                className="hidden lg:block"
              />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                  Game Edukatif
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                  Belajar sambil bermain dengan game edukatif yang seru dan menantang
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>50K+ Pemain Aktif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>1M+ Game Dimainkan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-500" />
                    <span>Rating 4.8/5</span>
                  </div>
                </div>
              </div>
              <Mascot 
                src={quenChlidImg}
                alt="Quen Chlid"
                size="xl"
                animation="float"
                className="hidden lg:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/70 rounded-2xl border border-white/20">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Gameplay Seru</h3>
              <p className="text-gray-600 text-sm">Mekanisme game yang engaging dan tidak membosankan</p>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-2xl border border-white/20">
              <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Asah Otak</h3>
              <p className="text-gray-600 text-sm">Melatih kemampuan kognitif dan problem solving</p>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-2xl border border-white/20">
              <Crown className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Sistem Reward</h3>
              <p className="text-gray-600 text-sm">Pencapaian dan hadiah untuk motivasi belajar</p>
            </div>
            <div className="text-center p-6 bg-white/70 rounded-2xl border border-white/20">
              <Timer className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Pantau kemajuan dan pencapaian anak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-4">Kategori Game</h3>
              <div className="flex flex-wrap gap-3">
                {gameCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${selectedCategory === category.id ? category.color + " text-white" : "hover:" + category.color + " hover:text-white"} transition-all duration-300`}
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tingkat Kesulitan</h3>
              <div className="flex gap-3">
                {["all", "Mudah", "Sedang", "Sulit"].map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="transition-all duration-300"
                  >
                    {difficulty === "all" ? "Semua" : difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGames.map((game) => (
              <Card key={game.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 bg-white/90 backdrop-blur-sm border-0 overflow-hidden">
                <div className="relative">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                  
                  {/* Difficulty Badge */}
                  <Badge className={`absolute top-3 left-3 ${difficultyColors[game.difficulty as keyof typeof difficultyColors]} border`}>
                    {game.difficulty}
                  </Badge>
                  
                  {/* Players Count */}
                  <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {game.players}
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors leading-tight">
                      {game.title}
                    </CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500 ml-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">{game.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="text-sm">{game.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Game Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Umur:</span>
                        <p className="font-medium text-gray-800">{game.ageGroup}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Durasi:</span>
                        <p className="font-medium text-gray-800">{game.duration}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {game.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {game.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{game.features.length - 2} lainnya
                        </Badge>
                      )}
                    </div>

                    {/* Bottom Section */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {game.mascot === "Star Kids" ? "SK" : "QC"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">{game.mascot}</p>
                          <p className="text-xs text-gray-500">{game.plays.toLocaleString()} plays</p>
                        </div>
                      </div>
                      
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                        <Gamepad2 className="w-4 h-4 mr-1" />
                        Main
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap Memulai Petualangan Belajar?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Bergabunglah dengan ribuan anak yang sudah merasakan keseruan belajar melalui game edukatif
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                Mulai Bermain Gratis
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold">
                Lihat Semua Game
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}