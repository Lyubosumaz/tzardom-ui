import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const reactSource = fileURLToPath(
  new URL('../react/src/index.ts', import.meta.url),
)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    alias: [{ find: /^@tzardom-ui\/react$/, replacement: reactSource }],
    dedupe: ['react', 'react-dom'],
  },
})
