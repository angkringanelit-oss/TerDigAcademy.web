import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X, ArrowRight, Calendar, Phone } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "trial" | "consultation" | "package";
  data?: {
    message: string;
    packageDetails?: {
      packageType: string;
      billingCycle: string;
      price: string;
    };
  };
}

export function SuccessModal({ isOpen, onClose, type, data }: SuccessModalProps) {
  if (!isOpen) return null;

  const getTitle = () => {
    switch (type) {
      case "trial":
        return "Pendaftaran Trial Berhasil!";
      case "consultation":
        return "Konsultasi Berhasil Dijadwalkan!";
      case "package":
        return "Pendaftaran Paket Berhasil!";
      default:
        return "Berhasil!";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "trial":
        return "Selamat! Anda telah berhasil mendaftar untuk trial gratis 7 hari. Tim kami akan menghubungi Anda segera.";
      case "consultation":
        return "Konsultasi gratis Anda telah dijadwalkan. Tim ahli kami akan menghubungi Anda sesuai waktu yang dipilih.";
      case "package":
        return "Pendaftaran paket berhasil! Tim kami akan menghubungi Anda untuk proses pembayaran dan aktivasi akun.";
      default:
        return "Proses berhasil dilakukan.";
    }
  };

  const getNextSteps = () => {
    switch (type) {
      case "trial":
        return [
          "Cek email Anda untuk informasi akun trial",
          "Download aplikasi TerDig di smartphone",
          "Tim customer service akan menghubungi dalam 1x24 jam",
          "Mulai eksplorasi fitur-fitur pembelajaran"
        ];
      case "consultation":
        return [
          "Simpan jadwal konsultasi di kalender Anda",
          "Siapkan pertanyaan yang ingin ditanyakan",
          "Tim kami akan menghubungi 15 menit sebelum jadwal",
          "Pastikan koneksi internet stabil untuk video call"
        ];
      case "package":
        return [
          "Tim sales akan menghubungi untuk konfirmasi pembayaran",
          "Pilih metode pembayaran yang sesuai",
          "Akun akan diaktivasi setelah pembayaran dikonfirmasi",
          "Mulai pembelajaran dengan fitur lengkap"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md relative animate-scale-in">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {getTitle()}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {getDescription()}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {data?.message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">{data.message}</p>
            </div>
          )}

          {data?.packageDetails && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Detail Paket:</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p>Paket: {data.packageDetails.packageType}</p>
                <p>Billing: {data.packageDetails.billingCycle}</p>
                <p>Harga: {data.packageDetails.price}</p>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Langkah Selanjutnya:</h4>
            <ul className="space-y-2">
              {getNextSteps().map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-xs font-semibold">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={onClose} className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <ArrowRight className="w-4 h-4 mr-2" />
              Lanjutkan
            </Button>
            
            {type === "consultation" && (
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Tambah ke Kalender
              </Button>
            )}
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Butuh bantuan? Hubungi kami:
              </p>
              <div className="flex justify-center gap-4 text-sm">
                <a href="https://wa.me/62895339329650" className="text-blue-600 hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  (021) 1234-5678
                </a>
                <a href="https://wa.me/62895339329650" className="text-green-600 hover:underline">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
