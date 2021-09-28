import { create } from '@storybook/theming/create'
import packageInfo from '../package.json'

const { config, name } = packageInfo
const { logo, theme, title } = config

export default create({
  base: theme,
  brandTitle: title || name,
  brandImage: logo
})
