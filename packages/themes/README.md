# @tzardom-ui/themes

Color themes for the
[`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react)
components, as CSS for Tailwind CSS v4. Part of
[tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui).

## Install

```bash
npm install @tzardom-ui/themes @tzardom-ui/react
```

## Use

In your app's CSS, import Tailwind, then one theme:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
```

A theme does two things:

- **Names the colors** for Tailwind (`bg-background`, `text-secondary`, …):
  light values on `:root`, dark ones on `:root[data-theme='dark']`.
  `TzarProvider` from `@tzardom-ui/react` switches between them.
- **Imports `@tzardom-ui/react/tailwind.css`,** so your Tailwind generates the
  components' classes. That's why you install both packages.

| File                          | For                     |
| ----------------------------- | ----------------------- |
| `team-capacity-dashboard.css` | team-capacity-dashboard |

## Adding a theme

1. Copy `team-capacity-dashboard.css` and name it after the app.
2. Change the color values. Keep every variable name and the `tailwind.css`
   import.
3. Add the file name to `files` in `package.json`, so it gets published.
