import type { Config } from '@stencil/core'
import { reactOutputTarget } from '@stencil/react-output-target'
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'tzardom-ui-core',
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
    },
    reactOutputTarget({
      outDir: '../react/src/generated',
    }),
  ],
  plugins: [sass()],
  devServer: {
    address: 'localhost',
  },
}
