import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModals({ isOpen, onClose, defaultTab = "login" }: AuthModalsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  /* ---------- ESC key close ---------- */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ---------- Login ---------- */
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      // TODO: ganti dengan API call setelah backend ready
      console.log("Login data:", loginData);
      toast({ title: "Login berhasil (dummy)" });
      onClose(); // tutup modal
    } catch (err: any) {
      toast({ title: err?.response?.data?.message || "Login gagal", variant: "destructive" });
    } finally {
      setIsLoggingIn(false);
    }
  };

  /* ---------- Register ---------- */
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* ---- Validasi ---- */
    if (registerData.password.length < 8) {
      toast({ title: "Password minimal 8 karakter", variant: "destructive" });
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      toast({ title: "Password tidak cocok", variant: "destructive" });
      return;
    }
    if (!registerData.agreeTerms) {
      toast({ title: "Anda harus menyetujui syarat", variant: "destructive" });
      return;
    }

    setIsRegistering(true);
    try {
      // TODO: ganti dengan API call setelah backend ready
      console.log("Register data:", registerData);
      toast({ title: "Registrasi berhasil (dummy)" });
      onClose(); // tutup modal
    } catch (err: any) {
      toast({ title: err?.response?.data?.message || "Registrasi gagal", variant: "destructive" });
    } finally {
      setIsRegistering(false);
    }
  };

  /* ---------- Overlay click close ---------- */
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <Card className="w-full max-w-md relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-gray-900">Selamat Datang di TerDig</CardTitle>
          <CardDescription>Masuk atau daftar untuk memulai perjalanan belajar kamu</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
            </TabsList>

            {/* ---------- LOGIN TAB ---------- */}
            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value.trim() }))}
                      placeholder="nama@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Masukkan password"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) =>
                        setLoginData((prev) => ({ ...prev, rememberMe: checked as boolean }))
                      }
                    />
                    <label htmlFor="remember" className="text-sm text-gray-600">Ingat saya</label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">Lupa password?</a>
                </div>

                {/* Submit */}
                <Button type="submit" disabled={isLoggingIn} className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  {isLoggingIn ? "Memproses..." : "Masuk"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Belum punya akun?{" "}
                  <TabsTrigger value="register" className="text-blue-600 hover:underline font-medium">
                    Daftar sekarang
                  </TabsTrigger>
                </p>
              </div>
            </TabsContent>

            {/* ---------- REGISTER TAB ---------- */}
            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={registerData.name}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama lengkap"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value.trim() }))}
                      placeholder="nama@email.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value.trim() }))}
                      placeholder="08xxxxxxxxxx"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                      placeholder="Minimal 8 karakter"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Ulangi password"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Syarat */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={registerData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setRegisterData((prev) => ({ ...prev, agreeTerms: checked as boolean }))
                    }
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                    Saya setuju dengan{" "}
                    <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a> dan{" "}
                    <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a>
                  </label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isRegistering || !registerData.agreeTerms}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                >
                  {isRegistering ? "Mendaftar..." : "Daftar Sekarang"}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Sudah punya akun?{" "}
                  <TabsTrigger value="login" className="text-blue-600 hover:underline font-medium">
                    Masuk di sini
                  </TabsTrigger>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}