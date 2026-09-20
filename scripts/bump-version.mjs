#!/usr/bin/env node
// Bumps every workspace package's version together, then keeps @tzardom-ui/react's
// dependency on @tzardom-ui/core in sync.
//
// Plain `npm version <bump> --workspaces` can't do this cleanly for us: it tries
// to sync that same cross-reference itself, but doing so makes npm query the real
// npm registry for @tzardom-ui/core — which 404s, since core is never published
// there. That aborts the whole command partway through, after it's already
// bumped both version fields, leaving the dependency reference stale with no
// obvious sign anything went wrong. This script bumps with that sync disabled,
// then does the sync itself locally, with no network involved.

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const bump = process.argv[2]

if (!bump) {
  console.error(
    'Usage: npm run version <patch|minor|major|premajor|preminor|prepatch|prerelease|<exact version>>',
  )
  process.exit(1)
}

execFileSync(
  'npm',
  [
    'version',
    bump,
    '--workspaces',
    '--no-git-tag-version',
    '--no-workspaces-update',
  ],
  { cwd: rootDir, stdio: 'inherit' },
)

const corePkgPath = path.join(rootDir, 'packages/core/package.json')
const reactPkgPath = path.join(rootDir, 'packages/react/package.json')

const coreVersion = JSON.parse(readFileSync(corePkgPath, 'utf8')).version
const reactPkg = JSON.parse(readFileSync(reactPkgPath, 'utf8'))

const newRange = `^${coreVersion}`
if (reactPkg.dependencies?.['@tzardom-ui/core'] !== newRange) {
  reactPkg.dependencies['@tzardom-ui/core'] = newRange
  writeFileSync(reactPkgPath, `${JSON.stringify(reactPkg, null, 2)}\n`)
  console.log(
    `Synced @tzardom-ui/react's dependency on @tzardom-ui/core to ${newRange}`,
  )
}
