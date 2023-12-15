import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),

    // Plugin for the PWA (installable requirements)
    VitePWA({
      registerType: 'autoUpdate', 
      devOptions:{enabled: true},
      manifest: {
        name: 'Ascend',
        short_name: 'Ascend',
        description: 'Ascend : A time management application',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
})
