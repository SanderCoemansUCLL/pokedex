import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "!src/**"],
  },
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.browser } 
  },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["src/**/*.{ts,mts,cts,vue}"]
  })),
  ...pluginVue.configs["flat/essential"].map(config => ({
    ...config,
    files: ["src/**/*.vue"]
  })),
  { 
    files: ["src/**/*.vue"], 
    languageOptions: { parserOptions: { parser: tseslint.parser } } 
  },
  { 
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    rules: { 
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
    } 
  },
]);