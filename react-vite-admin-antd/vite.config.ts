import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv, UserConfig } from "vite";
import Config from "./build/config";

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv): UserConfig => {
  const cmd = process.cwd();
  const { mode } = configEnv;
  const viteEnv = loadEnv(mode, cmd);

  return Config(configEnv, viteEnv);
});
