import { execFileSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

// Writes the .d.ts files into dist/types after every build. It runs after the
// JS build because Vite empties dist/ first, also on each rebuild in watch mode.
const emitTypes = (): Plugin => ({
  name: 'emit-types',
  apply: 'build',
  closeBundle() {
    execFileSync('tsc', ['-p', 'tsconfig.build.json'], { stdio: 'inherit' })
  },
})

export default defineConfig({
  plugins: [react(), emitTypes()],
  resolve: { tsconfigPaths: true },
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'] },
    sourcemap: true,
    rolldownOptions: {
      external: [/^react($|\/)/, /^lucide-react$/, /^tailwind-merge$/],
      output: {
        // One file per source file, so apps only load the components they use
        // and each file keeps its 'use client'.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/components/**/*.{ts,tsx}',
        'src/provider/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
      ],
      exclude: ['src/**/*.types.ts'],
    },
  },
})
