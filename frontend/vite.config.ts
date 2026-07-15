import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
  publicDir: 'public',
  mode: "development",
  build: {
    minify: false,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    middlewareMode: false,
  }
})