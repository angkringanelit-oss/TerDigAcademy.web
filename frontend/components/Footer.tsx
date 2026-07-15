import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { CONTACT_INFO, SOCIAL_LINKS } from "../config";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto mobile-padding py-12 sm:py-16">
        <div className="responsive-grid-1-2-4 responsive-gap">
          {/* Company Info */}
          <div className="space-y-3 sm:space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <Logo size="sm" showText={true} textColor="white" className="sm:hidden" />
            <Logo size="md" showText={true} textColor="white" className="hidden sm:block" />
            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Platform bimbel akademik digital untuk TK/PAUD & SD. Dipandu tutor profesional dan didukung AI Tutor pribadi 24/7 untuk hasil belajar maksimal.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href={SOCIAL_LINKS.facebook} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors touch-target" aria-label="Facebook">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={SOCIAL_LINKS.instagram} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors touch-target" aria-label="Instagram">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={SOCIAL_LINKS.twitter} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors touch-target" aria-label="Twitter">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={SOCIAL_LINKS.youtube} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors touch-target" aria-label="YouTube">
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-black transition-colors touch-target" aria-label="TikTok">
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Menu Utama</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Program
                </Link>
              </li>
              <li>
                <Link to="/testimoni" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link to="/artikel" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Artikel
                </Link>
              </li>
              <li>
                <Link to="/konsultasi-ai" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Coba AI Tutor
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Layanan</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/program" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Bimbel TerDig
                </Link>
              </li>
              <li>
                <Link to="/program" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Program Calistung
                </Link>
              </li>
              <li>
                <Link to="/daftar" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Kelas Prompting Anak
                </Link>
              </li>
              <li>
                <Link to="/daftar" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Kelas AI untuk Guru
                </Link>
              </li>
              <li>
                <Link to="/konsultasi-ai" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base touch-target block py-1">
                  Konsultasi AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-semibold">Hubungi Kami</h3>
            <div className="space-y-2 sm:space-y-3">
              <a 
                href={`https://wa.me/${CONTACT_INFO.phone}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 hover:text-green-400 transition-colors touch-target"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">{CONTACT_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">
                  {CONTACT_INFO.address}
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-3 sm:pt-4">
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Newsletter</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  placeholder="Email kamu..."
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm sm:text-base"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 touch-target px-3 sm:px-4" aria-label="Subscribe newsletter">
                  <Mail className="w-4 h-4" />
                  <span className="ml-2 sm:hidden">Subscribe</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2026 TerDig Academy. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors touch-target py-1">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors touch-target py-1">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors touch-target py-1">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}