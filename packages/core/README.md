# @tzardom-ui/core

Framework-agnostic components for
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui), built with
[Stencil](https://stenciljs.com/) and compiled to standard
[Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements).
Works natively in React, Vue, Angular, Svelte, or plain HTML — no framework
required.

This is the single source of truth for component logic and styling.
[`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react) is a
thin, generated wrapper on top of it, not a separate implementation.

## Install

```bash
npm install @tzardom-ui/core
```

## Usage

Register the components once, then use the tags directly:

```html
<script type="module">
  import { defineCustomElements } from '@tzardom-ui/core/loader'
  defineCustomElements()
</script>

<tzar-button label="Click me"></tzar-button>
<tzar-header></tzar-header>
```

If you're consuming this through `@tzardom-ui/react`, none of the above is
necessary — the React wrapper registers the elements for you.

## Components

### `<tzar-button>`

| Prop    | Type     | Default | Description                  |
| ------- | -------- | ------- | ---------------------------- |
| `label` | `string` | —       | Text shown inside the button |

| Event         | Detail                                 | Description                              |
| ------------- | -------------------------------------- | ---------------------------------------- |
| `themeChange` | `ThemeColorMode` (`'light' \| 'dark'`) | Fired on click, with the new theme value |

### `<tzar-header>`

| Prop       | Type      | Default | Description                             |
| ---------- | --------- | ------- | --------------------------------------- |
| `isLogged` | `boolean` | `true`  | Whether to show the logged-in nav items |

## Part of the tzardom-ui monorepo

| Package                                                                | What it is                             |
| ---------------------------------------------------------------------- | -------------------------------------- |
| `@tzardom-ui/core`                                                     | This package                           |
| [`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react) | Generated React wrappers around `core` |
| [`@tzardom-ui/types`](https://www.npmjs.com/package/@tzardom-ui/types) | Shared TypeScript types                |
