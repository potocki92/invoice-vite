import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig({
  base: "/invoice-vite",
  plugins: [react(),svgr({
    svgrOptions: {
      
    }
  })],
  server: {
    port: 3000
  }
})
