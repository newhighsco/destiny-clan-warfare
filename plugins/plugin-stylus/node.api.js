import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

const stylusLoaders = require('../../config/webpack/stylus-loaders')

export default () => ({
  webpack: (config, { stage }) => {
    var loaders = []

    if (stage === 'dev') {
      loaders = [...stylusLoaders(stage)]
    } else if (stage === 'node') {
      loaders = [ExtractCssChunks.loader, ...stylusLoaders(stage)]

      config.plugins.push(
        new ExtractCssChunks({
          filename: '[name].[chunkHash:8].css',
          orderWarning: false
        })
      )
    } else {
      loaders = [ExtractCssChunks.loader, ...stylusLoaders(stage)]
    }

    config.module.rules[0].oneOf.unshift({
      test: /\.styl$/,
      use: loaders
    })

    return config
  }
})
