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
import { TzarButton, TzarHeader } from '@tzardom-ui/react'

function App() {
  return (
    <>
      <TzarHeader isLogged />
      <TzarButton
        label="Click me"
        onThemeChange={(event) => console.log(event.detail)}
      />
    </>
  )
}
```

## Components

### `<TzarButton>`

| Prop            | Type                                              | Description                               |
| --------------- | ------------------------------------------------- | ----------------------------------------- |
| `label`         | `string`                                          | Text shown inside the button              |
| `onThemeChange` | `(event: CustomEvent<'light' \| 'dark'>) => void` | Called on click, with the new theme value |

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
