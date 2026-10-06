import type { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'
import tailwindcss from '@tailwindcss/postcss'
import postcss from 'postcss'
import type { AtRule, Plugin } from 'postcss'

const applyTailwindFallbackEverywhere: Plugin = {
  postcssPlugin: 'apply-tailwind-fallback-everywhere',
  OnceExit(root) {
    root.walkAtRules('supports', (atRule) => {
      const parent = atRule.parent as AtRule | undefined
      if (parent?.name === 'layer' && parent.params === 'properties') {
        atRule.replaceWith(atRule.nodes ?? [])
      }
    })
  },
}

const tailwind = {
  name: 'tailwind',
  pluginType: 'css',
  async transform(sourceText: string, fileName: string) {
    if (!fileName.endsWith('.css')) {
      return null
    }
    const result = await postcss([
      tailwindcss({ base: 'src/components' }),
      applyTailwindFallbackEverywhere,
    ]).process(`@import 'tailwindcss';\n${sourceText}`, { from: fileName })
    return result.css
  },
}

export const config: Config = {
  namespace: 'tzardom-ui-core',
  tsconfig: 'tsconfig.build.json',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [{ src: '../../react/themes', dest: 'themes' }],
    },
    reactOutputTarget({
      outDir: '../react/src/generated',
    }),
  ],
  plugins: [tailwind],
  devServer: {
    address: 'localhost',
    reloadStrategy: 'pageReload',
  },
}
