/* eslint-disable global-require */
import { defineConfig } from "windicss/helpers";
import colors from "windicss/colors";
import plugin from "windicss/plugin";

export default defineConfig({
  preflight: true,
  attributify: true,
  extract: {
    include: ["index.html", "src/**/*.{vue,jsx,tsx}"],
  },
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    colors: {
      teal: colors.teal,
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        ".skew-10deg": {
          transform: "skewY(-10deg)",
        },
        ".skew-15deg": {
          transform: "skewY(-15deg)",
        },
      };
      addUtilities(newUtilities);
    }),
    require("windicss/plugin/forms"),
    require("windicss/plugin/line-clamp"),
    require("windicss/plugin/typography")({
      modifiers: ["DEFAULT", "sm", "lg", "red"],
    }),
  ],
});
