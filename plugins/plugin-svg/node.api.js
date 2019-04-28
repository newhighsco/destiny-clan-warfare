const svgLoaders = require('../../config/webpack/svg-loaders')

export default () => ({
  webpack: (config, { defaultLoaders }) => {
    const { fileLoader } = defaultLoaders

    config.module.rules[0].oneOf.unshift(
      ...svgLoaders({ ...fileLoader.query, limit: 1 })
    )

    return config
  }
})
