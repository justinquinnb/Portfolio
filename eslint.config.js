import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import wc from "eslint-plugin-wc";
import lit from "eslint-plugin-lit";

export default tseslint.config(
    // 1. Base JS Recommended
    js.configs.recommended,

    // 2. TypeScript Recommended (handles TS files automatically)
    ...tseslint.configs.recommended,

    // 3. Web Components & Lit Recommended
    wc.configs["flat/recommended"],
    lit.configs["flat/recommended"],

    // 4. Global Project Settings
    {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
      languageOptions: {
        globals: {
          ...globals.browser,
        },
      },
    }
);