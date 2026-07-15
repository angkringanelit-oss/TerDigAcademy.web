import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Program", href: "/program" },
    { name: "Coba AI Tutor", href: "/konsultasi-ai", highlight: true },
    { name: "Testimoni", href: "/testimoni" },
    { name: "Artikel", href: "/artikel" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 shadow-lg border-b border-purple-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
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
                Bimbel Akademik Digital
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navigation.map((item) =>
              item.highlight ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative group text-xs xl:text-sm font-semibold transition-all duration-300 touch-target flex items-center justify-center px-3 py-1.5 rounded-full ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                      : "text-purple-100 hover:text-white hover:bg-purple-800/40"
                  }`}
                >
                  {!isActive(item.href) && (
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  )}
                  <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4 mr-1.5 text-yellow-300" />
                  {item.name}
                </Link>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-xs xl:text-sm font-medium transition-colors hover:text-blue-300 touch-target flex items-center justify-center px-2 py-1 ${
                    isActive(item.href)
                      ? "text-blue-300 border-b-2 border-blue-300"
                      : "text-purple-100"
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link to="/daftar">
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs xl:text-sm touch-target shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
              >
                <GraduationCap className="w-3.5 h-3.5 xl:w-4 xl:h-4 mr-1.5" />
                Daftar Bimbel
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
          <div className="lg:hidden border-t border-purple-700/50 py-3 sm:py-4">
            <div className="space-y-3 sm:space-y-4">
              {navigation.map((item) =>
                item.highlight ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center text-sm font-semibold transition-all duration-200 py-2 px-3 rounded-lg touch-target ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "text-purple-100 hover:bg-purple-800/40"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
                    {item.name}
                  </Link>
                ) : (
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
                )
              )}
              <div className="pt-3 sm:pt-4 border-t border-purple-700/50">
                <Link to="/daftar" onClick={() => setIsOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold touch-target shadow-lg"
                  >
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Daftar Bimbel
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