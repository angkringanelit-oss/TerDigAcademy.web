import { X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "../src/lib/supabaseClient";

// Tipe data untuk game yang akan ditampilkan di modal
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
  game_url: string; // Tambahkan properti game_url
  component?: React.ComponentType; // Optional untuk kompatibilitas
}

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  if (!game) return null;

  // Fungsi untuk menambah jumlah plays
  const trackPlay = async (gameId: string) => {
    try {
      // Pertama, dapatkan nilai plays saat ini
      const { data, error } = await supabase
        .from("games")
        .select("plays")
        .eq("id", gameId)
        .single();

      if (error) {
        console.error("Gagal mendapatkan data plays:", error);
        return;
      }

      // Kemudian, update plays dengan nilai yang sudah ditambah 1
      const { error: updateError } = await supabase
        .from("games")
        .update({ plays: data.plays + 1 })
        .eq("id", gameId);

      if (updateError) {
        console.error("Gagal update plays:", updateError);
      }
    } catch (err) {
      console.error("Error saat update plays:", err);
    }
  };

  // Menentukan komponen game berdasarkan kategori
  const getGameComponent = () => {
    // Untuk saat ini, kita akan menggunakan placeholder
    // Anda bisa mengimplementasikan logika untuk memilih komponen game yang sesuai
    return () => (
      <div className="text-center py-8">
        <h3 className="text-xl font-bold mb-4">{game.title}</h3>
        <p className="text-gray-600 mb-6">{game.description}</p>
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <p className="text-gray-500">Game component akan ditampilkan di sini</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <h4 className="font-semibold mb-2">Detail Game</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Kategori: {game.category}</li>
              <li>Kesulitan: {game.difficulty}</li>
              <li>Usia: {game.age_group}</li>
              <li>Pemain: {game.players}</li>
              <li>Durasi: {game.duration}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Rewards</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {game.rewards.map((reward, index) => (
                <li key={index}>• {reward}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const GameComponent = getGameComponent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{game.title}</h2>
            <p className="text-sm text-gray-500">{game.category}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4">
          <GameComponent />
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-between">
          <Button 
            onClick={onClose}
            variant="outline"
          >
            Kembali
          </Button>
          
          {/* Tombol "Main" yang diperbaiki */}
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={() => {
              trackPlay(game.id);        // Auto +1 plays
              const newWindow = window.open(game.game_url, "_blank", "noopener,noreferrer"); // Buka tab baru
              
              // Fallback jika popup blocker menghalangi
              if (!newWindow || newWindow.closed) {
                alert("Link tidak bisa dibuka. Coba lagi nanti.");
              }
            }}
          >
            <Gamepad2 className="w-4 h-4 mr-2" />
            Mainkan Game
          </Button>
        </div>
      </div>
    </div>
  );
}