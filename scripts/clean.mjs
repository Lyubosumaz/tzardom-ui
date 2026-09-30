import { rimraf } from 'rimraf'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const targets = [
  'node_modules',
  'pnpm-lock.yaml',
  'packages/*/node_modules',
  'packages/*/dist',
  'packages/*/loader',
  'packages/*/www',
  'packages/*/.stencil',
  'packages/*/test-results',
  'packages/*/playwright-report',
  'packages/*/storybook-static',
  'packages/*/src/generated',
]

try {
  await rimraf(targets, { glob: true })
  console.log(
    'Cleaned build artifacts, generated files, node_modules and pnpm-lock.yaml',
  )
} catch (error) {
  console.error('Clean failed:', error)
  process.exit(1)
} finally {
  console.log(THANK_YOU_MESSAGE)
}
