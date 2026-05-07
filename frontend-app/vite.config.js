import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev: browser calls same-origin /api → forwarded to production API (HTTPS).
// Repro: POST https://neurea.runasp.net/api/auth/login with JSON { "email", "password" }.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://neurea.runasp.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
