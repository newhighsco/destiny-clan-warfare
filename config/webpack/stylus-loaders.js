const path = require('path')
const semver = require('semver')
const autoprefixer = require('autoprefixer')
const stylusMixins = require('stylus-mixins')
const responsiveGrid = require('responsive-grid')
const poststylus = require('poststylus')

const stylusLoaders = (stage, options) => {
  options = options || {
    modules: true,
    importLoaders: 1
  }

  if (stage === 'node') {
    options.exportOnlyLocals = true
  }

  if (stage === 'prod') {
    const cssLoaderVersion = require('css-loader/package.json').version

    if (semver.satisfies(cssLoaderVersion, '<2') === true) {
      options.minimize = true
    }
  }

  return [
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: false,
        localIdentName: '[local]',
        ...options
      }
    },
    {
      loader: require.resolve('stylus-loader'),
      options: {
        includePaths: ['src/'],
        use: [stylusMixins(), responsiveGrid(), poststylus([autoprefixer])],
        import: [
          '~stylus-mixins/index.styl',
          path.resolve(__dirname, '../../src/stylus/____settings/index.styl'),
          path.resolve(__dirname, '../../src/stylus/___tools/index.styl')
        ]
      }
    }
  ].filter(d => d)
}

module.exports = stylusLoaders
