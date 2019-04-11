const svgLoaders = () => {
  return [
    {
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgoConfig: {
          plugins: [
            { prefixIds: false }
          ]
        }
      }
    },
    {
      loader: 'url-loader',
      options: {
        limit: 1,
        name: 'static/[name].[hash:8].[ext]'
      }
    }
  ]
}

module.exports = svgLoaders
