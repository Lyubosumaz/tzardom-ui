# @tzardom-ui/types

Shared, generic TypeScript types used across the
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui) packages
(`@tzardom-ui/core`, `@tzardom-ui/react`, ...). Types local to a single
component live next to it instead — this package only holds types that are
genuinely shared across more than one package.

Type-only package: no runtime code, nothing to import as a value.

## Install

```bash
npm install @tzardom-ui/types
```

Usually a transitive dependency — you'll get it automatically via
`@tzardom-ui/core` or `@tzardom-ui/react` rather than installing it directly.

## Usage

```ts
import type { ThemeColorMode } from '@tzardom-ui/types'

const theme: ThemeColorMode = 'dark'
```

## Part of the tzardom-ui monorepo

| Package                                                                | What it is                              |
| ---------------------------------------------------------------------- | --------------------------------------- |
| [`@tzardom-ui/core`](https://www.npmjs.com/package/@tzardom-ui/core)   | Framework-agnostic components (Stencil) |
| [`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react) | Generated React wrappers around `core`  |
| `@tzardom-ui/types`                                                    | This package                            |
