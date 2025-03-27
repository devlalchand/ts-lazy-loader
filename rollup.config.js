// rollup.config.js
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/ts-lazy-loader.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/ts-lazy-loader.esm.js",
      format: "esm",
    },
    {
      file: "dist/ts-lazy-loader.min.js",
      format: "umd",
      name: "TsLazyLoader",
    },
  ],
  plugins: [typescript()],
};
