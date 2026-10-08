# @tzardom-ui/react

React components for [tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui),
built with semantic HTML and styled with Tailwind CSS v4.

## Install

```bash
npm install @tzardom-ui/react @tzardom-ui/themes
```

Requires React 19.

## Usage

In your app's CSS, import Tailwind, then one of the [themes](#themes). The theme
gives your Tailwind the colors, and imports this package's `tailwind.css`, which
makes it generate the classes the components use:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
```

Then use the components:

```tsx
import { TzarCommonLink } from '@tzardom-ui/react'

function App() {
  return (
    <TzarCommonLink href="/login" data-testid="login">
      Log in
    </TzarCommonLink>
  )
}
```

## Components

### `<TzarBrand>`

The app's name and tagline, with an icon in front: an umbrella by default, or
any icon component you pass, such as one from `lucide-react`. The icon is sized
to fit and hidden from screen readers.

```tsx
<TzarBrand
  title="Team Capacity"
  subtitle="Plan your sprints"
  data-testid="header"
/>
```

| Prop          | Type      | Default    | Description                            |
| ------------- | --------- | ---------- | -------------------------------------- |
| `data-testid` | `string`  | required   | The test id, put on the root element   |
| `title`       | `string`  | —          | The name, in bold                      |
| `subtitle`    | `string`  | —          | The smaller line under it              |
| `icon`        | component | `Umbrella` | The icon shown before the text         |
| `className`   | `string`  | —          | Extra classes; on a conflict yours win |

### `<TzarFooter>`

The page footer: a copyright line, the app's name and what it's built with, in
one row. Pass the texts ready to show, e.g. with the year already filled in.

```tsx
<TzarFooter
  copyright="© 2026 Team Capacity"
  appName="Team Capacity"
  builtWith="Built with Next.js"
  data-testid="app"
/>
```

| Prop          | Type     | Default  | Description                              |
| ------------- | -------- | -------- | ---------------------------------------- |
| `data-testid` | `string` | required | The test id, put on the root element     |
| `copyright`   | `string` | —        | The copyright line, on the left          |
| `appName`     | `string` | —        | The app's name, in the middle            |
| `builtWith`   | `string` | —        | What the app is built with, on the right |
| `className`   | `string` | —        | Extra classes; on a conflict yours win   |

### `<TzarCommonLink>`

A pill-shaped link. React only: it renders your app's own link component, so
routing stays the app's (Next.js `Link`, React Router's `Link`, or a plain `<a>`
by default).

```tsx
import Link from 'next/link'

;<TzarCommonLink as={Link} href="/login" data-testid="login">
  Log in
</TzarCommonLink>
```

| Prop          | Type                   | Default     | Description                                                        |
| ------------- | ---------------------- | ----------- | ------------------------------------------------------------------ |
| `data-testid` | `string`               | required    | The test id, put on the root element                               |
| `as`          | `ElementType`          | `'a'`       | Element or component to render                                     |
| `variant`     | `'outline' \| 'ghost'` | `'outline'` | Bordered pill, or pill on hover only                               |
| `className`   | `string`               | —           | Extra classes; on a conflict (e.g. `px-5` vs our `px-3`) yours win |
| …             |                        |             | Any other prop goes to `as` (`href`, `prefetch`, …)                |

### `<TzarProvider>` and `useTzarTheme()`

`TzarProvider` holds the theme, light or dark, and puts it on
`<html data-theme="…">`, which the [themes](#themes) read. With `storageKey` it
also saves the theme in `localStorage`, so it survives a reload. Wrap your app
in it once, near the root:

```tsx
import { TzarProvider } from '@tzardom-ui/react'

;<TzarProvider storageKey="theme">{children}</TzarProvider>
```

| Prop         | Type        | Default | Description                                         |
| ------------ | ----------- | ------- | --------------------------------------------------- |
| `storageKey` | `string`    | —       | The `localStorage` key; without it nothing is saved |
| `children`   | `ReactNode` | —       | Your app                                            |

Inside it, `useTzarTheme()` reads and changes the theme. Outside a provider it
throws.

```tsx
import { ThemeColorMode, useTzarTheme } from '@tzardom-ui/react'

const { theme, setTheme, resetTheme } = useTzarTheme()
setTheme(ThemeColorMode.DARK) // resetTheme() goes back to light
```

### `<TzarThemeToggle>`

An icon button that switches between light and dark: a moon in light mode, a sun
in dark mode. It must be inside a `TzarProvider`: a click changes the provider's
theme, and the icon and the page follow it. Outside a provider it throws.

| Prop          | Type     | Default          | Description                            |
| ------------- | -------- | ---------------- | -------------------------------------- |
| `data-testid` | `string` | required         | The test id, put on the root element   |
| `label`       | `string` | `'Toggle theme'` | The button's accessible name           |
| `className`   | `string` | —                | Extra classes; on a conflict yours win |

### `<TzarLanguageSelect>`

A button that opens a list of languages. Escape and a click outside close it.

| Prop          | Type                     | Default      | Description                                                     |
| ------------- | ------------------------ | ------------ | --------------------------------------------------------------- |
| `data-testid` | `string`                 | required     | The test id, put on the root element                            |
| `languages`   | `TzarLanguage[]`         | —            | `{ code, short, label }` for each language                      |
| `value`       | `string`                 | —            | The current language's `code`                                   |
| `onChange`    | `(code: string) => void` | —            | Called with the picked language's `code`                        |
| `label`       | `string`                 | `'Language'` | Names the button, followed by the current code (`Language: EN`) |
| `className`   | `string`                 | —            | Extra classes for the wrapper; on a conflict yours win          |

## Test ids

Every component requires a `data-testid`: leaving it out is a TypeScript error.
Every id starts with `tzar-ui-` and the component's name, followed by your id.
Inner parts get the same id plus a fixed suffix. So two copies never clash, and
every id shows which component it belongs to:

```tsx
<TzarBrand title="…" subtitle="…" data-testid="header" />
// tzar-ui-brand-header, tzar-ui-brand-header-icon,
// tzar-ui-brand-header-title, tzar-ui-brand-header-subtitle
```

The names are exported as `TEST_ID_PREFIXES`, so tests can build the ids instead
of typing them:

```ts
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'

screen.getByTestId(`${TEST_ID_PREFIXES.brand}-header-title`)
```

| Component            | `TEST_ID_PREFIXES` key | Root element                               | Inner parts                              |
| -------------------- | ---------------------- | ------------------------------------------ | ---------------------------------------- |
| `TzarBrand`          | `brand`                | the outer `<div>`                          | `-icon`, `-title`, `-subtitle`           |
| `TzarCommonLink`     | `commonLink`           | the `<a>`, or the component passed as `as` | — (its content is your `children`)       |
| `TzarFooter`         | `footer`               | the `<footer>`                             | `-copyright`, `-app-name`, `-built-with` |
| `TzarLanguageSelect` | `languageSelect`       | the outer `<div>`                          | `-trigger`, `-menu`, `-option-{code}`    |
| `TzarThemeToggle`    | `themeToggle`          | the `<button>`                             | `-icon`                                  |

## Themes

The color themes are their own package,
[`@tzardom-ui/themes`](https://www.npmjs.com/package/@tzardom-ui/themes). Each
names the colors for Tailwind (`bg-background`, `text-secondary`, …) and sets
their light values on `:root` and dark values on `:root[data-theme='dark']`.
`TzarProvider` switches between light and dark.

## Upgrading from 0.2

- `@tzardom-ui/core` is gone: `TzarThemeToggle` and `TzarLanguageSelect` are
  plain React components now, and `TzarIconButton` and `TzarDropdown` are
  removed.
- It's ESM only: the CommonJS build is gone, so `require('@tzardom-ui/react')`
  no longer works.
- `@tzardom-ui/react/icons` is gone. Import icons from `lucide-react`;
  `TzarBrand` has its umbrella built in.
- `TzarThemeToggle` must be inside a `TzarProvider` (it throws outside one), and
  its `theme`, `defaultTheme` and `onThemeChange` props are gone: it shows and
  changes the provider's theme.
- `TzarContext` isn't exported anymore; use `useTzarTheme()`.
- Every component needs a `data-testid`; see [Test ids](#test-ids).
- The themes moved to their own package: install `@tzardom-ui/themes` and change
  `@import '@tzardom-ui/react/themes/team-capacity-dashboard.css'` to
  `@import '@tzardom-ui/themes/team-capacity-dashboard.css'`.
