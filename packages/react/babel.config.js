// Only Storybook (Webpack + babel-loader) uses this. It goes away when
// Storybook moves to Vite.
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
}
