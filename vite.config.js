import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import bananaImage from "../Frontend/src/assets/images/banana.png"
import appleImage from "../Frontend/src/assets/images/apple.png"
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'apple-touch-icon.png',
        'masked-icon.svg',
        'robots.txt',
        'icons/icon-192x192.png',
        'icons/icon-512x512.png'
      ],
      manifest: {
        name: 'Memory Match Game',
        short_name: 'MemoryGame',
        description: 'A memory card game with offline support!',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: {bananaImage}
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type:{appleImage}
          }
        ]
      }
    })
  ]
})
