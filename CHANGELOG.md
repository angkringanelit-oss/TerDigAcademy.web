# Changelog

## [Unreleased]

### Added
- Groq proxy function (`supabase/functions/groq-proxy/index.ts`) for secure AI consultation
- Environment variable configuration for Groq proxy URL
- Vercel deployment configuration with security headers
- Articles feature with ArticlesPage.tsx and ArticleDetailPage.tsx
- Article data types in articleTypes.ts
- Articles table migration script (20251012153000_create_articles_table.sql)
- Navigation link for Articles in Navbar
- Documentation for articles feature (ARTIKEL_DOKUMENTASI.md)
- Vercel deployment guide and verification scripts
- Security headers in vercel.json for enhanced security

### Changed
- Updated AIConsultationPage.tsx to use Groq proxy instead of Hugging Face
- Improved error handling in AIConsultationPage.tsx with fallback messages
- Added input validation in AI consultation form
- Updated documentation files to reflect Groq AI integration
- Added Groq proxy URL configuration to config.ts
- Simplified Groq proxy function implementation in Supabase Edge Function
- Updated STRUKTUR_WEB.md to include articles table and pages
- Updated RINGKASAN_STRUKTUR.md to include articles feature
- Enhanced vercel.json with security headers

### Fixed
- Proper mascot image import in AIConsultationPage.tsx
- Corrected UI styling to maintain consistent gradient colors and chat bubble design
- Removed unused Leap AI references
- Updated environment variables to use Groq instead of Hugging Face

## [1.0.0] - 2025-10-07

### Initial Implementation
- Basic project structure with React, TypeScript, and Vite
- Supabase integration for data management
- Educational games, video content, and program listings
- Testimonial and consultation features
- Mascot branding with Star Kids and Quen Child

---

**Commit Message**: `feat(ai): integrate AIConsultationPage with Groq via supabase/groq-proxy`