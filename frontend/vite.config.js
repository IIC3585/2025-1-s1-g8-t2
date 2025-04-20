import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { splashScreen } from 'vite-plugin-splash-screen'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm,webp,jpg,jpeg,json}'],
        runtimeCaching: [
          {
            // Cache first strategy for images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Network first for API requests
            urlPattern: /^https?:\/\/.*\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Stale-while-revalidate for other assets
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            // Default offline fallback
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'navigation-cache',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          }
        ],
        // Skip waiting for service worker activation
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: "G8 Filter App", 
        short_name: "G8-FA",
        start_url: "/",
        description: `Este es el trabajo 2 del ramo Desarrollo Avanazado de Aplicaciones, realizado por los estudiantes Bruno Tike, Agustín Pini y Rafael Fodor. Consta de una aplicación para editar imágenes aplicando filtros WASM. `,
        lang: "es", 
        orientation: "portrait",
        display: "standalone",
        background_color: "#fffff",
        theme_color: "#34dbc4",
        icons:[
          {
            src: 'icons/icon-secondary-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-secondary-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }}), 
      splashScreen({
        logoSrc: "icons/icon-secondary-180.svg", 
        background_color: "#34dbc4",
        minDurationMs: "3000", 
        loaderType: "dots",
        loaderBg: "#34dbc4"
      })
  ],
})
