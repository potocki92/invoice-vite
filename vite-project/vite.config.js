import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 
import path from 'path';

export default defineConfig({
  base: "/invoice-vite",
  plugins: [react(),svgr({
    svgrOptions: {
    }
  })],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@markups': path.resolve(__dirname, 'src/markups')
    }
  }
})
