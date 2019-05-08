import webpack from 'webpack'

export default () => ({
  webpack: (config, { defaultLoaders, stage }) => {
    config.entry = [require.resolve('babel-polyfill'), ...config.entry]

    const { fileLoader } = defaultLoaders
    const existingUrlLoaderRule = config.module.rules[0].oneOf.findIndex(
      ({ loader, query }) => loader === 'url-loader'
    )

    config.module.rules[0].oneOf[existingUrlLoaderRule].query = {
      ...fileLoader.query,
      limit: 1
    }

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})
