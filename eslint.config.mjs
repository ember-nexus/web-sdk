import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import {fixupPluginRules} from "@eslint/compat";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import {fileURLToPath} from "node:url";
import js from "@eslint/js";
import {FlatCompat} from "@eslint/eslintrc";
import tseslint from "@eslint/js";
import jest from "eslint-plugin-jest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: ["dist/*", "**/*.js"],
  },
  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ).map(config => ({
    ...config,
    files: ["**/*.ts"],
  })),
  {
    files: ["**/*.ts"],

    plugins: {
      "@typescript-eslint": typescriptEslint,
      prettier,
      import: fixupPluginRules(_import),
      jest
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
        ...globals.node,
        ...jest.environments.globals.globals
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        project: "tsconfig.test.json",
      },
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.test.json",
        },
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-template-curly-in-string": "error",
      "no-use-before-define": "error",
      "require-atomic-updates": "warn",
      "accessor-pairs": "error",
      "block-scoped-var": "error",
      "camelcase": "error",
      "dot-notation": "warn",
      "guard-for-in": "error",
      // "no-console": "error",
      "no-eq-null": "error",
      "no-extra-bind": "error",
      "no-implicit-coercion": "error",
      "no-implicit-globals": "error",
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "prefer-const": "error",
      "require-await": "error",
      ...tseslint.configs.strict,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "sort-imports": ["error", {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      }],
      "import/no-unresolved": "error",
      "import/order": ["error", {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "unknown",
        ],
        "newlines-between": "always",
        "alphabetize": {
          order: "asc",
          caseInsensitive: true,
        },
      }],
      "eqeqeq": ["error", "always"]
    },
  }
];
