import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Use production base for GitHub Pages (repo path), and root for local dev.
  base: process.env.NODE_ENV === 'production' ? '/YUKAS---Website/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
