import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const fromHere = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: { '@': fromHere('./src') },
    ...(mode === 'test' ? { conditions: ['browser'] } : {}),
  },
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],

    server: {
      deps: { inline: ['@stencil/react-output-target', '@lit/react'] },
    },
    alias: { '@tzardom-ui/types': fromHere('../types/src/index.ts') },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/provider/**/*.{ts,tsx}'],
      exclude: ['src/provider/**/*.types.ts'],
    },
  },
}))
