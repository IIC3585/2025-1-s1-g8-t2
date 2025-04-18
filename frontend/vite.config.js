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
