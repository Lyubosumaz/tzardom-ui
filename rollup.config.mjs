import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import depsExternal from 'rollup-plugin-peer-deps-external'

import { readFileSync } from 'fs'
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

const onwarn = (warning, warn) => {
  if (warning.code === 'THIS_IS_UNDEFINED') return
  warn(warning)
}

const sharedPlugins = [
  depsExternal(),
  resolve({
    extensions: ['.js', '.ts', '.tsx'],
  }),
  postcss(),
  terser(),
]

const typescriptExclude = [
  '**/__tests__',
  '**/*.test.tsx',
  '**/*.stories.tsx',
  '**/TestDecorator.ts',
]

export default [
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    onwarn,
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        exclude: typescriptExclude,
        compilerOptions: {
          rootDir: 'src',
          declaration: true,
          declarationDir: 'dist/esm/types',
        },
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    onwarn,
    plugins: [
      ...sharedPlugins,
      typescript({
        tsconfig: './tsconfig.json',
        exclude: typescriptExclude,
        compilerOptions: {
          rootDir: 'src',
          declaration: false,
          declarationDir: undefined,
        },
      }),
    ],
  },
]
