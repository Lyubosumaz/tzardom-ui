import { Config } from '@stencil/core'
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
    },
    {
      type: 'docs-readme',
    },
    {
      // Local dev-only harness (`npm start`). Not published — package.json's
      // "files" only ships dist/.
      type: 'www',
      serviceWorker: null,
    },
  ],
  plugins: [sass()],
  testing: {
    browserHeadless: 'new',
  },
}
