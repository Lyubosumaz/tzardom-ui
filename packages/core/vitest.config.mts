import { defineVitestConfig } from '@stencil/vitest/config'
import { stencilVitestPlugin } from '@stencil/vitest/plugin'

export default defineVitestConfig({
  stencilConfig: './stencil.config.ts',
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.spec.{ts,tsx}',
        'src/**/*.e2e.ts',
        'src/components.d.ts',
      ],
    },
    projects: [
      {
        plugins: [stencilVitestPlugin()],
        oxc: {
          jsx: {
            runtime: 'classic',
            pragma: 'h',
            pragmaFrag: 'Fragment',
          },
        },
        test: {
          name: 'spec',
          include: ['src/**/*.spec.{ts,tsx}'],
          environment: 'stencil',
          environmentOptions: {
            stencil: {
              domEnvironment: 'jsdom',
            },
          },
        },
      },
    ],
  },
})
