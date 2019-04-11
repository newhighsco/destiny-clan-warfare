const svgLoaders = () => {
  const svgrLoader = {
    loader: require.resolve('@svgr/webpack'),
    options: {
      svgoConfig: {
        plugins: [
          { prefixIds: false }
        ]
      }
    }
  }

  return [
    {
      test: /\.url\.svg$/,
      use: [
        svgrLoader,
        {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'static/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      use: svgrLoader
    }
  ]
}

module.exports = svgLoaders
