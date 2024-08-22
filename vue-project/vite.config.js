import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  base: '/vue-project/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API, // 使用環境變數
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
