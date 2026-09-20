module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!(@lit/react)/)'],
  collectCoverageFrom: [
    'src/provider/**/*.{ts,tsx}',
    '!src/provider/**/*.types.ts',
  ],
  coverageReporters: ['text', 'html'],
}
