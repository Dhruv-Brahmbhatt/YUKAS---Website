import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Base path for GitHub Pages. Update to new repository name.
  base: '/YUKAS_ENDTerm/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
