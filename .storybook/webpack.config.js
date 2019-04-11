const path = require('path')
const stylusLoaders = require('../config/webpack/stylus-loaders')
const svgLoaders = require('../config/webpack/svg-loaders')

module.exports = async ({ config, mode }) => {
  const existingSvgRule = config.module.rules.findIndex(rule =>
    rule.test.toString().includes('svg')
  )

  config.module.rules[existingSvgRule].exclude = /\.svg$/

  config.module.rules.push(
    {
      test: /\.styl$/,
      use: [ require.resolve('style-loader'), ...stylusLoaders() ]
    },
    ...svgLoaders()
  )

  return config
}
