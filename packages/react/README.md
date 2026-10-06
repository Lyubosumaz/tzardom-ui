# @tzardom-ui/react

React components for [tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui),
built with semantic HTML and styled with Tailwind CSS v4.

## Install

```bash
npm install @tzardom-ui/react @tzardom-ui/themes
```

Requires React 19 and React DOM 19 as peer dependencies.

## Usage

In your app's CSS, import Tailwind, then one theme from
[`@tzardom-ui/themes`](https://www.npmjs.com/package/@tzardom-ui/themes), then
this package's `tailwind.css`, which makes your Tailwind generate the classes
the components use:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
@import '@tzardom-ui/react/tailwind.css';
```

Then use the components:

```tsx
import { TzarCommonLink } from '@tzardom-ui/react'

function App() {
  return <TzarCommonLink href="/login">Log in</TzarCommonLink>
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

| Prop        | Type                   | Default     | Description                                                        |
| ----------- | ---------------------- | ----------- | ------------------------------------------------------------------ |
| `as`        | `ElementType`          | `'a'`       | Element or component to render                                     |
| `variant`   | `'outline' \| 'ghost'` | `'outline'` | Bordered pill, or pill on hover only                               |
| `className` | `string`               | —           | Extra classes; on a conflict (e.g. `px-5` vs our `px-3`) yours win |
| …           |                        |             | Any other prop goes to `as` (`href`, `prefetch`, …)                |

### `<TzarThemeToggle>`

An icon button that switches between light and dark: a moon in light mode, a sun
in dark mode. Inside a `TzarProvider` it changes the provider's theme.

| Prop            | Type                              | Default          | Description                                  |
| --------------- | --------------------------------- | ---------------- | -------------------------------------------- |
| `theme`         | `ThemeColorMode`                  | —                | Controls the theme from outside              |
| `defaultTheme`  | `ThemeColorMode`                  | `LIGHT`          | Starting theme without a provider or `theme` |
| `onThemeChange` | `(theme: ThemeColorMode) => void` | —                | Called with the new theme on every click     |
| `label`         | `string`                          | `'Toggle theme'` | The button's accessible name                 |
| `className`     | `string`                          | —                | Extra classes; on a conflict yours win       |

### `<TzarLanguageSelect>`

A button that opens a list of languages. Escape and a click outside close it.

| Prop        | Type                     | Default      | Description                                                     |
| ----------- | ------------------------ | ------------ | --------------------------------------------------------------- |
| `languages` | `TzarLanguage[]`         | —            | `{ code, short, label }` for each language                      |
| `value`     | `string`                 | —            | The current language's `code`                                   |
| `onChange`  | `(code: string) => void` | —            | Called with the picked language's `code`                        |
| `label`     | `string`                 | `'Language'` | Names the button, followed by the current code (`Language: EN`) |
| `className` | `string`                 | —            | Extra classes for the wrapper; on a conflict yours win          |

## Icons

Icons come from their own entry point, re-exported from the lucide-react version
the components use:

```tsx
import { Umbrella } from '@tzardom-ui/react/icons'
```

Available: `Umbrella`. Add more in `src/icons.ts`.

## Part of the tzardom-ui monorepo

| Package                                                                  | What it is              |
| ------------------------------------------------------------------------ | ----------------------- |
| `@tzardom-ui/react`                                                      | This package            |
| [`@tzardom-ui/themes`](https://www.npmjs.com/package/@tzardom-ui/themes) | Color themes (CSS)      |
| [`@tzardom-ui/types`](https://www.npmjs.com/package/@tzardom-ui/types)   | Shared TypeScript types |
