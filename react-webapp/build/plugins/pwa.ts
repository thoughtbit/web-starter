/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import { VitePWA } from "vite-plugin-pwa";

function createPwa(env: Record<string, string>) {
  return VitePWA({
    base: "/",
    includeAssets: ["favicon.ico"],
    manifest: {
      name: env.VITE_APP_NAME,
      short_name: env.VITE_APP_SHORT_NAME,
      theme_color: "#ffffff",
      icons: [
        {
          src: "./img/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "./img/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  });
}

export default createPwa;
