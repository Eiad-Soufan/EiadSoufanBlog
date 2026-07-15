import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Framer Motion's lowercase namespace is consumed through JSX member
      // expressions in the legacy pages. Keep those files lintable until they
      // are rebuilt in the following redesign stages.
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^(motion|reduce|[A-Z_])',
          argsIgnorePattern: '^(_|featured$)',
        },
      ],
    },
  },
])
