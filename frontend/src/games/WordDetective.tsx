import { useState, useEffect } from "react";
import { Star, Sparkles, Trophy, RotateCcw, Volume2 } from "lucide-react";
import quenChildImg from "../../assets/Quen Child.png";

// Struktur data level dengan ilustrasi yang lebih nyata
const levels = [
  {
    id: 1,
    word: "bumi",
    options: ["bulan", "bumi", "matahari", "bintang"],
    image: "🌍",
    category: "Planet",
    hint: "Planet biru tempat kita tinggal"
  },
  {
    id: 2,
    word: "buku",
    options: ["pensil", "buku", "tas", "meja"],
    image: "📚",
    category: "Alat Sekolah",
    hint: "Tempat menulis dan belajar"
  },
  {
    id: 3,
    word: "air",
    options: ["api", "tanah", "air", "angin"],
    image: "💧",
    category: "Elemen Alam",
    hint: "Cairan bening yang penting bagi kehidupan"
  },
  {
    id: 4,
    word: "mobil",
    options: ["motor", "mobil", "sepeda", "pesawat"],
    image: "🚗",
    category: "Kendaraan",
    hint: "Kendaraan dengan empat roda"
  },
  {
    id: 5,
    word: "apel",
    options: ["jeruk", "apel", "pisang", "anggur"],
    image: "🍎",
    category: "Buah",
    hint: "Buah merah yang renyah"
  }
];

export default function WordDetective() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [showHint, setShowHint] = useState(false);

  const level = levels[currentLevel];

  // Fungsi untuk menangani jawaban
  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Cegah multiple clicks
    
    setSelectedAnswer(answer);
    const correct = answer === level.word;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 10);
      // Buat efek bintang jatuh
      createStars();
    }
    
    // Pindah ke level berikutnya setelah delay
    setTimeout(() => {
      if (currentLevel < levels.length - 1) {
        setCurrentLevel(currentLevel + 1);
        resetLevel();
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  // Fungsi untuk reset level
  const resetLevel = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setShowHint(false);
  };

  // Fungsi untuk restart game
  const restartGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameCompleted(false);
    resetLevel();
  };

  // Fungsi untuk menampilkan petunjuk
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Fungsi untuk membuat efek bintang
  const createStars = () => {
    const newStars = [];
    for (let i = 0; i < 15; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }
    setStars(newStars);
    
    // Hapus bintang setelah animasi
    setTimeout(() => {
      setStars([]);
    }, 1000);
  };

  // Efek untuk menghapus feedback setelah delay
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  // Tampilkan layar akhir jika game selesai
  if (gameCompleted) {
    return (
      <div className="min-h-[500px] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 rounded-3xl p-6 relative overflow-hidden">
        {/* Bintang latar belakang */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="mb-6">
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Selamat!</h2>
            <p className="text-xl text-purple-200">Kamu telah menyelesaikan semua level</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/30">
            <h3 className="text-2xl font-bold text-white mb-2">Skor Akhir</h3>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-8 h-8 text-yellow-400 fill-current" />
              <span className="text-4xl font-bold text-white">{score}</span>
            </div>
          </div>
          
          <button
            onClick={restartGame}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            Main Lagi
          </button>
        </div>
        
        <style>{`
          @keyframes float {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-100px) translateX(20px);
              opacity: 0;
            }
          }
          .animate-float {
            animation: float 1s ease-out forwards;
          }
          .animate-shake {
            animation: shake 0.5s ease-in-out;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 rounded-3xl p-6 relative overflow-hidden">
      {/* Bintang latar belakang */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      {/* Bintang jatuh efek */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        />
      ))}
      
      <div className="relative z-10">
        {/* Header dengan skor dan level */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <span className="text-white font-bold">Level {currentLevel + 1}/{levels.length}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white font-bold">{score}</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Maskot Quen Child */}
          <div className="flex justify-center lg:justify-start lg:w-1/3">
            <div className="relative">
              <img 
                src={quenChildImg} 
                alt="Quen Child" 
                className="w-40 h-40 object-contain drop-shadow-2xl animate-float"
              />
              <div className="absolute -top-3 -right-3 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                Detektif Kata!
              </div>
            </div>
          </div>
          
          {/* Konten game */}
          <div className="flex-1">
            {/* Kategori dan petunjuk */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {level.category}
              </div>
              <button 
                onClick={toggleHint}
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Petunjuk</span>
              </button>
            </div>
            
            {/* Petunjuk teks */}
            {showHint && (
              <div className="bg-blue-500/80 text-white p-3 rounded-lg mb-4 animate-pulse">
                {level.hint}
              </div>
            )}
            
            {/* Ilustrasi kosmik yang lebih nyata */}
            <div className="bg-gradient-to-br from-blue-700/50 to-purple-700/50 rounded-2xl p-6 mb-6 border border-white/20 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="text-8xl animate-bounce" style={{ animationDuration: '2s' }}>
                    {level.image}
                  </div>
                </div>
                <h3 className="text-center text-white text-xl font-bold">
                  Apa nama benda ini?
                </h3>
              </div>
            </div>
            
            {/* Pilihan jawaban */}
            <div className="grid grid-cols-2 gap-4">
              {level.options.map((option, index) => {
                let buttonClass = "bg-white/20 backdrop-blur-sm border border-white/30 text-white";
                
                if (selectedAnswer) {
                  if (option === level.word) {
                    buttonClass = "bg-green-500 border-green-300 text-white";
                  } else if (option === selectedAnswer && !isCorrect) {
                    buttonClass = "bg-red-500 border-red-300 text-white animate-shake";
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={!!selectedAnswer}
                    className={`${buttonClass} py-4 px-2 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2`}
                  >
                    <span className="text-2xl">
                      {getOptionEmoji(index)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Feedback */}
            {showFeedback && (
              <div className={`mt-4 p-4 rounded-xl text-center font-bold text-lg ${
                isCorrect ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'
              }`}>
                {isCorrect ? 'Benar! Hebat sekali! 🎉' : 'Belum tepat, coba lagi! 😊'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float 1s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

// Fungsi untuk mendapatkan emoji berdasarkan index
function getOptionEmoji(index: number) {
  const emojis = ["🇦", "🇧", "🇨", "🇩"];
  return emojis[index];
}