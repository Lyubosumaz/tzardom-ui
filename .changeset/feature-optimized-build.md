---
'@tzardom-ui/core': patch
'@tzardom-ui/react': patch
---

Changes in this release:

- keep 'use client' per component for Next.js Server Components
- removed the two dead excludes
- remove comments that are extended
- switch to vitest in packages/react
- removing bable and switching to vite from webpack5
- create type files
- remove pre builds
- adding pretest script to run lint and typecheck before running tests
