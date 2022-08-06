import { mergeConfig } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import baseConfig from "./vite.config.base";
import devConfig from "./vite.config.dev";
import mockConfig from "./vite.config.mock";
import prodConfig from "./vite.config.prod";
import stagingConfig from "./vite.config.staging";

function Config(configEnv: ConfigEnv, viteEnv: Record<string, string>): UserConfig {
  // console.log("configEnv: ", configEnv);
  // console.log("viteEnv: ", viteEnv);
  
  const { mode } = configEnv;
  switch (mode) {
    case "development":
      return mergeConfig(baseConfig(configEnv, viteEnv), devConfig(configEnv, viteEnv));
    case "mock":
      return mergeConfig(baseConfig(configEnv, viteEnv), mockConfig(configEnv, viteEnv));
    case "production":
      return mergeConfig(baseConfig(configEnv, viteEnv), prodConfig(configEnv, viteEnv));
    case "staging":
      return mergeConfig(baseConfig(configEnv, viteEnv), stagingConfig(configEnv, viteEnv));
    default:
      return {};
  }
}

export default Config;
