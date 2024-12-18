/**
 * UnoCSS
 * github.com/unocss/unocss
 */
import type { Plugin } from "vite";
import UnoCSS from "unocss/vite";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

function createUnoCSS() {
  // https://github.com/antfu/unocss
  // see unocss.config.ts for config
  return UnoCSS({
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ]
  }) as Plugin;
}

export default createUnoCSS;
