# @tzardom-ui/types

Shared, generic TypeScript types used across the
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui) packages (currently
`@tzardom-ui/react`). Types local to a single component live next to it instead
— this package only holds types that are genuinely shared across more than one
package.

`ThemeColorMode` is a string enum (`ThemeColorMode.LIGHT` = `'light'`,
`ThemeColorMode.DARK` = `'dark'`).

## Install

```bash
npm install @tzardom-ui/types
```

Usually a transitive dependency — you'll get it automatically via
`@tzardom-ui/react` rather than installing it directly.

## Usage

```ts
import { ThemeColorMode } from '@tzardom-ui/types'

const theme: ThemeColorMode = ThemeColorMode.DARK
```

## Part of the tzardom-ui monorepo

| Package                                                                  | What it is         |
| ------------------------------------------------------------------------ | ------------------ |
| [`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react)   | React components   |
| [`@tzardom-ui/themes`](https://www.npmjs.com/package/@tzardom-ui/themes) | Color themes (CSS) |
| `@tzardom-ui/types`                                                      | This package       |
