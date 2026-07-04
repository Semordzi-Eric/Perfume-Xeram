import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // DevTools only in development — do NOT ship to production
    ...(mode === 'development' ? [vueDevTools()] : []),
    ui(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    // Generates sourcemaps alongside the bundle but does NOT expose them
    // in the HTML — they stay on the server for Sentry to consume.
    sourcemap: 'hidden',
  },
}))
