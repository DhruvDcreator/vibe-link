import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: "autoUpdate",

      manifest: {

        name: "VibeLink",

        short_name: "VibeLink",

        description:
          "Find Your People.",

        theme_color:
          "#03040A",

        background_color:
          "#03040A",

        display:
          "standalone",

        start_url:
          "/",

        icons: [

          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },

        ],

      },

    }),

  ],

  build: {

    target: "es2015",

  },

});