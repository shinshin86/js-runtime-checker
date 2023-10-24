import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "JsRuntimeEnv",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs", "umd"],
    },
  },
});
