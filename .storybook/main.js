const hq = require('alias-hq')
const {
  JsConfigPathsPlugin
} = require('next/dist/build/webpack/plugins/jsconfig-paths-plugin')
const { resolve } = require('path')

module.exports = {
  framework: '@storybook/react-webpack5',
  stories: ['../src'],
  addons: ['@newhighsco/storybook-preset'],
  staticDirs: ['../public'],
  docs: { autodocs: true },
  webpackFinal: async config => {
    const aliases = hq.get('webpack', { format: 'array' })
    const { paths, baseUrl } = hq.config

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases,
      'sb-original/next/image': require.resolve('next/image'),
      'next/image': resolve(__dirname, './images/NextImage.tsx')
    }

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new JsConfigPathsPlugin(paths, baseUrl)
    ]

    return config
  }
}
