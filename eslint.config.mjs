import storybook from 'eslint-plugin-storybook'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: [
      '**/dist/**',
      '**/storybook-static/**',
      '**/node_modules/**',
      '**/package-lock.json',
      'packages/core/www/**',
      'packages/core/loader/**',
      'packages/core/.stencil/**',
      'packages/core/coverage/**',
      'packages/core/src/components.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      'eslint.config.mjs',
      'scripts/**/*.mjs',
      'packages/react/babel.config.js',
      'packages/react/jest.config.js',
      'packages/react/.storybook/**/*.ts',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['packages/core/src/**/*.{ts,tsx}'],
    rules: {
      // Stencil's classic JSX transform (jsxFactory: "h") means `h` is only
      // ever referenced implicitly by the JSX compiler, never named directly
      // in code - downgraded here instead of disabled globally.
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['packages/react/src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./packages/react/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/internal-regex': '^@/',
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'error',
      'import/order': [
        'warn',
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
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.stories.*',
            '**/*.test.*',
            '**/.storybook/**/*.*',
          ],
          peerDependencies: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  prettierConfig,
  ...storybook.configs['flat/recommended'],
]
