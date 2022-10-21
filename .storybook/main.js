const hq = require('alias-hq')

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories: ['../src'],
  addons: ['@newhighsco/storybook-preset'],
  staticDirs: ['../public'],
  webpackFinal: async config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...hq.get('webpack', { format: 'array' })
    }

    return config
  }
}
