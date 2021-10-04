const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset',
  '@newhighsco/press-start'
])
const withImages = require('next-optimized-images')
const withSvgr = require('@newhighsco/next-plugin-svgr')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  generateBuildId: () => 'build',
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    localeDetection: false
  },
  images: {
    disableStaticImages: true
  },
  poweredByHeader: false,
  target: 'serverless',
  trailingSlash: true
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withImages,
      {
        inlineImageLimit: -1,
        handleImages: ['jpeg', 'png', 'webp', 'gif', 'ico'],
        removeOriginalExtension: true
      }
    ],
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
