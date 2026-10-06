# @tzardom-ui/themes

Color themes for the [tzardom-ui](https://github.com/Lyubosumaz/tzardom-ui)
React components, as plain CSS for Tailwind CSS v4.

## Install

```bash
npm install @tzardom-ui/themes
```

## Usage

In your app's CSS, import Tailwind, then one theme, then the components'
classes:

```css
@import 'tailwindcss';
@import '@tzardom-ui/themes/team-capacity-dashboard.css';
@import '@tzardom-ui/react/tailwind.css';
```

Light colors are set on `:root` and dark colors on `:root[data-theme='dark']`.
`TzarProvider` from `@tzardom-ui/react` switches between them.

## Themes

| File                          | For                     |
| ----------------------------- | ----------------------- |
| `team-capacity-dashboard.css` | team-capacity-dashboard |

Each theme names the colors for Tailwind (`bg-background`, `text-secondary`, …),
sets their light and dark values, and sets the page's background and text color.

## Adding a theme

Copy `team-capacity-dashboard.css`, name it after the app, and change the
values, keeping every variable name. Then add the file to `files` in
`package.json`.

## Part of the tzardom-ui monorepo

| Package                                                                | What it is              |
| ---------------------------------------------------------------------- | ----------------------- |
| [`@tzardom-ui/react`](https://www.npmjs.com/package/@tzardom-ui/react) | React components        |
| `@tzardom-ui/themes`                                                   | This package            |
| [`@tzardom-ui/types`](https://www.npmjs.com/package/@tzardom-ui/types) | Shared TypeScript types |
