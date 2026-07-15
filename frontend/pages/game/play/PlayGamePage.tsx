import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function PlayGamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching game:", error);
        // Redirect to games page if game not found
        navigate("/");
      } else {
        setGame(data);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100">
        <p className="text-lg font-semibold text-indigo-600 animate-pulse">
          🎲 Sedang memuat game...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 relative overflow-hidden p-4">
      {/* Maskot */}
      <div className="absolute top-4 left-4 animate-bounce z-10">
        <img
          src={`/assets/${game.mascot || "Quen Child"}.png`}
          alt={game.mascot}
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg bg-white object-cover"
          onError={(e) =>
            (e.currentTarget.src = "/assets/default-mascot.png")
          }
        />
      </div>

      {/* Judul Game */}
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-4 text-center drop-shadow-sm z-10">
        {game.title}
      </h1>

      {/* Deskripsi singkat */}
      <p className="text-center max-w-xl text-gray-600 mb-6 z-10">
        {game.description}
      </p>

      {/* Area Game */}
      <div className="bg-white rounded-3xl shadow-xl p-3 border-2 border-indigo-100 w-full max-w-3xl z-10">
        <iframe
          src={game.embed_url}
          width="100%"
          height={game.embed_height || "480"}
          className="rounded-2xl w-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Tombol Navigasi */}
      <div className="flex gap-4 mt-6 z-10">
        <button
          onClick={() => navigate("/")}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          ⬅️ Kembali
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
        >
          🔁 Main Lagi
        </button>
      </div>

      {/* Ornamen Latar */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-3xl animate-pulse z-0"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-200 rounded-full opacity-30 blur-3xl animate-pulse delay-500 z-0"></div>
    </div>
  );
}