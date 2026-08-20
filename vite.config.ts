import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute base: assets must load from the domain root on deep links
  // like /projects/ai-inbox-management (a relative base would resolve to
  // /projects/assets/... and break the page on Vercel).
  base: '/',
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
