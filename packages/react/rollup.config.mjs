import { readdirSync, rmSync, statSync } from 'node:fs'
import path from 'node:path'
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

const removeStaleFiles = () => ({
  name: 'remove-stale-files',
  writeBundle(options, bundle) {
    const written = new Set(Object.keys(bundle))
    for (const file of readdirSync(options.dir, { recursive: true })) {
      const fullPath = path.join(options.dir, file)
      const isStale = !written.has(file.split(path.sep).join('/'))
      if (isStale && statSync(fullPath).isFile()) {
        rmSync(fullPath)
      }
    }
  },
})

export default {
  input: 'src/index.ts',
  external: [/^react($|\/)/, /^lucide-react$/, /^tailwind-merge$/],
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
    removeStaleFiles(),
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
