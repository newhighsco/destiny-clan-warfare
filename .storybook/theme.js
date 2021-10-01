import { create } from '@storybook/theming/create'
import config from '../site.config'

export default create({
  base: 'light',
  brandTitle: config.name,
  brandUrl: '/',
  brandImage: ''
})
