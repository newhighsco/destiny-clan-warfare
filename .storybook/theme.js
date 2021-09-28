import { themes } from '@storybook/theming'
import { create } from '@storybook/theming/create'
import packageInfo from '../package.json'

const { config = {}, homepage, name } = packageInfo
const { logo, theme, title } = config

export default create({
  base: theme || themes.light,
  brandTitle: title || name,
  brandUrl: homepage,
  brandImage: logo
})
