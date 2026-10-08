import { rmSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'

const keepUseClient = () => {
  const clientFiles = new Set()

  return {
    name: 'keep-use-client',
    onLog(level, log) {
      const removedUseClient =
        log.code === 'MODULE_LEVEL_DIRECTIVE' &&
        log.message.includes('"use client"')

      if (removedUseClient) {
        clientFiles.add(log.id)
        return false
      }
    },
    banner(chunk) {
      const isClientFile = chunk.moduleIds.some((id) => clientFiles.has(id))
      return isClientFile ? "'use client';" : ''
    },
  }
}

const emptyDist = () => ({
  name: 'empty-dist',
  renderStart() {
    rmSync('dist', { recursive: true, force: true })
  },
})

export default {
  input: 'src/index.ts',
  external: [
    /^react($|\/)/,
    /^react-dom($|\/)/,
    /^lucide-react$/,
    /^tailwind-merge$/,
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  onLog(level, log, handler) {
    if (log.code === 'UNRESOLVED_IMPORT') {
      handler('error', log)
    } else {
      handler(level, log)
    }
  },
  plugins: [
    emptyDist(),
    keepUseClient(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.tsx'],
      compilerOptions: {
        rootDir: 'src',
        outDir: 'dist',
        declaration: true,
        declarationDir: 'dist/types',
      },
    }),
  ],
}
