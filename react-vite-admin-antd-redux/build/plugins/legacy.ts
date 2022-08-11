import legacy from "@vitejs/plugin-legacy";

function createLegacy() {
  return legacy({
    targets: ["ie >= 11"],
    additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
  });
}

export default createLegacy;
