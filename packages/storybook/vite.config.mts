import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Storybook shows the components straight from the react package's source, so
// an edit shows up right away, without building the package first. The match is
// exact, so '@tzardom-ui/react/themes/…' still goes through the package.
const reactSource = fileURLToPath(
  new URL('../react/src/index.ts', import.meta.url),
)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Resolves the @/ imports from each file's nearest tsconfig.json.
    tsconfigPaths: true,
    alias: [{ find: /^@tzardom-ui\/react$/, replacement: reactSource }],
    // One copy of React, although the components' files sit in another package.
    dedupe: ['react', 'react-dom'],
  },
})
