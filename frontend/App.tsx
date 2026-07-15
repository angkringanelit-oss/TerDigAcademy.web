import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProgramPage } from "./pages/ProgramPage";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";
import { AIConsultationPage } from "./pages/AIConsultationPage";
import { ArticlesPage } from "./pages/ArticlesPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { DaftarPage } from "./pages/DaftarPage";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/program" element={<ProgramPage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/galeri" element={<GalleryPage />} />
              <Route path="/testimoni" element={<TestimonialsPage />} />
              <Route path="/konsultasi-ai" element={<AIConsultationPage />} />
              <Route path="/artikel" element={<ArticlesPage />} />
              <Route path="/artikel/:slug" element={<ArticleDetailPage />} />
              <Route path="/daftar" element={<DaftarPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;