module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tzardom-ui/types$': '<rootDir>/../types/src/index.ts',
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  // @lit/react ships ESM, so let Babel transform it. Matches both npm's
  // node_modules/@lit/react and pnpm's node_modules/.pnpm/@lit+react@x/ path.
  transformIgnorePatterns: [
    '/node_modules/(?!(\\.pnpm/@lit\\+react|@lit/react)[@/])',
  ],
  collectCoverageFrom: [
    'src/provider/**/*.{ts,tsx}',
    '!src/provider/**/*.types.ts',
  ],
  coverageReporters: ['text', 'html'],
}
