// Configuration file for TerDig frontend application

// API Configuration
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.terdig.com' 
  : 'http://localhost:3000';

// App Configuration
export const APP_NAME = 'TerDig';
export const APP_DESCRIPTION = 'Platform bimbingan belajar digital terdepan di Indonesia';
export const APP_VERSION = '1.0.0';

// Contact Information
export const CONTACT_INFO = {
  phone: '+62 21 1234 5678',
  whatsapp: '+62 812 3456 7890',
  email: 'info@terdig.com',
  address: 'Jl. Sudirman No. 123, Jakarta Pusat, 10220'
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/terdig',
  instagram: 'https://instagram.com/terdig',
  twitter: 'https://twitter.com/terdig',
  youtube: 'https://youtube.com/terdig',
  linkedin: 'https://linkedin.com/company/terdig'
};

// Feature Flags
export const FEATURES = {
  enableAuth: true,
  enableAIConsultation: true,
  enableLiveChat: true,
  enableNotifications: true,
  enableAnalytics: true
};

// Pricing Configuration
export const PRICING = {
  trialDays: 7,
  basicPrice: 199000,
  premiumPrice: 299000,
  ultimatePrice: 499000,
  currency: 'IDR'
};

// Third-party Service Keys
// TODO: Set these values in your environment or deployment configuration
export const SERVICES = {
  // Google Analytics tracking ID
  googleAnalyticsId: '',
  
  // Clerk authentication (if using Clerk)
  clerkPublishableKey: '',
  
  // Sentry error tracking
  sentryDsn: '',
  
  // Crisp chat widget
  crispWebsiteId: ''
};

// Image and Asset Configuration
export const ASSETS = {
  logoUrl: '/images/logo.png',
  starKidsMascot: '/images/star-kids-mascot.png',
  quenChildMascot: '/images/quen-child-mascot.png',
  defaultAvatar: '/images/default-avatar.png'
};

// Validation Rules
export const VALIDATION = {
  minPasswordLength: 8,
  maxNameLength: 100,
  maxEmailLength: 255,
  phonePattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/
};

// Date and Time Configuration
export const DATETIME = {
  timezone: 'Asia/Jakarta',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: 'HH:mm',
  locale: 'id-ID'
};

// Cache Configuration
export const CACHE = {
  defaultTTL: 300, // 5 minutes
  longTTL: 3600,   // 1 hour
  shortTTL: 60     // 1 minute
};

// Error Messages
export const ERROR_MESSAGES = {
  networkError: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
  serverError: 'Terjadi kesalahan server. Silakan coba lagi nanti.',
  validationError: 'Data yang dimasukkan tidak valid.',
  authError: 'Sesi Anda telah berakhir. Silakan login kembali.',
  notFoundError: 'Halaman yang Anda cari tidak ditemukan.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  registrationSuccess: 'Pendaftaran berhasil! Silakan cek email untuk verifikasi.',
  loginSuccess: 'Login berhasil! Selamat datang kembali.',
  profileUpdated: 'Profil berhasil diperbarui.',
  passwordChanged: 'Password berhasil diubah.',
  consultationBooked: 'Konsultasi berhasil dijadwalkan.'
};
