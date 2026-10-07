import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import depsExternal from 'rollup-plugin-peer-deps-external'

const input = {
  index: 'src/index.ts', // @tzardom-ui/react
  icons: 'src/icons.ts', // @tzardom-ui/react/icons
}

const external = (id) => /^lucide-react/.test(id) || /^tailwind-merge/.test(id)

const USE_CLIENT = /^(?:\s|\/\/[^\n]*\n|\/\*[\s\S]*?\*\/)*['"]use client['"]/

const clientModules = new Set()

const preserveUseClient = () => ({
  name: 'preserve-use-client',
  onLog(level, log) {
    // Rollup reports that it dropped 'use client'; banner() below restores it.
    if (
      log.code === 'MODULE_LEVEL_DIRECTIVE' &&
      /use client/.test(log.message)
    ) {
      return false
    }
  },
  transform(code, id) {
    if (USE_CLIENT.test(code)) {
      clientModules.add(id)
    }
    return null
  },
  banner(chunk) {
    return chunk.moduleIds.some((id) => clientModules.has(id))
      ? "'use client';"
      : ''
  },
})

const sharedPlugins = [
  preserveUseClient(),
  depsExternal(),
  resolve({
    extensions: ['.js', '.ts', '.tsx'],
  }),
  terser({ compress: { directives: false } }),
]

const typescriptExclude = ['**/__tests__', '**/*.test.tsx']

export default [
  {
    input,
    output: {
      dir: 'dist/esm',
      entryFileNames: '[name].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
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
      preserveModules: true,
      preserveModulesRoot: 'src',
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
