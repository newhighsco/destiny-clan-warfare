const path = require('path')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src/**/*.stories.@(js|mdx|ts|tsx)'],
  addons: ['@newhighsco/storybook-preset'],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@config$': path.resolve(__dirname, '../site.config.js'),
      '@helpers': path.resolve(__dirname, '../src/helpers'),
      '@images': path.resolve(__dirname, '../src/images'),
      '@libs': path.resolve(__dirname, '../src/libs'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@theme': path.resolve(__dirname, '../src/theme')
    }

    return config
  }
}
