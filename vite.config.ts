import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import path from "path"
import vue from '@vitejs/plugin-vue'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.replicate.com/v1/models/meta/llama-2-70b-chat/predictions',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/get': {
        target: 'https://api.replicate.com/v1/predictions',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/get/, ''),
      }
    },
    watch: {
      usePolling: true
    }
  },
})
