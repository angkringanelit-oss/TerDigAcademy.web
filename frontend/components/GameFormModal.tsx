import { useState, useEffect } from "react";
import { X, Save, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "../lib/supabaseClient";

interface GameFormData {
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
}

interface GameFormModalProps {
  game?: any; // Game yang akan diedit (jika ada)
  onClose: () => void;
  onSave: (gameData: GameFormData) => Promise<{ success: boolean; error?: string }>;
  onUpdate?: (id: string, gameData: Partial<GameFormData>) => Promise<{ success: boolean; error?: string }>;
}

export function GameFormModal({ game, onClose, onSave, onUpdate }: GameFormModalProps) {
  const [formData, setFormData] = useState<GameFormData>({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    age_group: "",
    players: "",
    duration: "",
    rating: 0,
    plays: 0,
    thumbnail: "",
    mascot: "",
    game_url: "",
    source: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title || "",
        description: game.description || "",
        category: game.category || "",
        difficulty: game.difficulty || "",
        age_group: game.age_group || "",
        players: game.players || "",
        duration: game.duration || "",
        rating: game.rating || 0,
        plays: game.plays || 0,
        thumbnail: game.thumbnail || "",
        mascot: game.mascot || "",
        game_url: game.game_url || "",
        source: game.source || ""
      });
    }
  }, [game]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'plays' ? (value ? Number(value) : 0) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      if (game && onUpdate) {
        // Update game yang ada
        result = await onUpdate(game.id, formData);
      } else {
        // Tambah game baru
        result = await onSave(formData);
      }

      if (result.success) {
        onClose();
      } else {
        setError(result.error || "Terjadi kesalahan saat menyimpan data");
      }
    } catch (err) {
      setError((err as Error).message || "Terjadi kesalahan tidak terduga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {game ? "Edit Game" : "Tambah Game Baru"}
          </h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 p-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Game</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tingkat Kesulitan</label>
              <Input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kelompok Usia</label>
              <Input
                type="text"
                name="age_group"
                value={formData.age_group}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Pemain</label>
              <Input
                type="text"
                name="players"
                value={formData.players}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durasi</label>
              <Input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <Input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah Dimainkan</label>
              <Input
                type="number"
                name="plays"
                value={formData.plays}
                onChange={handleChange}
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mascot</label>
              <Input
                type="text"
                name="mascot"
                value={formData.mascot}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sumber</label>
              <Input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Game</label>
              <Input
                type="url"
                name="game_url"
                value={formData.game_url}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Thumbnail</label>
              <Input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Save className="w-4 h-4 mr-2" />
                  {game ? "Update Game" : "Tambah Game"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}