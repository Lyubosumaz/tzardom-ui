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

3. Use the components:

   ```tsx
   <TzarCommonLink href="/login">Log in</TzarCommonLink>
   ```

## Components

Every component takes `className` (extra classes; where they clash with ours,
yours win). The tables list the other props.

### `<TzarBrand>`

The app's name and tagline, with an icon in front. The icon is hidden from
screen readers.

```tsx
<TzarBrand title="Team Capacity" subtitle="Plan your sprints" />
```

| Prop       | Type      | Default    | Description                                  |
| ---------- | --------- | ---------- | -------------------------------------------- |
| `title`    | `string`  | —          | The name, in bold                            |
| `subtitle` | `string`  | —          | The smaller line under it                    |
| `icon`     | component | `Umbrella` | Any icon component, e.g. from `lucide-react` |

### `<TzarDialog>`

A modal pop-up built on the native `<dialog>`. Your `open` state shows and hides
it; the browser gives the rest: Escape asks to close, focus stays inside, the
page behind can't be used, focus goes back to the opening button, and a backdrop
dims the page. Screen readers announce it as a dialog named by its title.

It draws its own buttons: **Cancel** (calls `onClose`) and, with `confirmLabel`,
a confirm button.

```tsx
<TzarDialog
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete team"
  confirmLabel="Delete"
  confirmVariant="danger"
  onConfirm={deleteTeam}
>
  <p>This can't be undone.</p>
</TzarDialog>
```

For a form, give it an `id` and pass that as `form`: the confirm button then
submits the form (Enter in a field does too).

```tsx
<TzarDialog
  open={isOpen}
  onClose={close}
  title="Edit team name"
  confirmLabel={isSaving ? 'Saving…' : 'Save'}
  confirmDisabled={isSaving}
  form="edit-name"
>
  <form id="edit-name" onSubmit={save}>
    …
  </form>
</TzarDialog>
```

| Prop              | Type                    | Default     | Description                                              |
| ----------------- | ----------------------- | ----------- | -------------------------------------------------------- |
| `open`            | `boolean`               | —           | Whether it shows                                         |
| `onClose`         | `() => void`            | —           | Called on Escape and Cancel; set `open` to `false` there |
| `title`           | `string`                | —           | The heading, which also names the dialog                 |
| `children`        | `ReactNode`             | —           | The content under the title                              |
| `confirmLabel`    | `string`                | —           | Shows the confirm button with this text                  |
| `onConfirm`       | `() => void`            | —           | Called by the confirm button (when there's no `form`)    |
| `form`            | `string`                | —           | A form's `id`; the confirm button submits it             |
| `confirmVariant`  | `'primary' \| 'danger'` | `'primary'` | The confirm button's look                                |
| `confirmDisabled` | `boolean`               | `false`     | Disables the confirm button, e.g. while saving           |
| `cancelLabel`     | `string`                | `'Cancel'`  | The Cancel button's text                                 |
| `size`            | `'sm' \| 'lg'`          | `'sm'`      | `sm`: compact. `lg`: wider and taller, for bigger forms  |

A large dialog is at least 20rem tall; any dialog is at most 85% of the screen,
and longer content scrolls inside. On open, focus goes to the first focusable
element inside. Don't use `autoFocus` in the content: the dialog stays in the
page while closed, so it would take focus when the page loads.

### `<TzarFooter>`

The page footer: copyright, app name and what it's built with, in one row.

```tsx
<TzarFooter
  copyright="© 2026 Team Capacity"
  appName="Team Capacity"
  builtWith="Built with Next.js"
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
<TzarCommonLink as={Link} href="/login">
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

### `<TzarButton>`

A native `<button>` in four looks and two sizes. It's `type="button"` unless you
pass `type="submit"`, so it never submits a form by accident.

```tsx
<TzarButton variant="primary" type="submit">
  Log in
</TzarButton>
```

| Prop      | Type                                             | Default       | Description                                                        |
| --------- | ------------------------------------------------ | ------------- | ------------------------------------------------------------------ |
| `variant` | `'primary' \| 'secondary' \| 'soft' \| 'danger'` | `'secondary'` | Filled accent, outlined, the header's soft color, or filled danger |
| `size`    | `'sm' \| 'md'`                                   | `'sm'`        | Compact (`h-8`, `text-xs`) or larger (`text-sm`)                   |
| `type`    | `'button' \| 'submit' \| 'reset'`                | `'button'`    | As on `<button>`                                                   |
| …         |                                                  |               | Any other prop goes to the `<button>`                              |

### `<TzarTextField>`

A label and a text input, linked so clicking the label focuses the input and
screen readers read its name. With `error`, the message shows under the input
and is linked to it.

```tsx
<TzarTextField
  label="Email"
  type="email"
  required
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  error={emailError}
/>
```

| Prop        | Type     | Default     | Description                                       |
| ----------- | -------- | ----------- | ------------------------------------------------- |
| `label`     | `string` | —           | The label above the input                         |
| `error`     | `string` | —           | An error under the input; marks it `aria-invalid` |
| `type`      | `string` | `'text'`    | `'email'`, `'password'`, …                        |
| `id`        | `string` | a unique id | The input's id                                    |
| `className` | `string` | —           | Styles the wrapper                                |
| …           |          |             | Any other prop goes to the `<input>`              |

### `<TzarChart>`

A line or bar chart drawn in plain SVG, with no chart library. It has axes with
round ticks, a legend for two or more series, a tooltip on hover, and a "Show
data" table for keyboard and screen-reader users. It fills the width of its
container.

```tsx
<TzarChart
  type="bar"
  title="Workload vs capacity"
  data={[
    { name: 'Platform', capacity: 10, workload: 12 },
    { name: 'Web', capacity: 8, workload: 6 },
  ]}
  xKey="name"
  xLabel="Team"
  series={[
    { key: 'capacity', label: 'Capacity', color: '#db2777' },
    { key: 'workload', label: 'Workload', color: '#0891b2' },
  ]}
/>
```

| Prop         | Type                      | Default              | Description                             |
| ------------ | ------------------------- | -------------------- | --------------------------------------- |
| `type`       | `'line' \| 'bar'`         | —                    | How to draw the series                  |
| `title`      | `string`                  | —                    | The caption                             |
| `subtitle`   | `string`                  | —                    | A line under the title                  |
| `data`       | `TzarChartRow[]`          | —                    | One object per point / bar group        |
| `xKey`       | `string`                  | —                    | The field with each row's label         |
| `xLabel`     | `string`                  | `xKey`               | The table's first column header         |
| `series`     | `{ key, label, color }[]` | —                    | The fields to plot, each with its color |
| `emptyText`  | `string`                  | `'No data to show.'` | Shown when `data` is empty              |
| `tableLabel` | `string`                  | `'Show data'`        | The data table's toggle                 |

Each series brings its own `color`, any CSS color (`'#db2777'`,
`'var(--my-color)'`, …). Pick colors that stay apart for color-blind readers on
your background, and give a series the same color everywhere it appears.

### `<TzarMetricCard>`

A card with one number: a label, the value in large text and a short helper
line. It's a `<dl>`, so the label is the term and the value its description.

```tsx
<TzarMetricCard label="Teams" value={3} helperText="Active teams in the org." />
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
<TzarPageHeader title="Teams" description="Browse teams and their capacity." />
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

Test by role, label or text first (`getByRole('button', { name: 'Save' })`). Add
a `data-testid` only where a test can't find the element another way. It goes on
the component's root element as is, with nothing added to it:

```tsx
<TzarBrand title="…" subtitle="…" />
// <div>…</div>
```

## Upgrading from 0.2 or 0.3.0

- **Themes moved** to their own package: install `@tzardom-ui/themes` and import
  `@tzardom-ui/themes/team-capacity-dashboard.css` instead of
  `@tzardom-ui/react/themes/…`. The theme imports `tailwind.css` for you.
- **`data-testid` is optional** and goes on the root as is; `tzrTestId` and
  `TEST_ID_PREFIXES` are gone.
- **`TzarThemeToggle` needs a `TzarProvider`,** and its `theme`, `defaultTheme`
  and `onThemeChange` props are gone.
- **`TzarContext` is gone;** use `useTzarTheme()`.
- **`@tzardom-ui/react/icons` is gone;** import icons from `lucide-react`.
- **ESM only:** `require('@tzardom-ui/react')` no longer works.
- **From 0.2 only:** `@tzardom-ui/core` is gone, and with it `TzarIconButton`
  and `TzarDropdown`.
