import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  User, Phone, BookOpen, MessageSquare, GraduationCap, 
  Send, CheckCircle, Users, Sparkles, ArrowRight 
} from "lucide-react";

const PROGRAMS = [
  { value: "calistung", label: "Program Calistung (TK/PAUD)" },
  { value: "bimbel-a", label: "Bimbel Akademik SD (Kelas 1-3 / Fase A)" },
  { value: "bimbel-bc", label: "Bimbel Akademik SD (Kelas 4-6 / Fase B & C)" },
  { value: "prompting-ai", label: "Kelas Prompting AI untuk Anak" },
];

const ICON_CLASS = "w-5 h-5 text-indigo-500";

export function DaftarPage() {
  const [formData, setFormData] = useState({
    namaOrtu: "",
    noWa: "",
    namaAnak: "",
    program: "",
    catatan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.namaOrtu.trim()) {
      newErrors.namaOrtu = "Nama lengkap orang tua wajib diisi";
    }
    if (!formData.noWa.trim()) {
      newErrors.noWa = "Nomor WhatsApp wajib diisi";
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(formData.noWa.replace(/\s/g, ""))) {
      newErrors.noWa = "Format nomor WhatsApp tidak valid (contoh: 081234567890)";
    }
    if (!formData.namaAnak.trim()) {
      newErrors.namaAnak = "Nama anak wajib diisi";
    }
    if (!formData.program) {
      newErrors.program = "Pilih program yang diminati";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to first error
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    const programLabel = PROGRAMS.find((p) => p.value === formData.program)?.label || formData.program;
    const catatan = formData.catatan.trim() || "-";

    const pesan = [
      `Halo Admin TerDig Academy! 👋`,
      ``,
      `Saya ingin mendaftarkan anak saya untuk trial gratis.`,
      ``,
      `👤 Nama Orang Tua: ${formData.namaOrtu.trim()}`,
      `📱 No. WhatsApp: ${formData.noWa.trim()}`,
      `👦 Nama Anak: ${formData.namaAnak.trim()}`,
      `📚 Program: ${programLabel}`,
      `📝 Catatan: ${catatan}`,
      ``,
      `Mohon infonya lebih lanjut. Terima kasih!`,
    ].join("\n");

    const encodedMessage = encodeURIComponent(pesan);
    const waUrl = `https://wa.me/62895339329650?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(waUrl, "_blank");

    // Short delay to show success state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const renderField = (
    field: string,
    label: string,
    placeholder: string,
    icon: React.ReactNode,
    inputType: "input" | "textarea" | "select" = "input",
    inputProps: Record<string, string> = {}
  ) => {
    const hasError = !!errors[field];
    const value = formData[field as keyof typeof formData];

    return (
      <div data-error={hasError ? "true" : undefined}>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {label}
          {field !== "catatan" && <span className="text-red-500 ml-1">*</span>}
        </label>

        {inputType === "textarea" ? (
          <Textarea
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder}
            leftIcon={icon}
            error={hasError}
            className="min-h-[100px] resize-y"
            maxRows={6}
            autoGrow
          />
        ) : inputType === "select" ? (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
              {icon}
            </span>
            <select
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] pl-10 ${
                hasError ? "aria-invalid:ring-destructive/20 aria-invalid:border-destructive" : ""
              } ${!value ? "text-muted-foreground" : ""}`}
              aria-invalid={hasError}
            >
              <option value="" disabled>
                Pilih program yang diminati
              </option>
              {PROGRAMS.map((prog) => (
                <option key={prog.value} value={prog.value}>
                  {prog.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <Input
            type={inputProps.type || "text"}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            placeholder={placeholder}
            leftIcon={icon}
            error={hasError}
          />
        )}

        {hasError && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Daftar Trial Gratis - TerDig Academy</title>
        <meta
          name="description"
          content="Daftar trial gratis bimbel TerDig Academy untuk anak TK dan SD. Belajar Calistung, Matematika, IPAS, dan AI dengan metode Kurikulum Merdeka."
        />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Gratis Trial — Tanpa Biaya
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Daftar Trial Gratis
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Bimbel TerDig Academy
              </span>
            </h1>
            <p className="text-indigo-100 text-lg max-w-xl mx-auto">
              Isi formulir di bawah ini, dan tim kami akan segera menghubungi Anda via WhatsApp
              untuk menjadwalkan sesi trial gratis!
            </p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative -mt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: CheckCircle, text: "Gratis 1 Sesi Trial", color: "text-green-500" },
                { icon: Users, text: "Konsultasi via WhatsApp", color: "text-blue-500" },
                { icon: GraduationCap, text: "Kurikulum Merdeka", color: "text-purple-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
                >
                  <div className={`${item.color} bg-opacity-10 bg-current rounded-lg p-2`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Registration Form */}
            <Card className="shadow-xl border-0 bg-white rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-gray-900">Formulir Pendaftaran</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      Isi data diri untuk memulai trial
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {renderField(
                    "namaOrtu",
                    "Nama Lengkap Orang Tua",
                    "Masukkan nama lengkap Anda",
                    <User className={ICON_CLASS} />
                  )}

                  {renderField(
                    "noWa",
                    "Nomor WhatsApp",
                    "081234567890",
                    <Phone className={ICON_CLASS} />,
                    "input",
                    { type: "tel" }
                  )}

                  {renderField(
                    "namaAnak",
                    "Nama Anak",
                    "Masukkan nama anak",
                    <GraduationCap className={ICON_CLASS} />
                  )}

                  {renderField(
                    "program",
                    "Program yang Diminati",
                    "Pilih program",
                    <BookOpen className={ICON_CLASS} />,
                    "select"
                  )}

                  {renderField(
                    "catatan",
                    "Catatan Tambahan (opsional)",
                    "Misal: Anak kesulitan di matematika, atau ingin jadwal sore hari",
                    <MessageSquare className={ICON_CLASS} />,
                    "textarea"
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    fullWidth
                    loading={isSubmitting}
                    loadingText="Membuka WhatsApp..."
                    rightIcon={<Send className="w-5 h-5" />}
                    className="text-base shadow-lg hover:shadow-xl"
                  >
                    Kirim via WhatsApp
                  </Button>

                  <p className="text-center text-xs text-gray-400 mt-4">
                    Dengan mendaftar, Anda menyetujui kebijakan privasi TerDig Academy.
                    Data Anda aman dan tidak akan disebarluaskan.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* FAQ / Info tambahan */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-500" />
                Yang Akan Terjadi Setelah Ini
              </h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <span>Tim admin akan merespon pesan WhatsApp Anda dalam 1x24 jam.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <span>Kami akan menjadwalkan sesi trial gratis 30 menit sesuai waktu yang Anda inginkan.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <span>Anak Anda akan belajar dengan tutor kami dan merasakan langsung metode belajar TerDig!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
