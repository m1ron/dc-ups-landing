// ESLint: recommended rules (they include no-undef and no-unused-vars) for browser ES modules.
import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  { languageOptions: { globals: globals.browser } },
];
