// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  vite: {
  plugins: [{
    name: "email-server-env",
    config: (_config, { mode }) => { Object.assign(process.env, loadEnv(mode, process.cwd(), "")); },
  }],
  resolve: {
    alias: {
      "entities/lib/decode.js": fileURLToPath(new URL("./node_modules/entities/lib/decode.js", import.meta.url)),
      "entities/lib/encode.js": fileURLToPath(new URL("./node_modules/entities/lib/encode.js", import.meta.url)),
      entities: fileURLToPath(new URL("./node_modules/entities", import.meta.url)),
    },
  },
  },
});
