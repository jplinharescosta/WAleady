import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import boundaries from "eslint-plugin-boundaries";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { boundaries },
    rules: { ...boundaries.configs.recommended.rules },
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
