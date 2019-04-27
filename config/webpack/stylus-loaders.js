const path = require('path')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const poststylus = require('poststylus')

const stylusLoaders = options => {
  options = options || {
    modules: true,
    importLoaders: 1
  }

  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        ...options,
        minimize: true,
        sourceMap: false,
        localIdentName: '[local]'
      }
    },
    {
      loader: require.resolve('stylus-loader'),
      options: {
        includePaths: ['src/'],
        use: [stylusMixins(), responsiveGrid(), poststylus([autoprefixer])],
        import: [
          '~stylus-mixins/index.styl',
          path.resolve(
            __dirname,
            '../../src/stylus/_______settings/index.styl'
          ),
          path.resolve(__dirname, '../../src/stylus/______tools/index.styl')
        ]
      }
    }
  ]
}

module.exports = stylusLoaders
