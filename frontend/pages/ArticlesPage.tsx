import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Calendar, User, Tag } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";
import { Article, ArticleCategory } from "../lib/articleTypes";
import { Helmet } from "react-helmet-async";

const categoryOptions: ArticleCategory[] = [
  { value: "Semua", label: "Semua" },
  { value: "Teknologi", label: "Teknologi" },
  { value: "Pendidikan", label: "Pendidikan" },
  { value: "Kreativitas", label: "Kreativitas" }
];

export function ArticlesPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const siteUrl = "https://terdigacademy.com";
  const pageTitle = "Artikel & Blog Edukasi - TerDig Academy";
  const pageDescription = "Temukan berbagai artikel edukatif dan tips terbaru untuk mendukung perkembangan anak di era digital. Kumpulan artikel tentang teknologi, pendidikan, dan kreativitas untuk anak.";

  // Ambil data dari tabel articles di Supabase
  const fetchArticles = async () => {
    setLoading(true);
    let query = supabase.from("articles").select("*").eq("is_published", true).order("published_at", { ascending: false });

    if (selectedCategory !== "Semua") {
      query = query.eq("category", selectedCategory);
    }

    // Tambahkan pencarian jika ada query
    if (searchQuery.trim() !== "") {
      query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      logger.error("Error fetching articles:", error);
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${siteUrl}/artikel`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/artikel`} />
        <meta property="og:image" content={`${siteUrl}/og-artikel.jpg`} />
        <meta property="og:locale" content="id_ID" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={`${siteUrl}/og-artikel.jpg`} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": pageTitle,
            "description": pageDescription,
            "url": `${siteUrl}/artikel`
          })}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-8 mb-8">
              <Mascot 
                src={starKidsImg}
                alt="Star Kids"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Artikel & Blog Edukasi
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Temukan berbagai artikel edukatif dan tips terbaru untuk mendukung perkembangan anak di era digital
                </p>
              </div>
              <Mascot 
                src={quenChlidImg}
                alt="Quen Chlid"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Artikel Edukatif</h3>
                <p className="text-gray-600 text-sm">Konten berkualitas tinggi untuk mendukung perkembangan anak</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Tag className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Berbagai Kategori</h3>
                <p className="text-gray-600 text-sm">Artikel terorganisir berdasarkan topik yang relevan</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Calendar className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Update Terbaru</h3>
                <p className="text-gray-600 text-sm">Konten baru ditambahkan secara berkala</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/2">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Artikel tidak ditemukan</h3>
              <p className="text-gray-500">Coba ubah kategori atau kata kunci pencarian</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card 
                  key={article.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 cursor-pointer"
                  onClick={() => navigate(`/artikel/${article.slug}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={article.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60"} 
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </CardTitle>
                    </div>
                    <CardDescription>{article.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="text-blue-600 border-blue-200">
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.published_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {article.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArticle(article);
                        }}
                      >
                        Baca
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tetap Terhubung dengan Artikel Terbaru!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Bergabunglah dengan ribuan orang tua yang telah merasakan manfaat dari artikel edukatif kami
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                onClick={() => navigate("/#programs")}
              >
                Daftar Sekarang
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-4 w-full max-w-4xl relative my-8">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              onClick={() => setSelectedArticle(null)}
            >
              ✖
            </button>
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="mb-6">
                <img 
                  src={selectedArticle.image_url} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="px-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200 mb-2">
                  {selectedArticle.category}
                </Badge>
                <h2 className="text-2xl font-bold mb-2">{selectedArticle.title}</h2>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(selectedArticle.published_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}