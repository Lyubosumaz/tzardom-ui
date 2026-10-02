# @tzardom-ui/react

React components for [tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui).

This package doesn't contain hand-written component logic — it's a thin wrapper,
generated directly from
[`@tzardom-ui/core`](https://www.npmjs.com/package/@tzardom-ui/core)'s build
(via Stencil's
[`react-output-target`](https://github.com/stenciljs/output-targets)), so it
can't drift out of sync with the underlying components. If you need to change
what a component looks like or does, that happens in `core`, not here.

## Install

```bash
npm install @tzardom-ui/react
```

Requires React 19 and React DOM 19 as peer dependencies.

## Usage

```tsx
import { TzarCommonLink, TzarHeader } from '@tzardom-ui/react'

function App() {
  return (
    <>
      <TzarHeader isLogged />
      <TzarCommonLink href="/login">Log in</TzarCommonLink>
    </>
  )
}
```

## Components

### `<TzarCommonLink>`

A pill-shaped link. React only: it renders your app's own link component, so
routing stays the app's (Next.js `Link`, React Router's `Link`, or a plain `<a>`
by default).

```tsx
import Link from 'next/link'

;<TzarCommonLink as={Link} href="/login">
  Log in
</TzarCommonLink>
```

| Prop        | Type                   | Default     | Description                                         |
| ----------- | ---------------------- | ----------- | --------------------------------------------------- |
| `as`        | `ElementType`          | `'a'`       | Element or component to render                      |
| `variant`   | `'outline' \| 'ghost'` | `'outline'` | Bordered pill, or pill on hover only                |
| `className` | `string`               | —           | Extra classes, added after ours                     |
| …           |                        |             | Any other prop goes to `as` (`href`, `prefetch`, …) |

### `<TzarHeader>`

| Prop       | Type      | Default | Description                             |
| ---------- | --------- | ------- | --------------------------------------- |
| `isLogged` | `boolean` | `true`  | Whether to show the logged-in nav items |

## Part of the tzardom-ui monorepo

| Package                                                                | What it is                              |
| ---------------------------------------------------------------------- | --------------------------------------- |
| [`@tzardom-ui/core`](https://www.npmjs.com/package/@tzardom-ui/core)   | Framework-agnostic components (Stencil) |
| `@tzardom-ui/react`                                                    | This package                            |
| [`@tzardom-ui/types`](https://www.npmjs.com/package/@tzardom-ui/types) | Shared TypeScript types                 |
