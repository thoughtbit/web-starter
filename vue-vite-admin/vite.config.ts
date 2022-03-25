import { mergeConfig, defineConfig } from "vite";
import type { UserConfig, ConfigEnv } from "vite";
import baseConfig from "./vite.config.base";
import devConfig from "./vite.config.dev";
import mockConfig from "./vite.config.mock";
import prodConfig from "./vite.config.prod";
import stagingConfig from "./vite.config.staging";

// https://vitejs.dev/config/
export default defineConfig((config: ConfigEnv): UserConfig => {
  if (config.mode === "development") {
    return mergeConfig(baseConfig(config), devConfig(config));
  }
  if (config.mode === "mock") {
    return mergeConfig(baseConfig(config), mockConfig(config));
  }
  if (config.mode === "production") {
    return mergeConfig(baseConfig(config), prodConfig(config));
  }
  if (config.mode === "staging") {
    return mergeConfig(baseConfig(config), stagingConfig(config));
  }
  return mergeConfig(baseConfig(config), prodConfig(config));
});
