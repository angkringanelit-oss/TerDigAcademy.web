import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { ProgramPage } from "./pages/ProgramPage";
import { AboutPage } from "./pages/AboutPage";
import { GalleryPage } from "./pages/GalleryPage";
import { TestimonialsPage } from "./pages/TestimonialsPage";

import { KonsultasiGratisPage } from "./pages/KonsultasiGratisPage";
import { VideoEducationPage } from "./pages/VideoEducationPage";
import { EducationalGamesPage } from "./pages/EducationalGamesPage";
import { PaketLengkapPage } from "./pages/PaketLengkapPage";
import { CobaGratisPage } from "./pages/CobaGratisPage";
import { DemoPage } from "./pages/DemoPage";
import { AIConsultationPage } from "./pages/AIConsultationPage";

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
              <Route path="/konsultasi-gratis" element={<KonsultasiGratisPage />} />
              <Route path="/video-edukasi" element={<VideoEducationPage />} />
              <Route path="/game-edukatif" element={<EducationalGamesPage />} />
              <Route path="/paket-lengkap" element={<PaketLengkapPage />} />
              <Route path="/coba-gratis" element={<CobaGratisPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/konsultasi-ai" element={<AIConsultationPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;