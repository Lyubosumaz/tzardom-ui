import { fileURLToPath } from 'node:url'
import path, { dirname } from 'path'
import type { StorybookConfig } from '@storybook/react-webpack5'
import tailwindcss from '@tailwindcss/postcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/preset-scss'),
    getAbsolutePath('@storybook/addon-webpack5-compiler-babel'),
    getAbsolutePath('@storybook/addon-mcp'),
    getAbsolutePath('@storybook/addon-docs'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },

  core: {
    enableCrashReports: false,
  },

  webpackFinal: (config) => {
    config.resolve = config.resolve ?? {}
    const srcDir = path.resolve(__dirname, '../src')
    const alias = config.resolve.alias
    // Webpack allows aliases as an object or an array; handle both.
    config.resolve.alias = Array.isArray(alias)
      ? [...alias, { name: '@', alias: srcDir }]
      : { ...alias, '@': srcDir }

    // Run plain .css through Tailwind, for .storybook/tailwind.css.
    for (const rule of config.module?.rules ?? []) {
      if (
        rule &&
        typeof rule === 'object' &&
        rule.test instanceof RegExp &&
        rule.test.test('file.css') &&
        Array.isArray(rule.use)
      ) {
        rule.use.push({
          loader: fileURLToPath(import.meta.resolve('postcss-loader')),
          options: { postcssOptions: { plugins: [tailwindcss()] } },
        })
      }
    }

    return config
  },
}

export default config

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
