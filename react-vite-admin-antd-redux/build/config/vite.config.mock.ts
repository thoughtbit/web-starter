import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import { createMocks } from "./../plugins";

export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const { command } = configEnv;
  const isBuild = command === "build";
  return defineConfig({
    plugins: [createMocks(isBuild)],
  });
};
