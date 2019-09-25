import webpack from 'webpack'

export default () => ({
  webpack: config => {
    const existingUrlLoaderRuleIndex = config.module.rules[0].oneOf.findIndex(
      ({ loader }) => loader === 'url-loader'
    )
    const existingUrlLoaderRule =
      config.module.rules[0].oneOf[existingUrlLoaderRuleIndex]

    if (existingUrlLoaderRule.query) existingUrlLoaderRule.query.limit = 1
    if (existingUrlLoaderRule.options) existingUrlLoaderRule.options.limit = 1

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

    return config
  }
})
