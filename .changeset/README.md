# Release notes

Each `.md` file here is a note for the next release: which packages get a
`patch` bump, and the text for their `CHANGELOG.md`.

- **Work branches:** you don't write these by hand. After every commit, the
  `post-commit` hook (`scripts/changeset-branch.mjs`) writes `<branch-name>.md`
  from the packages you changed and your commit messages. To use your own text,
  replace the "Changes in this release:" part and commit; the hook keeps it from
  then on.
- **Release branch:** `pnpm version:packages` turns all notes into version bumps
  and changelog entries, then deletes them. The release PR fails if any note is
  left over.

`config.json` holds the [Changesets](https://github.com/changesets/changesets)
settings.
