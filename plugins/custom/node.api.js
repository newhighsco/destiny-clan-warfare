import ExtractCssChunks from 'extract-css-chunks-webpack-plugin'

const webpack = require('webpack')
const stylusLoaders = require('../../src/utils/stylus-loaders')

export default () => ({
  webpack: (config, { defaultLoaders, stage }) => {
    var { jsLoader, jsLoaderExt, cssLoader, fileLoader } = defaultLoaders

    fileLoader.query.limit = 1

    if (stage !== 'dev') config.devtool = false

    var loaders = []

    if (stage === 'dev') {
      // TODO: Check IE 11 support and fix polyfill if needed
      // config.entry = [ 'babel-polyfill', ...config.entry ]

      loaders = [ require.resolve('style-loader'), ...stylusLoaders() ]
    } else if (stage === 'node') {
      loaders = [ ExtractCssChunks.loader, ...stylusLoaders() ]

      config.plugins.push(new ExtractCssChunks({ orderWarning: false }))
    } else {
      // config.entry = [ 'babel-polyfill', config.entry ]

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
          {
            test: /\.svg$/,
            loader: require.resolve('svg-react-loader')
          },
          fileLoader
        ]
      }
    ]

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})
