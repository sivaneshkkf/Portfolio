import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "Sivanesh Portfolio",
        short_name: "Portfolio",
        description: "A sleek and modern portfolio website showcasing skills and projects built with React JS.",
        theme_color: "#1a1a18",
        background_color: "#1a1a18",
        display: "standalone",
        orientation: "portrait",
        start_url: "/Portfolio/",
        base: "/Portfolio/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: '/Portfolio/',
  assetsInclude: ['**/*.lottie'],
})
