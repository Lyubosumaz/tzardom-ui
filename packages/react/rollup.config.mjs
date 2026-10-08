import typescript from '@rollup/plugin-typescript'

// Rollup drops 'use client' (MODULE_LEVEL_DIRECTIVE warning); this adds it
// back per file, as Rollup's maintainers suggest in rollup/rollup#4699.
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
  plugins: [
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
