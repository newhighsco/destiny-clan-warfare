const withPlugins = require('next-compose-plugins')
const withSvgr = require('@newhighsco/next-plugin-svgr')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    appDir: true
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
  poweredByHeader: false,
  transpilePackages: ['@newhighsco/chipset', '@newhighsco/press-start']
}

module.exports = withPlugins([[withSvgr, { inlineImageLimit: -1 }]], nextConfig)
