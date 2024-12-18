import type { Config } from 'tailwindcss'
import { dynamicIconsPlugin, getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'light-mode': { raw: '(prefers-color-scheme: light)' },
        'dark-mode': { raw: '(prefers-color-scheme: dark)' },
        'phone': { raw: '(max-width: 768px)' },
        'desktop': { raw: '(min-width: 1024px)' },
        'tablet': { raw: '(max-width: 1023px)' },
      },
    },
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all icon collections you have installed
      collections: getIconCollections(['line-md', 'carbon']),
      scale: 1.25,
    }),
    dynamicIconsPlugin(),
  ],
} satisfies Config
