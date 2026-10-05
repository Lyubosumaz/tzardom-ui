# Release notes

Each `.md` file here is a note for the next release: which packages get a
`patch` bump, and the text for their `CHANGELOG.md`.

- **Work branches:** before opening the PR, run `pnpm changeset:branch` and
  commit the result. It writes `<branch-name>.md` from the packages you changed
  and your commit messages. Commits starting with `chore:` are tooling-only and
  left out; a branch with only those gets an empty note (no release). To use
  your own text, replace the "Changes in this release:" part; re-running keeps
  it and only updates the package list.
- **Release branch:** `pnpm version:packages` turns all notes into version bumps
  and changelog entries, then deletes them. The release PR fails if any note is
  left over.

`config.json` holds the [Changesets](https://github.com/changesets/changesets)
settings.
