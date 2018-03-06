const path = require('path')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const poststylus = require('poststylus')

module.exports = {
  resolve: {
    alias: {
      react: 'gatsby-plugin-react-next/node_modules/react',
      'react-dom': 'gatsby-plugin-react-next/node_modules/react-dom'
    }
  },
  module: {
    rules: [
      {
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
                '~stylus-mixins/index.styl',
                path.resolve(__dirname, '../src/stylus/_______settings/index.styl')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|eot|ttf|woff(2)?)$/,
        use: [ 'file-loader' ]
      },
      {
        // ignore gatsby-link's global `__loader` variable
        test: require.resolve('gatsby-link'),
        use: 'imports-loader?___loader=>{ enqueue: () => null }'
      }
    ]
  }
}
