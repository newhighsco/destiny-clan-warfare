const path = require('path')
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const poststylus = require('poststylus')

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env)

  config.module.rules.push({
    test: /\.styl$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          minimize: true
        }
      },
      {
        loader: require.resolve('stylus-loader'),
        options: {
          use: [
            stylusMixins(),
            responsiveGrid(),
            poststylus([ autoprefixer ])
          ],
          import: [
            `~stylus-mixins/index.styl`,
            `~responsive-grid/index.styl`,
            path.resolve(__dirname, '../src/stylus/_______settings/index.styl')
          ]
        }
      }
    ]
  })
  config.resolve.extensions.push('.styl')

  return config
}
