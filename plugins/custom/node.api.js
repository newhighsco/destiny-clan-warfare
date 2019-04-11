import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

const webpack = require('webpack')
const stylusLoaders = require('../../config/webpack/stylus-loaders')
const svgLoaders = require('../../config/webpack/svg-loaders')

export default () => ({
  webpack: (config, { defaultLoaders, stage }) => {
    const { jsLoader, jsLoaderExt, cssLoader, fileLoader } = defaultLoaders

    fileLoader.query = { limit: 1, name: 'static/[name].[hash:8].[ext]' }

    var loaders = []

    if (stage === 'dev') {
      loaders = [ require.resolve('style-loader'), ...stylusLoaders() ]
    } else if (stage === 'node') {
      loaders = [ ExtractCssChunks.loader, ...stylusLoaders() ]

      config.plugins.push(new ExtractCssChunks({ orderWarning: false }))
    } else {
      loaders = [ ExtractCssChunks.loader, ...stylusLoaders() ]
    }

    config.module.rules = [
      {
        oneOf: [
          jsLoader,
          jsLoaderExt,
          cssLoader,
          {
            test: /\.styl$/,
            use: loaders
          },
          ...svgLoaders(),
          fileLoader
        ]
      }
    ]

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})
