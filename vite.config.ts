import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'

// Templates refer to these media paths dynamically, so emit them explicitly.
function staticMedia(): Plugin {
  return {
    name: 'static-media',
    apply: 'build',
    generateBundle() {
      const root = fileURLToPath(new URL('./src/assets', import.meta.url))
      const emitDirectory = (relative: string) => {
        for (const entry of readdirSync(join(root, relative), { withFileTypes: true })) {
          const path = `${relative}/${entry.name}`
          if (entry.isDirectory()) emitDirectory(path)
          else if (/\.(?:svg|png|jpe?g|gif|webp|avif|ico)$/i.test(path)) {
            this.emitFile({ type: 'asset', fileName: `src/assets/${path}`, source: readFileSync(join(root, path)) })
          }
        }
      }
      for (const directory of ['image', 'avatar', 'icons']) emitDirectory(directory)
    },
  }
}

export default defineConfig({
  plugins: [vue(), staticMedia()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
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
        ws: true,
        // 直连ws服务，绕过网关认证
        target: 'ws://localhost:8600/ws',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ''),
      },
      '/hls': {
        // 本地测试HLS
        target: 'http://localhost/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hls/, ''),
      }
    }
  }
})
