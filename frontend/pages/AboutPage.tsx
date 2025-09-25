import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Target, Award, Heart, BookOpen, Brain, Star, Trophy, Zap, Gamepad2, Palette, Sparkles } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";

// Import mascot images
import starKidsMascot from "../assets/Star Kids.png";
import queenChildMascot from "../assets/Quen Child.png";

const stats = [
  { icon: Users, label: "Siswa Aktif", value: "1000+", color: "text-blue-600" },
  { icon: BookOpen, label: "Program Akademik", value: "20+", color: "text-green-600" },
  { icon: Palette, label: "Program Kreatif", value: "15+", color: "text-purple-600" },
  { icon: Star, label: "Rating Orang Tua", value: "4.9", color: "text-yellow-600" }
];

const values = [
  {
    icon: Target,
    title: "Dua Pilar Pendidikan",
    description: "Kami menghadirkan kombinasi unik antara Bimbel TerDig untuk prestasi akademik dan Sanggar Seni Digital untuk mengasah kreativitas anak."
  },
  {
    icon: Heart,
    title: "Cinta pada Setiap Anak",
    description: "Star Kids dan Quen Chlid hadir sebagai teman belajar yang memahami keunikan setiap anak dengan pendampingan penuh kasih sayang."
  },
  {
    icon: Sparkles,
    title: "Inovasi Digital Terdepan",
    description: "Kami menggabungkan metode pembelajaran tradisional dengan teknologi AI dan seni digital untuk masa depan yang cerah."
  },
  {
    icon: Award,
    title: "Kualitas & Prestasi Terpercaya",
    description: "Ratusan prestasi siswa di bidang akademik dan kompetisi seni digital membuktikan keunggulan program kami."
  }
];

const team = [
  {
    name: "Dr. Sarah Wijaya, M.Psi",
    role: "Founder & CEO TerDig Academy",
    description: "Psikolog anak dengan visi menggabungkan pendidikan akademik dan kreativitas digital untuk masa depan anak Indonesia",
    image: "/images/team-1.jpg"
  },
  {
    name: "Dra. Maya Sari, M.Pd",
    role: "Head of Bimbel TerDig",
    description: "Ahli kurikulum akademik dengan pengalaman mengembangkan program belajar yang menyenangkan untuk TK hingga SMP",
    image: "/images/team-2.jpg"
  },
  {
    name: "Budi Santoso, M.Sn",
    role: "Head of Sanggar Seni Digital",
    description: "Seniman digital berpengalaman yang mengembangkan kurikulum seni digital ramah anak dari TK hingga SMA",
    image: "/images/team-3.jpg"
  }
];

const milestones = [
  { year: "2020", title: "Lahirnya TerDig Academy", description: "Menggabungkan sanggar seni manual dengan bimbingan belajar digital dalam satu platform" },
  { year: "2021", title: "Dua Pilar Terbentuk", description: "Meluncurkan Bimbel TerDig dan Sanggar Seni Digital sebagai dua pilar pendidikan" },
  { year: "2022", title: "Star Kids & Quen Chlid", description: "Memperkenalkan maskot sebagai teman belajar akademik dan kreatif anak" },
  { year: "2023", title: "AI untuk Kreativitas", description: "Mengintegrasikan AI Art dan teknologi digital terdepan dalam pembelajaran" },
  { year: "2024", title: "1000+ Siswa Aktif", description: "Menjadi akademi dengan kombinasi program akademik dan seni digital terlengkap" }
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tentang TerDig Academy</h1>
              <p className="text-sm text-gray-600">Mengenal dua pilar pendidikan: akademik & kreativitas digital</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4" />
            Tentang TerDig Academy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dua Pilar</span> Pendidikan
            <br />untuk
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500"> Masa Depan Digital</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            TerDig Academy hadir dengan konsep revolusioner: menggabungkan <strong>Bimbel TerDig</strong> untuk prestasi akademik 
            dan <strong>Sanggar Seni Digital</strong> untuk kreativitas tanpa batas. Bersama Star Kids dan Quen Chlid, 
            kami membantu anak mengembangkan potensi akademik dan kreatif secara berimbang.
          </p>
          
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="text-center">
              <Mascot 
                src={starKidsMascot}
                alt="Star Kids - Bimbel TerDig"
                size="lg"
                animation="float"
                className="mx-auto mb-2"
              />
              <p className="text-sm text-blue-600 font-medium">Star Kids</p>
              <p className="text-xs text-gray-500">Teman Belajar Akademik</p>
            </div>
            <div className="text-2xl text-gray-300">+</div>
            <div className="text-center">
              <Mascot 
                src={queenChildMascot}
                alt="Quen Chlid - Sanggar Seni Digital"
                size="lg"
                animation="bounce"
                className="mx-auto mb-2"
              />
              <p className="text-sm text-green-600 font-medium">Quen Chlid</p>
              <p className="text-xs text-gray-500">Teman Berkarya Kreatif</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <IconComponent className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <Card className="border-2 border-blue-200 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-700">
                <Target className="w-6 h-6" />
                Misi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Menyediakan pendidikan holistik melalui dua pilar: <strong>Bimbel TerDig</strong> untuk keunggulan akademik 
                dan <strong>Sanggar Seni Digital</strong> untuk kreativitas modern. Kami percaya setiap anak berhak mendapatkan 
                pembelajaran yang menyeimbangkan prestasi akademik dengan pengembangan bakat kreatif di era digital.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-purple-700">
                <Zap className="w-6 h-6" />
                Visi Kami
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Menjadi pionir pendidikan masa depan yang menggabungkan keunggulan akademik dengan kreativitas digital. 
                Melahirkan generasi Indonesia yang tidak hanya cerdas secara akademik, tetapi juga kreatif, inovatif, 
                dan siap menghadapi tantangan era digital dengan percaya diri.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam setiap langkah perjalanan TerDig
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cerita di Balik TerDig Academy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Perjalanan dari sanggar seni manual hingga menjadi akademi digital dengan dua pilar pendidikan
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="inline-block max-w-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="mb-3 bg-blue-100 text-blue-700">
                          {milestone.year}
                        </Badge>
                        <h3 className="font-bold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="w-6 h-6 bg-white border-4 border-blue-500 rounded-full relative z-10"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tim Pendiri TerDig Academy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bertemu dengan para visioner yang menggabungkan pendidikan akademik dan seni digital
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-yellow-400 via-blue-500 to-green-400 text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Bergabunglah dengan Revolusi Pendidikan Dua Pilar
              </h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Jadilah bagian dari keluarga TerDig Academy yang telah membuktikan keunggulan kombinasi 
                prestasi akademik dan kreativitas digital. Wujudkan potensi penuh anak Anda hari ini!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/program")}
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
                >
                  Jelajahi Program
                </Button>
                <Button 
                  onClick={() => navigate("/konsultasi-gratis")}
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
                >
                  Konsultasi Gratis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
