import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import starKidsImg from "../assets/Star Kids.png";
import quenChlidImg from "../assets/Quen Child.png";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { logger } from "@/lib/logger";
import { Article } from "../lib/articleTypes";
import { Helmet } from "react-helmet-async";

export function ArticleDetailPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  // Ambil data artikel berdasarkan slug
  const fetchArticle = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (error) {
      logger.error("Error fetching article:", error);
    } else {
      setArticle(data);
    }
    setLoading(false);
  };

  // Ambil artikel terkait
  const fetchRelatedArticles = async () => {
    if (!article) return;
    
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .eq("category", article.category)
      .neq("id", article.id)
      .limit(3)
      .order("published_at", { ascending: false });

    if (error) {
      logger.error("Error fetching related articles:", error);
    } else {
      setRelatedArticles(data || []);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  useEffect(() => {
    if (article) {
      fetchRelatedArticles();
    }
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Artikel tidak ditemukan</h1>
          <Button onClick={() => navigate("/artikel")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Artikel
          </Button>
        </div>
      </div>
    );
  }

  // SEO variables
  const siteUrl = "https://terdigacademy.com";
  const pageTitle = `${article.title} - TerDig Academy`;
  const pageDescription = article.excerpt || "Baca artikel edukatif terbaru dari TerDig Academy";
  const pageImage = article.image_url || `${siteUrl}/og-image.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${siteUrl}/artikel/${article.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${siteUrl}/artikel/${article.slug}`} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:locale" content="id_ID" />
        <meta property="article:published_time" content={article.published_at} />
        <meta property="article:section" content={article.category} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        
        {/* Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "description": pageDescription,
            "image": pageImage,
            "author": {
              "@type": "Person",
              "name": article.author
            },
            "datePublished": article.published_at,
            "dateModified": article.published_at,
            "publisher": {
              "@type": "Organization",
              "name": "TerDig Academy",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            },
            "articleSection": article.category
          })}
        </script>
      </Helmet>
      
      {/* Header */}
      <section className="relative pt-20 pb-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-8 mb-6">
              <Mascot 
                src={starKidsImg}
                alt="Star Kids"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/artikel")}
                  className="mb-4 text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Artikel
                </Button>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {article.title}
                </h1>
              </div>
              <Mascot 
                src={quenChlidImg}
                alt="Quen Chlid"
                size="lg"
                animation="float"
                className="hidden md:block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <div className="relative">
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-blue-600">
                  {article.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(article.published_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Artikel Terkait
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card 
                  key={relatedArticle.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 cursor-pointer"
                  onClick={() => navigate(`/artikel/${relatedArticle.slug}`)}
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={relatedArticle.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60"} 
                      alt={relatedArticle.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <Badge variant="outline" className="text-blue-600 border-blue-200 text-xs">
                        {relatedArticle.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(relatedArticle.published_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 font-semibold"
                onClick={() => navigate("/artikel")}
              >
                Lihat Semua Artikel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}