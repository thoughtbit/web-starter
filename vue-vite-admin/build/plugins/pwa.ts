/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import { VitePWA } from "vite-plugin-pwa";

export function configPwaConfig(env) {
  // vite-plugin-pwa
  return VitePWA({
    manifest: {
      name: env.VITE_APP_NAME,
      short_name: env.VITE_APP_SHORT_NAME,
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
