const stylusLoaders = require('../src/utils/stylus-loaders')

module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [ require.resolve('style-loader'), ...stylusLoaders() ]
      },
      {
        test: /\.svg$/,
        use: [ require.resolve('svg-react-loader'), require.resolve('svgo-loader') ]
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff(2)?)$/,
        use: [ 'file-loader' ]
      }
    ]
  }
}
