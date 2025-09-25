import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, BookOpen, Brain, Users, Phone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Video Edukasi", href: "/video-edukasi" },
    { name: "Game Edukatif", href: "/game-edukatif" },
    { name: "Tentang Kami", href: "/tentang" },
    { name: "Galeri & Event", href: "/galeri" },
    { name: "Testimoni", href: "/testimoni" },
    { name: "AI Konsultasi", href: "/konsultasi-ai" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 shadow-lg border-b border-purple-700 sticky top-0 z-50">
      <div className="container mx-auto mobile-padding">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Logo size="sm" showText={false} className="sm:hidden" />
            <Logo size="md" showText={false} className="hidden sm:block" />
            <div className="ml-3 sm:ml-4 flex flex-col justify-center py-1">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                TerDig Academy
              </h1>
              <p className="text-xs text-purple-200 hidden sm:block mt-2">
                Bimbel & Sanggar Seni Digital
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center responsive-gap">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-xs xl:text-sm font-medium transition-colors hover:text-blue-300 touch-target flex items-center justify-center ${
                  isActive(item.href) 
                    ? "text-blue-300 border-b-2 border-blue-300 pb-1" 
                    : "text-purple-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link to="/konsultasi-gratis">
              <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50 text-xs xl:text-sm touch-target">
                <Phone className="w-3 h-3 xl:w-4 xl:h-4 mr-1 xl:mr-2" />
                <span className="hidden xl:inline">Konsultasi Gratis</span>
                <span className="xl:hidden">Konsultasi</span>
              </Button>
            </Link>
            <Link to="/program">
              <Button size="sm" className="bg-gradient-to-r from-yellow-400 to-green-500 hover:from-yellow-500 hover:to-green-600 text-white font-semibold text-xs xl:text-sm touch-target">
                <span className="hidden xl:inline">Jelajahi Program</span>
                <span className="xl:hidden">Program</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple-200 hover:text-white touch-target"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-3 sm:py-4">
            <div className="space-y-3 sm:space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-sm font-medium transition-colors hover:text-blue-300 py-2 px-2 rounded-md touch-target ${
                    isActive(item.href) ? "text-blue-300 bg-purple-800/50" : "text-purple-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 sm:pt-4 space-y-2 sm:space-y-3 border-t border-gray-100">
                <Link to="/konsultasi-gratis" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-green-500 text-green-600 hover:bg-green-50 touch-target">
                    <Phone className="w-4 h-4 mr-2" />
                    Konsultasi Gratis
                  </Button>
                </Link>
                <Link to="/program" onClick={() => setIsOpen(false)}>
                  <Button size="sm" className="w-full bg-gradient-to-r from-yellow-400 to-green-500 hover:from-yellow-500 hover:to-green-600 text-white font-semibold touch-target">
                    Jelajahi Program
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
