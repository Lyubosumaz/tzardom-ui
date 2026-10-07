import { rimraf } from 'rimraf'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const targets = [
  'node_modules',
  'packages/*/node_modules',
  'packages/*/dist',
  'packages/*/coverage',
  'packages/*/storybook-static',
]

try {
  await rimraf(targets, { glob: true })
  console.log('Cleaned build artifacts and node_modules (pnpm-lock.yaml kept)')
} catch (error) {
  console.error('Clean failed:', error)
  process.exit(1)
} finally {
  console.log(THANK_YOU_MESSAGE)
}
