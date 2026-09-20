import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { THANK_YOU_MESSAGE } from './CONSTANTS.mjs'

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..')
const bump = process.argv[2]

if (!bump) {
  console.error(
    'Usage: npm run version <patch|minor|major|premajor|preminor|prepatch|prerelease|<exact version>>',
  )
  process.exit(1)
}

try {
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
  const typesPkgPath = path.join(rootDir, 'packages/types/package.json')

  const coreVersion = JSON.parse(readFileSync(corePkgPath, 'utf8')).version
  const typesVersion = JSON.parse(readFileSync(typesPkgPath, 'utf8')).version

  const syncDependency = (pkgPath, depName, newRange) => {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    if (pkg.dependencies?.[depName] === newRange) {
      return
    }
    pkg.dependencies[depName] = newRange
    writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
    console.log(`Synced ${pkg.name}'s dependency on ${depName} to ${newRange}`)
  }

  syncDependency(reactPkgPath, '@tzardom-ui/core', `^${coreVersion}`)
  syncDependency(reactPkgPath, '@tzardom-ui/types', `^${typesVersion}`)
  syncDependency(corePkgPath, '@tzardom-ui/types', `^${typesVersion}`)
} catch (error) {
  console.error('Version bump failed:', error)
  process.exit(1)
} finally {
  console.log(THANK_YOU_MESSAGE)
}
