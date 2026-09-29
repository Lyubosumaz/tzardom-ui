module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@tzardom-ui/types$': '<rootDir>/../types/src/index.ts',
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['node_modules/(?!(@lit/react)/)'],
  collectCoverageFrom: [
    'src/provider/**/*.{ts,tsx}',
    '!src/provider/**/*.types.ts',
  ],
  coverageReporters: ['text', 'html'],
}
