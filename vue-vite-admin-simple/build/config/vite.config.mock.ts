import { defineConfig } from "vite";
import type { ConfigEnv } from "vite";
import { createMock } from "./../plugins";

// @ts-ignore
export default (configEnv: ConfigEnv, viteEnv: Record<string, string>) => {
  const { command } = configEnv;
  const isBuild = command === "build";
  return defineConfig({
    plugins: [
      createMock(isBuild)
    ],
  });
};
