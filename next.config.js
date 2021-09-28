const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withSvgr = require('@newhighsco/next-plugin-svgr')

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  poweredByHeader: false,
  target: 'serverless'
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withSvgr,
      {
        svgrOptions: {
          svgoConfig: {
            plugins: [{ prefixIds: false }]
          }
        }
      }
    ]
  ],
  nextConfig
)
