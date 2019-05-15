import { create } from '@storybook/theming'

const constants = require('../../src/utils/constants')

export default create({
  base: 'light',
  brandTitle: constants.meta.name,
  brandImage: null,
  gridCellSize: 20
})
