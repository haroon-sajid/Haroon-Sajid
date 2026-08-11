import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works from any path (local file, GitHub Pages, etc.)
  base: './',
  server: {
    port: 3000,
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Vite defaults to Sass's deprecated legacy JS API, which prints a
        // "legacy-js-api" warning per stylesheet. The modern API is the
        // supported path and silences them.
        api: 'modern',
      },
    },
  },
  build: {
    outDir: 'build',
  },
})
