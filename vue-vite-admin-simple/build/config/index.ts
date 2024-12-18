import { mergeConfig } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import baseConfig from "./vite.config.base";
import devConfig from "./vite.config.dev";
import mockConfig from "./vite.config.mock";
import prodConfig from "./vite.config.prod";

function Config(configEnv: ConfigEnv, viteEnv: Record<string, string>): UserConfig {
  const { mode } = configEnv;
  switch (mode) {
    case "development":
      return mergeConfig(devConfig(configEnv, viteEnv), baseConfig(configEnv, viteEnv));
    case "mock":
      return mergeConfig(mockConfig(configEnv, viteEnv), baseConfig(configEnv, viteEnv));
    case "production":
      return mergeConfig(prodConfig(configEnv, viteEnv), baseConfig(configEnv, viteEnv));
    default:
      return {};
  }
}

export default Config;
