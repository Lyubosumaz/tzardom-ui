import path from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import depsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// One output file per entry: dist/{esm,cjs}/index.js and .../icons.js.
// Each entry is a public import path, see "exports" in package.json.
const input = {
  index: 'src/index.ts', // @tzardom-ui/react
  icons: 'src/icons.ts', // @tzardom-ui/react/icons
}

const external = (id) =>
  /^@tzardom-ui\/(core|types)/.test(id) ||
  /^@stencil\/react-output-target/.test(id) ||
  /^lucide-react/.test(id)

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
    input,
    output: {
      dir: 'dist/esm',
      entryFileNames: '[name].js',
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
          outDir: 'dist/esm',
          declaration: true,
          declarationDir: 'dist/esm/types',
        },
      }),
    ],
  },
  {
    input,
    output: {
      dir: 'dist/cjs',
      entryFileNames: '[name].js',
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
          outDir: 'dist/cjs',
          declaration: false,
          declarationDir: undefined,
        },
      }),
    ],
  },
]
