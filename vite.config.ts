import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Moved from the default "assets/": browsers may hold year-long cached 404s for old /assets/ URLs.
    assetsDir: 'static',
  },
})
