import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

const stylusLoaders = require('../../config/webpack/stylus-loaders')

export default () => ({
  webpack: (config, { stage }) => {
    var loaders = []

    if (stage === 'dev') {
      loaders = [
        {
          loader: ExtractCssChunks.loader,
          options: { hot: true, reloadAll: true }
        },
        ...stylusLoaders(stage)
      ]
    } else if (stage === 'node') {
      loaders = [...stylusLoaders(stage)]
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
