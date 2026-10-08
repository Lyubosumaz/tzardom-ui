# @tzardom-ui/react

React components for [tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui),
built with semantic HTML and styled with Tailwind CSS v4.

## Install

```bash
npm install @tzardom-ui/react
```

Requires React 19 and React DOM 19 as peer dependencies.

## Usage

In your app's CSS, import Tailwind, then one of this package's
[themes](#themes), then its `tailwind.css`, which makes your Tailwind generate
the classes the components use:

```css
@import 'tailwindcss';
@import '@tzardom-ui/react/themes/team-capacity-dashboard.css';
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

### `<TzarBrand>`

The app's name and tagline, with an icon in front: an umbrella by default, or
any icon component you pass, such as one from `lucide-react`. The icon is sized
to fit and hidden from screen readers.

```tsx
<TzarBrand title="Team Capacity" subtitle="Plan your sprints" />
```

| Prop        | Type      | Default    | Description                            |
| ----------- | --------- | ---------- | -------------------------------------- |
| `title`     | `string`  | —          | The name, in bold                      |
| `subtitle`  | `string`  | —          | The smaller line under it              |
| `icon`      | component | `Umbrella` | The icon shown before the text         |
| `className` | `string`  | —          | Extra classes; on a conflict yours win |

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
in dark mode. It must be inside a `TzarProvider`: a click changes the provider's
theme, and the icon and the page follow it. Outside a provider it throws.

| Prop        | Type     | Default          | Description                            |
| ----------- | -------- | ---------------- | -------------------------------------- |
| `label`     | `string` | `'Toggle theme'` | The button's accessible name           |
| `className` | `string` | —                | Extra classes; on a conflict yours win |

### `<TzarLanguageSelect>`

A button that opens a list of languages. Escape and a click outside close it.

| Prop        | Type                     | Default      | Description                                                     |
| ----------- | ------------------------ | ------------ | --------------------------------------------------------------- |
| `languages` | `TzarLanguage[]`         | —            | `{ code, short, label }` for each language                      |
| `value`     | `string`                 | —            | The current language's `code`                                   |
| `onChange`  | `(code: string) => void` | —            | Called with the picked language's `code`                        |
| `label`     | `string`                 | `'Language'` | Names the button, followed by the current code (`Language: EN`) |
| `className` | `string`                 | —            | Extra classes for the wrapper; on a conflict yours win          |

## Themes

| File                                 | For                     |
| ------------------------------------ | ----------------------- |
| `themes/team-capacity-dashboard.css` | team-capacity-dashboard |

Each theme names the colors for Tailwind (`bg-background`, `text-secondary`, …),
sets their light values on `:root` and dark values on
`:root[data-theme='dark']`, and sets the page's background and text color.
`TzarProvider` switches between light and dark.

To add a theme, copy `themes/team-capacity-dashboard.css`, name it after the
app, and change the values, keeping every variable name.

## Upgrading from 0.2

- `@tzardom-ui/core` is gone: `TzarThemeToggle` and `TzarLanguageSelect` are
  plain React components now, and `TzarIconButton` and `TzarDropdown` are
  removed.
- Keep `@import '@tzardom-ui/react/themes/team-capacity-dashboard.css'` and add
  `@import '@tzardom-ui/react/tailwind.css'` right after it, so your Tailwind
  generates the classes the components use.
