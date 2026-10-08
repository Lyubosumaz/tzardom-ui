import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import storybook from 'eslint-plugin-storybook'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores([
    '**/dist/**',
    '**/coverage/**',
    '**/storybook-static/**',
    '**/pnpm-lock.yaml',
  ]),

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['packages/react/*.ts', 'packages/react/*.mts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: { import: importPlugin },
    settings: { 'import/internal-regex': '^@/' },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-param-reassign': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/newline-after-import': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.stories.*',
            '**/*.test.*',
            '**/*.spec.*',
            '**/.storybook/**',
            '**/*.config.*',
            '**/vitest.setup.*',
            'packages/storybook/**',
            'packages/e2e/**',
            'packages/mocks/**',
            'scripts/**',
            'eslint.config.mjs',
          ],
          peerDependencies: true,
        },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        module: 'writable',
      },
    },
  },
  {
    files: ['scripts/**'],
    rules: { 'no-console': 'off' },
  },
  // React
  {
    files: ['packages/*/**/*.{ts,tsx}'],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat['recommended-latest'],
    ],
    settings: { react: { version: 'detect' } },
    rules: {
      'react/jsx-no-useless-fragment': 'error',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': 'error',
      'react/no-array-index-key': 'error',
    },
  },
  storybook.configs['flat/recommended'],
])
