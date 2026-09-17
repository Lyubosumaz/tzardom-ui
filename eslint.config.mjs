// ESLint 9 flat config for tzardom-ui
// Replaces the old .eslintrc.json + eslint-config-airbnb-typescript setup,
// which does not support ESLint 9's flat config format.

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    ignores: [
      'dist/**',
      'storybook-static/**',
      'node_modules/**',
      'package-lock.json',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
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
          'newlines-between': 'always',
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
          peerDependencies: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  prettierConfig,
]
