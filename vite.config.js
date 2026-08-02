import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base relativa: permite publicar el sitio en un subdirectorio (GitHub Pages, etc.)
  base: './',
})
