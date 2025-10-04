import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Trophy, Heart, Bot, Lightbulb, Palette, Monitor, Film, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "./Mascot";
import { RegistrationForm } from "./RegistrationForm";
import { supabase } from "../lib/supabaseClient";

import starKidsMascot from "../assets/Star Kids.png";
import quenChlidMascot from "../assets/Quen Child.png";

interface Program {
  id: string;
  title: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  icon: string;
  gradient: string;
  age_group: string;
  popular: boolean;
  is_new?: boolean;
  is_published: boolean;
  type: "academic" | "creative";
}

interface ProgramSectionProps {
  initialTab?: string | null;
}

export function ProgramSection({ initialTab }: ProgramSectionProps = {}) {
  const [activeTab, setActiveTab] = useState("creative");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<{ id: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [academicPrograms, setAcademicPrograms] = useState<Program[]>([]);
  const [creativePrograms, setCreativePrograms] = useState<Program[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
          .from("programs")
          .select("*")
          .eq("is_published", true);
        if (error) throw new Error(error.message);

        setAcademicPrograms(data.filter((p: Program) => p.type === "academic"));
        setCreativePrograms(data.filter((p: Program) => p.type === "creative"));
      } catch (err) {
        console.error("Error fetching programs:", err);
        setError("Terjadi kesalahan saat memuat data program");
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
    if (initialTab && ["academic", "creative"].includes(initialTab)) setActiveTab(initialTab);
  }, [initialTab]);

  const handleSelectProgram = (program: { id: string; title: string }) => {
    setSelectedProgram(program);
    setIsFormOpen(true);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Heart": return Heart;
      case "BookOpen": return BookOpen;
      case "Trophy": return Trophy;
      case "Bot": return Bot;
      case "Lightbulb": return Lightbulb;
      case "Palette": return Palette;
      case "Monitor": return Monitor;
      case "Film": return Film;
      default: return BookOpen;
    }
  };

  const ProgramCard = ({ program }: { program: Program }) => {
    const IconComponent = getIconComponent(program.icon);
    return (
      <Card className={`relative overflow-hidden border hover:shadow-2xl hover:scale-105 transition rounded-xl`}>
        {program.popular && (
          <span className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
            Terpopuler
          </span>
        )}
        {program.is_new && (
          <span className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-br-lg font-semibold">
            Baru!
          </span>
        )}
        <CardHeader className="text-center pb-3">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${program.gradient} flex items-center justify-center`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
          <CardDescription className="text-gray-600">{program.description}</CardDescription>
          <Badge className="mt-2">{program.age_group}</Badge>
        </CardHeader>
        <CardContent>
          <p className="text-center text-2xl font-bold text-gray-900">
            {program.price} <span className="text-base font-medium text-gray-600">{program.period}</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {program.features?.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-2 h-2 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                {f}
              </li>
            ))}
          </ul>
          <Button
            onClick={() => handleSelectProgram({ id: program.id, title: program.title })}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Pilih Program <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {loading && <p className="text-center text-blue-600 font-semibold">Loading...</p>}
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}

        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-100 to-green-100 text-green-700">
            Dua Pilar TerDig Academy
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pilih Jalur{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Akademik</span>{" "}
            atau{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500">Kreatif</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TerDig Academy menawarkan dua jalur pembelajaran: <b>Bimbel TerDig</b> untuk prestasi akademik
            dan <b>Sanggar Seni Digital</b> untuk mengasah kreativitas anak.
          </p>
        </div>

        {/* Mascots */}
        <div className="flex justify-center items-center gap-12 mb-12">
          <div className="text-center">
            <Mascot src={starKidsMascot} alt="Star Kids" size="md" animation="float" />
            <h3 className="font-bold text-blue-600">Star Kids</h3>
            <p className="text-sm text-gray-600">Teman Belajar Akademik</p>
          </div>
          <div className="text-4xl text-gray-300">+</div>
          <div className="text-center">
            <Mascot src={quenChlidMascot} alt="Quen Child" size="md" animation="float" />
            <h3 className="font-bold text-green-600">Quen Child</h3>
            <p className="text-sm text-gray-600">Teman Berkarya Kreatif</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 h-14">
            <TabsTrigger value="academic" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BookOpen className="w-5 h-5 mr-2" /> Bimbel TerDig
            </TabsTrigger>
            <TabsTrigger value="creative" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <Palette className="w-5 h-5 mr-2" /> Sanggar Seni Digital
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {academicPrograms.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="creative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creativePrograms.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Masih bingung memilih program? Konsultasikan dengan tim kami</p>
          <Button onClick={() => navigate("/konsultasi-gratis")} variant="outline" className="px-8 py-3 rounded-xl border-2 border-purple-500 text-purple-600 hover:bg-purple-50">
            <Users className="mr-2" /> Konsultasi Gratis
          </Button>
        </div>
      </div>

      {/* Form */}
      <RegistrationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedProgram={selectedProgram}
      />
    </section>
  );
}
