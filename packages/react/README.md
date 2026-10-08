# @tzardom-ui/react

React components with semantic HTML, styled with Tailwind CSS v4. Part of
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui).

## Install

```bash
npm install @tzardom-ui/react @tzardom-ui/themes
```

Needs React 19.

## Setup

1. In your app's CSS, import Tailwind and a theme. The theme brings the colors
   and makes Tailwind generate the components' classes.

   ```css
   @import 'tailwindcss';
   @import '@tzardom-ui/themes/team-capacity-dashboard.css';
   ```

2. Wrap your app in `TzarProvider`, which holds light/dark:

   ```tsx
   <TzarProvider storageKey="theme">{children}</TzarProvider>
   ```

3. Use the components. Each one needs a `data-testid`:

   ```tsx
   <TzarCommonLink href="/login" data-testid="login">
     Log in
   </TzarCommonLink>
   ```

## Components

Every component takes `data-testid` (required, see [Test ids](#test-ids)) and
`className` (extra classes; where they clash with ours, yours win). The tables
list the other props.

### `<TzarBrand>`

The app's name and tagline, with an icon in front. The icon is hidden from
screen readers.

```tsx
<TzarBrand
  title="Team Capacity"
  subtitle="Plan your sprints"
  data-testid="header"
/>
```

| Prop       | Type      | Default    | Description                                  |
| ---------- | --------- | ---------- | -------------------------------------------- |
| `title`    | `string`  | —          | The name, in bold                            |
| `subtitle` | `string`  | —          | The smaller line under it                    |
| `icon`     | component | `Umbrella` | Any icon component, e.g. from `lucide-react` |

### `<TzarFooter>`

The page footer: copyright, app name and what it's built with, in one row.

```tsx
<TzarFooter
  copyright="© 2026 Team Capacity"
  appName="Team Capacity"
  builtWith="Built with Next.js"
  data-testid="app"
/>
```

| Prop        | Type     | Default | Description                          |
| ----------- | -------- | ------- | ------------------------------------ |
| `copyright` | `string` | —       | Left, ready to show (year filled in) |
| `appName`   | `string` | —       | Middle                               |
| `builtWith` | `string` | —       | Right                                |

### `<TzarCommonLink>`

A pill-shaped link. It renders your router's link component, so routing stays
your app's.

```tsx
<TzarCommonLink as={Link} href="/login" data-testid="login">
  Log in
</TzarCommonLink>
```

| Prop      | Type                   | Default     | Description                              |
| --------- | ---------------------- | ----------- | ---------------------------------------- |
| `as`      | `ElementType`          | `'a'`       | What to render, e.g. Next.js `Link`      |
| `variant` | `'outline' \| 'ghost'` | `'outline'` | A bordered pill, or a pill only on hover |
| …         |                        |             | Any other prop goes to `as` (`href`, …)  |

### `<TzarThemeToggle>`

A button that switches between light and dark: a moon in light mode, a sun in
dark. It must be inside a `TzarProvider`.

| Prop    | Type     | Default          | Description                  |
| ------- | -------- | ---------------- | ---------------------------- |
| `label` | `string` | `'Toggle theme'` | The button's accessible name |

### `<TzarLanguageSelect>`

A button that opens a list of languages. Escape or a click outside closes it.

| Prop        | Type                     | Default      | Description                                |
| ----------- | ------------------------ | ------------ | ------------------------------------------ |
| `languages` | `TzarLanguage[]`         | —            | `{ code, short, label }` for each language |
| `value`     | `string`                 | —            | The current language's `code`              |
| `onChange`  | `(code: string) => void` | —            | Called with the picked language's `code`   |
| `label`     | `string`                 | `'Language'` | Names the button, e.g. `Language: EN`      |

### `<TzarProvider>` and `useTzarTheme()`

`TzarProvider` holds the theme, light or dark, and sets it on
`<html data-theme="…">`, which the themes read. With `storageKey`, it also saves
the choice in `localStorage`.

Any component inside it can read and change the theme:

```tsx
const { theme, setTheme, resetTheme } = useTzarTheme()
setTheme(ThemeColorMode.DARK) // resetTheme() goes back to light
```

Outside a provider, `useTzarTheme()` and `TzarThemeToggle` throw an error.

## Test ids

Your `data-testid` becomes part of every id a component sets, so ids never clash
and always say which component they belong to:

```tsx
<TzarBrand title="…" subtitle="…" data-testid="header" />
// tzar-ui-brand-header         the root
// tzar-ui-brand-header-title   one of its parts
```

In tests, build the ids from `TEST_ID_PREFIXES` instead of typing them:

```ts
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'

screen.getByTestId(`${TEST_ID_PREFIXES.brand}-header-title`)
```

| Component            | Key              | Root                   | Parts                                    |
| -------------------- | ---------------- | ---------------------- | ---------------------------------------- |
| `TzarBrand`          | `brand`          | `<div>`                | `-icon`, `-title`, `-subtitle`           |
| `TzarCommonLink`     | `commonLink`     | the `<a>` or your `as` | —                                        |
| `TzarFooter`         | `footer`         | `<footer>`             | `-copyright`, `-app-name`, `-built-with` |
| `TzarLanguageSelect` | `languageSelect` | `<div>`                | `-trigger`, `-menu`, `-option-{code}`    |
| `TzarThemeToggle`    | `themeToggle`    | `<button>`             | `-icon`                                  |

## Upgrading from 0.2 or 0.3.0

- **Themes moved** to their own package: install `@tzardom-ui/themes` and import
  `@tzardom-ui/themes/team-capacity-dashboard.css` instead of
  `@tzardom-ui/react/themes/…`. The theme imports `tailwind.css` for you.
- **`data-testid` is required** on every component.
- **`TzarThemeToggle` needs a `TzarProvider`,** and its `theme`, `defaultTheme`
  and `onThemeChange` props are gone.
- **`TzarContext` is gone;** use `useTzarTheme()`.
- **`@tzardom-ui/react/icons` is gone;** import icons from `lucide-react`.
- **ESM only:** `require('@tzardom-ui/react')` no longer works.
- **From 0.2 only:** `@tzardom-ui/core` is gone, and with it `TzarIconButton`
  and `TzarDropdown`.
