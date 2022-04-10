const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset',
  '@newhighsco/press-start'
])
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
    domains: ['www.bungie.net'],
    formats: ['image/avif', 'image/webp']
  },
  poweredByHeader: false
}

module.exports = withPlugins(
  [[withTranspileModules], [withSvgr, { inlineImageLimit: -1 }]],
  nextConfig
)
