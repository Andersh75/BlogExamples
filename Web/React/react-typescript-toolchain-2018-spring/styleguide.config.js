module.exports = {
  components: 'src/components/**/*.{ts,tsx}',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: require('./config/webpack.config.dev.js'),
  ignore: [
    '**/__tests__/**',
    '**/*.(spec|test).{js,jsx,ts,tsx}',
    '**/*.d.ts'
  ]
};