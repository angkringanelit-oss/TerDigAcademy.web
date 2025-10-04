import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function ConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState<number | "">("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("consultations").insert([
      {
        name,
        email,
        phone,
        child_age: childAge ? Number(childAge) : null,
        message,
      },
    ]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
      setChildAge("");
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Konsultasi Gratis</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">Terima kasih! Kami akan segera menghubungi Anda.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium">Nama Lengkap</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email Anda"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-medium">Nomor HP</label>
          <input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Masukkan nomor HP Anda"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="childAge" className="block mb-2 font-medium">Usia Anak</label>
          <input
            id="childAge"
            type="number"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value ? parseInt(e.target.value) : "")}
            placeholder="Masukkan usia anak"
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-medium">Pesan</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tuliskan pertanyaan atau kebutuhan konsultasi Anda"
            rows={4}
            className="border p-3 w-full rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full font-medium hover:bg-blue-700 transition-colors"
        >
          {loading ? "Mengirim..." : "Kirim Permintaan Konsultasi"}
        </button>
      </form>
    </div>
  );
}