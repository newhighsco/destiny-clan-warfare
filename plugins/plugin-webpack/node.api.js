import webpack from 'webpack'

export default () => ({
  webpack: config => {
    const existingUrlLoaderRule = config.module.rules[0].oneOf.findIndex(
      ({ loader, query }) => loader === 'url-loader' && query && query.limit
    )

    config.module.rules[0].oneOf[existingUrlLoaderRule].query.limit = 1

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})
