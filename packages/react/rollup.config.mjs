import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import depsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

const external = (id) =>
  /^@tzardom-ui\/(core|types)/.test(id) ||
  /^@stencil\/react-output-target/.test(id)

const sharedPlugins = [
  depsExternal(),
  alias({
    entries: [{ find: '@', replacement: path.resolve(dirname, 'src') }],
  }),
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
  '**/*.e2e.ts',
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
    external,
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
    external,
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
