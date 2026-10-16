# tzardom-ui: rules for Claude

React components (`packages/react`) and themes (`packages/themes`), used by
`../team-capacity-dashboard`. Private: `storybook`, `e2e`, `mocks`.

## Core rules

1. Clean code a junior can read. No clever tricks.
2. No hacks, as few dependencies as possible.
3. Semantic HTML first. ARIA only when HTML can't do it.
4. Tests find elements by role, label or text. `data-testid` only when needed.

## Working here

- Never commit, push, branch or open PRs. Git is the user's.
- Ask before big changes. On "stop" or brainstorming, change no code.
- Check with `pnpm lint`, `pnpm test:coverage`, `pnpm build`, `pnpm test:e2e`.
- No changelog or upgrade notes.

## Code

- Imports: `@/` outside the folder, `./` inside. Relative paths in anything that
  ends up in published `.d.ts` files.
- A component: `components/<Name>/` with `.tsx`, `.types.ts`, `.test.tsx`; a
  story in `stories/<group>/`; exported from `components/index.ts`; a line in
  the `packages/react/README.md` table.
- `Tzar…` names are public. Internal pieces have no prefix.
- Use `type`, never `interface`.
- Tailwind classes, `className` merged with `twMerge`. Colors only from the
  theme, never hex.
- Mock data in `@tzardom-ui/mocks`, obviously fake.
- Themes: one CSS file per app, starting with
  `@import '@tzardom-ui/react/tailwind.css'`, listed in `files` of
  `packages/themes/package.json`.

## Scripts

`try` / `throw` / `catch` (print `✖ … failed`, set `process.exitCode = 1`) /
`finally` (print `THANK_YOU_MESSAGE`). Node built-ins, no helper packages.

## Dashboard

`pnpm dev` here and `npm run dev` in the dashboard. If a new output file isn't
picked up, restart the dashboard's `npm run dev`.

## Releases

The root version matches the `release/x.y.z` branch. A changed package needs a
higher version than on `master`.
