const svgLoaders = require('../../config/webpack/svg-loaders')

export default () => ({
  webpack: config => {
    config.module.rules[0].oneOf.unshift(...svgLoaders())

    return config
  }
})
