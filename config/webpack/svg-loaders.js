const svgLoaders = urlLoaderOptions => {
  const svgrLoader = {
    loader: require.resolve('@svgr/webpack'),
    options: {
      svgoConfig: {
        plugins: [{ prefixIds: false }]
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
            ...urlLoaderOptions
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
