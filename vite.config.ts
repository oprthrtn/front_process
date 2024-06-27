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
  },
})
