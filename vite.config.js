import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Replace 'YUKAS---Website' with your exact repository name if different
  base: '/YUKAS---Website/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
