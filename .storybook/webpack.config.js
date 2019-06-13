const stylusLoaders = require('../config/webpack/stylus-loaders')
const svgLoaders = require('../config/webpack/svg-loaders')

module.exports = async ({ config }) => {
  const existingSvgRule = config.module.rules.findIndex(rule =>
    rule.test.toString().includes('svg')
  )

  config.module.rules[existingSvgRule].exclude = /\.svg$/

  config.module.rules.push(
    {
      test: /\.stories\.jsx?$/,
      loaders: [require.resolve('@storybook/addon-storysource/loader')],
      enforce: 'pre'
    },
    {
      test: /\.styl$/,
      use: [require.resolve('style-loader'), ...stylusLoaders('dev')]
    },
    ...svgLoaders()
  )

  return config
}
