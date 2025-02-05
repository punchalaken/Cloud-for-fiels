import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000,
    proxy: {
      // Перенаправление всех запросов, начинающихся с /api, на бэкенд
      '/api': {
        target: 'http://127.0.0.1:8000', // URL бэкенда
      },
    },
  },
})
