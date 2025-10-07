// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Prevent OS module issues
    global: 'globalThis',
  },
  optimizeDeps: {
    exclude: [], // Ensure all dependencies are properly bundled
  }
})