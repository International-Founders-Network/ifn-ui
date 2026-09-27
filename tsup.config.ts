import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  target: "es2020",
  // Class strings must survive verbatim so consumer Tailwind can scan dist.
  minify: false,
  external: ["react", "react-dom", "react/jsx-runtime", "lucide-react"],
});
