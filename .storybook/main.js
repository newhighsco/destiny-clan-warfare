const hq = require('alias-hq')
const {
  JsConfigPathsPlugin
} = require('next/dist/build/webpack/plugins/jsconfig-paths-plugin')

module.exports = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  stories: ['../src'],
  addons: ['@newhighsco/storybook-preset'],
  staticDirs: ['../public'],
  docs: { autodocs: true },
  webpackFinal: async config => {
    const aliases = hq.get('webpack', { format: 'array' })
    const { paths, baseUrl } = hq.config

    config.resolve.alias = {
      ...config.resolve.alias,
      ...aliases
    }

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new JsConfigPathsPlugin(paths, baseUrl)
    ]

    return config
  }
}
