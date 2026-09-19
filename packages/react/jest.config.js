module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
  },
  // @lit/react (pulled in by @stencil/react-output-target's runtime) ships ESM-only;
  // let Jest transform it instead of skipping node_modules entirely.
  transformIgnorePatterns: ['node_modules/(?!(@lit/react)/)'],
}
