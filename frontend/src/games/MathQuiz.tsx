import { useState, useEffect } from "react";
import { Star, Timer, Trophy, Play } from "lucide-react";
import starKidsImg from "../../assets/Star Kids.png";

const questions = [
  { q: "5 + 3 = ?", a: ["7", "8", "9"], correct: 1 },
  { q: "12 - 4 = ?", a: ["8", "9", "10"], correct: 0 },
  { q: "6 × 2 = ?", a: ["10", "11", "12"], correct: 2 },
  { q: "15 ÷ 3 = ?", a: ["4", "5", "6"], correct: 1 },
  { q: "8 + 7 = ?", a: ["14", "15", "16"], correct: 1 },
];

export default function MathQuiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [isWrong, setIsWrong] = useState(false);
  const [showCover, setShowCover] = useState(true); // State untuk menampilkan sampul

  useEffect(() => {
    if (timer > 0 && !showResult && !showCover) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (timer === 0 && !showResult && !showCover) {
      handleAnswer(-1);
    }
  }, [timer, showResult, showCover]);

  const handleAnswer = (choiceIndex: number) => {
    if (choiceIndex === questions[index].correct) {
      setScore(score + 1);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }

    if (index < questions.length - 1) {
      setIndex(index + 1);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setShowResult(false);
    setTimer(10);
    setShowCover(true); // Kembali ke sampul saat reset
  };

  const startQuiz = () => {
    setShowCover(false);
  };

  // Tampilkan sampul game sebelum kuis dimulai
  if (showCover) {
    return (
      <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg text-center max-w-md mx-auto relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white"></div>
          <div className="absolute bottom-8 right-6 w-24 h-24 rounded-full bg-yellow-300"></div>
          <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-white"></div>
          <div className="absolute bottom-16 left-8 w-12 h-12 rounded-full bg-yellow-300"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/30">
              <div className="bg-white rounded-full p-3">
                <Star className="w-12 h-12 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">Math Pop Quiz</h1>
          <p className="text-purple-100 mb-6">Uji kemampuan matematikamu dengan serangkaian soal yang menantang!</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white">Soal</span>
              <span className="text-white font-bold">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Waktu</span>
              <span className="text-white font-bold">{timer} detik/soal</span>
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className="w-full bg-white text-purple-600 font-bold py-3 px-4 rounded-xl hover:bg-purple-50 transition flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Mulai Game
          </button>
          
          <div className="mt-4 flex justify-center">
            <img src={starKidsImg} alt="Star Kids" className="w-16 rounded-full border-2 border-white" />
          </div>
        </div>
      </div>
    );
  }

  // Tampilkan hasil akhir
  if (showResult) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg text-center max-w-md mx-auto">
        <img src={starKidsImg} alt="Star Kids" className="w-20 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Selesai!</h2>
        <p className="text-lg mb-2">Skor: {score}/{questions.length}</p>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5" />
          Lencana: {score >= 4 ? "Math Master" : "Math Rookie"}
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Daftar sekarang untuk simpan skor dan unlock game lainnya!
        </p>
        <div className="flex gap-2">
          <button
            onClick={resetQuiz}
            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Main Lagi
          </button>
        </div>
      </div>
    );
  }

  // Tampilkan kuis
  return (
    <div className={`p-6 rounded-2xl shadow-lg max-w-md mx-auto transition-all ${isWrong ? "animate-pulse bg-red-100" : "bg-white"}`}>
      <div className="flex items-center justify-between mb-4">
        <img src={starKidsImg} alt="Star Kids" className="w-16 rounded-full" />
        <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
          <Timer className="w-4 h-4 text-purple-600" />
          <span className="text-purple-600 font-bold">{timer}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 text-center">{questions[index].q}</h3>

      <div className="grid grid-cols-3 gap-3">
        {questions[index].a.map((choice, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="p-3 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-400 transition transform hover:scale-105"
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="mt-4 bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-1">{index + 1}/{questions.length}</p>
    </div>
  );
}