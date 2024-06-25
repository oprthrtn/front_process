import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    checker({
      enableBuild: false,
      typescript: true,
      eslint: { lintCommand: 'eslint ./src/**/*.{ts,tsx}' },
    }),
  ],
  base: '/front_process/',
  server: {
    port: 3000,
    proxy: {
      '/api/user': {
        target: 'https://94.154.11.188:8083/api/user',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api\/user/, ''),
      },
      '/api/diary': {
        target: 'https://94.154.11.188:8083/api/diary',
        changeOrigin: true,
        secure: false,
        rewrite: path => {
          return path.replace(/^\/api\/diary/, '')
        },
      },

      '/api/intenship': {
        target: 'https://94.154.11.188:8083/api/intenship',
        changeOrigin: true,
        secure: false,
        rewrite: path => {
          return path.replace(/^\/api\/intenship/, '')
        },
      },
    },
  },
})
