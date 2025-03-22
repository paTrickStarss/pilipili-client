import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'localhost',
    port: 9999,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/auth': {
        target: 'http://localhost:8000/auth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      '/ws': {
        // 直连ws服务，绕过网关认证
        target: 'ws://localhost:8065/ws',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
      }
    }
  }
})
