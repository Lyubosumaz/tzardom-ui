# @tzardom-ui/react

React 19 components with semantic HTML, styled with Tailwind CSS v4. Part of
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui).

## Install

```bash
npm install @tzardom-ui/react @tzardom-ui/themes
```

## Setup

1. Import Tailwind and a theme in your app's CSS:

   ```css
   @import 'tailwindcss';
   @import '@tzardom-ui/themes/team-capacity-dashboard.css';
   ```

2. Wrap your app in `TzarProvider` (it holds light/dark):

   ```tsx
   <TzarProvider storageKey="theme">{children}</TzarProvider>
   ```

3. Use the components:

   ```tsx
   import { TzarButton } from '@tzardom-ui/react'

   ;<TzarButton variant="primary">Save</TzarButton>
   ```

## Components

Props, defaults and live examples are in Storybook (`pnpm storybook`) and in
your editor through the types. Every component takes `className`; where it
clashes with ours, yours wins.

| Component                | What it is                                       |
| ------------------------ | ------------------------------------------------ |
| `TzarBrand`              | App name and tagline with an icon                |
| `TzarButton`             | Button: primary, secondary, soft or danger       |
| `TzarChart`              | Line or bar chart in plain SVG                   |
| `TzarCommonLink`         | Pill-shaped link that renders your router's link |
| `TzarDialog`             | Modal on the native `<dialog>`                   |
| `TzarFooter`             | Page footer                                      |
| `TzarLanguageSelect`     | Language picker                                  |
| `TzarMetricCard`         | One number with a label                          |
| `TzarPageHeader`         | Page or section title with a description         |
| `TzarTeamsOverCapacity`  | List of teams over capacity                      |
| `TzarTextField`          | Label, input and error message                   |
| `TzarThemeToggle`        | Dark mode button                                 |
| `TzarUpcomingRiskEvents` | List of upcoming events                          |
| `TzarUserMenu`           | User button with an account link and log out     |

## Good to know

- **Router links:** pass your link component as `as` (`TzarCommonLink`) or
  `linkAs` (`TzarUserMenu`), e.g. Next.js `Link`.
- **Dialog with a form:** give the form an `id` and pass it as `form`. The
  confirm button then submits it.
- **Theme:** `useTzarTheme()` reads and changes it inside a `TzarProvider`. It
  and `TzarThemeToggle` throw outside one.
- **Tests:** find elements by role, label or text. `data-testid` is optional and
  goes on the root element as is.
