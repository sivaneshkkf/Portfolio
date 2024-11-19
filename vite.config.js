import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

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
        description:
          "A sleek and modern portfolio website showcasing skills and projects built with React JS.",
        theme_color: "#1a1a18",
        background_color: "#1a1a18",
        display: "standalone",
        orientation: "portrait",
        start_url: "/Portfolio/",
        base: "/Portfolio/",
        icons: [
          {
            purpose: "maskable",
            sizes: "192x192",
            src: "android-chrome-192x192.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "144x144",
            src: "android-chrome-144x144.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "android-chrome-512x512.png",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "Capture.webp",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "Capture1.webp",
            sizes: "720x1280",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
  base: "/Portfolio/",
  assetsInclude: ["**/*.lottie"],
});
