import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram: { id: string; title: string } | null;
}

export function RegistrationForm({ isOpen, onClose, selectedProgram }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    namaAnak: "",
    usiaAnak: "",
    namaOrangTua: "",
    email: "",
    nomorHP: "",
    program: selectedProgram?.title || ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (selectedProgram) {
      setFormData(prev => ({ ...prev, program: selectedProgram.title }));
    }
  }, [selectedProgram]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.from("registrations").insert([
        {
          child_name: formData.namaAnak,
          parent_name: formData.namaOrangTua,
          child_age: parseInt(formData.usiaAnak),
          program_id: selectedProgram?.id || null,
          phone: formData.nomorHP,
          email: formData.email,
          notes: ""
        }
      ]);

      if (error) {
        console.error("Error saving registration:", error.message);
        setError("Pendaftaran gagal, silakan coba lagi.");
        return;
      }

      console.log("Registration saved:", data);

      // Kirim notifikasi Telegram via Edge Function
      const { data: notifRes, error: notifErr } = await supabase.functions.invoke(
        "notify-telegram",
        {
          body: {
            message: `📩 Pendaftaran baru:
Nama Anak: ${formData.namaAnak}
Usia: ${formData.usiaAnak}
Orang Tua: ${formData.namaOrangTua}
Email: ${formData.email}
HP: ${formData.nomorHP}
Program: ${formData.program}`,
          },
        }
      );

      if (notifErr) {
        console.error("Telegram error:", notifErr.message);
      } else {
        console.log("Telegram sent:", notifRes);
      }

      // Tampilkan sukses dulu, lalu reset form & auto-close
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          namaAnak: "",
          usiaAnak: "",
          namaOrangTua: "",
          email: "",
          nomorHP: "",
          program: selectedProgram?.title || ""
        });
      }, 2500);
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Form Pendaftaran</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            ✅ Pendaftaran berhasil! Kami akan segera menghubungi Anda.
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="namaAnak" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Anak
              </label>
              <input
                type="text"
                id="namaAnak"
                name="namaAnak"
                value={formData.namaAnak}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="usiaAnak" className="block text-sm font-medium text-gray-700 mb-1">
                Usia Anak
              </label>
              <input
                type="number"
                id="usiaAnak"
                name="usiaAnak"
                value={formData.usiaAnak}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="namaOrangTua" className="block text-sm font-medium text-gray-700 mb-1">
                Nama Orang Tua
              </label>
              <input
                type="text"
                id="namaOrangTua"
                name="namaOrangTua"
                value={formData.namaOrangTua}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="nomorHP" className="block text-sm font-medium text-gray-700 mb-1">
                Nomor HP
              </label>
              <input
                type="tel"
                id="nomorHP"
                name="nomorHP"
                value={formData.nomorHP}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                Program yang Dipilih
              </label>
              <input
                type="text"
                id="program"
                name="program"
                value={formData.program}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
