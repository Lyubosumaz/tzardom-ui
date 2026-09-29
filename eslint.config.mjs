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
    'packages/core/www/**',
    'packages/core/loader/**',
    'packages/core/.stencil/**',
    'packages/core/src/components.d.ts',
    'packages/react/src/generated/**',
  ]),

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'packages/core/*.ts',
            'packages/core/*.mts',
            'packages/react/.storybook/*.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: { import: importPlugin },
    settings: {
      'import/internal-regex': '^@(/|tzardom-ui/)',
    },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-console': 'error',
      'no-param-reassign': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
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
            '**/*.e2e.*',
            '**/.storybook/**',
            '**/*.config.*',
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
      globals: { console: 'readonly', process: 'readonly', module: 'writable' },
    },
  },
  {
    files: ['packages/react/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['scripts/**'],
    rules: { 'no-console': 'off' },
  },
  // Stencil
  {
    files: ['packages/core/src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unsafe-return': 'off',
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^h$' },
      ],
    },
  },
  {
    files: ['packages/core/src/**/*.{spec,e2e}.{ts,tsx}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // React
  {
    files: ['packages/react/**/*.{ts,tsx}'],
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
