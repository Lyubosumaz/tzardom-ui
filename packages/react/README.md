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

A toggle button for dark mode: a moon in light mode, a sun in dark. It's
`aria-pressed` while dark is on. It must be inside a `TzarProvider`.

| Prop    | Type     | Default        | Description                  |
| ------- | -------- | -------------- | ---------------------------- |
| `label` | `string` | `'Dark theme'` | The button's accessible name |

### `<TzarLanguageSelect>`

A button that opens a list of languages. Escape or a click outside closes it.

| Prop        | Type                     | Default      | Description                                |
| ----------- | ------------------------ | ------------ | ------------------------------------------ |
| `languages` | `TzarLanguage[]`         | —            | `{ code, short, label }` for each language |
| `value`     | `string`                 | —            | The current language's `code`              |
| `onChange`  | `(code: string) => void` | —            | Called with the picked language's `code`   |
| `label`     | `string`                 | `'Language'` | Names the button, e.g. `Language: EN`      |

### `<TzarUserMenu>`

A round button with the first letter of the user's email. It opens a menu with
the email, an account link and a log out button. Escape or a click outside
closes it.

```tsx
<TzarUserMenu
  email={user.email}
  accountHref="/user"
  linkAs={Link}
  onLogout={logout}
  data-testid="header"
/>
```

| Prop           | Type          | Default       | Description                                     |
| -------------- | ------------- | ------------- | ----------------------------------------------- |
| `email`        | `string`      | —             | Shown in the menu; its first letter on top      |
| `accountHref`  | `string`      | —             | Where the account link goes                     |
| `onLogout`     | `() => void`  | —             | Called when log out is clicked                  |
| `linkAs`       | `ElementType` | `'a'`         | The account link's element, e.g. Next.js `Link` |
| `label`        | `string`      | `'User menu'` | Names the button, e.g. `User menu: a@b.com`     |
| `accountLabel` | `string`      | `'Account'`   | The account link's text                         |
| `logoutLabel`  | `string`      | `'Log out'`   | The log out button's text                       |

### `<TzarMetricCard>`

A card with one number: a label, the value in large text and a short helper
line. It's a `<dl>`, so the label is the term and the value its description.

```tsx
<TzarMetricCard
  label="Teams"
  value={3}
  helperText="Active teams in the org."
  data-testid="teams"
/>
```

| Prop         | Type               | Default | Description            |
| ------------ | ------------------ | ------- | ---------------------- |
| `label`      | `string`           | —       | What the number is     |
| `value`      | `number \| string` | —       | The number, e.g. `3`   |
| `helperText` | `string`           | —       | A line under the value |

### `<TzarPageHeader>`

A page or section title with a description under it, in an `<hgroup>`. An `h1`
gets the large page-title style; any other level gets a small section style.

```tsx
<TzarPageHeader
  title="Teams"
  description="Browse teams and their capacity."
  data-testid="teams"
/>
```

| Prop          | Type            | Default | Description                |
| ------------- | --------------- | ------- | -------------------------- |
| `title`       | `string`        | —       | The heading                |
| `description` | `string`        | —       | The line under the heading |
| `as`          | `'h1'` … `'h6'` | `'h1'`  | The heading level          |

### `<TzarTeamsOverCapacity>`

A section with a heading and the teams whose workload is above their capacity,
e.g. `Platform 15/10 (150% used)`. Your app fetches and picks the teams; this
only shows them, plus a loading, error or empty message.

```tsx
<TzarTeamsOverCapacity
  title="Teams over capacity this sprint"
  status={isLoading ? 'loading' : isError ? 'error' : 'ready'}
  teams={[{ id: 'platform', name: 'Platform', workload: 15, capacity: 10 }]}
  data-testid="overview"
/>
```

| Prop          | Type                              | Default                                     | Description                        |
| ------------- | --------------------------------- | ------------------------------------------- | ---------------------------------- |
| `title`       | `string`                          | —                                           | The heading                        |
| `status`      | `'loading' \| 'error' \| 'ready'` | —                                           | Which content to show              |
| `teams`       | `TzarTeamCapacity[]`              | —                                           | `{ id, name, workload, capacity }` |
| `loadingText` | `string`                          | `'Loading capacity data…'`                  | Shown while loading                |
| `errorText`   | `string`                          | `'Unable to load capacity data right now.'` | Shown on error                     |
| `emptyText`   | `string`                          | `'No teams are currently over capacity.'`   | Shown when `teams` is empty        |
| `usedText`    | `string`                          | `'used'`                                    | The word after the percent         |

### `<TzarUpcomingRiskEvents>`

A section with a heading and a list of upcoming events, each with a label, an
optional team, a description and a date. Your app fetches and picks the events;
this only shows them, plus a loading, error or empty message.

```tsx
<TzarUpcomingRiskEvents
  title="Upcoming risk events"
  status={isLoading ? 'loading' : isError ? 'error' : 'ready'}
  events={[
    {
      id: '1',
      label: 'Vacation',
      teamName: 'Platform',
      description: 'Ana is off',
      date: '2026-11-02',
    },
  ]}
  data-testid="overview"
/>
```

| Prop          | Type               | Default                                            | Description                                   |
| ------------- | ------------------ | -------------------------------------------------- | --------------------------------------------- |
| `title`       | `string`           | —                                                  | The heading                                   |
| `status`      | `TzarWidgetStatus` | —                                                  | `'loading'`, `'error'` or `'ready'`           |
| `events`      | `TzarRiskEvent[]`  | —                                                  | `{ id, label, teamName?, description, date }` |
| `loadingText` | `string`           | `'Loading upcoming risk events…'`                  | Shown while loading                           |
| `errorText`   | `string`           | `'Unable to load upcoming risk events right now.'` | Shown on error                                |
| `emptyText`   | `string`           | `'No upcoming vacations or critical events.'`      | Shown when `events` is empty                  |

`date` is shown as you pass it and goes into `<time dateTime>`, so pass an ISO
date like `2026-11-02`.

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
// tzr-brand-header         the root
// tzr-brand-header-title   one of its parts
```

In tests, build the ids from `TEST_ID_PREFIXES` instead of typing them:

```ts
import { TEST_ID_PREFIXES } from '@tzardom-ui/react'

screen.getByTestId(`${TEST_ID_PREFIXES.brand}-header-title`)
```

| Component                | Key                  | Root                   | Parts                                                                                                |
| ------------------------ | -------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `TzarBrand`              | `brand`              | `<div>`                | `-icon`, `-title`, `-subtitle`                                                                       |
| `TzarCommonLink`         | `commonLink`         | the `<a>` or your `as` | —                                                                                                    |
| `TzarFooter`             | `footer`             | `<footer>`             | `-copyright`, `-app-name`, `-built-with`                                                             |
| `TzarLanguageSelect`     | `languageSelect`     | `<div>`                | `-trigger`, `-menu`, `-option-{code}`                                                                |
| `TzarMetricCard`         | `metricCard`         | `<dl>`                 | `-label`, `-value`, `-helper-text`                                                                   |
| `TzarPageHeader`         | `pageHeader`         | `<hgroup>`             | `-title`, `-description`                                                                             |
| `TzarThemeToggle`        | `themeToggle`        | `<button>`             | `-icon`                                                                                              |
| `TzarTeamsOverCapacity`  | `teamsOverCapacity`  | `<section>`            | `-title`, `-loading`, `-error`, `-empty`, `-list`, `-team-{id}`                                      |
| `TzarUpcomingRiskEvents` | `upcomingRiskEvents` | `<section>`            | `-title`, `-loading`, `-error`, `-empty`, `-list`, `-event-{id}`                                     |
| `TzarUserMenu`           | `userMenu`           | `<div>`                | `-trigger`, `-menu`, `-email`; its `TzarCommonLink`s: `tzr-common-link-{root id}-account`, `-logout` |

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
